"use client";

import CollageSticker from "@/components/CollageSticker";

const SECTIONS = [
  {
    title: "1. Aceptación de los Términos",
    body: "Al acceder y utilizar el sitio web de Sabor Coreano, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestro sitio ni nuestros servicios.",
  },
  {
    title: "2. Productos y Precios",
    body: "Todos los productos exhibidos están sujetos a disponibilidad. Los precios se muestran en la moneda local vigente e incluyen los impuestos aplicables, salvo que se indique lo contrario. Nos reservamos el derecho de modificar precios y disponibilidad sin previo aviso.",
  },
  {
    title: "3. Pedidos y Pagos",
    body: "Al realizar un pedido, recibirás una confirmación con el detalle de tu compra. Nos reservamos el derecho de rechazar o cancelar un pedido en caso de error en el precio, falta de stock, o sospecha de actividad fraudulenta.",
  },
  {
    title: "4. Envíos y Entregas",
    body: "Los plazos de entrega son estimados y pueden variar según la zona geográfica y la disponibilidad del producto. No nos hacemos responsables por retrasos causados por factores fuera de nuestro control, como condiciones climáticas o problemas logísticos de terceros.",
  },
  {
    title: "5. Cambios y Devoluciones",
    body: "Por tratarse de productos alimenticios, las devoluciones solo se aceptan en caso de productos defectuosos o entregados incorrectamente. Debes reportar cualquier problema dentro de las 24 horas siguientes a la recepción de tu pedido.",
  },
  {
    title: "6. Cuentas de Usuario",
    body: "Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, así como de todas las actividades realizadas bajo tu cuenta. Notifícanos de inmediato ante cualquier uso no autorizado.",
  },
  {
    title: "7. Propiedad Intelectual",
    body: "Todo el contenido de este sitio (textos, imágenes, logotipos, diseño) es propiedad de Sabor Coreano o de sus respectivos titulares, y está protegido por las leyes de propiedad intelectual vigentes.",
  },
  {
    title: "8. Limitación de Responsabilidad",
    body: "Sabor Coreano no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de nuestro sitio web o productos, en la máxima medida permitida por la ley aplicable.",
  },
  {
    title: "9. Modificaciones",
    body: "Podemos actualizar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigencia desde su publicación en esta página, por lo que te recomendamos revisarla periódicamente.",
  },
  {
    title: "10. Contacto",
    body: "Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de nuestra página de Contacto.",
  },
];

export default function Terminos() {
  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-collage-cream">
      <section className="relative w-full pt-16 pb-10 px-6 md:px-8 border-b-[3px] border-collage-ink">
        <div className="absolute inset-0 text-collage-ink/10 halftone-dots pointer-events-none" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <CollageSticker bg="bg-collage-indigo" text="text-white" rotate={-4}>
              📜 Legal
            </CollageSticker>
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-5xl text-collage-ink mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-collage-ink/60 text-sm">
            Última actualización: septiembre de 2026
          </p>
        </div>
      </section>

      <section className="relative w-full py-14 px-6 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-[2rem] border-[3px] border-collage-ink shadow-[8px_8px_0_0_var(--color-collage-ink)] p-8 md:p-12 flex flex-col gap-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-semibold text-xl text-collage-ink mb-2">
                  {section.title}
                </h2>
                <p className="text-collage-ink/70 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
