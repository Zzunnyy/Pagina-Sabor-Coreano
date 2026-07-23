"use client";

import Link from "next/link";

export default function UsuarioPedidos() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10 h-full flex flex-col min-h-[400px]">
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900 mb-2">
          Mis Pedidos
        </h1>
        <p className="text-gray-500">
          Tu historial de compras
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 border border-gray-100">
          🍜
        </div>
        <p className="text-gray-500 mb-8 leading-relaxed max-w-sm mx-auto">
          Aún no tienes pedidos registrados.
        </p>
        
        <Link 
          href="/"
          className="inline-flex justify-center items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-sm transition-all hover:bg-gray-800"
        >
          Explorar Catálogo
        </Link>
      </div>
    </div>
  );
}
