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




    </div>
  );
}
