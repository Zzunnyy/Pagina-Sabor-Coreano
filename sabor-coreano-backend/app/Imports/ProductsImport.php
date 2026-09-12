<?php

namespace App\Imports;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Throwable;

/*crea o actualiza productos y genera sku correlativos*/

class ProductsImport implements ToCollection, WithHeadingRow
{
    /** Resumen de lo que se hizo, para devolvérselo al usuario. */
    public array $creados = [];
    public array $actualizados = [];
    public array $omitidos = [];

    private int $siguienteNumeroSku;

    public function __construct()
    {
        $this->siguienteNumeroSku = $this->calcularSiguienteNumeroSku();
    }

    /**
     * Maatwebsite llama a este método una sola vez, con TODAS las filas
     * del Excel ya convertidas a un array (gracias a WithHeadingRow, cada
     * fila viene con claves como 'producto', 'categoria', 'precio_de_venta',
     * 'descripcion', 'stock', 'sku', 'costo_compra').
     */
    public function collection(Collection $filas): void
    {
        foreach ($filas as $numeroFila => $fila) {
            $nombre = trim((string) ($fila['producto'] ?? ''));
            $categoriaNombre = trim((string) ($fila['categoria'] ?? ''));

            if ($nombre === '' || $categoriaNombre === '') {
                continue;
            }

            $precio = $this->limpiarMoneda($fila['precio_de_venta'] ?? null) ?? 0.0;
            $costoCompra = $this->limpiarMoneda($fila['costo_compra'] ?? null);
            $descripcion = trim((string) ($fila['descripcion'] ?? '')) ?: null;
            $skuExcel = trim((string) ($fila['sku'] ?? '')) ?: null;
            $stockExcel = $this->limpiarEntero($fila['stock'] ?? null);
            $imagenExcel = trim((string) ($fila['imagenes'] ?? '')) ?: null;

            try {
                $categoria = Category::firstOrCreate(['nombre' => $categoriaNombre]);

                $producto = Product::where('nombre', $nombre)
                    ->where('category_id', $categoria->id)
                    ->first();

                if ($producto) {
                    $datos = [
                        'precio' => $precio,
                        'descripcion' => $descripcion ?? $producto->descripcion,
                        'costo_compra' => $costoCompra ?? $producto->costo_compra,
                    ];

                    if ($skuExcel !== null) {
                        $datos['sku'] = $skuExcel;
                    }

                    if ($stockExcel !== null) {
                        $datos['stock'] = $stockExcel;
                    }

                    $producto->update($datos);

                    $this->actualizados[] = $producto->nombre;
                } else {
                    $producto = Product::create([
                        'category_id' => $categoria->id,
                        'nombre' => $nombre,
                        'precio' => $precio,
                        'descripcion' => $descripcion,
                        'costo_compra' => $costoCompra,
                        'stock' => $stockExcel ?? 0,
                        'sku' => $skuExcel ?? sprintf('PROD-%04d', $this->siguienteNumeroSku++),
                    ]);

                    $this->creados[] = $producto->nombre;
                }

                if ($imagenExcel !== null) {
                    ProductImage::updateOrCreate(
                        ['product_id' => $producto->id, 'sort' => 0],
                        ['path' => $imagenExcel]
                    );
                }
            } catch (Throwable $e) {
                $this->omitidos[] = [
                    'fila' => $numeroFila + 2, // +2: la fila 1 es el header y el índice arranca en 0
                    'producto' => $nombre,
                    'motivo' => $e->getMessage(),
                ];
            }
        }
    }

    /**
     * Convierte " $ 3,000 " en 3000.0. Devuelve null si viene vacío.
     */
    private function limpiarMoneda(?string $valor): ?float
    {
        if ($valor === null || trim((string) $valor) === '') {
            return null;
        }

        $limpio = preg_replace('/[^0-9.]/', '', str_replace(',', '', $valor));

        return $limpio === '' ? null : (float) $limpio;
    }

    /**
     * Convierte el valor de Stock a entero. Devuelve null si viene vacío,
     * para no pisar el stock existente de un producto ya cargado.
     */
    private function limpiarEntero(mixed $valor): ?int
    {
        if ($valor === null || trim((string) $valor) === '') {
            return null;
        }

        return (int) preg_replace('/[^0-9-]/', '', (string) $valor);
    }

    /**
     * Busca el último SKU con formato PROD-XXXX ya usado en la tabla,
     * para no pisar SKUs si el import se corre más de una vez.
     */
    private function calcularSiguienteNumeroSku(): int
    {
        $ultimoSku = Product::where('sku', 'like', 'PROD-%')
            ->orderByRaw('CAST(SUBSTRING(sku, 6) AS UNSIGNED) DESC')
            ->value('sku');

        if (! $ultimoSku) {
            return 1;
        }

        return (int) substr($ultimoSku, 5) + 1;
    }
}
