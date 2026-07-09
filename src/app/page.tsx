"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";

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

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[activeSlide];

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      {/* Hero Carousel - Collage Pop */}
      <section className="relative w-full pt-20 pb-20 md:pt-28 md:pb-28 px-6 md:px-8 overflow-hidden border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute top-10 -left-16 w-72 h-72 bg-collage-lime rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-collage-pink rounded-full blur-3xl opacity-30 pointer-events-none" />

        {/* Prev / Next controls */}
        <button
          onClick={() => setActiveSlide((current) => (current - 1 + SLIDES.length) % SLIDES.length)}
          aria-label="Banner anterior"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border-[3px] border-collage-ink bg-white shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:-translate-x-0.5 transition-transform"
        >
          ←
        </button>
        <button
          onClick={() => setActiveSlide((current) => (current + 1) % SLIDES.length)}
          aria-label="Siguiente banner"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full border-[3px] border-collage-ink bg-white shadow-[3px_3px_0_0_var(--color-collage-ink)] hover:translate-x-0.5 transition-transform"
        >
          →
        </button>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div key={activeSlide} className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-center animate-wiggle-in">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center justify-center px-8 py-4 bg-collage-indigo text-white font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)]"
                >
                  {slide.cta.label}
                </Link>

                {slide.ctaSecondary && (
                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-collage-ink font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)]"
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
                  emoji="🍜"
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

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-12 md:mt-16">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                aria-label={`Ir al banner ${index + 1}`}
                className={`h-3 rounded-full border-2 border-collage-ink transition-all ${
                  index === activeSlide ? "w-8 bg-collage-indigo" : "w-3 bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Color block strip */}
      <div className="flex h-6 md:h-8">
        <div className="flex-1 bg-collage-lime" />
        <div className="flex-1 bg-collage-orange" />
        <div className="flex-1 bg-collage-indigo" />
        <div className="flex-1 bg-collage-pink" />
        <div className="flex-1 bg-collage-cream" />
      </div>

      {/* Features Section */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-white border-b-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink mb-3">
              ¿Por qué elegir <span className="text-collage-pink">Sabor Coreano</span>?
            </h2>
            <p className="font-script text-2xl text-collage-indigo">
              tradición, calidad y rapidez
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🔥",
                bg: "bg-collage-orange",
                title: "Recetas Auténticas",
                desc: "Preparadas con técnicas tradicionales coreanas y pasión por la gastronomía",
                rotate: -2,
              },
              {
                emoji: "🌟",
                bg: "bg-collage-lime",
                title: "Ingredientes Premium",
                desc: "Seleccionados especialmente de Corea del Sur con máxima calidad",
                rotate: 1,
              },
              {
                emoji: "⚡",
                bg: "bg-collage-pink",
                title: "Entrega Rápida",
                desc: "Servicio de delivery rápido para que disfrutes caliente en casa",
                rotate: -1,
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-collage-cream rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-1"
                style={{ transform: `rotate(${feature.rotate}deg)` }}
              >
                <div className={`w-16 h-16 mb-5 rounded-2xl border-[3px] border-collage-ink ${feature.bg} flex items-center justify-center text-3xl`}>
                  {feature.emoji}
                </div>
                <h3 className="font-display font-semibold text-xl text-collage-ink mb-3">{feature.title}</h3>
                <p className="text-collage-ink/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 md:py-28 px-6 md:px-8 bg-collage-indigo overflow-hidden">
        <div className="absolute inset-0 text-white/10 halftone-dots pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-collage-pink rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-collage-lime rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-white mb-4">¿Listo para probar?</h2>
          <p className="font-script text-2xl md:text-3xl text-collage-lime mb-8 -rotate-1 inline-block">
            explora nuestro catálogo completo
          </p>

          <div>
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-10 py-5 bg-collage-cream hover:bg-white text-collage-ink font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-lg"
            >
              Explorar Catálogo Completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
