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
                    'SKU_Current_Price' => str_replace(',', '', $sku_current_price),
                    // 'TimeStamp' => Carbon::now()
                ];

                $result[] = $data;
            } else {
                // Handle the case where response is empty or not in the expected format
                // You might want to log or handle this situation differently
                $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
            }
        }

        // Divide the result array into chunks of 1000 elements each
        $chunkedResult = array_chunk($result, 1000);

        // Iterate through each chunk
        foreach ($chunkedResult as $chunk) {
            // Extract SKU numbers from the current chunk
            $skuNumbers = array_column($chunk, 'SKU_Number');
            foreach ($chunk as $data) {
                Sku::where('SKU_Number', $data['SKU_Number'])
                    ->update([
                        'SKU_Current_Price' => $data['SKU_Current_Price'],

                    ]);
            }
        }


        $dd = count($result);

        $resp = [$dd, $result];

        return response()->json($resp, 200);
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
