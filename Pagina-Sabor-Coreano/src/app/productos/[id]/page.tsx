"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import { getProductVisual } from "@/lib/productVisuals";
import { formatPrice } from "@/lib/currency";

export default function ProductoDetalle() {
  const params = useParams<{ id: string }>();
  const { addToCart, toggleCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-collage-cream text-center px-6">
        <span className="text-6xl mb-4">🥡</span>
        <h1 className="font-display font-semibold text-3xl text-collage-ink mb-2">
          Producto no encontrado
        </h1>
        <p className="text-collage-ink/70 mb-8">
          Puede que este producto ya no esté disponible.
        </p>
        <Link
          href="/productos"
          className="px-6 py-3 bg-collage-indigo text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)]"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const { bg, emoji, rotate } = getProductVisual(product.id, product.name);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toggleCart();
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      <section className="relative w-full py-14 px-6 md:px-8">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 font-display font-semibold text-collage-ink hover:text-collage-indigo transition-colors mb-8"
          >
            ← Volver al catálogo
          </Link>

          <div className="bg-white rounded-[2.5rem] border-[3px] border-collage-ink shadow-[10px_10px_0_0_var(--color-collage-ink)] overflow-hidden flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-collage-cream border-b-[3px] md:border-b-0 md:border-r-[3px] border-collage-ink relative">
              <div className="absolute inset-0 text-collage-ink/5 halftone-dots pointer-events-none" />
              <div className="w-full max-w-sm relative z-10">
                <CollageFrame
                  imageUrl={product.imageUrl || undefined}
                  imageAlt={product.name}
                  emoji={emoji}
                  bg={bg}
                  rotate={rotate}
                  badge={product.isNew ? <CollageSticker bg="bg-collage-pink" text="text-white" rotate={-10}>🆕 Nuevo</CollageSticker> : undefined}
                  badgePosition="top-left"
                  className="w-full"
                />
              </div>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                {product.category && (
                  <span className="inline-block w-max px-3 py-1 bg-collage-indigo text-white font-display font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-collage-ink">
                    {product.category}
                  </span>
                )}

                <h1 className="font-display font-bold text-3xl md:text-4xl text-collage-ink leading-tight">
                  {product.name}
                </h1>

                <div className="h-1 w-20 bg-collage-pink rounded-full mb-2" />

                <p className="text-lg text-collage-ink/80 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t-[3px] border-dashed border-collage-ink/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-collage-ink/50 uppercase tracking-widest mb-1">Precio</span>
                  <span className="font-display font-bold text-4xl text-collage-ink">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-bold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  <span className="text-2xl font-bold leading-none">+</span>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display font-semibold text-2xl text-collage-ink mb-8 text-center">
                También te puede interesar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
