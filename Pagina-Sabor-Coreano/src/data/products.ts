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
  { slug: "ramyeon", label: "Ramyeon" },
  { slug: "bebidas", label: "Bebidas" },
  { slug: "postres", label: "Postres" },
  { slug: "snacks", label: "Snacks" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ramen Buldak Rosé",
    description: "Fideos coreanos picantes Buldak en una cremosa salsa rosé de tomate.",
    price: 3000,
    imageUrl: "/productos/ramen-buldak-rose.jpg",
    category: "ramyeon",
  },
  {
    id: "2",
    name: "Ramen Buldak Carbonara",
    description: "Fideos coreanos picantes Buldak en cremosa salsa carbonara.",
    price: 3000,
    imageUrl: "/productos/ramen-buldak-carbonara.jpg",
    category: "ramyeon",
  },
  {
    id: "3",
    name: "Ramen Buldak 4 Quesos",
    description: "Fideos coreanos picantes Buldak con mezcla de 4 quesos.",
    price: 3000,
    imageUrl: "/productos/ramen-buldak-4quesos.jpg",
    category: "ramyeon",
  },
  {
    id: "4",
    name: "Ramen Buldak Queso",
    description: "Fideos coreanos picantes Buldak con queso.",
    price: 3000,
    imageUrl: "/productos/ramen-buldak-queso.jpg",
    category: "ramyeon",
  },
  {
    id: "5",
    name: "Jin Ramen",
    description: "Ramen coreano clásico, caldo picante y sabroso.",
    price: 3000,
    imageUrl: "/productos/jin-ramen.jpg",
    category: "ramyeon",
  },
  {
    id: "6",
    name: "Shin Ramyun",
    description: "El ramen coreano más icónico, caldo picante de res.",
    price: 3000,
    imageUrl: "/productos/shin-ramyun.jpg",
    category: "ramyeon",
    isNew: true,
  },
  {
    id: "7",
    name: "Jugo Coco Palm Mango",
    description: "Jugo de coco con mango, refrescante y natural.",
    price: 1500,
    imageUrl: "/productos/jugo-mango.jpg",
    category: "bebidas",
  },
  {
    id: "8",
    name: "Jugo Coco Palm Uva",
    description: "Jugo de coco con uva, refrescante y natural.",
    price: 1500,
    imageUrl: "/productos/jugo-uva.jpg",
    category: "bebidas",
  },
  {
    id: "9",
    name: "Helado de Choclo",
    description: "Helado artesanal de choclo, un sabor dulce y único.",
    price: 2500,
    imageUrl: "/productos/helado-choclo.jpg",
    category: "postres",
  },
  {
    id: "10",
    name: "Helado Samanco Frutilla",
    description: "Helado Samanco sabor frutilla, cremoso y refrescante.",
    price: 2500,
    imageUrl: "/productos/helado-frutilla.jpg",
    category: "postres",
  },
  {
    id: "11",
    name: "Helado Samanco Chocolate",
    description: "Helado Samanco sabor chocolate, cremoso y refrescante.",
    price: 2500,
    imageUrl: "/productos/helado-chocolate.jpg",
    category: "postres",
  },
  {
    id: "12",
    name: "Jugo Coco Palm Durazno",
    description: "Jugo de coco con durazno, refrescante y natural.",
    price: 1500,
    imageUrl: "/productos/jugo-durazno.jpg",
    category: "bebidas",
  },
  {
    id: "13",
    name: "Jin Ramen Pollo",
    description: "Ramen coreano clásico sabor pollo.",
    price: 3000,
    imageUrl: "/productos/jin-ramen-pollo.jpg",
    category: "ramyeon",
  },
  {
    id: "14",
    name: "Jin Ramen Veggie",
    description: "Ramen coreano clásico, versión vegetariana.",
    price: 3000,
    imageUrl: "/productos/jin-ramen-veggie.jpg",
    category: "ramyeon",
  },
  {
    id: "15",
    name: "Choco Pie 12 Unidades",
    description: "Caja de 12 Choco Pie: bizcocho relleno de marshmallow cubierto en chocolate.",
    price: 5800,
    imageUrl: "/productos/choco-pie.jpg",
    category: "snacks",
    isNew: true,
  },
  {
    id: "16",
    name: "Choco Pie 1 Unidad",
    description: "Choco Pie individual: bizcocho relleno de marshmallow cubierto en chocolate.",
    price: 500,
    imageUrl: "/productos/choco-pie.jpg",
    category: "snacks",
  },
];
