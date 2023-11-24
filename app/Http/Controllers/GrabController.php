<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sku;
use App\Models\Store;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GrabController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::connection(env('DB2_CONNECTION'))
            ->table('MM770SSL.INVBAL')
            ->select('ISTORE', 'INUMBR', 'IBHAND')
            ->where('ISTORE', 114)
            ->whereIn('INUMBR', [12896, 68942, 40185])
            ->get();

        return response($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sftpCronCsvUpdater()
    {
        $istoreValues = DB::table('stores')->pluck('istore')->all();
        $csvDataAll = [];

        // Header for CSV
        $header = [
            'StoreID' => 'StoreID',
            'SKU' => 'SKU',
            'RSP' => 'RSP',
            'Stock_On_Hand' => 'Stock_On_Hand',
        ];
        $csvDataAll[] = $header;

        foreach ($istoreValues as $istore) {
            $grabCols = DB::table('stores')->where('istore', $istore)->get();

            $csvData = [];

            foreach ($grabCols as $grabCol) {
                // Decode the 'grab' JSON string to an array of objects
                $grabData = json_decode($grabCol->grab);

                // Check if $grabData is an array
                if (is_array($grabData)) {
                    foreach ($grabData as $item) {
                        $csvData[] = [
                            'StoreID' => $item->istore,
                            'SKU' => $item->inumbr,
                            'RSP' => $item->grab_price,
                            'Stock_On_Hand' => $item->grab_stock,
                        ];
                    }
                }
            }

            $filename = public_path("GrabSftp/{$istore}.csv");

            // Remove existing file if it exists
            if (file_exists($filename)) {
                unlink($filename);
            }

            $fp = fopen($filename, 'w');

            // Write header to CSV file
            fputcsv($fp, array_values($header));

            foreach ($csvData as $fields) {
                fputcsv($fp, $fields);
            }

            fclose($fp);

            // Merge data for response
            $csvDataAll = array_merge($csvDataAll, $csvData);
        }

        // Return merged data for response
        return response($csvDataAll);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function grabStockUpdate()
    {

        $jda = [];
        $stores = [114, 102];
        $skus = DB::table('sku')
            ->select('SKU_Number')
            // ->take(100)
            ->get();

        // Create a CSV array
        $csvArray = [];

        foreach ($skus as $sku) {
            $csvArray[] = $sku->SKU_Number;
        }
        foreach ($stores as $storeId) {
            // Fetch data from the first table (MM770SSL.INVBAL)
            $data = DB::connection(env('DB2_CONNECTION'))
                ->table('MM770SSL.INVBAL')
                ->select('ISTORE', 'INUMBR', 'IBHAND')
                ->where('ISTORE', $storeId)
                ->whereIn('INUMBR', $csvArray)
                ->get();



            $dataArray = json_decode(json_encode($data), true);

            $skuData = DB::table('sku')
                ->select('SKU_Number', 'SKU_Current_Price', 'grab_pack')
                ->whereIn('SKU_Number', $csvArray)
                ->get();

            $skuDataArray = json_decode(json_encode($skuData), true);

            $mergedData = [];
            foreach ($skuDataArray as $skuItem) {
                $grab_stock = 0; // Initialize grab_stock outside the inner loop
                $grab_price = 0;
                foreach ($dataArray as $dataItem) {
                    if ($skuItem['SKU_Number'] == $dataItem['inumbr']) {
                        $mergedData[] = array_merge($skuItem, $dataItem);
                        if (isset($dataItem["ibhand"])) {
                            $grab_stock = max(0, floor($dataItem["ibhand"] / ($skuItem["grab_pack"] ?? 1)));
                        } else {
                            $grab_stock = 0;
                        }
                        $grab_price = max(0, floor($skuItem["SKU_Current_Price"] / ($skuItem["grab_pack"] ?? 1)));
                    }
                }

                // Add grab_stock after the inner loop completes for a particular $skuItem
                $mergedData[count($mergedData) - 1]["grab_stock"] = $grab_stock;
                $mergedData[count($mergedData) - 1]["grab_price"] = $grab_price;
            }
            // // Process the merged data
            foreach ($mergedData as $flattenedArray) {
                $jda[] = $flattenedArray;
            }
        }

        // //this script can collet all unknown SKU put in array named unknown
        // // $output = [];
        // // foreach ($jda as $item) {

        // //     if (isset($item['istore'])) {
        // //         $istore = $item['istore'];
        // //     } else {
        // //         $istore = 'unknown';
        // //     }

        // //     if (!isset($output[$istore])) {
        // //         $output[$istore] = [];
        // //     }
        // //     $output[$istore][] = $item;
        // // }


        $output = [];

        foreach ($jda  as $item) {
            // Check if 'istore' key exists in the $item array
            if (isset($item['istore'])) {
                $istore = $item['istore'];

                if (!isset($output[$istore])) {
                    $output[$istore] = [];
                }

                // Convert the item to an array and add it to the existing istore array
                $output[$istore][] = $item;
            }
        }


        $chunks = array_chunk($output, 20, true);
        foreach ($chunks as $chunk) {
            foreach ($chunk as $storeKey => $storeData) {
                $data = [
                    'istore' => $storeKey,
                    'grab' => $storeData,
                ];
                $existingRecord = Store::where('istore', $storeKey)->first();
                if ($existingRecord) {
                    $existingRecord->update($data);
                    $data['updated_at'] = now();
                } else {
                    $data['created_at'] = now();
                    $data['updated_at'] = now();
                    Store::insert($data);
                }
            }
        }
        return response($output);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
