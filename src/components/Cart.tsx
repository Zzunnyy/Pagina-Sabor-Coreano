"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Cart() {
  const {
    items,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-collage-indigo text-white rounded-full flex items-center justify-center border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-all active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)]"
        aria-label="Abrir carrito"
      >
        <span className="text-2xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-collage-pink text-white w-7 h-7 rounded-full flex items-center justify-center font-display font-bold border-2 border-collage-ink shadow-[2px_2px_0_0_var(--color-collage-ink)] text-sm">
            {cartCount}
          </span>
        )}
      </button>

      {/* Overlay Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-collage-ink/40 backdrop-blur-sm z-[70] transition-opacity"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-collage-cream border-l-[3px] border-collage-ink shadow-[-8px_0_0_0_rgba(0,0,0,0.1)] z-[80] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-[3px] border-collage-ink bg-white">
          <h2 className="font-display font-semibold text-2xl text-collage-ink flex items-center gap-3">
            <span>Tu Pedido</span>
            <span className="bg-collage-lime text-collage-ink text-sm px-3 py-1 rounded-full border-2 border-collage-ink">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </h2>
          <button
            onClick={toggleCart}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-collage-ink hover:text-red-500 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-collage-cream/50 relative">
          <div className="absolute inset-0 text-collage-ink/5 halftone-dots pointer-events-none" />
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center relative z-10 opacity-70">
              <span className="text-6xl mb-4">🥡</span>
              <p className="font-display text-xl text-collage-ink font-semibold">Tu carrito está vacío</p>
              <p className="text-collage-ink/70">¡Agrega algo delicioso!</p>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)]"
                >
                  <div className="w-20 h-20 shrink-0 bg-collage-orange/20 rounded-xl border-2 border-collage-ink overflow-hidden flex items-center justify-center text-3xl">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      "🍜"
                    )}
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-display font-semibold text-collage-ink leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-collage-indigo">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border-2 border-collage-ink/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-[3px] border-collage-ink bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-collage-ink/70 font-medium">Subtotal</span>
            <span className="font-display font-semibold text-2xl text-collage-ink">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full py-4 bg-collage-orange text-white font-display font-semibold text-xl rounded-2xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--color-collage-ink)] disabled:opacity-50 disabled:pointer-events-none"
          >
            Ir a Pagar
          </button>
        </div>
      </div>
    </>
  );
}
