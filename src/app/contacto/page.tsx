"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CollageSticker from "@/components/CollageSticker";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos envío de formulario
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });

      // Reset después de 3 segundos
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-collage-cream">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-20 md:pt-28 md:pb-28 px-6 md:px-8 overflow-hidden border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="absolute top-10 -right-16 w-72 h-72 bg-collage-orange rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-collage-indigo rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-4 justify-center">
            <CollageSticker bg="bg-collage-pink" text="text-white" rotate={-6}>연락 · Contacto</CollageSticker>
            <CollageSticker bg="bg-collage-lime" rotate={4}>Escríbenos 💌</CollageSticker>
          </div>
          <div className="text-center">
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-none text-collage-ink mb-3">
              Ponte en <span className="text-collage-pink">Contacto</span>
            </h1>
            <p className="font-script text-2xl md:text-3xl text-collage-indigo -rotate-2 inline-block">
              estamos aquí para ti
            </p>
          </div>
        </div>
      </section>



      {/* Contact Info Cards */}
      <section className="relative w-full py-16 md:py-20 px-6 md:px-8 bg-white border-b-[3px] border-collage-ink">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "📍", bg: "bg-collage-orange", title: "Ubicación", info: "Santiago, Chile", desc: "Disponible para delivery en toda la región", rotate: -2 },
              { emoji: "📞", bg: "bg-collage-lime", title: "Teléfono", info: "+56 9 XXXX XXXX", desc: "Lunes a domingo, 11am - 10pm", rotate: 1 },
              { emoji: "📧", bg: "bg-collage-pink", title: "Email", info: "hola@saborcoreano.cl", desc: "Responderemos en menos de 24 horas", rotate: -1 },
            ].map((contact, idx) => (
              <div
                key={idx}
                className="p-8 bg-collage-cream rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)] transition-transform duration-300 hover:-translate-y-1 text-center"
                style={{ transform: `rotate(${contact.rotate}deg)` }}
              >
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl border-[3px] border-collage-ink ${contact.bg} flex items-center justify-center text-3xl`}>
                  {contact.emoji}
                </div>
                <h3 className="font-display font-semibold text-xl text-collage-ink mb-2">{contact.title}</h3>
                <p className="font-display font-semibold text-lg text-collage-indigo mb-2">{contact.info}</p>
                <p className="text-collage-ink/70 text-sm">{contact.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info Section */}
      <section className="relative w-full py-20 md:py-28 px-6 md:px-8 bg-collage-cream">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="p-8 md:p-10 bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)]">
              <CollageSticker bg="bg-collage-indigo" text="text-white" rotate={-4} className="mb-4">✏️ Escríbenos</CollageSticker>
              <h2 className="font-display font-semibold text-3xl text-collage-ink mb-8">Envíanos tu mensaje</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-collage-lime/30 border-[3px] border-collage-ink rounded-2xl">
                  <p className="text-collage-ink font-display font-semibold">✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink placeholder-collage-ink/40"
                    placeholder="+56 9 XXXX XXXX"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">Asunto</label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all font-medium text-collage-ink"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="menu">Pregunta sobre menú</option>
                    <option value="delivery">Información de delivery</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block font-display font-semibold text-sm text-collage-ink mb-2">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-collage-cream border-[3px] border-collage-ink rounded-xl focus:outline-none focus:border-collage-indigo focus:ring-2 focus:ring-collage-indigo/20 transition-all resize-none font-medium text-collage-ink placeholder-collage-ink/40"
                    placeholder="Tu mensaje..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-collage-indigo hover:bg-collage-pink disabled:bg-collage-ink/30 text-white font-display font-semibold rounded-full border-[3px] border-collage-ink shadow-[5px_5px_0_0_var(--color-collage-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-collage-ink)] active:translate-y-0 active:shadow-[3px_3px_0_0_var(--color-collage-ink)] text-lg"
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>

            {/* Right Column — Info */}
            <div className="flex flex-col gap-8">
              {/* Horarios */}
              <div className="p-8 bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)]">
                <CollageSticker bg="bg-collage-orange" text="text-white" rotate={-4} className="mb-4">🕐 Horarios</CollageSticker>
                <h2 className="font-display font-semibold text-2xl text-collage-ink mb-6">Horarios de Atención</h2>
                <div className="space-y-4">
                  {[
                    { day: "Lunes - Viernes", hours: "11:00 AM - 10:00 PM" },
                    { day: "Sábado", hours: "10:00 AM - 11:00 PM" },
                    { day: "Domingo", hours: "10:00 AM - 9:00 PM" }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-4 border-b-2 border-collage-ink/10 last:border-0">
                      <p className="font-display font-semibold text-collage-ink">{schedule.day}</p>
                      <CollageSticker bg="bg-collage-lime" rotate={0} className="text-xs">{schedule.hours}</CollageSticker>
                    </div>
                  ))}
                </div>
              </div>


              {/* FAQ Promo */}
              <div className="p-8 bg-collage-lime/30 rounded-[2rem] border-[3px] border-collage-ink shadow-[6px_6px_0_0_var(--color-collage-ink)]">
                <h3 className="font-display font-semibold text-xl text-collage-ink mb-3">¿Preguntas frecuentes?</h3>
                <p className="text-collage-ink/70 mb-4">Visita nuestra sección de FAQ para resolver dudas comunes</p>
                <Link href="#" className="font-display font-semibold text-collage-indigo hover:text-collage-pink transition-colors">
                  Ver FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
