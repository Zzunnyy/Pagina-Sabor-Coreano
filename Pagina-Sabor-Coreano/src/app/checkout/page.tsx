"use client";

import Link from "next/link";
import { useState } from "react";
import CollageSticker from "@/components/CollageSticker";
import { useCart } from "@/context/CartContext";
import { getProductVisual } from "@/lib/productVisuals";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ShippingErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

function generateOrderNumber() {
  return `SC-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<ShippingErrors>({});
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ShippingErrors = {};
    if (!name.trim()) newErrors.name = "Ingresa tu nombre completo.";
    if (!email.trim()) {
      newErrors.email = "Ingresa tu correo electrónico.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (!phone.trim()) newErrors.phone = "Ingresa un teléfono de contacto.";
    if (!address.trim()) newErrors.address = "Ingresa tu dirección de entrega.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setOrderNumber(generateOrderNumber());
      clearCart();
    }
  };

  // Pedido confirmado
  if (orderNumber) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-collage-cream text-center px-6 py-16">
        <span className="text-7xl mb-6">🎉</span>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-collage-ink mb-3">
          ¡Pedido Confirmado!
        </h1>
        <p className="text-collage-ink/70 max-w-md mb-2">
          Gracias, {name}. Tu pedido fue registrado y lo prepararemos con mucho sabor.
        </p>
        <div className="mt-4 mb-8">
          <CollageSticker bg="bg-collage-lime" rotate={-2}>
            N° de Pedido: {orderNumber}
          </CollageSticker>
        </div>
        <Link
          href="/productos"
          className="px-8 py-4 bg-collage-indigo text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)]"
        >
          Seguir Comprando
        </Link>
      </div>
    );
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-collage-cream text-center px-6">
        <span className="text-6xl mb-4">🥡</span>
        <h1 className="font-display font-semibold text-3xl text-collage-ink mb-2">
          Tu carrito está vacío
        </h1>
        <p className="text-collage-ink/70 mb-8">
          Agrega productos antes de continuar con el pago.
        </p>
        <Link
          href="/productos"
          className="px-6 py-3 bg-collage-indigo text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)]"
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      <section className="relative w-full py-14 px-6 md:px-8">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-collage-ink mb-10 text-center">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Shipping Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-3 bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_var(--color-collage-ink)] p-6 md:p-8 space-y-5 h-max"
            >
              <h2 className="font-display font-semibold text-xl text-collage-ink mb-2">
                Datos de Envío
              </h2>

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
                {errors.name && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.name}</p>}
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
                {errors.email && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                    }`}
                />
                {errors.phone && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-collage-ink mb-2">
                  Dirección de Entrega
                </label>
                <input
                  type="text"
                  placeholder="Calle, número, comuna"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                  className={`w-full px-4 py-3 bg-collage-cream border-[3px] rounded-xl focus:outline-none focus:ring-2 transition-all font-medium text-collage-ink placeholder-collage-ink/40 ${errors.address
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-collage-ink focus:border-collage-indigo focus:ring-collage-indigo/20"
                    }`}
                />
                {errors.address && <p className="mt-1.5 text-sm font-medium text-red-500">{errors.address}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 mt-2 bg-collage-orange text-white font-display font-semibold text-lg rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
              >
                Confirmar Pedido
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_var(--color-collage-ink)] p-6 md:p-8 h-max">
              <h2 className="font-display font-semibold text-xl text-collage-ink mb-6">
                Resumen del Pedido
              </h2>

              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => {
                  const { emoji } = getProductVisual(item.id, item.name);
                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 shrink-0 bg-collage-orange/20 rounded-lg border-2 border-collage-ink overflow-hidden flex items-center justify-center text-xl">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          emoji
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-display font-semibold text-sm text-collage-ink leading-tight">
                          {item.name}
                        </p>
                        <p className="text-xs text-collage-ink/60">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-collage-indigo text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t-[3px] border-dashed border-collage-ink/20 flex items-center justify-between">
                <span className="text-collage-ink/70 font-medium">Total</span>
                <span className="font-display font-bold text-2xl text-collage-ink">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
