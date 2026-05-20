"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { useTheme } from "@/context/ThemeContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isDark } = useTheme();

  return (
    <div className={`group h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border ${isDark ? 'bg-slate-800 shadow-lg hover:shadow-xl border-slate-700' : 'bg-white shadow-md hover:shadow-xl border-gray-200'}`}>
      {/* Image Container */}
      <Link href={`/productos/${product.id}`} className={`block relative w-full aspect-square overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
        {product.imageUrl ? (
          <>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </>
        ) : (
          <div className={`w-full h-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500 bg-gradient-to-br ${isDark ? 'from-slate-700 to-slate-600' : 'from-gray-100 to-gray-200'}`}>
            🍜
          </div>
        )}
      </Link>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`text-lg font-bold mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-black'}`}>
          <Link href={`/productos/${product.id}`} className={`${isDark ? 'hover:text-red-400' : 'hover:text-red-600'} transition-colors duration-300`}>
            {product.name}
          </Link>
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {product.description}
        </p>
        
        {/* Footer - Price & Button */}
        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <span className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            ${product.price.toFixed(2)}
          </span>
          <button 
            className={`text-white p-2.5 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-500' : 'bg-red-600 hover:bg-red-700'}`}
            title="Añadir al carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
