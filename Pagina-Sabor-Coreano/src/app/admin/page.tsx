"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CollageSticker from "@/components/CollageSticker";

interface DashboardData {
  total_ventas: number;
  pedidos_pendientes: number;
  total_productos: number;
  productos_bajo_stock: Array<{ id: number; nombre: string; stock: number }>;
  total_clientes: number;
}

interface OrderItem {
  id: number;
  n_orden: string;
  status: string;
  total: number;
  created_at: string;
  user?: {
    name: string;
    email: string;
    telefono?: string;
  };
}

const MOCK_DASHBOARD: DashboardData = {
  total_ventas: 184500,
  pedidos_pendientes: 3,
  total_productos: 12,
  productos_bajo_stock: [
    { id: 1, nombre: "Tteokbokki Especial", stock: 2 },
    { id: 2, nombre: "Soju Uva Verde", stock: 4 },
  ],
  total_clientes: 28,
};

const MOCK_ORDERS: OrderItem[] = [
  {
    id: 101,
    n_orden: "ORD-2026-001",
    status: "pendiente",
    total: 24990,
    created_at: "Hace 5 minutos",
    user: { name: "Camila Soto", email: "camila@example.com", telefono: "+56 9 8765 4321" },
  },
  {
    id: 102,
    n_orden: "ORD-2026-002",
    status: "preparando",
    total: 38500,
    created_at: "Hace 15 minutos",
    user: { name: "Benjamín Silva", email: "benja@example.com", telefono: "+56 9 1234 5678" },
  },
  {
    id: 103,
    n_orden: "ORD-2026-003",
    status: "en_camino",
    total: 15990,
    created_at: "Hace 40 minutos",
    user: { name: "Matías Rojas", email: "matias@example.com", telefono: "+56 9 9988 7766" },
  },
];

