import { useState } from "react";
import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";
import { useCart } from "@/context/CartContext";
import { getProductVisual } from "@/lib/productVisuals";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category?: string;
    isNew?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { bg, emoji, rotate } = getProductVisual(product.id, product.name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setIsModalOpen(false);
    toggleCart();
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="group h-full flex flex-col p-5 rounded-[2rem] bg-white border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <div className="block mb-5">
          <CollageFrame
            imageUrl={product.imageUrl || undefined}
            imageAlt={product.name}
            emoji={emoji}
            bg={bg}
            rotate={rotate}
            badge={product.isNew ? <CollageSticker bg="bg-collage-pink" text="text-white" rotate={-10}>🆕 Nuevo</CollageSticker> : undefined}
            badgePosition="top-left"
          />
        </div>

        <div className="flex flex-col flex-1 pointer-events-none">
          {product.category && (
            <span className="font-display font-semibold text-xs uppercase tracking-wide text-collage-indigo/70 mb-1">
              {product.category}
            </span>
          )}
          <h3 className="font-display font-semibold text-xl text-collage-ink mb-1 line-clamp-1 group-hover:text-collage-pink transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-collage-ink/70 mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>

          <Link
            href={`/productos/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="w-max text-sm font-display font-semibold text-collage-indigo hover:text-collage-pink transition-colors underline underline-offset-2 pointer-events-auto mb-3"
          >
            Ver detalle →
          </Link>

          <div className="flex items-center justify-between pt-3">
            <div className="pointer-events-auto">
              <CollageSticker bg="bg-collage-lime" rotate={-4}>
                ${product.price.toFixed(2)}
              </CollageSticker>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 flex items-center justify-center rounded-full border-[3px] border-collage-ink bg-collage-indigo text-white shadow-[3px_3px_0_0_var(--color-collage-ink)] transition-transform hover:scale-110 hover:rotate-12 active:scale-95 pointer-events-auto"
              title="Añadir al carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-collage-ink/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-collage-cream rounded-[2.5rem] border-[3px] border-collage-ink shadow-[12px_12px_0_0_var(--color-collage-ink)] overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border-2 border-collage-ink hover:bg-collage-pink hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Image Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-white border-b-[3px] md:border-b-0 md:border-r-[3px] border-collage-ink relative">
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

            {/* Right Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-collage-cream relative">
              <div className="flex flex-col gap-4">
                {product.category && (
                  <span className="inline-block w-max px-3 py-1 bg-collage-indigo text-white font-display font-bold text-xs uppercase tracking-wider rounded-lg border-2 border-collage-ink">
                    {product.category}
                  </span>
                )}
                
                <h2 className="font-display font-bold text-3xl md:text-4xl text-collage-ink leading-tight">
                  {product.name}
                </h2>
                
                <div className="h-1 w-20 bg-collage-pink rounded-full mb-2" />
                
                <p className="text-lg text-collage-ink/80 leading-relaxed font-medium">
                  {product.description}
                </p>

                <Link
                  href={`/productos/${product.id}`}
                  className="w-max text-sm font-display font-semibold text-collage-indigo hover:text-collage-pink transition-colors underline underline-offset-2"
                >
                  Ver página completa →
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t-[3px] border-dashed border-collage-ink/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-collage-ink/50 uppercase tracking-widest mb-1">Precio</span>
                  <span className="font-display font-bold text-4xl text-collage-ink">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-3 px-8 py-4 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-bold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  <span className="text-2xl font-bold leading-none">+</span>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
