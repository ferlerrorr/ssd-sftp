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
        ini_set('memory_limit', '5024M');
        $istoreValues = DB::table('store_maintenance')
            ->select('istore')
            ->where('grab', 1)
            // ->take(20)
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
                            // 'RSP' => $item->grab_price,
                            // 'Stock_On_Hand' => $item->grab_stock
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
        // return response($csvDataAll);
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
        ini_set('memory_limit', '10048M');
        $stores = DB::table('store_maintenance')
            ->select('istore')
            ->where('grab', 1)
            // ->take(20)
            ->get()->pluck('istore');

        // $stores = [114, 2];


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

            foreach ($skuDataArray as &$skuItem) {
                // Initialize grab_stock and grab_price for each SKU
                $grab_stock = 0;
                $grab_price = 0;

                foreach ($dataArray as $dataItem) {
                    if ($skuItem['SKU_Number'] == $dataItem['inumbr']) {
                        $mergedData[] = array_merge($skuItem, $dataItem);
                    }

                    if (isset($dataItem["ibhand"])) {
                        $grab_stock = max(0, floor($dataItem["ibhand"] / ($skuItem["grab_pack"] ?? 1)));
                    } else {
                        $grab_stock = 0;
                    }

                    $grab_price = max(0, floor($skuItem["SKU_Current_Price"] * ($skuItem["grab_pack"] ?? 1)));
                    $skuItem["grab_stock"] = $grab_stock;
                    $skuItem["grab_price"] = $grab_price;
                }
                // Set grab_stock and grab_price for the current SKU

                // Add the updated SKU data to the mergedData array
                $mergedData[] = $skuItem;
            }

            foreach ($mergedData as $flattenedArray) {
                $jda[] = $flattenedArray;
            }
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
            $data = [
                'istore' => $storeKey,
                'grab' => $storeData,
                'updated_at' => now(),
            ];

            $existingRecord = Store::where('istore', $storeKey)->first();

            if ($existingRecord) {

                $existingRecord->update($data);
            } else {
                $data['grab'] = json_encode($data['grab'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                $data['created_at'] = now();
                Store::insert($data);
            }
        }


        // $res = [
        //     'message' => 'Grab Stores Stocks Updated Successfully',
        // ];
        // return response($res);
    }

    public function searchPerStore($storeId)
    {
        $skus = DB::table('sku')
            ->select('SKU_Number')
            // ->take(100)
            ->get();

        $csvArray = [];
        $NoRecord = []; // Initialize the array to store records with no data

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
                        $grab_stock = max(0, floor(floatval($dataItem["ibhand"]) / ($skuItem["grab_pack"] ?? 1)));
                    }

                    $grab_price = max(0, floor(floatval($skuItem["SKU_Current_Price"]) * ($skuItem["grab_pack"] ?? 1)));
                } else {
                    // Add the SKU to $NoRecord array when there is no data
                    $NoRecord[] = $skuItem['SKU_Number'];
                }

                // Add grab_stock after the inner loop completes for a particular $skuItem
                if (!empty($mergedData)) {
                    $mergedData[count($mergedData) - 1]["grab_stock"] = $grab_stock;
                    $mergedData[count($mergedData) - 1]["grab_price"] = $grab_price;
                }
            }

            //Process the merged data for the current store
            $count = count($mergedData);
        }

        return response([$count, $mergedData, $NoRecord]);
    }


    public function addGrabSku(Request $request)
    {

        $requestData = $request->json()->all();

        $skuData = [];

        foreach ($requestData as $data) {
            $skuData[] = [
                'SKU_Number' => $data['SKU_Number'],
                'grab_pack' => $data['grab_pack'],
            ];
        }

        DB::table('sku')->insertOrIgnore($skuData);

        return response()->json(['message' => 'Import success'], 200);
    }



    public function loadSkutoPack()
    {

        $skus = DB::table('sku')
            ->select('SKU_Number', 'grab_pack')

            ->get();

        return response($skus);
    }



    public function loadStoreMaintenance()
    {

        $stores = DB::table('store_maintenance')
            ->select('istore', 'grab')
            // ->take(100)
            ->get();

        return response($stores);
    }



    public function deleteGrabSku($SKU_Number)
    {

        // Find the SKU by SKU_Number and delete it
        $deleted = Sku::where('SKU_Number', $SKU_Number)->delete();

        // Check if the deletion was successful
        if ($deleted) {
            // Deletion successful
            return response()->json(['message' => 'Sku Successfully Deleted']);
        }
    }



    public function updateGrabSku(Request $request, $SKU_Number)
    {
        $decoded_sku = urldecode($SKU_Number);
        $decoded_sku_int = (int)$decoded_sku;

        $data = DB::table('sku')->where('SKU_Number', $decoded_sku_int)->first();

        if ($data) {
            DB::table('sku')
                ->where('SKU_Number', $decoded_sku_int)
                ->update([
                    'SKU_Number' => $request->input('SKU_Number'),
                    'grab_pack' => $request->input('grab_pack')
                ]);

            $resp = [
                'msg' => 'Vendor Setup has been updated',
            ];

            return response()->json($resp, 200);
        } else {
            $resp = [
                'msg' => 'SKU not found',
            ];

            return response()->json($resp, 404);
        }
    }
}
