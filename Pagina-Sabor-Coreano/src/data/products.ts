export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  isNew?: boolean;
}

export interface Category {
  slug: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { slug: "todos", label: "Todos" },
  { slug: "fermentados", label: "Fermentados" },
  { slug: "instantaneos", label: "Instantáneos" },
  { slug: "snacks", label: "Snacks" },
  { slug: "bebidas", label: "Bebidas" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kimchi Tradicional",
    description: "Kimchi casero fermentado, picante y crujiente.",
    price: 15.99,
    imageUrl: null,
    category: "fermentados",
    isNew: true,
  },
  {
    id: "2",
    name: "Tteokbokki Picante",
    description: "Pasteles de arroz masticables en salsa dulce y picante.",
    price: 12.50,
    imageUrl: null,
    category: "snacks",
  },
  {
    id: "3",
    name: "Ramen Coreano (5 pack)",
    description: "Paquete de fideos instantáneos picantes.",
    price: 8.99,
    imageUrl: null,
    category: "instantaneos",
  },
  {
    id: "4",
    name: "Soju Original",
    description: "Botella de soju tradicional, suave y ligero.",
    price: 11.50,
    imageUrl: null,
    category: "bebidas",
  },
  {
    id: "5",
    name: "Bulgogi Marinado",
    description: "Carne de res marinada al estilo coreano, lista para saltear.",
    price: 18.99,
    imageUrl: null,
    category: "fermentados",
    isNew: true,
  },
  {
    id: "6",
    name: "Mandu al Vapor",
    description: "Empanaditas coreanas rellenas de cerdo y vegetales.",
    price: 9.99,
    imageUrl: null,
    category: "snacks",
  },
];
