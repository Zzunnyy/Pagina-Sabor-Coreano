"use client";

import { useEffect, useState } from "react";
import { fetchCategories, fetchProducts, getImagenProducto, slugify } from "@/lib/api";
import type { Category, Product } from "@/data/products";

interface UseCatalogResult {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * Trae productos y categorías reales desde el backend (Laravel) y los deja
 * en la misma forma (Product/Category) que antes venía del archivo estático
 * src/data/products.ts, para no tener que tocar los componentes que los pintan.
 */
export function useCatalog(): UseCatalogResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([{ slug: "todos", label: "Todos" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      try {
        const [apiCategorias, apiProductos] = await Promise.all([fetchCategories(), fetchProducts()]);

        if (cancelado) return;

        setCategories([
          { slug: "todos", label: "Todos" },
          ...apiCategorias.map((c) => ({ slug: slugify(c.nombre), label: c.nombre })),
        ]);

        setProducts(
          apiProductos.map((p) => ({
            id: String(p.id),
            name: p.nombre,
            description: p.descripcion ?? "",
            price: Number(p.precio),
            imageUrl: getImagenProducto(p.images),
            category: slugify(p.category.nombre),
          }))
        );
      } catch (e) {
        if (!cancelado) {
          setError(e instanceof Error ? e.message : "Error desconocido al cargar el catálogo");
        }
      } finally {
        if (!cancelado) setLoading(false);
      }
    }

    cargar();

    return () => {
      cancelado = true;
    };
  }, []);

  return { products, categories, loading, error };
}
