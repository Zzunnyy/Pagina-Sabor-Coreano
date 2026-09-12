<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PanelAdministracion;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/productos', [ProductController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        // Métricas / Resumen del negocio
        Route::get('/dashboard', [PanelAdministracion::class, 'dashboard']);

        // Gestión de pedidos (cocina y despacho)
        Route::get('/pedidos', [PanelAdministracion::class, 'pedidos']);
        Route::patch('/pedidos/{order}/estado', [PanelAdministracion::class, 'cambiarEstadoPedido']);

        // Gestión de productos
        Route::post('/productos', [PanelAdministracion::class, 'crearProducto']);
        Route::patch('/productos/{product}', [ProductController::class, 'update']);
        Route::delete('/productos/{product}', [PanelAdministracion::class, 'eliminarProducto']);
    });
});
