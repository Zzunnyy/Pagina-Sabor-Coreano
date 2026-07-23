"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">

          {/* Sidebar */}
          <aside className="w-full md:w-72 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-2">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-4xl mb-3 border border-gray-200 shadow-sm">
                  F
                </div>
                <h2 className="font-bold text-lg text-gray-900 mb-4">Usuario de Prueba</h2>
                <div className="h-px w-full bg-gray-200"></div>
              </div>
              <Link
                href="/usuario"
                className={`block text-left w-full px-4 py-3 rounded-xl font-medium transition-colors ${pathname === "/usuario"
                  ? "bg-white text-gray-900 border border-gray-200 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                  }`}
              >
                👤 Perfil
              </Link>
              <Link
                href="/usuario/pedidos"
                className={`block text-left w-full px-4 py-3 rounded-xl font-medium transition-colors ${pathname === "/usuario/pedidos"
                  ? "bg-white text-gray-900 border border-gray-200 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent"
                  }`}
              >
                📜 Historial
              </Link>
              <button
                className="text-left w-full px-4 py-3 text-red-600 rounded-xl font-medium transition-colors hover:bg-red-50 border border-transparent"
                onClick={() => setShowLogoutModal(true)}
              >
                🚪 Cerrar Sesión
              </button>
            </div>

            <Link
              href="/"
              className="block text-center w-full px-6 py-4 bg-gray-900 text-white font-semibold rounded-2xl shadow-sm hover:bg-gray-800 hover:-translate-y-0.5 transition-all"
            >
              Hacer Pedido 🍜
            </Link>
          </aside>

          {/* Contenido Principal */}
          <main className="flex-1">
            {children}
          </main>

        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-red-100">
                🚪
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cerrar Sesión?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                ¿Estás seguro de que deseas salir? Tendrás que volver a iniciar sesión para ver tus pedidos.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <Link 
                href="/"
                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-sm hover:bg-red-700 transition-colors flex justify-center items-center"
              >
                Sí, cerrar
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
