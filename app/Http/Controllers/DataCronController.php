<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sku;
use Illuminate\Support\Facades\DB;

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
        $sku_numbers = implode(',', $skus);

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
                <sku_number>' . $sku_numbers . '</sku_number>
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
            ];
            $result[] = $data;
        } else {
            $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
        }

        // return response($result);
    }
    public function dataPriceUpdate()

    {
        $result = [];

        // $skus = DB::table('sku')->take(10)->pluck('SKU_number');
        $skus = Sku::pluck('SKU_number');
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
                ];
                $result[] = $data;
            } else {
                $result[] = ['SKU_Number' => null, 'SKU_Current_Price' => null];
            }
        }

        $resultChunks = array_chunk($result, 1000);

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
