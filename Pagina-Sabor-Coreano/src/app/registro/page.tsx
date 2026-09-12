"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CollageSticker from "@/components/CollageSticker";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegistroErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function Registro() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<RegistroErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: RegistroErrors = {};
    if (!name.trim()) {
      newErrors.name = "Ingresa tu nombre completo.";
    }
    if (!email.trim()) {
      newErrors.email = "Ingresa tu correo electrónico.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      router.push("/usuario");
    }
  };

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

            {/* Formulario */}
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                    }`}
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm font-medium text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                    }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm font-medium text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                    }`}
                />
                {errors.password ? (
                  <p className="mt-1.5 text-sm font-medium text-red-500">{errors.password}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-collage-ink/50">Mínimo 8 caracteres.</p>
                )}
              </div>

              <button
                type="submit"
                className="block text-center w-full py-4 mt-6 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
              >
                Registrarme
              </button>
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
