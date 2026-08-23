"use client";

import Link from "next/link";
import CollageSticker from "@/components/CollageSticker";

export default function Registro() {
  return (
    <div className="min-h-screen flex flex-col bg-collage-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
      <div className="absolute top-0 -right-32 w-96 h-96 bg-collage-pink rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-collage-lime rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="flex-1 container mx-auto px-6 py-10 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_var(--color-collage-ink)] p-8 md:p-10 relative">

            {/* Stickers / Decoraciones */}
            <div className="absolute -top-6 -left-4">
              <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-10}>
                ¡Nuevo!
              </CollageSticker>
            </div>

            <div className="absolute -right-6 top-12">
              <div className="w-12 h-12 bg-collage-orange rounded-full border-[3px] border-collage-ink flex items-center justify-center text-xl shadow-[3px_3px_0_0_var(--color-collage-ink)] rotate-12">
                🍜
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display font-semibold text-3xl md:text-4xl text-collage-ink mb-2">
                Crear Cuenta
              </h1>
              <p className="font-script text-2xl text-collage-indigo rotate-2">
                únete a nosotros
              </p>
            </div>

            {/* Formulario (Visual) */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                />
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                />
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                />
              </div>

              <Link
                href="/usuario"
                className="block text-center w-full py-4 mt-6 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
              >
                Registrarme
              </Link>
            </form>

            <div className="mt-8 pt-6 border-t-[3px] border-collage-ink border-dashed text-center">
              <p className="text-collage-ink/70 font-medium">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="font-display font-semibold text-collage-pink hover:text-collage-indigo transition-colors">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
