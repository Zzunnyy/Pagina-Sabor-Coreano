import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d1112] text-white">
      <div className="container mx-auto px-6 md:px-12 py-8 max-w-7xl flex flex-col gap-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl">🍜</span>
            <span className="text-lg md:text-xl font-bold tracking-widest uppercase">
              Sabor Coreano
            </span>
          </Link>

          {/* Payment / Cert Logos (Text placeholders simulating the image) */}
          <div className="flex items-center gap-4 font-semibold text-lg tracking-tight">
            <span>webpay.</span>
            <span className="flex items-center gap-1 italic text-base">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              safefood
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-300">

          {/* Links */}
          <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <li>
              <Link href="/nosotros" className="hover:text-white transition-colors">
                Sobre Nosotros
              </Link>
            </li>
            <li className="text-gray-600">|</li>
            <li>
              <Link href="/contacto" className="hover:text-white transition-colors">
                Contacto
              </Link>
            </li>
            <li className="text-gray-600">|</li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Términos y condiciones
              </Link>
            </li>
          </ul>

          {/* Social */}
          <div className="flex items-center gap-3">
            <span className="mr-1">Síguenos en</span>
            <a href="#" className="w-6 h-6 hover:scale-110 transition-transform flex items-center justify-center opacity-80 hover:opacity-100">
              <Image src="/iconos/instagram.svg" alt="Instagram" width={24} height={24} className="object-contain" />
            </a>
            <a href="#" className="w-6 h-6 hover:scale-110 transition-transform flex items-center justify-center opacity-80 hover:opacity-100">
              <Image src="/iconos/facebook.svg" alt="Facebook" width={24} height={24} className="object-contain" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
