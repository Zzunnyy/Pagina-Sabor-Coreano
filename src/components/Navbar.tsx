"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur-sm shadow-sm transition-colors border-b ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-gray-200'
      }`}>
      <div className="container mx-auto px-6 md:px-8 py-3 md:py-4 flex justify-between items-center relative z-50 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl ${isDark ? 'bg-slate-800' : 'bg-red-50'}`}>
            🍜
          </div>
          <span
            className={`text-lg md:text-xl font-black tracking-tight hidden sm:block transition-colors ${isDark ? 'text-slate-100' : 'text-black'
              }`}
          >
            Sabor Coreano
          </span>
        </Link>
        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
          >
            <img src="/iconos/whatsapp.webp" alt="WhatsApp" className="w-6 h-6 object-contain" />
            Contáctanos
          </a>
          <Link
            href="/login"
            className="px-6 py-2.5 bg-collage-indigo hover:bg-collage-pink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors text-xl ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <button
            className={`z-50 p-2 hover:rounded-lg transition-colors ${isDark ? 'text-white' : 'text-black'
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
            className={`absolute top-full left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden transition-colors ${isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-gray-200'
              }`}
          >
            <nav className="flex flex-col gap-3 font-semibold">
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className={`py-2 px-3 rounded-lg transition-all ${isDark ? 'text-slate-300 hover:bg-slate-800 hover:text-red-500' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
              >
                Contacto
              </Link>
            </nav>
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all bg-green-500 hover:bg-green-600 active:scale-95"
              >
                <img src="/iconos/whatsapp.webp" alt="WhatsApp" className="w-6 h-6 object-contain" />
                Contáctanos
              </a>
              <button
                className="w-full text-white px-6 py-3 rounded-xl font-semibold transition-all bg-red-600 hover:bg-red-700 active:scale-95"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
