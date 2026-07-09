"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Nosotros() {
  const { isDark } = useTheme();

  return (
    <div className={`flex flex-col w-full transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`relative w-full pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-8 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-black'} mb-6`}>
              Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Historia</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Pasión, tradición y el sabor auténtico de Corea
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className={`w-full py-20 md:py-32 px-6 md:px-8 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative h-96 md:h-[500px] order-last md:order-first">
              <Image
                src="/Imagenes/Logo.png"
                alt="Logo Sabor Coreano"
                fill
                className="object-contain"
              />
            </div>

            <div className="flex flex-col gap-6">
              <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-black'}`}>¿Cómo empezó todo?</h2>
              <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Todo parte en los pasillos de estudiantes hambrientos, nos dimos cuenta que faltaban opciones de comida rica y rápida.
                Una chispa de novedad para los bajones.
                Así nace sabor coreano, queriendo innovar y traer a nuestras zonas universitarias sabores asiaticos autenticos y virales.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className={`w-full py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b ${isDark ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-white'}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-black'} mb-16 text-center`}>Quiénes Somos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Misión */}
            <div className={`p-8 ${isDark ? 'bg-slate-800 shadow-md hover:shadow-lg' : 'bg-white shadow-md hover:shadow-lg'} rounded-2xl transition-all duration-300 border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="text-5xl mb-4">🎯</div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4`}>Nuestra Misión</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Ofrecer auténticos sabores coreanos con ingredientes de primera calidad, manteniendo la tradición y ofreciendo una experiencia gastronómica excepcional a cada cliente.
              </p>
            </div>

            {/* Visión */}
            <div className={`p-8 ${isDark ? 'bg-slate-800 shadow-md hover:shadow-lg' : 'bg-white shadow-md hover:shadow-lg'} rounded-2xl transition-all duration-300 border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="text-5xl mb-4">🌟</div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4`}>Nuestra Visión</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Ser la marca referente de gastronomía coreana en Chile, donde millones disfruten de nuestros platos y experimenten la verdadera esencia de la cocina tradicional coreana.
              </p>
            </div>

            {/* Valores */}
            <div className={`p-8 ${isDark ? 'bg-slate-800 shadow-md hover:shadow-lg' : 'bg-white shadow-md hover:shadow-lg'} rounded-2xl transition-all duration-300 border ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="text-5xl mb-4">❤️</div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4`}>Nuestros Valores</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                Autenticidad, calidad, pasión y compromiso con la satisfacción de nuestros clientes. Creemos en la excelencia en cada detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`w-full py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b ${isDark ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-white'}`}>
        <div className="container mx-auto max-w-6xl">
          <h2 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-black'} mb-16 text-center`}>¿Por qué elegirnos?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "✓", title: "El Stick más Viral", desc: "Traemos la moda a tu mesa" },
              { icon: "✓", title: "Comodidad Total", desc: "Pides desde tu celular y llega a tu puerta o universidad" },
              { icon: "✓", title: "Atención Personalizada", desc: "Te asesoramos si no sabes que ramen elegir poniendole cariño a cada empaque" },
              { icon: "✓", title: "Texto generico", desc: "Texto generico" },
              { icon: "✓", title: "Texto generico", desc: "Texto generico" },
              { icon: "✓", title: "Texto generico", desc: "Texto generico" }
            ].map((item, idx) => (
              <div key={idx} className={`flex gap-4 p-6 ${isDark ? 'bg-slate-800 hover:border-red-500 border-slate-700' : 'bg-white hover:border-red-600 border-gray-200'} rounded-xl border transition-all duration-300`}>
                <div className="text-2xl text-red-600 font-bold flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{item.title}</h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-32 px-6 md:px-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¿Quieres probar nuestro sabor?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Explora nuestro catalogo y descubre por qué somos los favoritos de miles de clientes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos" className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-gray-100 text-red-600 font-bold rounded-2xl transition-all duration-300 text-lg">
              Ver Catalogo
            </Link>
            <Link href="/contacto" className="inline-flex items-center justify-center px-10 py-4 bg-red-500 hover:bg-red-800 text-white font-bold rounded-2xl transition-all duration-300 text-lg border-2 border-white">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
