"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";

const FEATURED_IDS = ["2", "6", "10", "15"];

interface Slide {
  badges: { label: string; bg: string; text?: string; rotate: number }[];
  title: string;
  script: string;
  desc: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  visual:
  | { type: "grid" }
  | { type: "single"; imageUrl: string; imageAlt: string; bg: string; badgeLabel: string; badgeBg: string };
}

const SLIDES: Slide[] = [
  {
    badges: [
      { label: "맛있다 · Delicioso", bg: "bg-collage-orange", text: "text-white", rotate: -6 },
      { label: "Street Food Coreano", bg: "bg-collage-lime", rotate: 4 },
    ],
    title: "Sabor Coreano",
    script: "en tu puerta",
    desc: "Descubre los mejores productos coreanos, importados directamente para que disfrutes el auténtico sabor en casa.",
    cta: { label: "Ver Catálogo", href: "/productos" },
    ctaSecondary: { label: "Nuestra Historia", href: "/nosotros" },
    visual: { type: "grid" },
  },
  {
    badges: [{ label: "🔥 Los favoritos", bg: "bg-collage-indigo", text: "text-white", rotate: -4 }],
    title: "Buldak Ramen",
    script: "el picante que todos aman",
    desc: "Fideos coreanos Buldak en Rosé, Carbonara, 4 Quesos y Queso. Elige tu nivel de picante favorito.",
    cta: { label: "Ver Ramyeon", href: "/productos" },
    visual: {
      type: "single",
      imageUrl: "/productos/ramen-buldak-carbonara.jpg",
      imageAlt: "Ramen Buldak Carbonara",
      bg: "bg-collage-pink",
      badgeLabel: "🔥 Picante",
      badgeBg: "bg-collage-lime",
    },
  },
  {
    badges: [{ label: "신선 · Recién llegado", bg: "bg-collage-orange", text: "text-white", rotate: 4 }],
    title: "Choco Pie",
    script: "dulce, suave y con marshmallow",
    desc: "Bizcocho relleno de marshmallow cubierto en chocolate. Disponible individual o en caja de 12.",
    cta: { label: "Probar Ahora", href: "/productos" },
    visual: {
      type: "single",
      imageUrl: "/productos/choco-pie.jpg",
      imageAlt: "Choco Pie",
      bg: "bg-collage-indigo",
      badgeLabel: "🆕 Nuevo",
      badgeBg: "bg-collage-pink",
    },
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = FEATURED_IDS
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product): product is (typeof PRODUCTS)[number] => Boolean(product));

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
                      imageUrl="/productos/ramen-buldak-carbonara.jpg"
                      imageAlt="Ramen Buldak Carbonara"
                      bg="bg-collage-orange"
                      rotate={-6}
                      className="col-span-1 mt-6"
                      badge={<CollageSticker bg="bg-collage-cream" rotate={-10}>🔥 Picante</CollageSticker>}
                      badgePosition="top-left"
                    />
                    <CollageFrame
                      imageUrl="/productos/jugo-mango.jpg"
                      imageAlt="Jugo Coco Palm Mango"
                      bg="bg-collage-indigo"
                      rotate={5}
                      className="col-span-1"
                    />
                    <CollageFrame
                      imageUrl="/productos/helado-frutilla.jpg"
                      imageAlt="Helado Samanco Frutilla"
                      bg="bg-collage-pink"
                      rotate={4}
                      className="col-span-1"
                    />
                    <CollageFrame
                      imageUrl="/productos/choco-pie.jpg"
                      imageAlt="Choco Pie"
                      bg="bg-collage-lime"
                      rotate={-4}
                      className="col-span-1 mt-6"
                      badge={<CollageSticker bg="bg-collage-pink" text="text-white" rotate={8}>🆕 Nuevo</CollageSticker>}
                      badgePosition="bottom-right"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center px-8 md:px-16">
                    <CollageFrame
                      imageUrl={slide.visual.imageUrl}
                      imageAlt={slide.visual.imageAlt}
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

      {/* Featured Products */}
      <section className="relative w-full py-16 px-6 md:px-8 bg-white border-b-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <CollageSticker bg="bg-collage-lime" rotate={-3}>Lo más pedido</CollageSticker>
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink">
              Nuestros Favoritos
            </h2>
            <p className="text-collage-ink/70 text-lg max-w-xl">
              Una probadita de nuestro catálogo. Ramyeon, bebidas y postres coreanos, listos para pedir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-8 py-3 bg-collage-indigo text-white font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)]"
            >
              Ver Catálogo Completo →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
