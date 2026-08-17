"use client";

import Link from "next/link";
import CollageSticker from "@/components/CollageSticker";
import { useState } from "react";

export default function Login() {
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChange = () => {
    setView("login");
    setPasswordChanged(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-collage-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
      <div className="absolute top-0 -left-32 w-96 h-96 bg-collage-orange rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-collage-lime rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="flex-1 container mx-auto px-6 py-10 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_var(--color-collage-ink)] p-8 md:p-10 relative">

            {/* Stickers / Decoraciones */}
            <div className="absolute -top-6 -right-4">
              <CollageSticker bg="bg-collage-pink" text="text-white" rotate={12}>
                ¡Hola! 👋
              </CollageSticker>
            </div>

            <div className="absolute -left-6 top-12">
              <div className="w-12 h-12 bg-collage-lime rounded-full border-[3px] border-collage-ink flex items-center justify-center text-xl shadow-[3px_3px_0_0_var(--color-collage-ink)] -rotate-12">
                🍜
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display font-semibold text-3xl md:text-4xl text-collage-ink mb-2">
                {view === "login" ? "Bienvenido" : view === "forgot" ? "Recuperar Contraseña" : "Nueva Contraseña"}
              </h1>
              <p className="font-script text-2xl text-collage-indigo -rotate-2">
                {view === "login" ? "inicia sesión para continuar" : view === "forgot" ? "código de seguridad" : "crea tu nueva contraseña"}
              </p>
            </div>

            {/* Mensaje de Éxito al cambiar contraseña */}
            {passwordChanged && view === "login" && (
              <div className="p-4 bg-collage-lime/30 border-2 border-collage-lime border-dashed rounded-xl mb-6 text-center">
                <p className="text-collage-ink font-semibold text-sm">
                  ¡Tu contraseña ha sido cambiada con éxito! Ya puedes iniciar sesión.
                </p>
              </div>
            )}

            {/* Formulario (Visual) */}
            {view === "login" && (
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                  <div className="flex justify-between items-center mb-2">
                    <label className="block font-display font-semibold text-sm text-collage-ink">
                      Contraseña
                    </label>
                    <button type="button" onClick={() => { setView("forgot"); setPasswordChanged(false); }} className="text-sm font-semibold text-collage-indigo hover:text-collage-pink transition-colors">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                  />
                </div>

                <Link
                  href="/usuario"
                  className="block text-center w-full py-4 mt-4 bg-collage-indigo hover:bg-collage-pink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  Ingresar
                </Link>
              </form>
            )}

            {view === "forgot" && (
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="p-4 bg-collage-lime/20 border-2 border-collage-lime border-dashed rounded-xl mb-4 text-center">
                  <p className="text-collage-ink font-medium text-sm">
                    Hemos enviado un código a tu correo electrónico. Ingrésalo abajo para restablecer tu contraseña.
                  </p>
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                    Código de Seguridad
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 123456"
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40 text-center tracking-widest text-lg"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setView("reset")}
                  className="block text-center w-full py-4 mt-4 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  Verificar código de seguridad
                </button>
              </form>
            )}

            {view === "reset" && (
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                  />
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                  />
                </div>

                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="block text-center w-full py-4 mt-4 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  Cambiar Contraseña
                </button>
              </form>
            )}

            <div className="mt-8 pt-6 border-t-[3px] border-collage-ink border-dashed text-center">
              {view === "login" ? (
                <p className="text-collage-ink/70 font-medium">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/registro" className="font-display font-semibold text-collage-orange hover:text-collage-pink transition-colors">
                    Regístrate aquí
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
