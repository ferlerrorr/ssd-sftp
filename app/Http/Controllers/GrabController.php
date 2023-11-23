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
            ->where('INUMBR', 13141)
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
            ->select('SKU_number')
            // ->take(1000)
            ->get();

        foreach ($stores as $storeId) {
            foreach ($skus as $sku) {
                $data = DB::connection(env('DB2_CONNECTION'))
                    ->table('MM770SSL.INVBAL')
                    ->select('ISTORE', 'INUMBR', 'IBHAND')
                    ->where('ISTORE', $storeId)
                    ->where('INUMBR', $sku->SKU_number)
                    ->get();

                // Fetch SKU data
                $skuData = DB::table('sku')
                    ->select('SKU_number', 'SKU_Current_Price', 'grab_pack')
                    ->where('SKU_number', $sku->SKU_number)
                    ->get();

                $dataArray = json_decode(json_encode($data), true);
                $skuDataArray = json_decode(json_encode($skuData), true);
                $mergedData = array_merge($dataArray, $skuDataArray);
                $flattenedArray = array_merge(...$mergedData);
                if (isset($flattenedArray["ibhand"])) {
                    $flattenedArray["grab_stock"] = max(0, floor($flattenedArray["ibhand"] / ($flattenedArray["grab_pack"] ?? 1)));
                } else {
                    $flattenedArray["grab_stock"] = 0;
                }
                $flattenedArray["grab_price"] = max(0, floatval($flattenedArray["SKU_Current_Price"]) *  ($flattenedArray["grab_pack"] ?? 1));

                $jda[] =  $flattenedArray;
            }
        }



        //this script can collet all unknown SKU put in array named unknown
        // $output = [];
        // foreach ($jda as $item) {

        //     if (isset($item['istore'])) {
        //         $istore = $item['istore'];
        //     } else {
        //         $istore = 'unknown';
        //     }

        //     if (!isset($output[$istore])) {
        //         $output[$istore] = [];
        //     }
        //     $output[$istore][] = $item;
        // }


        $output = [];

        foreach ($jda as $item) {
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


        $chunks = array_chunk($output, 200, true);

        // Process each chunk
        foreach ($chunks as $chunk) {
            // Process each item in the chunk
            foreach ($chunk as $storeKey => $storeData) {
                // Assuming 'istore' is the unique key in your table

                // Using Eloquent to update or insert into the database
                Store::updateOrInsert(
                    ['istore' => $storeKey],
                    [
                        'grab' => json_encode($storeData),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
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
