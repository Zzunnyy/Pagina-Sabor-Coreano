export default function Footer() {
  return (
    <footer className="relative w-full bg-gray-900 dark:bg-slate-950 text-white transition-colors">
      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Sabor Coreano</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Auténtico sabor coreano llevado a tu mesa con ingredientes frescos y tradición.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Navegación</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="/productos" className="hover:text-red-500 transition-colors">Productos</a></li>
              <li><a href="/nosotros" className="hover:text-red-500 transition-colors">Sobre Nosotros</a></li>
              <li><a href="/contacto" className="hover:text-red-500 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Legal</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Política de Cookies</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-5 text-white">Síguenos</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 text-lg hover:scale-110">
                📘
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 text-lg hover:scale-110">
                📷
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 dark:bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-all duration-300 text-lg hover:scale-110">
                🐦
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-slate-800"></div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sabor Coreano. Todos los derechos reservados.</p>
          <p>Hecho en Chile</p>
        </div>
      </div>
    </footer>
  );
}
