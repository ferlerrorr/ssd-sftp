<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sku;
use App\Models\StoreMaintenance;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use App\Models\Invbal;
use Illuminate\Http\Client\RequestException;

class DataCronController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = [];
        $skus = DB::table('sku')->take(1)->pluck('SKU_number')->toArray();
        $storeid = "114";

        // Convert the array of SKU numbers to a comma-separated string
        // $sku_numbers = implode(',', $skus);

        $url = 'http://10.60.15.236/JDA_Connect_SFY/JDA_ConnectService.asmx';
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
                <sku_number>' . 31053 . '</sku_number>
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

        //To Analyze Response
        var_dump($response);

        curl_close($ch);

        $xml = simplexml_load_string($response);

        $sku_details = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;

        if ($sku_details) {
            $decodedData = json_decode($sku_details, true);

            $sku_number = isset($decodedData['SKU_Number']) ? $decodedData['SKU_Number'] : null;
            $sku_current_price = isset($decodedData['SKU_Current_Price']) ? $decodedData['SKU_Current_Price'] : null;

            $data = [
                'SKU_Number' => $sku_number,
                'SKU_Current_Price' => str_replace(',', '', $sku_current_price),
            ];
            $result[] = $data;
        } else {
            $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
        }

        return response($result);
    }

    public function dataPriceUpdate()

    {
        ini_set('memory_limit', '10048M');
        $skus = Sku::pluck('SKU_number');
        // $skus = DB::table('sku')->where('SKU_Current_Price', null)->pluck('SKU_number');
        // $skus = DB::table('sku')->take(10)->pluck('SKU_number');
        $result = [];
        $storeid = "31";

        foreach ($skus as $sku) {
            $retryCount = 3;
            $skuDetails = null;

            while ($retryCount > 0) {
                $url = 'http://10.60.15.236/JDA_Connect_SFY/JDA_ConnectService.asmx';
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
                curl_setopt($ch, CURLOPT_TIMEOUT, 120);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
                curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlBody);

                $response = curl_exec($ch);

                // Check if cURL request was successful
                if ($response === false) {
                    // Handle error, you might want to log it
                    echo 'cURL error: ' . curl_error($ch);
                } else {
                    $xml = simplexml_load_string($response);

                    $skuDetails = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;
                    $decodedData = json_decode($skuDetails, true);

                    if ($skuDetails) {
                        // Break the loop if successful response
                        break;
                    }
                }

                // Close cURL handle
                curl_close($ch);
                // Decrement retry count
                $retryCount--;
            }

            if ($skuDetails) {
                $sku_number = isset($decodedData['SKU_Number']) ? $decodedData['SKU_Number'] : null;
                $sku_current_price = isset($decodedData['SKU_Current_Price']) ? $decodedData['SKU_Current_Price'] : null;

                $data = [
                    'SKU_Number' => $sku_number,
                    'SKU_Current_Price' => str_replace(',', '', $sku_current_price),
                ];
                $result[] = $data;
            }
        }

        //-------------------------------------
        $resultChunks = array_chunk($result, 500);

        foreach ($resultChunks as $chunk) {
            foreach ($chunk as $data) {
                Sku::where('SKU_Number', $data['SKU_Number'])
                    ->update([
                        'SKU_Current_Price' => $data['SKU_Current_Price']
                    ]);
            }
        }

        $dd = count($result);

        $resp = [$dd, $result];

        return response()->json($resp, 200);
    }

    public function dvRepInvbal()
    {
        ini_set('memory_limit', '10048M');
        // ini_set('max_execution_time', 50000000);


        //!!For Analyze Data
        // $response = Http::withHeaders([
        //     'Authorization' => env('DS_PASSWORD'),
        //     'business_unit_id' => env('DS_UNIT_ID'),
        //     'timeout' => 420 // Timeout set to 7 minutes
        // ])->get(env('DS_URL') . "INVBAL/GetListByStore?skip=0&take=60000&store=600");

        // return response($response->json()['data']);
        //!!For Analyze Data

        $istore = DB::table('store_maintenance')
            ->select('istore')
            ->where('grab', 1)
            ->get()
            ->pluck('istore');
        $skus = Sku::pluck('SKU_Number');

        $filteredData = [];
        $retryLimit = 12; // Number of retries

        foreach ($istore as $storeId) {
            $skip = 0;
            $take = 60000;
            $mergedResult = [];
            $retryCount = 0; // Initialize retry count

            while ($retryCount < $retryLimit) {
                try {
                    $response = Http::withHeaders([
                        'Authorization' => env('DS_PASSWORD'),
                        'business_unit_id' => env('DS_UNIT_ID'),
                        'timeout' => 420 // Timeout set to 7 minutes
                    ])->get(env('DS_URL') . "INVBAL/GetListByStore?skip=$skip&take=$take&store=$storeId");

                    if ($response->successful()) {
                        $responseData = $response->json()['data'];
                        $mergedResult = array_merge($mergedResult, $responseData);
                        break; // Break out of the retry loop if successful
                    }
                } catch (\Exception $e) {
                    // Increment retry count
                    $retryCount++;
                    if ($retryCount >= $retryLimit) {
                        // Handle retry exhaustion (log, throw exception, etc.)
                        // For now, we'll just break out of the loop
                        break;
                    }
                    // Sleep before retrying
                    // sleep(1);
                    continue; // Retry the request
                }
            }

            // If mergedResult is empty, handle accordingly (retry exhausted or no successful response)
            if (empty($mergedResult)) {
                // Handle retry exhaustion or unsuccessful response here
                // For now, we'll just continue to the next iteration
                continue;
            }

            // Iterate through each object in the array
            foreach ($mergedResult as $item) {
                // Create a new object with only the specified properties
                $filteredItem = [
                    "ISTORE" => $item["ISTORE"],
                    "INUMBR" => $item["INUMBR"],
                    "IBHAND" => $item["IBHAND"]
                ];

                // Add the filtered object to the filtered data array
                $filteredData[] = $filteredItem;
            }

            // sleep(0.3); // Optional delay between requests
        }

        // Convert keys to lowercase
        foreach ($filteredData as &$obj) {
            foreach ($obj as $key => $value) {
                $lowercaseKey = strtolower($key);
                if ($lowercaseKey !== $key) {
                    $obj[$lowercaseKey] = $value;
                    unset($obj[$key]);
                }
            }
        }

        $groupedData = [];

        foreach ($filteredData as $item) {
            $groupedData[$item['istore']][] = $item;
        }

        foreach ($groupedData as $groupKey => $group) {
            foreach ($group as $index => $item) {
                // Check if the 'inumbr' value exists in $skus
                if (!$skus->contains($item['inumbr'])) {
                    // If not found, add the object
                    $groupedData[$groupKey][$index]['ibhand'] = 0;
                }
            }
        }

        foreach ($groupedData as $store => $inventoryItems) {
            // Upsert operation for each store
            Invbal::updateOrCreate(
                ['istore' => $store], // Condition for finding existing record
                ['invbal' => $inventoryItems] // Data to be inserted or updated
            );
        }

        return response($groupedData);
    }
}
