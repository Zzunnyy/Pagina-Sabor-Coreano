"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`flex flex-col font-sans w-full relative overflow-hidden transition-colors ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      {/* Hero Section - Estilo Yeppo */}
      <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-8 overflow-hidden">
        {/* Decorative background elements subtle */}
        <div className={`absolute top-0 right-0 w-96 h-96 ${isDark ? 'bg-red-500/10' : 'bg-red-500/5'} rounded-full blur-3xl pointer-events-none`}></div>
        <div className={`absolute bottom-0 left-0 w-80 h-80 ${isDark ? 'bg-amber-500/10' : 'bg-amber-500/5'} rounded-full blur-3xl pointer-events-none`}></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 w-fit">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Auténtico Sabor Coreano</span>
              </div>
              
              {/* Main Heading */}
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                Sabor Coreano<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">en tu puerta</span>
              </h1>
              
              {/* Description */}
              <p className={`text-lg md:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-md leading-relaxed font-medium`}>
                Descubre los mejores platillos coreanos, preparados con ingredientes frescos y el calor de las recetas tradicionales.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/productos" className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 active:scale-95">
                  Ver Catalogo
                </Link>
                
                <Link href="/nosotros" className={`inline-flex items-center justify-center px-8 py-4 border-2 ${isDark ? 'border-slate-600 hover:border-red-400 text-white hover:text-red-400 hover:bg-slate-800' : 'border-gray-300 hover:border-red-600 text-gray-900 hover:text-red-600 hover:bg-red-50'} font-bold rounded-2xl transition-all duration-300`}>
                  Nuestra Historia
                </Link>
              </div>
            </div>
            
            {/* Right Image Section */}
            <div className="relative h-96 md:h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src="/Imagenes/Logo.png" 
                  alt="Sabor Coreano Logo" 
                  fill
                  className={`object-contain ${isDark ? 'drop-shadow-2xl' : 'drop-shadow-xl'}`}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`relative w-full py-20 md:py-32 px-6 md:px-8 bg-gradient-to-b ${isDark ? 'from-slate-800 to-slate-900 border-slate-700' : 'from-gray-50 to-white border-gray-200'} border-t transition-colors`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-black'} mb-4`}>¿Por qué elegir Sabor Coreano?</h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>Combinamos tradición, calidad y rapidez</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: "🔥", 
                title: "Recetas Auténticas", 
                desc: "Preparadas con técnicas tradicionales coreanas y pasión por la gastronomía" 
              },
              { 
                icon: "🌟", 
                title: "Ingredientes Premium", 
                desc: "Seleccionados especialmente de Corea del Sur con máxima calidad" 
              },
              { 
                icon: "⚡", 
                title: "Entrega Rápida", 
                desc: "Servicio de delivery rápido para que disfrutes caliente en casa" 
              }
            ].map((feature, idx) => (
              <div key={idx} className={`group p-8 ${isDark ? 'bg-slate-800 shadow-md hover:shadow-lg' : 'bg-white shadow-sm hover:shadow-xl'} rounded-2xl transition-all duration-300 border ${isDark ? 'border-slate-700 hover:border-red-600' : 'border-gray-200 hover:border-red-200'}`}>
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-3`}>{feature.title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-24 md:py-32 px-6 md:px-8 bg-gradient-to-r from-red-600 to-red-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">¿Listo para probar?</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">Explora nuestro catalogo completo y descubre tus platos favoritos</p>
          
          <Link href="/productos" className="inline-flex items-center justify-center px-10 py-5 bg-white hover:bg-gray-100 text-red-600 font-bold rounded-2xl transition-all duration-300 text-lg hover:shadow-lg active:scale-95">
            Explorar Catalogo Completo
          </Link>
        </div>
      </section>
    </div>
  );
}
