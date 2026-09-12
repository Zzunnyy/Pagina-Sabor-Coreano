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
