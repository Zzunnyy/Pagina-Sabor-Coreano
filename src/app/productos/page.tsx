"use client";
import ProductCard from "@/components/ProductCard";
import { useTheme } from "@/context/ThemeContext";
import { Product } from "@prisma/client";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// Mocks por si la base de datos no está corriendo aún
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

export default function ProductosPage() {
  const { isDark } = useTheme();
  let products: Product[] = [];
  
  try {
    // Intenta traer productos de la BD real
    // products = await prisma.product.findMany();
  } catch (error) {
    console.log("No se pudo conectar a la base de datos, usando datos de prueba (MOCKS).");
  }

  // Si no hay productos en la BD o falló la conexión, usamos mocks
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6 md:px-8 py-10 md:py-16 flex-1">
        <div className="mb-10 md:mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Nuestro Catalogo</h1>
          <p className={`text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saborea la auténtica cocina coreana.</p>
        </div>
      
      {products.length === 0 && (
        <div className={`/10 border ${isDark ? 'bg-yellow-900/20 border-yellow-700/50 text-yellow-300' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600'} p-4 rounded-lg mb-8 text-sm md:text-base`}>
          Aviso: Estás viendo productos de prueba. Asegúrate de configurar y conectar la base de datos PostgreSQL para ver productos reales.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </div>
    </div>
  );
}
