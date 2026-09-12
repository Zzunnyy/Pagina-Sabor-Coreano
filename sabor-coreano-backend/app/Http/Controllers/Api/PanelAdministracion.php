<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class PanelAdministracion extends Controller
{
    /**
     * Métricas principales y resumen para el dashboard de administración.
     */
    public function dashboard()
    {
        return response()->json([
            'total_ventas' => Order::where('status', '!=', 'cancelado')->sum('total'),
            'pedidos_pendientes' => Order::where('status', 'pendiente')->count(),
            'total_productos' => Product::where('es_activo', true)->count(),
            'productos_bajo_stock' => Product::where('stock', '<', 5)->get(),
            'total_clientes' => User::where('rol', 'cliente')->count(),
        ]);
    }

    /**
     * Listado de todos los pedidos recibidos (para cocina / despacho).
     * Permite filtrar por estado (ej: ?status=pendiente).
     */
    public function pedidos(Request $request)
    {
        $query = Order::with(['user:id,name,email,telefono']);

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        $pedidos = $query->latest()->get();

        return response()->json($pedidos);
    }

    /**
     * Actualizar el estado de un pedido (pendiente, preparando, en_camino, entregado, cancelado).
     */
    public function cambiarEstadoPedido(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:pendiente,preparando,en_camino,entregado,cancelado'],
        ]);

        $order->update(['status' => $data['status']]);

        return response()->json([
            'message' => 'Estado del pedido actualizado exitosamente.',
            'pedido' => $order,
        ]);
    }

    /**
     * Crear un nuevo platillo o producto en el menú.
     */
    public function crearProducto(Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'nombre' => ['required', 'string', 'max:255'],
            'precio' => ['required', 'numeric', 'min:0'],
            'descripcion' => ['nullable', 'string'],
            'stock' => ['required', 'integer', 'min:0'],
            'sku' => ['required', 'string', 'unique:products,sku'],
            'costo_compra' => ['nullable', 'numeric', 'min:0'],
        ]);

        $data['es_activo'] = true;

        $producto = Product::create($data);

        return response()->json([
            'message' => 'Producto creado con éxito en el menú.',
            'producto' => $producto,
        ], 201);
    }

    /**
     * Desactivar un producto del menú (sin romper el historial de compras).
     */
    public function eliminarProducto(Product $product)
    {
        $product->update(['es_activo' => false]);

        return response()->json([
            'message' => 'Producto desactivado del menú correctamente.',
        ]);
    }
}
