"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";
import ProductCard from "@/components/ProductCard";

interface Slide {
  badges: { label: string; bg: string; text?: string; rotate: number }[];
  title: string;
  script: string;
  desc: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  visual:
  | { type: "grid" }
  | { type: "single"; emoji: string; bg: string; badgeLabel: string; badgeBg: string };
}

const SLIDES: Slide[] = [
  {
    badges: [
      { label: "맛있다 · Delicioso", bg: "bg-collage-orange", text: "text-white", rotate: -6 },
      { label: "Street Food Coreano", bg: "bg-collage-lime", rotate: 4 },
    ],
    title: "Sabor Coreano",
    script: "en tu puerta",
    desc: "Descubre los mejores platillos coreanos, preparados con ingredientes frescos y el calor de las recetas tradicionales.",
    cta: { label: "Ver Catálogo", href: "/productos" },
    ctaSecondary: { label: "Nuestra Historia", href: "/nosotros" },
    visual: { type: "grid" },
  },
  {
    badges: [{ label: "🍶 Promo por tiempo limitado", bg: "bg-collage-indigo", text: "text-white", rotate: -4 }],
    title: "2x1 en Soju",
    script: "dare or drink",
    desc: "Lleva dos botellas de soju al precio de una. Ideal para compartir con amigos.",
    cta: { label: "Ver Bebidas", href: "/productos" },
    visual: { type: "single", emoji: "🍶", bg: "bg-collage-pink", badgeLabel: "2x1", badgeBg: "bg-collage-lime" },
  },
  {
    badges: [{ label: "신선 · Recién llegado", bg: "bg-collage-orange", text: "text-white", rotate: 4 }],
    title: "Kimchi Casero",
    script: "picante y crujiente",
    desc: "Nuestro kimchi tradicional, fermentado en casa con la receta de siempre.",
    cta: { label: "Probar Ahora", href: "/productos" },
    visual: { type: "single", emoji: "🥬", bg: "bg-collage-indigo", badgeLabel: "🆕 Nuevo", badgeBg: "bg-collage-pink" },
  },
];

const CATEGORIES = [
  { slug: "todos", label: "Todos" },
  { slug: "fermentados", label: "Fermentados" },
  { slug: "instantaneos", label: "Instantáneos" },
  { slug: "snacks", label: "Snacks" },
];

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

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      {/* Hero Carousel - Collage Pop */}
      <section className="relative w-full pt-10 pb-10 md:pt-16 md:pb-16 px-6 md:px-8 overflow-hidden border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute top-10 -left-16 w-72 h-72 bg-collage-lime rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-collage-pink rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Prev / Next controls */}
        <button
          onClick={() => setActiveSlide((current) => (current - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Banner anterior"
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border-[3px] border-collage-ink bg-white text-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:-translate-x-1 transition-transform active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-collage-ink)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 pr-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => setActiveSlide((current) => (current + 1) % SLIDES.length)}
          aria-label="Siguiente banner"
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border-[3px] border-collage-ink bg-white text-collage-ink shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:translate-x-1 transition-transform active:translate-y-0.5 active:shadow-[1px_1px_0_0_var(--color-collage-ink)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 pl-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="relative grid">
            {SLIDES.map((slide, index) => (
              <div
                key={index}
                className={`col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center transition-all duration-500 ease-out ${index === activeSlide
                  ? "opacity-100 translate-y-0 z-10"
                  : "opacity-0 translate-y-8 z-0 pointer-events-none"
                  }`}
              >
                {/* Left Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    {slide.badges.map((badge) => (
                      <CollageSticker key={badge.label} bg={badge.bg} text={badge.text} rotate={badge.rotate}>
                        {badge.label}
                      </CollageSticker>
                    ))}
                  </div>

                  <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-none text-collage-ink">
                    {slide.title}
                  </h1>
                  <p className="font-script text-3xl md:text-4xl text-collage-indigo -rotate-2 -mt-3">
                    {slide.script}
                  </p>

                  <p className="text-lg md:text-xl text-collage-ink/70 max-w-md leading-relaxed font-medium">
                    {slide.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center justify-center px-8 py-3 bg-collage-indigo text-white font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)]"
                    >
                      {slide.cta.label}
                    </Link>

                    {slide.ctaSecondary && (
                      <Link
                        href={slide.ctaSecondary.href}
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-collage-ink font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)]"
                      >
                        {slide.ctaSecondary.label}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right Visual */}
                {slide.visual.type === "grid" ? (
                  <div className="relative grid grid-cols-2 gap-5 md:gap-6 px-4">
                    <CollageFrame
                      imageUrl="/productos/sushi.jpg"
                      bg="bg-collage-orange"
                      rotate={-6}
                      className="col-span-1 mt-6"
                      badge={<CollageSticker bg="bg-collage-cream" rotate={-10}>🔥 Picante</CollageSticker>}
                      badgePosition="top-left"
                    />
                    <CollageFrame emoji="🍗" bg="bg-collage-indigo" rotate={5} className="col-span-1" />
                    <CollageFrame
                      emoji="🍶"
                      bg="bg-collage-pink"
                      rotate={4}
                      className="col-span-1"
                      badge={<CollageSticker bg="bg-collage-lime" rotate={8}>2x1</CollageSticker>}
                      badgePosition="bottom-right"
                    />
                    <CollageFrame emoji="🥟" bg="bg-collage-lime" rotate={-4} className="col-span-1 mt-6" />
                  </div>
                ) : (
                  <div className="flex justify-center px-8 md:px-16">
                    <CollageFrame
                      emoji={slide.visual.emoji}
                      bg={slide.visual.bg}
                      rotate={-4}
                      className="w-full max-w-xs"
                      badge={<CollageSticker bg={slide.visual.badgeBg} rotate={-10}>{slide.visual.badgeLabel}</CollageSticker>}
                      badgePosition="top-left"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 md:mt-10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={`Ir al banner ${index + 1}`}
                className={`h-3 rounded-full border-2 border-collage-ink transition-all ${index === activeSlide ? "w-8 bg-collage-indigo" : "w-3 bg-white"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Search & Listing */}
      <section className="relative w-full py-16 px-6 md:px-8 bg-white border-b-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                placeholder="Busca tus productos favoritos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-all font-medium text-lg placeholder-collage-ink/50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </div>
            </div>
          </div>

          {/* Category Filters & Product Grid */}
          <div className="flex flex-col">
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

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-collage-ink/60 text-xl font-medium">No se encontraron productos para "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>


    </div>
  );
}
