import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-collage-cream text-center px-6">
      <span className="text-7xl mb-4">🥢</span>
      <h1 className="font-display font-semibold text-4xl text-collage-ink mb-2">
        404 — Página no encontrada
      </h1>
      <p className="text-collage-ink/70 mb-8 max-w-sm">
        Parece que esta página se perdió en el camino de entrega.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-collage-indigo text-white font-display font-semibold rounded-xl border-[3px] border-collage-ink shadow-[4px_4px_0_0_var(--color-collage-ink)] transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-collage-ink)]"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
