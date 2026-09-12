<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
/*Se agregó la dependencia maatwebsite/excel*/
Route::post('/login', [AuthController::class, 'login']);

Route::get('/productos', [ProductController::class, 'index']);
Route::get('/categorias', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::patch('/productos/{product}', [ProductController::class, 'update']);
        Route::post('/productos/importar', [ProductController::class, 'import']);
    });
});
