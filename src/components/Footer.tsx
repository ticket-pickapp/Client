import { Target } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#0f1419] text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-[#1e9df1]" />
            <span className="text-lg font-bold">TipsterPro</span>
          </div>
          <p className="text-gray-400 text-sm">
            La plataforma líder para conectar tipsters profesionales con apostadores.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Plataforma</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Tipsters
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Precios
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Soporte</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Centro de ayuda
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-white">
                Términos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 TipsterPro. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer