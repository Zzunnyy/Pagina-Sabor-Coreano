<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\ProductsImport;
use App\Models\InventoryMovement;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

/*Metodo import recibe el excel y lo envia productsImport*/

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Product::with(['category', 'images'])->where('es_activo', true)->get();
        return response()->json($productos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Actualiza stock y/o precio de un producto (panel de administración).
     * Registra el cambio de stock en inventory_movements.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'stock' => ['sometimes', 'integer', 'min:0'],
            'precio' => ['sometimes', 'numeric', 'min:0'],
        ]);

        if (empty($data)) {
            return response()->json(['message' => 'Nada que actualizar.'], 422);
        }

        DB::transaction(function () use ($request, $product, $data) {
            $stockAnterior = $product->stock;

            $product->fill($data);
            $product->save();

            if (array_key_exists('stock', $data) && $data['stock'] !== $stockAnterior) {
                InventoryMovement::create([
                    'product_id' => $product->id,
                    'tipo_mov' => 'ajuste_manual',
                    'cant_mov' => $data['stock'] - $stockAnterior,
                    'stock_after' => $data['stock'],
                    'created_by' => $request->user()->id,
                ]);
            }
        });

        return response()->json($product->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Importa productos desde un Excel (panel de administración).
     * Crea categorías/productos nuevos y actualiza precio/descripción
     * de los productos que ya existan (match por nombre + categoría).
     */
    public function import(Request $request)
    {
        $request->validate([
            'excel' => ['required', 'file', 'mimes:xlsx,xls,csv'],
        ]);

        $import = new ProductsImport();

        Excel::import($import, $request->file('excel'));

        return response()->json([
            'creados' => $import->creados,
            'actualizados' => $import->actualizados,
            'omitidos' => $import->omitidos,
            'total_creados' => count($import->creados),
            'total_actualizados' => count($import->actualizados),
            'total_omitidos' => count($import->omitidos),
        ]);
    }
}
