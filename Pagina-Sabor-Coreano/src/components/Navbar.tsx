"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm shadow-sm transition-colors border-b bg-white border-gray-200">
      <div className="container mx-auto px-6 md:px-8 py-3 md:py-4 flex justify-between items-center relative z-50 max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-xl md:text-2xl bg-red-50 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
            🍜
          </div>
          <span className="hidden sm:inline-flex items-center px-4 py-2 bg-collage-orange text-white font-display font-semibold text-lg md:text-xl tracking-tight rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] group-active:translate-y-0 group-active:shadow-[2px_2px_0_0_var(--color-collage-ink)]">
            Sabor Coreano
          </span>
        </Link>
        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-4">
            <Link
              href="/nosotros"
              className="px-6 py-2.5 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="px-6 py-2.5 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
            >
              Contacto
            </Link>
          </nav>
          <Link
            href="/productos"
            className="px-6 py-2.5 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
          >
            Productos
          </Link>
          <Link
            href="/admin"
            className="px-6 py-2.5 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
          >
            Panel Admin
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 bg-collage-indigo hover:bg-collage-pink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
          >
            Iniciar Sesión
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            className="z-50 p-2 hover:rounded-lg transition-colors text-black"
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
          <div className="absolute top-full left-0 w-full border-b p-6 flex flex-col gap-4 md:hidden transition-colors bg-white border-gray-200">
            <nav className="flex flex-col gap-3 font-semibold">
              <Link
                href="/productos"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-lg transition-all text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Productos
              </Link>
              <Link
                href="/nosotros"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-lg transition-all text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="py-2 px-3 rounded-lg transition-all text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                Contacto
              </Link>
            </nav>
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-white px-6 py-3 rounded-xl font-semibold transition-all bg-red-600 hover:bg-red-700 active:scale-95"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
