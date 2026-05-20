
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el script de seeding...');

  // Datos de prueba para Sabor Coreano
  const products = [
    {
      name: 'Kimchi Tradicional',
      description: 'Kimchi casero fermentado, picante y crujiente, perfecto como acompañamiento.',
      price: 15.99,
      stock: 50,
      imageUrl: '/Imagenes/kimchi.webp',
    },
    {
      name: 'Tteokbokki (Pastel de Arroz Picante)',
      description: 'Pasteles de arroz masticables en una salsa dulce y picante de gochujang.',
      price: 12.50,
      stock: 30,
      imageUrl: '/Imagenes/tteok.jpg',
    },
    {
      name: 'Ramen Coreano Picante (Shin Ramyun)',
      description: 'Paquete de 5 fideos instantáneos picantes, los favoritos de Corea.',
      price: 8.99,
      stock: 100,
      imageUrl: '/Imagenes/Ramen.jpg',
    },
    {
      name: 'Soju Clásico',
      description: 'Bebida alcohólica destilada tradicional, sabor suave y refrescante.',
      price: 5.99,
      stock: 120,
      imageUrl: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Pasta de Gochujang',
      description: 'Pasta de chile rojo fermentado, esencial para la auténtica cocina coreana.',
      price: 9.50,
      stock: 45,
      imageUrl: 'https://images.unsplash.com/photo-1584210086708-36ce66266d6d?auto=format&fit=crop&q=80&w=800',
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`Producto creado: ${product.name}`);
  }

  console.log('Seeding completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
