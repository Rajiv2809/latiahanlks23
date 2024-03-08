<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Tenant;
use App\Models\pendapatanTenant;
use App\Http\Middleware\OnlyAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StokController;
use App\Http\Controllers\TenantController;
use App\Http\Middleware\AuthenticateToken;
use App\Http\Controllers\PenjualanController;
use App\Http\Controllers\PendapatanController;
use App\Models\Penjualan;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(AuthenticateToken::class)->prefix('v1')->group(function (){


    Route::get('/pendapatantenant/kwitansi/{id}', [PendapatanController::class, 'kwitansiPDF']);
    Route::get('/penjualan/struk/{id}', [PendapatanController::class, 'struk']);
    

    Route::get('/me', [AuthController::class,'user'])->name('');

    //stok
    Route::get('/stok',[StokController::class, 'alldata']);
    Route::get('/stok/{id}', [StokController::class,'getData']);
    Route::post('/stok', [stokController::class,'addData']);

    //penjualan
    Route::get('/penjualan', [PenjualanController::class,'allData']);
    Route::post('/penjualan', [PenjualanController::class,'addData']);
    Route::get('/penjualan/{id}', [PenjualanController::class,'getdata']);

    //Pendapatan
    Route::post('/pendapatan', [ PendapatanController::class,'addData']);
    Route::get('/pendapatan', [PendapatanController::class,'allData']);
    Route::get('pendapatan/{id}', [PendapatanController::class,'getData']);

    //tenant
    Route::get('/tenant', [TenantController::class,'allData']);
    Route::get('/tenant/{id}', [ TenantController::class,'getData']);

    Route::middleware(OnlyAdmin::class)->group(function (){
        //stok
        Route::delete('/stok/{id}',[StokController::class,'deleteData']);
        Route::post('/stok/{id}',[StokController::class,'updateData']);

        //penjualan
        Route::post('penjualan/{id}', [ PenjualanController::class, 'updateData']);
        Route::delete('/penjualan/{id}',[PenjualanController::class,'deleteData']);

        //penjualan 
        Route::post('/pendapatan/{id}', [PendapatanController::class,'updateData']);
        Route::delete('/pendapatan/{id}', [ PendapatanController::class,'deleteData']);

        //tenant
        Route::post('/tenant',[TenantController::class,'addData']);
        Route::delete('/tenant/{id}', [TenantController::class,'deleteData']);
        Route::post('/tenant/{id}', [TenantController::class,'updateData']);
        
    });




});



Route::group(['prefix'=> 'v1'], function () {
    Route::group(['prefix'=> 'auth'],function (){
        Route::post('/login', [AuthController::class, 'login']);
        Route::get('/logout', [AuthController::class,'logout'])->middleware(AuthenticateToken::class);
    });

});