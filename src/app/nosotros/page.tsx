"use client";

import Link from "next/link";
import CollageFrame from "@/components/CollageFrame";
import CollageSticker from "@/components/CollageSticker";

export default function Nosotros() {
  return (
    <div className="flex flex-col w-full bg-collage-cream">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-20 md:pt-28 md:pb-28 px-6 md:px-8 overflow-hidden border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute top-10 -left-16 w-72 h-72 bg-collage-pink rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-collage-lime rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4 justify-center">
            <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-6}>우리 · Nosotros</CollageSticker>
            <CollageSticker bg="bg-collage-lime" rotate={4}>Desde Chile 🇨🇱</CollageSticker>
          </div>
          <div className="text-center">
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-none text-collage-ink mb-3">
              Nuestra <span className="text-collage-pink">Historia</span>
            </h1>
            <p className="font-script text-2xl md:text-3xl text-collage-indigo -rotate-2 inline-block">
              pasión, tradición y sabor auténtico
            </p>
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

      {/* Origin Story */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-white border-b-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Visual */}
            <div className="relative grid grid-cols-2 gap-5 px-4 order-last md:order-first">
              <CollageFrame emoji="🍜" bg="bg-collage-orange" rotate={-6} className="col-span-1 mt-6" />
              <CollageFrame
                emoji="🇰🇷"
                bg="bg-collage-indigo"
                rotate={5}
                className="col-span-1"
                badge={<CollageSticker bg="bg-collage-cream" rotate={-10}>Auténtico</CollageSticker>}
                badgePosition="top-left"
              />
              <CollageFrame emoji="🌶️" bg="bg-collage-pink" rotate={4} className="col-span-1" />
              <CollageFrame
                emoji="❤️"
                bg="bg-collage-lime"
                rotate={-4}
                className="col-span-1 mt-6"
                badge={<CollageSticker bg="bg-collage-orange" text="text-white" rotate={8}>Con amor</CollageSticker>}
                badgePosition="bottom-right"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <CollageSticker bg="bg-collage-pink" text="text-white" rotate={-4}>📖 Nuestra Historia</CollageSticker>
              <h2 className="font-display font-semibold text-4xl text-collage-ink">¿Cómo empezó todo?</h2>
              <p className="text-lg text-collage-ink/70 leading-relaxed font-medium">
                Sabor Coreano nació de la pasión por compartir los auténticos sabores de Corea del Sur con Chile. Lo que comenzó como un sueño se convirtió en una misión: llevar la tradición culinaria coreana a cada hogar.
              </p>
              <p className="text-lg text-collage-ink/70 leading-relaxed font-medium">
                Cada receta que preparamos lleva consigo generaciones de tradición, ingredientes cuidadosamente seleccionados y el cariño de quienes amamos lo que hacemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-collage-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink mb-3">
              Quiénes <span className="text-collage-indigo">Somos</span>
            </h2>
            <p className="font-script text-2xl text-collage-pink">
              lo que nos define
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🎯",
                bg: "bg-collage-orange",
                title: "Nuestra Misión",
                desc: "Ofrecer auténticos sabores coreanos con ingredientes de primera calidad, manteniendo la tradición y ofreciendo una experiencia gastronómica excepcional a cada cliente.",
                rotate: -2,
              },
              {
                emoji: "🌟",
                bg: "bg-collage-lime",
                title: "Nuestra Visión",
                desc: "Ser la marca referente de gastronomía coreana en Chile, donde millones disfruten de nuestros platos y experimenten la verdadera esencia de la cocina tradicional coreana.",
                rotate: 1,
              },
              {
                emoji: "❤️",
                bg: "bg-collage-pink",
                title: "Nuestros Valores",
                desc: "Autenticidad, calidad, pasión y compromiso con la satisfacción de nuestros clientes. Creemos en la excelencia en cada detalle.",
                rotate: -1,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-1"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <div className={`w-16 h-16 mb-5 rounded-2xl border-[3px] border-collage-ink ${item.bg} flex items-center justify-center text-3xl`}>
                  {item.emoji}
                </div>
                <h3 className="font-display font-semibold text-xl text-collage-ink mb-3">{item.title}</h3>
                <p className="text-collage-ink/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-white border-y-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink mb-3">
              ¿Por qué <span className="text-collage-orange">elegirnos</span>?
            </h2>
            <p className="font-script text-2xl text-collage-indigo">
              razones para amar Sabor Coreano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { emoji: "🔥", title: "Recetas Tradicionales", desc: "Técnicas auténticas transmitidas de generación en generación" },
              { emoji: "🌿", title: "Ingredientes Frescos", desc: "Seleccionados diariamente para garantizar la mejor calidad" },
              { emoji: "⚡", title: "Entrega Rápida", desc: "Tu pedido llega caliente y listo para disfrutar" },
              { emoji: "💰", title: "Precios Accesibles", desc: "Sabor premium sin romper tu bolsillo" },
              { emoji: "🤝", title: "Atención Personalizada", desc: "Te ayudamos a elegir según tus gustos y preferencias" },
              { emoji: "♻️", title: "Compromiso Sustentable", desc: "Packaging eco-friendly y prácticas responsables" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 p-6 bg-collage-cream rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-xl border-[3px] border-collage-ink bg-collage-lime flex items-center justify-center text-2xl">
                  {item.emoji}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-collage-ink mb-1">{item.title}</h3>
                  <p className="text-collage-ink/70">{item.desc}</p>
                </div>
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
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-white mb-4">¿Quieres probar nuestro sabor?</h2>
          <p className="font-script text-2xl md:text-3xl text-collage-lime mb-8 -rotate-1 inline-block">
            explora nuestro catálogo completo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center px-10 py-5 bg-collage-cream hover:bg-white text-collage-ink font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-lg"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-10 py-5 bg-collage-pink hover:bg-collage-orange text-white font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-lg"
            >
              Contáctanos
            </Link>
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
    </div>
  );
}
