import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Kimchi Tradicional",
    description: "Kimchi casero fermentado, picante y crujiente.",
    price: 15.99,
    imageUrl: "/Imagenes/kimchi.webp",
  },
  {
    id: "2",
    name: "Tteokbokki Picante",
    description: "Pasteles de arroz masticables en salsa dulce y picante.",
    price: 12.50,
    imageUrl: "/Imagenes/tteok.jpg",
  },
  {
    id: "3",
    name: "Ramen Coreano (5 pack)",
    description: "Paquete de fideos instantáneos picantes.",
    price: 8.99,
    imageUrl: "/Imagenes/Ramen.jpg",
  }
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;

  try {
    // product = await prisma.product.findUnique({
    //   where: { id }
    // });
  } catch (error) {
    console.log("No se pudo conectar a la base de datos, usando mocks.");
  }

  // Si no encuentra en la BD o falló la conexión, busca en los mocks
  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.id === id) || null;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 md:px-8 py-8 md:py-16 flex-1">
      <Link href="/productos" className="text-gray-400 hover:text-white transition-colors mb-6 md:mb-8 inline-flex items-center gap-2">
        <span>&larr;</span> Volver al catalogo
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-4 md:mt-8">
        <div className="w-full md:flex-1">
          <div className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 border border-white/10 max-w-lg mx-auto md:max-w-none">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl md:text-8xl">
                🍜
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full md:flex-1 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">{product.name}</h1>
          <p className="text-3xl md:text-4xl font-extrabold text-primary mb-6 md:mb-8">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-invert max-w-none mb-8 md:mb-10">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <div className="flex items-center justify-center border border-white/20 rounded-full px-4 py-3 sm:py-2 bg-white/5">
              <button className="text-gray-400 hover:text-white text-xl px-4 sm:px-2">-</button>
              <span className="text-xl font-bold px-6 sm:px-4">1</span>
              <button className="text-gray-400 hover:text-white text-xl px-4 sm:px-2">+</button>
            </div>
            <button className="w-full sm:w-auto flex-1 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(233,75,60,0.4)] flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
