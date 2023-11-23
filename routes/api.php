<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/ssd/sftp/price-job-update', 'App\Http\Controllers\DataCronController@dataPriceUpdate');
Route::get('/ssd/sftp/sku-master-update', 'App\Http\Controllers\DataManagementContoller@sftpSkuListUpdate');
Route::get('/ssd/sftp/stock-update', 'App\Http\Controllers\GrabController@grabStockUpdate');
Route::get('/ssd/sftp/grab-cron-update', 'App\Http\Controllers\GrabController@sftpCronCsvUpdater');
Route::get('/ssd/sftp/grab-store-search', 'App\Http\Controllers\GrabController@index');
