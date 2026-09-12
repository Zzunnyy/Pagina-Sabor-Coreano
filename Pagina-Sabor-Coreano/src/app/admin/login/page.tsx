"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CollageSticker from "@/components/CollageSticker";
import { adminLogin, getSession, ApiError } from "@/lib/adminApi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (getSession()) {
      router.replace("/admin");
      return;
    }
    setCheckingSession(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await adminLogin(email.trim(), password);
      router.push("/admin");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-collage-ink relative overflow-hidden">
      <div className="absolute inset-0 text-white/5 halftone-dots pointer-events-none" />
      <div className="absolute top-0 -left-32 w-96 h-96 bg-collage-orange rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-collage-indigo rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="flex-1 container mx-auto px-6 py-10 flex items-center justify-center relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] p-8 md:p-10 relative">
            <div className="absolute -top-6 -right-4">
              <CollageSticker bg="bg-collage-lime" rotate={10}>
                Solo Staff 🔒
              </CollageSticker>
            </div>

            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-collage-orange border-[3px] border-collage-ink flex items-center justify-center text-2xl shadow-[4px_4px_0_0_var(--color-collage-ink)] -rotate-6">
                🔑
              </div>
              <h1 className="font-display font-semibold text-3xl md:text-4xl text-collage-ink mb-2">
                Panel del Dueño
              </h1>
              <p className="font-script text-2xl text-collage-indigo -rotate-2">
                acceso exclusivo para administradores
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  autoComplete="username"
                  placeholder="admin@saborcoreano.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:ring-2 focus:ring-collage-indigo/20 focus:border-collage-indigo transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                />
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:ring-2 focus:ring-collage-indigo/20 focus:border-collage-indigo transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border-2 border-red-400 rounded-xl">
                  <p className="text-sm font-semibold text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="block text-center w-full py-4 mt-2 bg-collage-indigo hover:bg-collage-pink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg disabled:opacity-60 disabled:pointer-events-none"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t-[3px] border-collage-ink border-dashed text-center">
              <Link href="/" className="font-display font-semibold text-collage-ink/70 hover:text-collage-indigo transition-colors text-sm">
                ← Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
