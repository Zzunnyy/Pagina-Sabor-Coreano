"use client";

import { useState } from "react";
import CollageSticker from "@/components/CollageSticker";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export default function Productos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      {/* Header */}
      <section className="relative w-full pt-14 pb-10 px-6 md:px-8 border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute top-0 -left-24 w-72 h-72 bg-collage-lime rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 -right-24 w-72 h-72 bg-collage-orange rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <CollageSticker bg="bg-collage-indigo" text="text-white" rotate={-4}>
              전체 상품 · Catálogo Completo
            </CollageSticker>
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink mb-2">
            Nuestros Productos
          </h1>
          <p className="font-script text-2xl md:text-3xl text-collage-indigo -rotate-2">
            todo el sabor coreano en un solo lugar
          </p>
        </div>
      </section>

      {/* Search & Listing */}
      <section className="relative w-full py-14 px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca tus productos favoritos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-all font-medium text-lg placeholder-collage-ink/50 bg-white"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
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

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-collage-ink/60 text-xl font-medium">
                No se encontraron productos para &quot;{searchQuery}&quot;
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
