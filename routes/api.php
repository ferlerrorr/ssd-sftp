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

//!Cron Jobs Endpoints
Route::get('/ssd/sftp/price-job-update', 'App\Http\Controllers\DataCronController@dataPriceUpdate');
Route::get('/ssd/sftp/soap-search', 'App\Http\Controllers\DataCronController@index');

//!Grab Endpoints
Route::get('/ssd/sftp/stock-update', 'App\Http\Controllers\GrabController@grabStockUpdate');
Route::get('/ssd/sftp/grab-cron-update', 'App\Http\Controllers\GrabController@sftpCronCsvUpdater');
Route::get('/ssd/sftp/grab-store-search/{storeId}', 'App\Http\Controllers\GrabController@searchPerStore');
Route::get('/ssd/sftp/all-sku-pack', 'App\Http\Controllers\GrabController@loadSkutoPack');

//!Store Endpoints
//?Grab
Route::post('/ssd/sftp/create-grab-store', 'App\Http\Controllers\StoreDataController@createGrabStore');
