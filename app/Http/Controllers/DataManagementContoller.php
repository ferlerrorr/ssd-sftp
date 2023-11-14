<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Env;
use App\Jobs\PriceUpdate;
use Illuminate\Support\Facades\Artisan;

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
        //  $skus = [ "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044",
        //   "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050",
        //   "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055",
        //   "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032",
        //   "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039",
        //   "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050",
        //   "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060",
        //    "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033",
        //    "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044",
        //    "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051",
        //    "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029",
        //     "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034",
        //     "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045",
        //      "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055",
        //      "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032",
        //      "10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039",
        //      "10044", "10045", "10050", "10051", "10055", "10060", "10029", "10032", "10033", "10034", "10039", "10044", "10045", "10050",
        //      "10051", "10055", "10060","10033", "10034", "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10061", "10062",
        //      "10064", "10066", "10067", "10068", "10069", "10070", "10071", "10074", "10075", "10076", "10077", "10078", "10088", "10089",
        //       "10090", "10115", "10116", "10131", "10137", "10146", "10170", "10171", "10176", "10186", "10200", "10203", "10204", "10215",
        //       "10219", "10221", "10222", "10223", "10226", "10227", "10229", "10230", "10251", "10252", "10253", "10277", "10282", "10285",
        //       "10292", "10293", "10295", "10304", "10305", "10309", "10317", "10320", "10321", "10327", "10330", "10331", "10333", "10334",
        //        "10335", "10339", "10340", "10341", "10353", "10354", "10373", "10377", "10379", "10384", "10385", "10391", "10394", "10400",
        //         "10402", "10403", "10404", "10409", "10410", "10411", "10414", "10415", "10421", "10422", "10425", "10427"];
        $skus = ["39", "933", "10014", "10015", "10028", "10029", "10032", "10033", "10034",
        "10039", "10044", "10045", "10050", "10051", "10055", "10060", "10061", "10062", "10064",
         "10066", "10067", "10068", "10069", "10070", "10071", "10074", "10075", "10076", "10077",
         "10078", "10088", "10089", "10090", "10115", "10116", "10131", "10137", "10146", "10170", "10171",
          "10176", "10186", "10200", "10203", "10204", "10215", "10219", "10221", "10222", "10223", "10226", "10227",
           "10229", "10230", "10251", "10252", "10253", "10277", "10282", "10285", "10292", "10293", "10295", "10304",
            "10305", "10309", "10317", "10320", "10321", "10327", "10330", "10331", "10333", "10334", "10335", "10339", "10340",
            "10341", "10353", "10354", "10373", "10377", "10379", "10384", "10385", "10391", "10394", "10400", "10402", "10403",
            "10404", "10409", "10410", "10411", "10414", "10415", "10421", "10422", "10425", "10427"];
        // $skus = [
        // "39",
        //  "933",
        //  "10014",
        //  "10015",
        //  "10028",
        //  "10029",
        //  "10032",
        //  "10033",
        //  "10034",
        //  "10039",
        //  "10044",
        //  "10045",
        //  "10050",
        //  "10051",
        //  "10055",
        //  "10060",
        //  "10061",
        //  "10062",
        //  "10064",
        //  "10066",
        // "39",
        //  "933",
        //  "10014",
        //  "10015",
        //  "10028",
        //  "10029",
        //  "10032",
        //  "10033",
        //  "10034",
        //  "10039",
        //  "10044",
        //  "10045",
        //  "10050",
        //  "10051",
        //  "10055",
        //  "10060",
        //  "10061",
        //  "10062",
        //  "10064",
        //  "10066",
        //   "10045",
        //  "10050",
        //  "10051",
        //  "10055",
        //  "10060",
        //  "10061",
        //  "10062",
        //  "10064",
        //  "10066"];

        $storeid = "114";
        $result = [];
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
                    'SKU_Current_Price' => $sku_current_price,
                    'TimeStamp' => Carbon::now()
                ];

                $result[] = $data;
            } else {
                // Handle the case where response is empty or not in the expected format
                // You might want to log or handle this situation differently
                $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
            }

            sleep(.6);


            }
            $csvDataArray = $result;
            if (!empty($csvDataArray)) {
                $csvHeaders = array_keys($csvDataArray[0]);


                $csvData = implode(',', $csvHeaders) . "\n";

                foreach ($csvDataArray as $data) {
                    $csvData .= '"' . implode('","', $data) . "\"\n";
                }
                $csvFilePath = public_path('GrabSftp/Price-Update.csv'); // Adjust the file name as needed

                // Save the CSV data to the specified file
                file_put_contents($csvFilePath, $csvData);

                return response()->download($csvFilePath, 'Price-Update.csv');
                //  return response()->json($csvDataArray, 200);

            }

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
        // $store = 114;

        // $data = DB::connection(env('DB2_CONNECTION'))
        //     ->table('MM770SSL.INVBAL')
        //     ->select('ISTORE', 'INUMBR', 'IBHAND')
        //     ->where('ISTORE', '=', $store)
        //     ->where('IBHAND', '>', 0)
        //     ->get();

        // Pull the new data from JDA that has IB
        // $newArr = [
        //     [
        //         "istore" => "114",
        //         "inumbr" => "13025",
        //         "ibhand" => "37.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "13024",
        //         "ibhand" => "245.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "35069",
        //         "ibhand" => "1.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "73128",
        //         "ibhand" => "45.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "69270",
        //         "ibhand" => "7.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "6927099",
        //         "ibhand" => "8.00",
        //     ]
        // ];


        // //first step is to query by storeId
        // $oldArr = [
        //     [
        //         "istore" => "114",
        //         "inumbr" => "13025",
        //         "ibhand" => "37.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "13024",
        //         "ibhand" => "245.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "35069",
        //         "ibhand" => "1.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "73128",
        //         "ibhand" => "45.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "69270",
        //         "ibhand" => "7.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "690929",
        //         "ibhand" => "7.00",
        //     ],
        //     [
        //         "istore" => "114",
        //         "inumbr" => "121212",
        //         "ibhand" => "7.00",
        //     ],
        // ];

        // //Make the ibhand in the result 0 value
        // foreach ($oldArr as &$item) {
        //     $item["ibhand"] = "0.00";
        // }

        // // Create an associative array for look-up
        // $oldArrAssoc = [];
        // foreach ($oldArr as &$item) {
        //     $oldArrAssoc[$item['inumbr']] = &$item;
        // }

        // // Iterate through newArr
        // foreach ($newArr as $newItem) {
        //     $inumbr = $newItem['inumbr'];
        //     if (isset($oldArrAssoc[$inumbr])) {
        //         // If inumbr exists in oldArr, replace ibhand value
        //         $oldArrAssoc[$inumbr]['ibhand'] = $newItem['ibhand'];
        //     } else {
        //         // If inumbr does not exist in oldArr, push data to oldArr
        //         $oldArr[] = $newItem;
        //     }
        // }


        //Make an Upsert to DB


        // $data = $oldArr;

    //    $cc = count($data);
    //     return response()->json([
    //         $cc,
    //         $data

    //     ]);

        // return response ($skuList);
        return response()->json([
            'message' => ' Price Update Successful'
        ]);
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
