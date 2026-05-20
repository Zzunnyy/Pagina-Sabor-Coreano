"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Contacto() {
  const { isDark } = useTheme();
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
    <div className={`flex flex-col w-full transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`relative w-full pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-8 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className={`text-5xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-black'} mb-6`}>
              Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Contacto</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Estamos aquí para resolver tus dudas y atender tus sugerencias
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`w-full py-20 md:py-32 px-6 md:px-8 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {[
              { icon: "📍", title: "Ubicación", info: "Santiago, Chile", desc: "Disponible para delivery en toda la región" },
              { icon: "📞", title: "Teléfono", info: "+56 9 XXXX XXXX", desc: "Lunes a domingo, 11am - 10pm" },
              { icon: "📧", title: "Email", info: "hola@saborcoreano.cl", desc: "Responderemos en menos de 24 horas" }
            ].map((contact, idx) => (
              <div key={idx} className={`p-8 bg-gradient-to-br ${isDark ? 'from-slate-800 to-slate-700' : 'from-gray-50 to-white'} rounded-2xl border ${isDark ? 'border-slate-700 hover:shadow-lg' : 'border-gray-200 hover:shadow-lg'} transition-all duration-300 text-center`}>
                <div className="text-5xl mb-4">{contact.icon}</div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-2`}>{contact.title}</h3>
                <p className="text-lg font-semibold text-red-600 mb-2">{contact.info}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{contact.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'} mb-8`}>Envíanos tu mensaje</h2>
              
              {submitted && (
                <div className={`mb-6 p-4 ${isDark ? 'bg-green-900/30 border-green-700' : 'bg-green-100 border-green-300'} border rounded-xl`}>
                  <p className={`${isDark ? 'text-green-400' : 'text-green-700'} font-semibold`}>✓ ¡Mensaje enviado exitosamente! Te contactaremos pronto.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'}`}
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'}`}
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Teléfono (opcional)</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'}`}
                    placeholder="+56 9 XXXX XXXX"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Asunto</label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    aria-label="Selecciona un asunto"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="pedido">Consulta sobre pedido</option>
                    <option value="catalogo">Pregunta sobre catalogo</option>
                    <option value="delivery">Información de delivery</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-black'} mb-2`}>Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-black placeholder-gray-400'}`}
                    placeholder="Tu mensaje..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-all duration-300 text-lg"
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>

            {/* Information */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'} mb-6`}>Horarios de Atención</h2>
                <div className={`space-y-4 p-8 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
                  {[
                    { day: "Lunes - Viernes", hours: "11:00 AM - 10:00 PM" },
                    { day: "Sábado", hours: "10:00 AM - 11:00 PM" },
                    { day: "Domingo", hours: "10:00 AM - 9:00 PM" }
                  ].map((schedule, idx) => (
                    <div key={idx} className={`flex justify-between items-center pb-4 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'} last:border-0`}>
                      <p className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>{schedule.day}</p>
                      <p className="text-red-600 font-bold">{schedule.hours}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes Sociales */}
              <div>
                <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-black'} mb-6`}>Síguenos</h2>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { icon: "📘", name: "Facebook" },
                    { icon: "📷", name: "Instagram" },
                    { icon: "🐦", name: "Twitter" },
                    { icon: "🎵", name: "TikTok" }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className={`aspect-square rounded-xl flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 ${isDark ? 'bg-slate-800 hover:bg-red-600 hover:text-white' : 'bg-gray-100 hover:bg-red-600 hover:text-white'}`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Promo */}
              <div className={`p-8 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-gradient-to-br from-red-50 to-white border-red-200'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-3`}>¿Preguntas frecuentes?</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Visita nuestra sección de FAQ para resolver dudas comunes</p>
                <Link href="#" className={`${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} font-bold`}>
                  Ver FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`w-full py-24 md:py-32 px-6 md:px-8 bg-gradient-to-r from-red-600 to-red-700 border-t border-red-800`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            ¿No encontraste lo que buscas?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Nuestro equipo está disponible para ayudarte
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+56912345678" className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-gray-100 text-red-600 font-bold rounded-2xl transition-all duration-300 text-lg">
              Llamar Ahora
            </a>
            <a href="mailto:hola@saborcoreano.cl" className="inline-flex items-center justify-center px-10 py-4 bg-red-500 hover:bg-red-800 text-white font-bold rounded-2xl transition-all duration-300 text-lg border-2 border-white">
              Enviar Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
