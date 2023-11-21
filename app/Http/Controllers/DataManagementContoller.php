<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Env;
use App\Jobs\PriceUpdate;
use Illuminate\Support\Facades\Artisan;
use App\Models\Sku;
use App\Models\PartSku;
use App\Models\Store;

use Illuminate\Http\Request;

class DataManagementContoller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sftpDataPriceUpdate()

    {
        $result = [];

        // $skus = DB::table('sku')->take(10)->pluck('SKU_number');
        $skus = DB::table('sku')->pluck('SKU_number');

        // $itemCount = count($skus);

        // $res = [
        //     $itemCount,
        //     $skus
        // ];

        // return response()->json($res);

        $storeid = "114";

        foreach ($skus as $sku) {
            $url = 'http://10.60.15.110/JDA_Connect_SFY/JDA_ConnectService.asmx';
            $xmlBody = '<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        <SKU_Inquiry xmlns="http://tempuri.org/">
                            <IP_Address>10.88.40.36</IP_Address>
                            <machine_Name>RRGJDAP06</machine_Name>
                            <JDA_Env>SSD</JDA_Env>
                            <App_ID>TP</App_ID>
                            <user>IFSSQLK1</user>
                            <password>$$D1i2O16</password>
                            <store_number>' . $storeid . '</store_number>
                            <sku_number>' . $sku . '</sku_number>
                            <pel_ID></pel_ID>
                        </SKU_Inquiry>
                    </soap:Body>
                </soap:Envelope>';

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlBody);

            $response = curl_exec($ch);
            curl_close($ch);

            $xml = simplexml_load_string($response);

            $sku_details = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;

            if ($sku_details) {
                $decodedData = json_decode($sku_details, true);

                $sku_number = isset($decodedData['SKU_Number']) ? $decodedData['SKU_Number'] : null;
                $sku_current_price = isset($decodedData['SKU_Current_Price']) ? $decodedData['SKU_Current_Price'] : null;

                $data = [
                    'SKU_Number' => $sku_number,
                    'SKU_Current_Price' => str_replace(',', '.', $sku_current_price),
                    // 'TimeStamp' => Carbon::now()
                ];

                $result[] = $data;
            } else {
                // Handle the case where response is empty or not in the expected format
                // You might want to log or handle this situation differently
                $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
            }
            sleep(.6);
        }

        // Divide the result array into chunks of 1000 elements each
        $chunkedResult = array_chunk($result, 1000);

        // Iterate through each chunk
        foreach ($chunkedResult as $chunk) {
            // Extract SKU numbers from the current chunk
            $skuNumbers = array_column($chunk, 'SKU_Number');

            // Upsert the chunk data into the 'sku' table using Eloquent
            foreach ($chunk as $data) {
                Sku::updateOrCreate(
                    ['SKU_Number' => $data['SKU_Number']],
                    [
                        'SKU_Current_Price' => $data['SKU_Current_Price'],
                        // Add other fields as needed
                    ]
                );
            }
        }

        return response()->json($result, 200);

        // $csvDataArray = $result;
        // if (!empty($csvDataArray)) {
        //     $csvHeaders = array_keys($csvDataArray[0]);


        //     $csvData = implode(',', $csvHeaders) . "\n";

        //     foreach ($csvDataArray as $data) {
        //         $csvData .= '"' . implode('","', $data) . "\"\n";
        //     }
        //     $csvFilePath = public_path('GrabSftp/Price-Update.csv'); // Adjust the file name as needed

        //     // Save the CSV data to the specified file
        //     file_put_contents($csvFilePath, $csvData);

        //     return response()->download($csvFilePath, 'Price-Update.csv');
        //     //  return response()->json($csvDataArray, 200);

        // }
        //             $csvDataArray = $result;
        // if (!empty($csvDataArray)) {
        //     $csvHeaders = array_keys($csvDataArray[0]);

        //     $csvData = implode(',', $csvHeaders) . "\n";

        //     foreach ($csvDataArray as $data) {
        //         $csvData .= '"' . implode('","', $data) . "\"\n";
        //     }

        //     $csvFilePath = public_path('GrabSftp/Price-Update.csv'); // Adjust the file name as needed

        //     // Check if the file exists
        //     if (file_exists($csvFilePath)) {
        //         // If the file exists, delete it
        //         unlink($csvFilePath);
        //     }

        //     // Save the new CSV data to the specified file
        //     file_put_contents($csvFilePath, $csvData);

        //   }
        // return response()->download($csvFilePath, 'Price-Update.csv');
        //    / }

        //   PriceUpdate::dispatch()->onQueue('Price-Update');
        //   response()->json(['message' => 'Queue worker will start in the background']);



    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sftpDataStockUpdate()
    {
        $stores = [114, 102];
        $jda = [];

        foreach ($stores as $storeId) {
            // Fetch data from the database for the current store
            $data = DB::connection(env('DB2_CONNECTION'))
                ->table('MM770SSL.INVBAL')
                ->select('ISTORE', 'INUMBR', 'IBHAND')
                ->where('ISTORE', $storeId)
                ->get();

            // Fetch SKU data
            $skuData = DB::table('sku')
                ->select('SKU_number', 'SKU_Current_Price', 'grab_pack')
                ->get();

            // Create a mapping of SKU numbers to prices for quick lookup
            $skuPriceMap = $skuData->pluck('SKU_Current_Price', 'SKU_number')->toArray();
            $skuGrabPack = $skuData->pluck('grab_pack', 'SKU_number')->toArray();

            // Add the SKU price to each element in $data if it exists
            foreach ($data as $item) {
                $item->SKU_Current_Price = $skuPriceMap[$item->inumbr] ?? null;
                $item->grab_pack = $skuGrabPack[$item->inumbr] ?? 1; // default to 1 if grab_pack is not available
                $item->grab_stock = max(0, floor($item->ibhand / $item->grab_pack));
                $item->grab_price = max(0, ceil(floatval($item->SKU_Current_Price) * $item->grab_pack));

                // Only add the item to $jda if SKU_Current_Price is not null
                if ($item->SKU_Current_Price !== null) {
                    $jda[] = $item;
                }
            }
        }

        // Initialize an empty array to store grouped items
        $groupedJda = [];

        // Group items in $jda by 'istore'
        foreach ($jda as $item) {
            $istore = $item->istore;

            // If the 'istore' key doesn't exist in $groupedJda, create an empty array for it
            if (!isset($groupedJda[$istore])) {
                $groupedJda[$istore] = [];
            }

            // Add the item to the grouped array
            $groupedJda[$istore][] = $item;
        }

        // Now $groupedJda contains items grouped by 'istore'

        // Return the grouped array as a response
        return response($groupedJda);

        // 'istore' => 'string',
        // 'inumbr' => 'string',
        // 'ibhand' => 'string',
        // 'price' => 'string',
        // 'pack_per_piece' => 'string',
        // 'vendor_stocks' => 'string',
        // 'price_per_pack' => 'string',



    }
    public function sftpSkuListUpdate()
    {
        //! --note this two Stores Resulted in 6,990 Unique SKU_Number
        // $store = 600; //IHA
        $store = 114; //EPC

        $skuList = DB::connection(env('DB2_CONNECTION'))
            ->table('MM770SSL.INVBAL')
            ->select('INUMBR')
            ->where('ISTORE', '=', $store)
            ->get()
            ->toArray(); // Convert the collection to an array

        $values = [];

        // Accessing the 'INUMBR' values in the result array
        foreach ($skuList as $item) {
            $values[] = ['SKU_Number' => $item->inumbr]; // Building the array for insertion
        }

        // Inserting the prepared array data into the 'sku' table
        DB::table('sku')->insertOrIgnore($values);

        $cc = count($values);

        return response()->json([
            // 'message' => 'SKU List Update Successful'
            $cc,
            $values
        ]);
    }
}
