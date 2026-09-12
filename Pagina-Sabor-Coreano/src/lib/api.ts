const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

export interface ApiCategory {
  id: number;
  nombre: string;
}

export interface ApiProductImage {
  id: number;
  path: string;
  alt_text: string | null;
  sort: number;
}

export interface ApiProduct {
  id: number;
  category_id: number;
  nombre: string;
  precio: string;
  descripcion: string | null;
  stock: number;
  sku: string;
  es_activo: boolean;
  category: ApiCategory;
  images: ApiProductImage[];
}

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  rol: string;
  telefono: string | null;
}

export interface ApiLoginResponse {
  user: ApiUser;
  token: string;
}

export class ApiError extends Error {}

export async function login(email: string, password: string): Promise<ApiLoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.message ?? "No se pudo iniciar sesión");
  }

  return data;
}

export async function register(name: string, email: string, password: string): Promise<ApiLoginResponse> {
  const res = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    const primerError = data.errors ? (Object.values(data.errors)[0] as string[])[0] : null;
    throw new ApiError(primerError ?? data.message ?? "No se pudo crear la cuenta");
  }

  return data;
}

export async function logout(token: string): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
}

export async function enviarCodigoRecuperacion(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/password/olvide`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(data.message ?? "No se pudo enviar el código.");
  }
}

function extraerPrimerError(data: { message?: string; errors?: Record<string, string[]> }): string {
  const primerError = data.errors ? Object.values(data.errors)[0]?.[0] : null;
  return primerError ?? data.message ?? "Ocurrió un error inesperado.";
}

export async function verificarCodigoRecuperacion(email: string, code: string): Promise<void> {
  const res = await fetch(`${API_URL}/password/verificar-codigo`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(extraerPrimerError(data));
  }
}

export async function resetearPassword(email: string, code: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/password/resetear`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, code, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(extraerPrimerError(data));
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await fetch(`${API_URL}/categorias`);

  if (!res.ok) {
    throw new Error("No se pudieron cargar las categorías");
  }

  return res.json();
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_URL}/productos`);

  if (!res.ok) {
    throw new Error("No se pudieron cargar los productos");
  }

  return res.json();
}

/**
 * Las fotos de producto viven como archivos estáticos en
 * Pagina-Sabor-Coreano/public/productos/, el backend solo guarda el nombre
 * del archivo (ej. "RamenBuldakRose.jpg"). Acá se arma la URL final.
 */
export function getImagenProducto(imagenes: ApiProductImage[]): string | null {
  const primera = [...imagenes].sort((a, b) => a.sort - b.sort)[0];
  return primera ? `/productos/${primera.path}` : null;
}

/**
 * "Ramyeon" -> "ramyeon", "Postres " -> "postres"
 * Se usa tanto para el slug de categoría de un producto como para el de
 * los botones de filtro, así siempre calzan sin importar el nombre real en la BD.
 */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
