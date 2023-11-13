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


Route::get('/ssd/sftp/price-update', 'App\Http\Controllers\DataManagementContoller@sftpDataPriceUpdate');
Route::get('/ssd/sftp/stock-update', 'App\Http\Controllers\DataManagementContoller@sftpDataStockUpdate');

Route::get('/ssd/sftp/sku-master-update', 'App\Http\Controllers\DataManagementContoller@sftpSkuListUpdate');
