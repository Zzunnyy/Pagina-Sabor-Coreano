"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CollageSticker from "@/components/CollageSticker";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LoginErrors {
  email?: string;
  password?: string;
}

interface ForgotErrors {
  code?: string;
}

interface ResetErrors {
  newPassword?: string;
  confirmPassword?: string;
}

export default function Login() {
  const router = useRouter();
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({});

  const [code, setCode] = useState("");
  const [forgotErrors, setForgotErrors] = useState<ForgotErrors>({});

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetErrors, setResetErrors] = useState<ResetErrors>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: LoginErrors = {};
    if (!email.trim()) {
      errors.email = "Ingresa tu correo electrónico.";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Ingresa un correo electrónico válido.";
    }
    if (!password) {
      errors.password = "Ingresa tu contraseña.";
    }

    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      router.push("/usuario");
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: ForgotErrors = {};
    if (!/^\d{6}$/.test(code)) {
      errors.code = "Ingresa el código de 6 dígitos que enviamos a tu correo.";
    }

    setForgotErrors(errors);
    if (Object.keys(errors).length === 0) {
      setView("reset");
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: ResetErrors = {};
    if (newPassword.length < 8) {
      errors.newPassword = "La contraseña debe tener al menos 8 caracteres.";
    }
    if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setResetErrors(errors);
    if (Object.keys(errors).length === 0) {
      setView("login");
      setPasswordChanged(true);
      setPassword("");
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
      setForgotErrors({});
      setResetErrors({});
    }
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

            {/* Formulario de Login */}
            {view === "login" && (
              <form className="space-y-5" onSubmit={handleLoginSubmit} noValidate>
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
                      if (loginErrors.email) setLoginErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${loginErrors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                      }`}
                  />
                  {loginErrors.email && (
                    <p className="mt-1.5 text-sm font-medium text-red-500">{loginErrors.email}</p>
                  )}
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
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginErrors.password) setLoginErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${loginErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                      }`}
                  />
                  {loginErrors.password && (
                    <p className="mt-1.5 text-sm font-medium text-red-500">{loginErrors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="block text-center w-full py-4 mt-4 bg-collage-indigo hover:bg-collage-pink text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  Ingresar
                </button>
              </form>
            )}

            {view === "forgot" && (
              <form className="space-y-5" onSubmit={handleForgotSubmit} noValidate>
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
                    inputMode="numeric"
                    placeholder="Ej: 123456"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (forgotErrors.code) setForgotErrors({});
                    }}
                    className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 text-center tracking-widest text-lg ${forgotErrors.code
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                      }`}
                  />
                  {forgotErrors.code && (
                    <p className="mt-1.5 text-sm font-medium text-red-500 text-center">{forgotErrors.code}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="block text-center w-full py-4 mt-4 bg-collage-lime hover:bg-collage-orange text-collage-ink hover:text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] text-lg"
                >
                  Verificar código de seguridad
                </button>
              </form>
            )}

            {view === "reset" && (
              <form className="space-y-5" onSubmit={handleResetSubmit} noValidate>
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (resetErrors.newPassword) setResetErrors((prev) => ({ ...prev, newPassword: undefined }));
                    }}
                    className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${resetErrors.newPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                      }`}
                  />
                  {resetErrors.newPassword && (
                    <p className="mt-1.5 text-sm font-medium text-red-500">{resetErrors.newPassword}</p>
                  )}
                </div>
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (resetErrors.confirmPassword) setResetErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${resetErrors.confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                      }`}
                  />
                  {resetErrors.confirmPassword && (
                    <p className="mt-1.5 text-sm font-medium text-red-500">{resetErrors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
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
