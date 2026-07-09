"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CollageSticker from "@/components/CollageSticker";
import { Product } from "@prisma/client";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "todos", label: "Todos" },
  { slug: "fermentados", label: "Fermentados" },
  { slug: "instantaneos", label: "Instantáneos" },
  { slug: "snacks", label: "Snacks" },
];

// Mocks por si la base de datos no está corriendo aún
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Kimchi Tradicional",
    description: "Kimchi casero fermentado, picante y crujiente.",
    price: 15.99,
    imageUrl: "/Imagenes/kimchi.webp",
    category: "fermentados",
    isNew: true,
  },
  {
    id: "2",
    name: "Tteokbokki Picante",
    description: "Pasteles de arroz masticables en salsa dulce y picante.",
    price: 12.50,
    imageUrl: "/Imagenes/tteok.jpg",
    category: "snacks",
  },
  {
    id: "3",
    name: "Ramen Coreano (5 pack)",
    description: "Paquete de fideos instantáneos picantes.",
    price: 8.99,
    imageUrl: "/Imagenes/Ramen.jpg",
    category: "instantaneos",
  },
];

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState("todos");
  let products: Product[] = [];

  try {
    // Intenta traer productos de la BD real
    // products = await prisma.product.findMany();
  } catch (error) {
    console.log("No se pudo conectar a la base de datos, usando datos de prueba (MOCKS).");
  }

  // Si no hay productos en la BD o falló la conexión, usamos mocks
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;
  const filteredProducts = activeCategory === "todos"
    ? displayProducts
    : displayProducts.filter((product) => "category" in product && product.category === activeCategory);

  return (
    <div className="min-h-screen bg-collage-cream">
      <div className="relative overflow-hidden border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-56 h-56 bg-collage-lime rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-16 left-10 w-64 h-64 bg-collage-pink rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-8 py-14 md:py-20 relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-6}>매콤 · Picante</CollageSticker>
            <CollageSticker bg="bg-collage-indigo" text="text-white" rotate={4}>신선 · Fresco</CollageSticker>
          </div>
          <h1 className="font-display font-semibold text-5xl md:text-7xl text-collage-ink leading-none mb-3">
            Nuestro <span className="text-collage-pink">Catálogo</span>
          </h1>
          <p className="font-script text-2xl md:text-3xl text-collage-indigo -rotate-2 inline-block">
            saborea la auténtica cocina coreana
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-12 md:py-16">
        {products.length === 0 && (
          <div className="bg-white border-[3px] border-collage-ink rounded-2xl p-4 mb-10 text-sm md:text-base text-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]">
            Aviso: Estás viendo productos de prueba. Asegúrate de configurar y conectar la base de datos PostgreSQL para ver productos reales.
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}>
              <CollageSticker
                bg={activeCategory === cat.slug ? "bg-collage-indigo" : "bg-white"}
                text={activeCategory === cat.slug ? "text-white" : "text-collage-ink"}
                rotate={activeCategory === cat.slug ? -2 : 0}
                className="cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                {cat.label}
              </CollageSticker>
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-collage-ink/70 text-lg">No hay productos en esta categoría todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="flex h-6 md:h-8">
        <div className="flex-1 bg-collage-lime" />
        <div className="flex-1 bg-collage-orange" />
        <div className="flex-1 bg-collage-indigo" />
        <div className="flex-1 bg-collage-pink" />
        <div className="flex-1 bg-collage-cream" />
      </div>
    </div>
  );
}