export default function AdminPage() {
  const [apiUrl, setApiUrl] = useState("http://localhost/api");
  const [authToken, setAuthToken] = useState("");
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState<DashboardData>(MOCK_DASHBOARD);
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"pedidos" | "nuevo_producto" | "metricas">("metricas");

  // Formulario nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    category_id: "1",
    stock: "20",
    sku: "",
    descripcion: "",
  });

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  // 1. Probar y consumir el endpoint de Dashboard
  const fetchDashboard = async () => {
    setLoading(true);
    addLog(`Enviando GET ${apiUrl}/admin/dashboard ...`);
    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`${apiUrl}/admin/dashboard`, {
        method: "GET",
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        setDashboard(data);
        setIsConnected(true);
        addLog(`✅ Respuesta 200 OK del Backend: ${JSON.stringify(data)}`);
      } else {
        setIsConnected(false);
        addLog(`⚠️ El backend respondió con código: ${res.status} (${res.statusText}). Mostrando datos locales.`);
      }
    } catch (err: unknown) {
      setIsConnected(false);
      const errMsg = err instanceof Error ? err.message : String(err);
      addLog(`❌ Error de conexión al backend (${errMsg}). Mostrando datos de prueba locales.`);
    } finally {
      setLoading(false);
    }
  };

  // 2. Probar y consumir el endpoint de Pedidos
  const fetchOrders = async () => {
    setLoading(true);
    addLog(`Enviando GET ${apiUrl}/admin/pedidos ...`);
    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`${apiUrl}/admin/pedidos`, {
        method: "GET",
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        addLog(`✅ Pedidos cargados desde el backend: ${data.length} ordenes`);
      } else {
        addLog(`⚠️ No se pudieron cargar pedidos reales (${res.status}). Usando lista de prueba.`);
      }
    } catch {
      addLog(`❌ Backend no disponible para pedidos. Usando lista de prueba.`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Cambiar estado de un pedido (PATCH /api/admin/pedidos/{id}/estado)
  const handleCambiarEstado = async (orderId: number, nuevoEstado: string) => {
    addLog(`Enviando PATCH ${apiUrl}/admin/pedidos/${orderId}/estado -> status: "${nuevoEstado}"`);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`${apiUrl}/admin/pedidos/${orderId}/estado`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: nuevoEstado }),
      });

      if (res.ok) {
        const data = await res.json();
        addLog(`✅ Estado actualizado en el backend: ${JSON.stringify(data.message)}`);
      } else {
        addLog(`⚠️ Backend respondió ${res.status}. Actualizando visualmente en la interfaz.`);
      }
    } catch {
      addLog(`ℹ️ Backend offline. Actualizando estado localmente.`);
    }

    // Actualizar estado local para feedback instantáneo
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nuevoEstado } : o))
    );
  };

  // 4. Crear nuevo producto (POST /api/admin/productos)
  const handleCrearProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    addLog(`Enviando POST ${apiUrl}/admin/productos con: "${nuevoProducto.nombre}"`);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

      const res = await fetch(`${apiUrl}/admin/productos`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...nuevoProducto,
          precio: parseFloat(nuevoProducto.precio),
          stock: parseInt(nuevoProducto.stock, 10),
          category_id: parseInt(nuevoProducto.category_id, 10),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        addLog(`🎉 ¡Producto creado en la Base de Datos con ID ${data.producto?.id}!`);
        alert("¡Producto creado con éxito en el backend!");
      } else {
        addLog(`⚠️ Backend respondió ${res.status}. Valida que el SKU sea único.`);
        alert(`Respuesta del backend: ${res.status} (${res.statusText})`);
      }
    } catch {
      addLog(`❌ Sin conexión al backend para guardar en BD.`);
      alert("No se pudo contactar al backend. Asegúrate de que el servidor esté activo.");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-collage-cream text-collage-ink p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header con estilo Sticker Coreano */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-[3px] border-collage-ink">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-2}>
                관리자 패널 · Panel Admin
              </CollageSticker>
              {isConnected === true ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 border-2 border-green-600 rounded-full text-xs font-bold font-display">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Backend Conectado
                </span>
              ) : isConnected === false ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 border-2 border-amber-600 rounded-full text-xs font-bold font-display">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Modo Vista Previa (Backend Offline)
                </span>
              ) : null}
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-collage-ink">
              Panel de Administración
            </h1>
            <p className="font-script text-xl md:text-2xl text-collage-indigo">
              Prueba en vivo de los endpoints del backend Laravel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/productos"
              className="px-4 py-2 bg-white text-collage-ink font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:bg-slate-50 transition-all"
            >
              ← Ir a la Tienda
            </Link>
            <button
              onClick={fetchDashboard}
              disabled={loading}
              className="px-5 py-2.5 bg-collage-lime hover:bg-collage-orange hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] flex items-center gap-2"
            >
              {loading ? "Cargando..." : "🔄 Probar Endpoint Ahora"}
            </button>
          </div>
        </div>

        {/* Barra de configuración de conexión rápida */}
        <div className="bg-white p-4 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <label className="block font-display font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600">
                URL del Backend API
              </label>
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="http://localhost/api o http://localhost:8000/api"
                className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-mono text-xs bg-slate-50"
              />
            </div>
            <div>
              <label className="block font-display font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600">
                Token Sanctum (Opcional si usas login)
              </label>
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Pega aquí el token si está protegido..."
                className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-mono text-xs bg-slate-50"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={() => {
                  fetchDashboard();
                  fetchOrders();
                }}
                className="w-full py-2.5 bg-collage-indigo text-white font-display font-semibold rounded-lg border-2 border-collage-ink shadow-[2px_2px_0_0_var(--color-collage-ink)] hover:bg-collage-pink transition-all text-xs"
              >
                Probar Petición HTTP
              </button>
            </div>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex gap-3 border-b-2 border-collage-ink pb-2">
          <button
            onClick={() => setActiveTab("metricas")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "metricas"
                ? "bg-collage-indigo text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            📊 Métricas (GET /dashboard)
          </button>
          <button
            onClick={() => {
              setActiveTab("pedidos");
              fetchOrders();
            }}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "pedidos"
                ? "bg-collage-orange text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            📦 Pedidos (GET y PATCH /pedidos)
          </button>
          <button
            onClick={() => setActiveTab("nuevo_producto")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "nuevo_producto"
                ? "bg-collage-lime text-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            ➕ Crear Producto (POST /productos)
          </button>
        </div>

        {/* 1. SECCIÓN MÉTRICAS DASHBOARD */}
        {activeTab === "metricas" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tarjeta 1: Ventas */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] relative overflow-hidden">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-display font-semibold text-xs uppercase text-slate-500">
                  Total Ventas
                </h3>
                <p className="font-display font-bold text-2xl md:text-3xl text-collage-ink mt-1">
                  ${dashboard.total_ventas.toLocaleString("es-CL")}
                </p>
                <div className="text-[11px] text-slate-500 font-script mt-2">
                  calculado desde la tabla orders
                </div>
              </div>

              {/* Tarjeta 2: Pedidos Pendientes */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                <div className="text-3xl mb-2">⏳</div>
                <h3 className="font-display font-semibold text-xs uppercase text-slate-500">
                  Pedidos Pendientes
                </h3>
                <p className="font-display font-bold text-2xl md:text-3xl text-collage-orange mt-1">
                  {dashboard.pedidos_pendientes}
                </p>
                <div className="text-[11px] text-slate-500 font-script mt-2">
                  órdenes esperando en cocina
                </div>
              </div>

              {/* Tarjeta 3: Total Productos */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                <div className="text-3xl mb-2">🍜</div>
                <h3 className="font-display font-semibold text-xs uppercase text-slate-500">
                  Platillos en Carta
                </h3>
                <p className="font-display font-bold text-2xl md:text-3xl text-collage-indigo mt-1">
                  {dashboard.total_productos}
                </p>
                <div className="text-[11px] text-slate-500 font-script mt-2">
                  menú activo de sabor coreano
                </div>
              </div>

              {/* Tarjeta 4: Clientes */}
              <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-display font-semibold text-xs uppercase text-slate-500">
                  Clientes Registrados
                </h3>
                <p className="font-display font-bold text-2xl md:text-3xl text-collage-pink mt-1">
                  {dashboard.total_clientes}
                </p>
                <div className="text-[11px] text-slate-500 font-script mt-2">
                  usuarios con rol &quot;cliente&quot;
                </div>
              </div>
            </div>

            {/* Alerta de Stock Bajo */}
            {dashboard.productos_bajo_stock && dashboard.productos_bajo_stock.length > 0 && (
              <div className="bg-amber-50 p-4 rounded-2xl border-[3px] border-amber-500 shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                <h4 className="font-display font-bold text-amber-900 flex items-center gap-2 mb-2">
                  ⚠️ Alerta de Stock Bajo (&lt; 5 unidades)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dashboard.productos_bajo_stock.map((p) => (
                    <span
                      key={p.id}
                      className="px-3 py-1 bg-white rounded-lg border-2 border-amber-400 font-semibold text-xs text-amber-900"
                    >
                      {p.nombre}: <b className="text-red-600">{p.stock} unids</b>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. SECCIÓN PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-collage-ink">
                Gestión de Pedidos en Vivo
              </h3>
              <button
                onClick={fetchOrders}
                className="text-xs font-display font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-collage-ink rounded-lg"
              >
                Refrescar lista
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-collage-ink text-xs uppercase font-display text-slate-600">
                    <th className="py-3 px-2">N° Orden</th>
                    <th className="py-3 px-2">Cliente</th>
                    <th className="py-3 px-2">Teléfono</th>
                    <th className="py-3 px-2">Total</th>
                    <th className="py-3 px-2">Estado</th>
                    <th className="py-3 px-2 text-right">Acción (PATCH)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 px-2 font-mono font-bold">{o.n_orden}</td>
                      <td className="py-3 px-2 font-semibold">{o.user?.name || "Cliente Anónimo"}</td>
                      <td className="py-3 px-2 text-slate-600">{o.user?.telefono || "Sin teléfono"}</td>
                      <td className="py-3 px-2 font-bold">${o.total.toLocaleString("es-CL")}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold font-display uppercase ${
                            o.status === "pendiente"
                              ? "bg-amber-100 text-amber-800 border border-amber-400"
                              : o.status === "preparando"
                              ? "bg-blue-100 text-blue-800 border border-blue-400"
                              : o.status === "en_camino"
                              ? "bg-purple-100 text-purple-800 border border-purple-400"
                              : "bg-green-100 text-green-800 border border-green-400"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right space-x-1">
                        <button
                          onClick={() => handleCambiarEstado(o.id, "preparando")}
                          className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded border border-blue-300"
                        >
                          Cocina
                        </button>
                        <button
                          onClick={() => handleCambiarEstado(o.id, "en_camino")}
                          className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded border border-purple-300"
                        >
                          Despachar
                        </button>
                        <button
                          onClick={() => handleCambiarEstado(o.id, "entregado")}
                          className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold rounded border border-green-300"
                        >
                          Entregado
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. SECCIÓN CREAR PRODUCTO */}
        {activeTab === "nuevo_producto" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] max-w-2xl">
            <h3 className="font-display font-bold text-xl text-collage-ink mb-1">
              Agregar Nuevo Platillo al Menú
            </h3>
            <p className="text-sm text-slate-500 mb-6 font-script text-lg">
              Prueba el endpoint POST /api/admin/productos
            </p>

            <form onSubmit={handleCrearProducto} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">
                    Nombre del Platillo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Kimchi Jjigae"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">
                    SKU (Código único)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: KMJ-009"
                    value={nuevoProducto.sku}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, sku: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">
                    Precio ($ CLP)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ej: 8990"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">
                    Stock Inicial
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ej: 30"
                    value={nuevoProducto.stock}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">
                    Categoría ID
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="ID: 1"
                    value={nuevoProducto.category_id}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, category_id: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe los ingredientes y nivel de picante..."
                  value={nuevoProducto.descripcion}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-collage-lime hover:bg-collage-orange hover:text-white text-collage-ink font-display font-bold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all"
              >
                🚀 Guardar en la Base de Datos (POST)
              </button>
            </form>
          </div>
        )}

        {/* Consola de Logs en Vivo */}
        <div className="bg-collage-ink text-green-400 p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] font-mono text-xs">
          <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
            <span className="font-display text-white text-sm font-semibold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-ping"></span>
              Consola de Peticiones HTTP (Endpoints Tester)
            </span>
            <button
              onClick={() => setLogs([])}
              className="text-white/60 hover:text-white text-[11px]"
            >
              Limpiar Logs
            </button>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-white/40 italic">
                Presiona cualquier botón de arriba para ver las peticiones a la API en tiempo real...
              </p>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed break-all">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
