"use client";

import { useAuth } from "@/context/AuthContext";

export default function UsuarioPerfil() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
      <div className="mb-8">
        <h1 className="font-bold text-3xl text-gray-900 mb-2">
          Mi Perfil
        </h1>
        <p className="text-gray-500">
          Tus datos personales
        </p>
      </div>

      <div className="space-y-6">
        {/* Nombre */}
        <div className="p-5 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="font-medium text-sm text-gray-500 mb-1">Nombre Completo</p>
          <p className="font-semibold text-lg text-gray-900">{user.name}</p>
        </div>

        {/* Email */}
        <div className="p-5 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="font-medium text-sm text-gray-500 mb-1">Correo Electrónico</p>
          <p className="font-semibold text-lg text-gray-900">{user.email}</p>
        </div>

        {/* Teléfono */}
        <div className="p-5 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="font-medium text-sm text-gray-500 mb-1">Número de Teléfono</p>
          <p className="font-semibold text-lg text-gray-900">{user.telefono ?? "No registrado"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <button
          className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-sm transition-all hover:bg-gray-800 cursor-default"
          onClick={(e) => e.preventDefault()}
        >
          Editar Datos
        </button>
      </div>
    </div>
  );
}
