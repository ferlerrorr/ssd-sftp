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
        set_time_limit(0);
        ini_set('memory_limit', '1024M');
        $istoreValues = DB::table('store_maintenance')
            ->select('istore')
            ->where('grab', 1)
            // ->take(5)
            ->get()->pluck('istore');
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
                            'RSP' => $item->grab_price ?? null,
                            'Stock_On_Hand' => $item->grab_stock ?? null,
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function grabStockUpdate()
    {
        set_time_limit(0);
        ini_set('memory_limit', '1024M');
        $stores = DB::table('store_maintenance')
            ->select('istore')
            ->where('grab', 1)
            // ->take(50)
            ->get()->pluck('istore');
        $jda = [];

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

            // $skuDataArray = json_decode(json_encode($skuData), true);

            // $mergedData = [];
            // foreach ($skuDataArray as $skuItem) {
            //     $grab_stock = 0; // Initialize grab_stock outside the inner loop
            //     $grab_price = 0;
            //     foreach ($dataArray as $dataItem) {
            //         if ($skuItem['SKU_Number'] == $dataItem['inumbr']) {
            //             $mergedData[] = array_merge($skuItem, $dataItem);
            //             if (isset($dataItem["ibhand"])) {
            //                 $grab_stock = max(0, floor($dataItem["ibhand"] / ($skuItem["grab_pack"] ?? 1)));
            //             } else {
            //                 $grab_stock = 0;
            //             }
            //             $grab_price = max(0, floor($skuItem["SKU_Current_Price"] / ($skuItem["grab_pack"] ?? 1)));
            //         }
            //     }

            //     // Add grab_stock after the inner loop completes for a particular $skuItem
            //     $mergedData[count($mergedData) - 1]["grab_stock"] = $grab_stock;
            //     $mergedData[count($mergedData) - 1]["grab_price"] = $grab_price;
            // }
            // // Process the merged data
            // foreach ($mergedData as $flattenedArray) {
            //     $jda[] = $flattenedArray;
            // }
            $skuDataArray = json_decode(json_encode($skuData), true);

            $mergedData = [];
            foreach ($skuDataArray as $skuItem) {
                $grab_stock = 0; // Initialize grab_stock outside the inner loop
                $grab_price = 0;

                foreach ($dataArray as $dataItem) {
                    // Check if required keys are present and not null in both arrays
                    if (
                        isset($skuItem['SKU_Number'], $dataItem['inumbr'], $skuItem["grab_pack"], $skuItem["SKU_Current_Price"]) &&
                        isset($dataItem["ibhand"])
                    ) {
                        if ($skuItem['SKU_Number'] == $dataItem['inumbr']) {
                            $mergedData[] = array_merge($skuItem, $dataItem);

                            // Check if the necessary keys are present and not null before performing calculations
                            if ($skuItem["grab_pack"] !== null) {
                                $grab_stock = max(0, floor($dataItem["ibhand"] / $skuItem["grab_pack"]));
                                $grab_price = max(0, floor($skuItem["SKU_Current_Price"] / $skuItem["grab_pack"]));
                            } else {
                                // If grab_pack is null, set grab_stock and grab_price to null
                                $grab_stock = null;
                                $grab_price = null;
                            }
                        }
                    }
                }

                // Check if grab_stock and grab_price are not null before adding to merged data
                if ($grab_stock !== null && $grab_price !== null) {
                    // Add grab_stock after the inner loop completes for a particular $skuItem
                    $mergedData[count($mergedData) - 1]["grab_stock"] = $grab_stock;
                    $mergedData[count($mergedData) - 1]["grab_price"] = $grab_price;
                }
            }

            // Process the merged data
            $jda = $mergedData;
        }

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


        foreach ($output as $storeKey => $storeData) {
            $cd = json_encode($storeData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            $data = [
                'istore' => $storeKey,
                'grab' => $cd,
                'updated_at' => now(),
            ];

            $existingRecord = Store::where('istore', $storeKey)->first();

            if ($existingRecord) {
                // Update existing record
                $existingRecord->update($data);
            } else {
                $data['created_at'] = now();
                $data['grab'] = str_replace(['\\', '/'], '', $data['grab']);
                Store::insert($data);
            }
        }


        $res = [
            'message' => 'Grab Stores Stocks Updated Successfully',
        ];
        return response($output);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function searchPerStore($storeId)
    {


        $skus = DB::table('sku')
            ->select('SKU_Number')
            // ->take(100)
            ->get();

        $csvArray = [];

        foreach ($skus as $sku) {
            $csvArray[] = $sku->SKU_Number;
        }

        $data = DB::connection(env('DB2_CONNECTION'))
            ->table('MM770SSL.INVBAL')
            ->select('ISTORE', 'INUMBR', 'IBHAND')
            ->where('ISTORE', $storeId)
            ->whereIn('INUMBR', $csvArray)
            ->get();

        // Check if there is data before proceeding
        if ($data->isNotEmpty()) {
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

                $indexedDataArray = array_column($dataArray, null, 'inumbr');

                if (isset($indexedDataArray[$skuItem['SKU_Number']])) {
                    $dataItem = $indexedDataArray[$skuItem['SKU_Number']];
                    $mergedData[] = array_merge($skuItem, $dataItem);

                    if (isset($dataItem["ibhand"])) {
                        $grab_stock = max(0, floor($dataItem["ibhand"] / ($skuItem["grab_pack"] ?? 1)));
                    }

                    $grab_price = max(0, floor(floatval($skuItem["SKU_Current_Price"]) * ($skuItem["grab_pack"] ?? 1)));
                }

                // Add grab_stock after the inner loop completes for a particular $skuItem
                if (!empty($mergedData)) {
                    $mergedData[count($mergedData) - 1]["grab_stock"] = $grab_stock;
                    $mergedData[count($mergedData) - 1]["grab_price"] = $grab_price;
                }
            }

            // Process the merged data for the current store
            $jda = $mergedData;
        }

        return response($jda);
    }
}
