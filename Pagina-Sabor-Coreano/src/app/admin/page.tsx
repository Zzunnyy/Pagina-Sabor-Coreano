"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CollageSticker from "@/components/CollageSticker";
import {
  ApiError,
  adminFetch,
  adminLogout,
  getApiUrl,
  getSession,
  setApiUrl as persistApiUrl,
  verifyAdminSession,
  type AdminUser,
} from "@/lib/adminApi";
import { buildInventoryTemplateCsv, parseInventoryFile, type ImportRow } from "@/lib/inventoryImport";

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

interface Product {
  id: number;
  category_id: number;
  nombre: string;
  precio: string | number;
  descripcion: string | null;
  stock: number;
  sku: string;
  es_activo: boolean;
}

type Tab = "metricas" | "inventario" | "pedidos" | "nuevo_producto" | "importar";

const ORDER_STATUSES: { value: string; label: string }[] = [
  { value: "preparando", label: "Preparando" },
  { value: "en_camino", label: "Despachar" },
  { value: "entregado", label: "Entregado" },
];

interface ImportRowStatus extends ImportRow {
  action: "crear" | "actualizar" | "error";
  error?: string;
  matchedProductId?: number;
}

function computeRowStatus(row: ImportRow, skuMap: Map<string, Product>): ImportRowStatus {
  if (!row.sku) {
    return { ...row, action: "error", error: "Falta el SKU." };
  }

  const existing = skuMap.get(row.sku.toLowerCase());

  if (existing) {
    if (row.precio === null && row.stock === null) {
      return { ...row, action: "error", error: "No trae precio ni stock para actualizar." };
    }
    if (row.precio !== null && row.precio < 0) {
      return { ...row, action: "error", error: "Precio inválido." };
    }
    if (row.stock !== null && row.stock < 0) {
      return { ...row, action: "error", error: "Stock inválido." };
    }
    return { ...row, action: "actualizar", matchedProductId: existing.id };
  }

  const missing: string[] = [];
  if (!row.nombre) missing.push("nombre");
  if (row.precio === null) missing.push("precio");
  if (row.stock === null) missing.push("stock");
  if (row.category_id === null) missing.push("category_id");

  const invalid: string[] = [];
  if (row.precio !== null && row.precio < 0) invalid.push("precio");
  if (row.stock !== null && row.stock < 0) invalid.push("stock");

  if (missing.length > 0 || invalid.length > 0) {
    const parts: string[] = [];
    if (missing.length > 0) parts.push(`faltan campos: ${missing.join(", ")}`);
    if (invalid.length > 0) parts.push(`valores inválidos: ${invalid.join(", ")}`);
    return { ...row, action: "error", error: `SKU nuevo, ${parts.join("; ")}.` };
  }

  return { ...row, action: "crear" };
}

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrlDraft, setApiUrlDraft] = useState("");
  const [connectionError, setConnectionError] = useState("");

  const [activeTab, setActiveTab] = useState<Tab>("metricas");

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [productEdits, setProductEdits] = useState<Record<number, { precio: string; stock: string }>>({});
  const [savingProductId, setSavingProductId] = useState<number | null>(null);
  const [productSearch, setProductSearch] = useState("");

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    category_id: "1",
    stock: "20",
    sku: "",
    descripcion: "",
  });
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createFieldErrors, setCreateFieldErrors] = useState<Record<string, string[]>>({});
  const [createSuccess, setCreateSuccess] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importRows, setImportRows] = useState<ImportRow[]>([]);
  const [importParseError, setImportParseError] = useState("");
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importSummary, setImportSummary] = useState<{
    created: number;
    updated: number;
    errors: { row: number; sku: string; message: string }[];
  } | null>(null);

  // --- Autenticación ---
  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    setUser(session.user);
    setApiUrlDraft(getApiUrl());

    verifyAdminSession()
      .then((freshUser) => setUser(freshUser))
      .catch(() => router.replace("/admin/login"))
      .finally(() => setCheckingAuth(false));
  }, [router]);

  const handleLogout = async () => {
    await adminLogout();
    router.replace("/admin/login");
  };

  const handleApiUrlSave = () => {
    persistApiUrl(apiUrlDraft);
    setShowSettings(false);
    setConnectionError("");
  };

  const reportError = (err: unknown, fallback: string) => {
    const message = err instanceof ApiError ? err.message : fallback;
    if (err instanceof ApiError && err.status === 0) {
      setConnectionError(message);
    }
    return message;
  };

  // --- Dashboard ---
  const fetchDashboard = useCallback(async () => {
    setDashboardLoading(true);
    setDashboardError("");
    try {
      const data = await adminFetch<DashboardData>("/admin/dashboard");
      setDashboard(data);
      setConnectionError("");
    } catch (err) {
      setDashboardError(reportError(err, "No se pudieron cargar las métricas."));
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  // --- Inventario ---
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError("");
    try {
      const data = await adminFetch<Product[]>("/productos");
      setProducts(data);
      setConnectionError("");
    } catch (err) {
      setProductsError(reportError(err, "No se pudo cargar el inventario."));
    } finally {
      setProductsLoading(false);
    }
  }, []);

  const getEditedValue = (product: Product, field: "precio" | "stock") => {
    const edit = productEdits[product.id];
    if (edit && edit[field] !== undefined) return edit[field];
    return field === "precio" ? String(product.precio) : String(product.stock);
  };

  const handleProductEdit = (id: number, field: "precio" | "stock", value: string) => {
    setProductEdits((prev) => ({
      ...prev,
      [id]: {
        precio: prev[id]?.precio ?? String(products.find((p) => p.id === id)?.precio ?? ""),
        stock: prev[id]?.stock ?? String(products.find((p) => p.id === id)?.stock ?? ""),
        [field]: value,
      },
    }));
  };

  const hasProductChanges = (product: Product) => {
    const edit = productEdits[product.id];
    if (!edit) return false;
    return (
      (edit.precio !== undefined && edit.precio !== String(product.precio)) ||
      (edit.stock !== undefined && edit.stock !== String(product.stock))
    );
  };

  const handleSaveProduct = async (product: Product) => {
    const edit = productEdits[product.id];
    if (!edit) return;

    const payload: Record<string, number> = {};
    if (edit.precio !== undefined && edit.precio !== String(product.precio)) {
      payload.precio = parseFloat(edit.precio);
    }
    if (edit.stock !== undefined && edit.stock !== String(product.stock)) {
      payload.stock = parseInt(edit.stock, 10);
    }
    if (Object.keys(payload).length === 0) return;

    setSavingProductId(product.id);
    try {
      const updated = await adminFetch<Product>(`/admin/productos/${product.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
      setProductEdits((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
      setConnectionError("");
      fetchDashboard();
    } catch (err) {
      setProductsError(reportError(err, "No se pudo guardar el cambio."));
    } finally {
      setSavingProductId(null);
    }
  };

  const handleDeactivateProduct = async (product: Product) => {
    if (!confirm(`¿Quitar "${product.nombre}" del catálogo? Esto no borra su historial de ventas.`)) return;

    setSavingProductId(product.id);
    try {
      await adminFetch(`/admin/productos/${product.id}`, { method: "DELETE" });
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, es_activo: false } : p)));
      setConnectionError("");
      fetchDashboard();
    } catch (err) {
      setProductsError(reportError(err, "No se pudo desactivar el producto."));
    } finally {
      setSavingProductId(null);
    }
  };

  // --- Pedidos ---
  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const data = await adminFetch<OrderItem[]>("/admin/pedidos");
      setOrders(data);
      setConnectionError("");
    } catch (err) {
      setOrdersError(reportError(err, "No se pudieron cargar los pedidos."));
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const handleCambiarEstado = async (orderId: number, nuevoEstado: string) => {
    setUpdatingOrderId(orderId);
    try {
      await adminFetch(`/admin/pedidos/${orderId}/estado`, {
        method: "PATCH",
        body: JSON.stringify({ status: nuevoEstado }),
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nuevoEstado } : o)));
      setConnectionError("");
      fetchDashboard();
    } catch (err) {
      setOrdersError(reportError(err, "No se pudo actualizar el estado del pedido."));
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // --- Crear producto ---
  const handleCrearProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");
    setCreateFieldErrors({});
    setCreateSuccess("");
    setCreatingProduct(true);

    try {
      const data = await adminFetch<{ message: string; producto: Product }>("/admin/productos", {
        method: "POST",
        body: JSON.stringify({
          ...nuevoProducto,
          precio: parseFloat(nuevoProducto.precio),
          stock: parseInt(nuevoProducto.stock, 10),
          category_id: parseInt(nuevoProducto.category_id, 10),
        }),
      });
      setCreateSuccess(`"${data.producto.nombre}" se agregó al catálogo correctamente.`);
      setNuevoProducto({ nombre: "", precio: "", category_id: "1", stock: "20", sku: "", descripcion: "" });
      setProducts((prev) => [data.producto, ...prev]);
      setConnectionError("");
      fetchDashboard();
    } catch (err) {
      if (err instanceof ApiError && err.errors) {
        setCreateFieldErrors(err.errors);
        setCreateError("Revisa los campos marcados.");
      } else {
        setCreateError(reportError(err, "No se pudo crear el producto."));
      }
    } finally {
      setCreatingProduct(false);
    }
  };

  // --- Importar inventario (CSV/Excel) ---
  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportParseError("");
    setImportSummary(null);
    setImportRows([]);

    try {
      const rows = await parseInventoryFile(file);
      if (rows.length === 0) {
        setImportParseError("No se encontraron filas con SKU o nombre en el archivo.");
        return;
      }
      setImportRows(rows);
    } catch {
      setImportParseError("No se pudo leer el archivo. Verifica que sea un CSV o Excel (.xlsx) válido.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const importPreview = useMemo(() => {
    const skuMap = new Map(products.map((p) => [p.sku.toLowerCase(), p]));
    return importRows.map((row) => computeRowStatus(row, skuMap));
  }, [importRows, products]);

  const importCounts = useMemo(
    () =>
      importPreview.reduce(
        (acc, row) => {
          acc[row.action]++;
          return acc;
        },
        { crear: 0, actualizar: 0, error: 0 }
      ),
    [importPreview]
  );

  const handleDownloadTemplate = () => {
    const blob = new Blob([buildInventoryTemplateCsv()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_inventario.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConfirmImport = async () => {
    setImporting(true);
    setImportSummary(null);
    setImportProgress(0);

    const skuMap = new Map(products.map((p) => [p.sku.toLowerCase(), p]));
    let created = 0;
    let updated = 0;
    const errors: { row: number; sku: string; message: string }[] = [];

    for (const row of importRows) {
      const status = computeRowStatus(row, skuMap);

      if (status.action === "error") {
        errors.push({ row: row.rowNumber, sku: row.sku || "(sin sku)", message: status.error! });
        setImportProgress((n) => n + 1);
        continue;
      }

      try {
        if (status.action === "actualizar" && status.matchedProductId) {
          const payload: Record<string, number> = {};
          if (row.precio !== null) payload.precio = row.precio;
          if (row.stock !== null) payload.stock = row.stock;

          const updatedProduct = await adminFetch<Product>(`/admin/productos/${status.matchedProductId}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          });
          skuMap.set(row.sku.toLowerCase(), updatedProduct);
          updated++;
        } else {
          const data = await adminFetch<{ producto: Product }>("/admin/productos", {
            method: "POST",
            body: JSON.stringify({
              category_id: row.category_id,
              nombre: row.nombre,
              precio: row.precio,
              stock: row.stock,
              sku: row.sku,
              descripcion: row.descripcion || undefined,
            }),
          });
          skuMap.set(row.sku.toLowerCase(), data.producto);
          created++;
        }
      } catch (err) {
        errors.push({
          row: row.rowNumber,
          sku: row.sku,
          message: err instanceof ApiError ? err.message : "Error inesperado.",
        });
      }

      setImportProgress((n) => n + 1);
    }

    setImportSummary({ created, updated, errors });
    setImportRows([]);
    setImporting(false);
    setConnectionError("");
    fetchProducts();
    fetchDashboard();
  };

  useEffect(() => {
    if (checkingAuth) return;
    fetchDashboard();
  }, [checkingAuth, fetchDashboard]);

  useEffect(() => {
    if (checkingAuth) return;
    if (activeTab === "inventario" || activeTab === "importar") fetchProducts();
    if (activeTab === "pedidos") fetchOrders();
  }, [checkingAuth, activeTab, fetchProducts, fetchOrders]);

  if (checkingAuth || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-collage-cream">
        <p className="font-display font-semibold text-collage-ink">Verificando acceso...</p>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return true;
    return p.nombre.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-collage-cream text-collage-ink p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-[3px] border-collage-ink">
          <div>
            <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-2} className="mb-2">
              관리자 패널 · Panel de Administración
            </CollageSticker>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-collage-ink">
              Hola, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="font-script text-xl md:text-2xl text-collage-indigo">
              esto es lo que pasa detrás del local
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
              onClick={() => setShowSettings((v) => !v)}
              aria-label="Configuración de conexión"
              className="w-11 h-11 flex items-center justify-center bg-white text-collage-ink rounded-xl border-[3px] border-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:bg-slate-50 transition-all"
            >
              ⚙️
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-collage-ink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:bg-red-600 transition-all"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="bg-white p-4 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
            <label className="block font-display font-semibold mb-1 text-xs uppercase tracking-wider text-slate-600">
              URL del backend (solo para desarrollo local del equipo)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={apiUrlDraft}
                onChange={(e) => setApiUrlDraft(e.target.value)}
                placeholder="http://localhost/api"
                className="flex-1 px-3 py-2 border-2 border-collage-ink rounded-lg font-mono text-xs bg-slate-50"
              />
              <button
                onClick={handleApiUrlSave}
                className="px-4 py-2 bg-collage-indigo text-white font-display font-semibold rounded-lg border-2 border-collage-ink text-xs hover:bg-collage-pink transition-all"
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {connectionError && (
          <div className="p-4 bg-amber-50 border-[3px] border-amber-500 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm font-semibold text-amber-900">⚠️ {connectionError}</p>
            <button
              onClick={() => {
                fetchDashboard();
                if (activeTab === "inventario") fetchProducts();
                if (activeTab === "pedidos") fetchOrders();
              }}
              className="px-3 py-1.5 bg-white border-2 border-amber-500 text-amber-900 font-display font-bold text-xs rounded-lg hover:bg-amber-100 transition-all"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-3 border-b-2 border-collage-ink pb-2 flex-wrap">
          <button
            onClick={() => setActiveTab("metricas")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "metricas"
                ? "bg-collage-indigo text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            📊 Métricas
          </button>
          <button
            onClick={() => setActiveTab("inventario")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "inventario"
                ? "bg-collage-lime text-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            📦 Inventario
          </button>
          <button
            onClick={() => setActiveTab("pedidos")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "pedidos"
                ? "bg-collage-orange text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            🛵 Pedidos
          </button>
          <button
            onClick={() => setActiveTab("nuevo_producto")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "nuevo_producto"
                ? "bg-collage-pink text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            ➕ Agregar Producto
          </button>
          <button
            onClick={() => setActiveTab("importar")}
            className={`px-5 py-2 font-display font-bold text-sm rounded-xl border-[3px] border-collage-ink transition-all ${
              activeTab === "importar"
                ? "bg-collage-indigo text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] -translate-y-1"
                : "bg-white text-collage-ink hover:bg-slate-100"
            }`}
          >
            📥 Importar
          </button>
        </div>

        {/* MÉTRICAS */}
        {activeTab === "metricas" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={fetchDashboard}
                disabled={dashboardLoading}
                className="text-xs font-display font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-collage-ink rounded-lg disabled:opacity-50"
              >
                {dashboardLoading ? "Actualizando..." : "🔄 Actualizar"}
              </button>
            </div>
            {dashboardLoading && !dashboard ? (
              <p className="font-display font-semibold text-collage-ink/60">Cargando métricas...</p>
            ) : dashboardError && !dashboard ? (
              <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink text-center">
                <p className="font-semibold text-collage-ink/70 mb-3">{dashboardError}</p>
                <button
                  onClick={fetchDashboard}
                  className="px-4 py-2 bg-collage-lime font-display font-bold rounded-xl border-[3px] border-collage-ink"
                >
                  Reintentar
                </button>
              </div>
            ) : dashboard ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                    <div className="text-3xl mb-2">💰</div>
                    <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Total Ventas</h3>
                    <p className="font-display font-bold text-2xl md:text-3xl text-collage-ink mt-1">
                      ${dashboard.total_ventas.toLocaleString("es-CL")}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                    <div className="text-3xl mb-2">⏳</div>
                    <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Pedidos Pendientes</h3>
                    <p className="font-display font-bold text-2xl md:text-3xl text-collage-orange mt-1">
                      {dashboard.pedidos_pendientes}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                    <div className="text-3xl mb-2">🍜</div>
                    <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Productos en Catálogo</h3>
                    <p className="font-display font-bold text-2xl md:text-3xl text-collage-indigo mt-1">
                      {dashboard.total_productos}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                    <div className="text-3xl mb-2">👥</div>
                    <h3 className="font-display font-semibold text-xs uppercase text-slate-500">Clientes Registrados</h3>
                    <p className="font-display font-bold text-2xl md:text-3xl text-collage-pink mt-1">
                      {dashboard.total_clientes}
                    </p>
                  </div>
                </div>

                {dashboard.productos_bajo_stock && dashboard.productos_bajo_stock.length > 0 && (
                  <div className="bg-amber-50 p-4 rounded-2xl border-[3px] border-amber-500 shadow-[4px_4px_0_0_var(--color-collage-ink)]">
                    <h4 className="font-display font-bold text-amber-900 flex items-center gap-2 mb-2">
                      ⚠️ Stock Bajo (menos de 5 unidades)
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
              </>
            ) : null}
          </div>
        )}

        {/* INVENTARIO */}
        {activeTab === "inventario" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="font-display font-bold text-xl text-collage-ink">Inventario y Precios</h3>
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Buscar por nombre o SKU..."
                className="px-3 py-2 border-2 border-collage-ink rounded-lg text-sm w-full sm:w-64"
              />
            </div>

            {productsLoading && products.length === 0 ? (
              <p className="font-display font-semibold text-collage-ink/60 py-6 text-center">Cargando inventario...</p>
            ) : productsError && products.length === 0 ? (
              <div className="text-center py-6">
                <p className="font-semibold text-collage-ink/70 mb-3">{productsError}</p>
                <button
                  onClick={fetchProducts}
                  className="px-4 py-2 bg-collage-lime font-display font-bold rounded-xl border-[3px] border-collage-ink"
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-collage-ink text-xs uppercase font-display text-slate-600">
                      <th className="py-3 px-2">SKU</th>
                      <th className="py-3 px-2">Nombre</th>
                      <th className="py-3 px-2">Precio ($)</th>
                      <th className="py-3 px-2">Stock</th>
                      <th className="py-3 px-2">Estado</th>
                      <th className="py-3 px-2 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className={!product.es_activo ? "opacity-50" : ""}>
                        <td className="py-3 px-2 font-mono text-xs font-bold">{product.sku}</td>
                        <td className="py-3 px-2 font-semibold">{product.nombre}</td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            step="0.01"
                            disabled={!product.es_activo}
                            value={getEditedValue(product, "precio")}
                            onChange={(e) => handleProductEdit(product.id, "precio", e.target.value)}
                            className="w-24 px-2 py-1 border-2 border-collage-ink rounded-lg disabled:bg-slate-100"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="number"
                            disabled={!product.es_activo}
                            value={getEditedValue(product, "stock")}
                            onChange={(e) => handleProductEdit(product.id, "stock", e.target.value)}
                            className={`w-20 px-2 py-1 border-2 rounded-lg disabled:bg-slate-100 ${
                              product.stock < 5 ? "border-red-400 text-red-600 font-bold" : "border-collage-ink"
                            }`}
                          />
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold font-display uppercase border ${
                              product.es_activo
                                ? "bg-green-100 text-green-800 border-green-400"
                                : "bg-slate-100 text-slate-500 border-slate-300"
                            }`}
                          >
                            {product.es_activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => handleSaveProduct(product)}
                            disabled={!hasProductChanges(product) || savingProductId === product.id}
                            className="px-2.5 py-1 bg-collage-lime hover:bg-collage-orange hover:text-white text-xs font-bold rounded border-2 border-collage-ink disabled:opacity-40 disabled:pointer-events-none transition-all"
                          >
                            {savingProductId === product.id ? "..." : "Guardar"}
                          </button>
                          {product.es_activo && (
                            <button
                              onClick={() => handleDeactivateProduct(product)}
                              disabled={savingProductId === product.id}
                              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded border-2 border-red-300 disabled:opacity-40"
                            >
                              Quitar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-collage-ink/50 font-semibold">
                          No hay productos que coincidan con la búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* PEDIDOS */}
        {activeTab === "pedidos" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-collage-ink">Gestión de Pedidos en Vivo</h3>
              <button
                onClick={fetchOrders}
                className="text-xs font-display font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-collage-ink rounded-lg"
              >
                Refrescar lista
              </button>
            </div>

            {ordersLoading && orders.length === 0 ? (
              <p className="font-display font-semibold text-collage-ink/60 py-6 text-center">Cargando pedidos...</p>
            ) : ordersError && orders.length === 0 ? (
              <div className="text-center py-6">
                <p className="font-semibold text-collage-ink/70 mb-3">{ordersError}</p>
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-collage-lime font-display font-bold rounded-xl border-[3px] border-collage-ink"
                >
                  Reintentar
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-collage-ink text-xs uppercase font-display text-slate-600">
                      <th className="py-3 px-2">N° Orden</th>
                      <th className="py-3 px-2">Cliente</th>
                      <th className="py-3 px-2">Teléfono</th>
                      <th className="py-3 px-2">Total</th>
                      <th className="py-3 px-2">Estado</th>
                      <th className="py-3 px-2 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3 px-2 font-mono font-bold">{o.n_orden}</td>
                        <td className="py-3 px-2 font-semibold">{o.user?.name || "Cliente Anónimo"}</td>
                        <td className="py-3 px-2 text-slate-600">{o.user?.telefono || "Sin teléfono"}</td>
                        <td className="py-3 px-2 font-bold">${Number(o.total).toLocaleString("es-CL")}</td>
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
                        <td className="py-3 px-2 text-right space-x-1 whitespace-nowrap">
                          {ORDER_STATUSES.map((s) => (
                            <button
                              key={s.value}
                              onClick={() => handleCambiarEstado(o.id, s.value)}
                              disabled={o.status === s.value || updatingOrderId === o.id}
                              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-collage-ink text-xs font-bold rounded border border-slate-300 disabled:opacity-30"
                            >
                              {s.label}
                            </button>
                          ))}
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-collage-ink/50 font-semibold">
                          No hay pedidos todavía.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* NUEVO PRODUCTO */}
        {activeTab === "nuevo_producto" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] max-w-2xl">
            <h3 className="font-display font-bold text-xl text-collage-ink mb-1">Agregar Nuevo Producto al Catálogo</h3>
            <p className="text-sm text-slate-500 mb-6 font-script text-lg">
              Se guarda directamente en la base de datos
            </p>

            {createSuccess && (
              <div className="p-3 bg-green-50 border-2 border-green-400 rounded-xl mb-4">
                <p className="text-sm font-semibold text-green-700">🎉 {createSuccess}</p>
              </div>
            )}
            {createError && (
              <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl mb-4">
                <p className="text-sm font-semibold text-red-600">{createError}</p>
              </div>
            )}

            <form onSubmit={handleCrearProducto} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">Nombre del Producto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Kimchi Jjigae"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-sans"
                  />
                  {createFieldErrors.nombre && (
                    <p className="text-xs text-red-600 mt-1">{createFieldErrors.nombre[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">SKU (Código único)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: KMJ-009"
                    value={nuevoProducto.sku}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, sku: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg font-mono text-sm"
                  />
                  {createFieldErrors.sku && <p className="text-xs text-red-600 mt-1">{createFieldErrors.sku[0]}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">Precio ($ CLP)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ej: 8990"
                    value={nuevoProducto.precio}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                  />
                  {createFieldErrors.precio && (
                    <p className="text-xs text-red-600 mt-1">{createFieldErrors.precio[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-display font-bold uppercase mb-1">Stock Inicial</label>
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
                  <label className="block text-xs font-display font-bold uppercase mb-1">Categoría ID</label>
                  <input
                    type="number"
                    required
                    placeholder="ID: 1"
                    value={nuevoProducto.category_id}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, category_id: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-collage-ink rounded-lg"
                  />
                  {createFieldErrors.category_id && (
                    <p className="text-xs text-red-600 mt-1">{createFieldErrors.category_id[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-display font-bold uppercase mb-1">Descripción</label>
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
                disabled={creatingProduct}
                className="w-full py-3 bg-collage-lime hover:bg-collage-orange hover:text-white text-collage-ink font-display font-bold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all disabled:opacity-60"
              >
                {creatingProduct ? "Guardando..." : "🚀 Guardar en el Catálogo"}
              </button>
            </form>
          </div>
        )}

        {/* IMPORTAR INVENTARIO */}
        {activeTab === "importar" && (
          <div className="bg-white p-6 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-display font-bold text-xl text-collage-ink">Importar Inventario</h3>
                <p className="text-sm text-slate-500">
                  Sube un CSV o Excel para crear productos nuevos o actualizar precio y stock por SKU.
                </p>
              </div>
              <button
                onClick={handleDownloadTemplate}
                className="text-xs font-display font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border-2 border-collage-ink rounded-lg whitespace-nowrap"
              >
                📄 Descargar plantilla CSV
              </button>
            </div>

            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-collage-ink rounded-xl p-6 cursor-pointer hover:bg-slate-50 transition-all">
              <span className="text-3xl">📁</span>
              <span className="font-display font-semibold text-sm text-collage-ink">
                Haz clic para elegir un archivo CSV o Excel (.xlsx)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelected}
                className="hidden"
              />
            </label>

            {importParseError && (
              <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl">
                <p className="text-sm font-semibold text-red-600">{importParseError}</p>
              </div>
            )}

            {productsLoading && importRows.length > 0 && products.length === 0 && (
              <p className="text-sm font-semibold text-collage-ink/60">Cargando inventario actual para comparar SKUs...</p>
            )}

            {importPreview.length > 0 && (
              <>
                <div className="flex items-center gap-4 text-sm font-bold flex-wrap">
                  <span className="text-green-700">✓ {importCounts.crear} nuevos</span>
                  <span className="text-blue-700">↻ {importCounts.actualizar} a actualizar</span>
                  {importCounts.error > 0 && <span className="text-red-600">⚠ {importCounts.error} con errores</span>}
                </div>

                <div className="overflow-x-auto max-h-80 overflow-y-auto border-2 border-collage-ink rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b-2 border-collage-ink text-xs uppercase font-display text-slate-600">
                        <th className="py-2 px-2">Fila</th>
                        <th className="py-2 px-2">SKU</th>
                        <th className="py-2 px-2">Nombre</th>
                        <th className="py-2 px-2">Precio</th>
                        <th className="py-2 px-2">Stock</th>
                        <th className="py-2 px-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {importPreview.map((row) => (
                        <tr key={row.rowNumber}>
                          <td className="py-2 px-2 text-slate-400">{row.rowNumber}</td>
                          <td className="py-2 px-2 font-mono text-xs">{row.sku || "—"}</td>
                          <td className="py-2 px-2">{row.nombre || "—"}</td>
                          <td className="py-2 px-2">{row.precio ?? "—"}</td>
                          <td className="py-2 px-2">{row.stock ?? "—"}</td>
                          <td className="py-2 px-2">
                            {row.action === "crear" && <span className="text-green-700 font-bold text-xs">Nuevo</span>}
                            {row.action === "actualizar" && (
                              <span className="text-blue-700 font-bold text-xs">Actualiza</span>
                            )}
                            {row.action === "error" && (
                              <span className="text-red-600 font-bold text-xs">{row.error}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleConfirmImport}
                  disabled={importing || importCounts.crear + importCounts.actualizar === 0}
                  className="px-5 py-3 bg-collage-lime hover:bg-collage-orange hover:text-white text-collage-ink font-display font-bold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all disabled:opacity-50"
                >
                  {importing
                    ? `Importando... (${importProgress}/${importPreview.length})`
                    : `Confirmar Importación (${importCounts.crear + importCounts.actualizar} filas)`}
                </button>
              </>
            )}

            {importSummary && (
              <div className="p-4 bg-green-50 border-2 border-green-400 rounded-xl space-y-2">
                <p className="font-semibold text-green-800">
                  🎉 {importSummary.created} productos creados, {importSummary.updated} actualizados.
                </p>
                {importSummary.errors.length > 0 && (
                  <div>
                    <p className="font-semibold text-red-700 text-sm mb-1">
                      {importSummary.errors.length} filas con error:
                    </p>
                    <ul className="text-xs text-red-600 list-disc pl-5 space-y-0.5">
                      {importSummary.errors.map((e, i) => (
                        <li key={i}>
                          Fila {e.row} ({e.sku}): {e.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
