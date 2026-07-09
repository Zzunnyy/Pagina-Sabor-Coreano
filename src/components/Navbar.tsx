"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIES = [
  { slug: 'fermentados', label: 'Fermentados', emoji: '🥬', bg: 'bg-collage-pink' },
  { slug: 'instantaneos', label: 'Instantáneos', emoji: '🍜', bg: 'bg-collage-orange' },
  { slug: 'snacks', label: 'Snacks', emoji: '🍢', bg: 'bg-collage-lime' },
  { slug: 'bebidas', label: 'Bebidas', emoji: '🍶', bg: 'bg-collage-indigo' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-sm shadow-sm transition-colors border-b ${
      isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-6 md:px-8 py-3 md:py-4 flex justify-between items-center relative z-50 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl ${isDark ? 'bg-slate-800' : 'bg-red-50'}`}>
            🍜
          </div>
          <span 
            className={`text-lg md:text-xl font-black tracking-tight hidden sm:block transition-colors ${
              isDark ? 'text-slate-100' : 'text-black'
            }`}
          >
            Sabor Coreano
          </span>
        </Link>
      
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 font-semibold absolute left-1/2 -translate-x-1/2">
          <div className="group/menu relative">
            <Link
              href="/productos"
              className={`transition-colors duration-300 relative group ${
                isDark ? 'text-slate-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              Catalogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Mega menu de categorías */}
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-1 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-200">
              <div className="flex gap-2 p-3 bg-white border-[3px] border-collage-ink rounded-2xl shadow-[5px_5px_0_0_var(--color-collage-ink)]">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href="/productos"
                    className="flex flex-col items-center gap-2 px-3 py-2 rounded-xl hover:bg-collage-cream transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full border-2 border-collage-ink ${cat.bg} flex items-center justify-center text-lg`}>
                      {cat.emoji}
                    </div>
                    <span className="text-xs font-semibold text-collage-ink whitespace-nowrap">{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/nosotros" 
            className={`transition-colors duration-300 relative group ${
              isDark ? 'text-slate-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Sobre Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/contacto" 
            className={`transition-colors duration-300 relative group ${
              isDark ? 'text-slate-300 hover:text-red-500' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      
        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors text-xl ${
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
            title={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button 
            className="text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 active:scale-95 hover:shadow-md bg-red-600 hover:bg-red-700"
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle Mobile */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors text-xl ${
              isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button 
            className={`z-50 p-2 hover:rounded-lg transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div 
            className={`absolute top-full left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden transition-colors ${
              isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-gray-200'
            }`}
          >
            <nav className="flex flex-col gap-3 font-semibold">
              <Link
                href="/productos"
                onClick={() => setIsOpen(false)}
                className={`py-2 px-3 rounded-lg transition-all ${
                  isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-red-500' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                Catalogo
              </Link>
              <div className="flex flex-wrap gap-2 px-3 pb-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href="/productos"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-collage-ink bg-collage-cream text-xs font-semibold text-collage-ink"
                  >
                    <span>{cat.emoji}</span>{cat.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/nosotros" 
                onClick={() => setIsOpen(false)} 
                className={`py-2 px-3 rounded-lg transition-all ${
                  isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-red-500' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                Sobre Nosotros
              </Link>
              <Link 
                href="/contacto" 
                onClick={() => setIsOpen(false)} 
                className={`py-2 px-3 rounded-lg transition-all ${
                  isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-red-500' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                Contacto
              </Link>
            </nav>
            <button 
              className="w-full text-white px-6 py-3 rounded-xl font-semibold transition-all bg-red-600 hover:bg-red-700 active:scale-95 mt-4"
            >
              Iniciar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
