<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Env;

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

        // get the list of SKU and update the Price
        // Limit 1sec per request or Per SKu


        $storeid = "114"; // Replace with your actual store ID
        $sku = "21846"; // Replace with your actual SKU

        // Define the URL of the SOAP web service
        $url = 'http://10.60.15.110/JDA_Connect_SFY/JDA_ConnectService.asmx';

        // Define the SOAP XML body
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
                    <store_number>YOUR_STORE_ID</store_number>
                    <sku_number>YOUR_SKU</sku_number>
                    <pel_ID></pel_ID>
                </SKU_Inquiry>
            </soap:Body>
        </soap:Envelope>';

        // // Replace placeholders in the XML body with actual values
        // $xmlBody = str_replace('YOUR_STORE_ID', $storeid, $xmlBody);
        // $xmlBody = str_replace('YOUR_SKU', $sku, $xmlBody);

        // Create a cURL session
        // $ch = curl_init();

        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlBody);

        // // Execute the cURL session and store the response
        // $response = curl_exec($ch);

        // // Check for cURL errors
        // if (curl_errno($ch)) {
        //     echo 'cURL error: ' . curl_error($ch);
        // }

        // curl_close($ch);

        // // Parse the SOAP response as XML
        // $xml = simplexml_load_string($response);

        // // Extract the content from the SKU_InquiryResult element
        // $result = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;

        // return response($result);


        // $ch = curl_init();

        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlBody);

        // // Execute the cURL session and store the response
        // $response = curl_exec($ch);

        // // Check for cURL errors
        // if (curl_errno($ch)) {
        //     echo 'cURL error: ' . curl_error($ch);
        // }

        // curl_close($ch);


        // // Parse the SOAP response as XML
        // $xml = simplexml_load_string($response);

        // // Extract the content from the SKU_InquiryResult element
        // $result = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;

        // // Convert the result to CSV format
        // $csvData = "Column1,Column2,Column3\n"; // Replace with your column headers

        // // Assuming $result is an array or object that needs to be converted to CSV
        // foreach ($result as $item) {
        //     // Modify the following lines to match the structure of your $result
        //     $csvData .= '"' . $item->Column1 . '","' . $item->Column2 . '","' . $item->Column3 . "\"\n";
        // }

        // // Define the file path to save the CSV file
        // $csvFilePath = public_path('GrabSftp/result.csv'); // Adjust the file name as needed

        // // Save the CSV data to the specified file
        // file_put_contents($csvFilePath, $csvData);

        // // You can also return the CSV file as a response if needed
        // return response()->download($csvFilePath, 'result.csv');


        // Split the SKU numbers into an array if multiple SKUs are processed
        $skuNumbers = explode(',', $sku);

        // Initialize an array to store the CSV data
        $csvDataArray = array();

        foreach ($skuNumbers as $skuNumber) {
            // Replace placeholders in the XML body template with actual values
            // Replace placeholders in the XML body with actual values
            $xmlBody = str_replace('YOUR_STORE_ID', $storeid, $xmlBody);
            $xmlBody = str_replace('YOUR_SKU', $sku, $xmlBody);


            // Create a cURL session
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml; charset=utf-8'));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlBody);

            // Limit the execution time of each request to 1 second
            curl_setopt($ch, CURLOPT_TIMEOUT, 1);

            // Execute the cURL session and store the response
            $response = curl_exec($ch);

            // Check for cURL errors
            if (curl_errno($ch)) {
                echo 'cURL error: ' . curl_error($ch);
            }

            curl_close($ch);

            // Parse the SOAP response as XML
            $xml = simplexml_load_string($response);

            // Extract the content from the SKU_InquiryResult element
            $result = $xml->children('soap', true)->Body->children()->SKU_InquiryResponse->SKU_InquiryResult;

            // Convert the result to an array
            $resultArray = json_decode($result, true);

            // Add the result to the CSV data array
            $csvDataArray[] = $resultArray;
        }

        // Define the CSV column headers (assuming all SKUs have the same structure)
        if (!empty($csvDataArray)) {
            $csvHeaders = array_keys($csvDataArray[0]);

            // Create a CSV string with headers
            $csvData = implode(',', $csvHeaders) . "\n";

            // Append the data to the CSV string
            foreach ($csvDataArray as $data) {
                $csvData .= '"' . implode('","', $data) . "\"\n";
            }

            // Define the file path to save the CSV file
            $csvFilePath = public_path('GrabSftp/result.csv'); // Adjust the file name as needed

            // Save the CSV data to the specified file
            file_put_contents($csvFilePath, $csvData);

            // You can also return the CSV file as a response if needed
            return response()->download($csvFilePath, 'result.csv');
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sftpDataStockUpdate()
    {

        // Get the list of SKU Per Store
        // Map the Participating SKu if Stock is not = Update

        $date = Carbon::now()->subDays(10)->toDateString('Y-m-d');
        $modifiedDate = substr(str_replace("-", "", $date), 2);

        //Delimiter for PO
        // string varDate = DateTime.Now.AddDays(-60).ToString("yyMMdd");

        $data = DB::connection(env('DB2_CONNECTION'))
            ->table('MM770SSL.POMHDR')
            ->select('PONUMB', 'POSTAT', 'PONOT1', 'POVNUM', 'POEDAT')
            ->where('POEDAT', '>=', $modifiedDate)
            ->orderByDesc('PONUMB')
            ->get();


        return response()->json($data);
    }
}
