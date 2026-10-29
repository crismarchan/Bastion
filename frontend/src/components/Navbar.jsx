import { useState } from 'react'

const navigationLinkClass =
  'block min-h-11 py-3 text-cream hover:text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#inicio"
          className="font-display tracking-[0.3em] text-brass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
        >
          BASTION
        </a>
        <button
          type="button"
          className="min-h-11 rounded-md border border-mist px-3 text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menú
        </button>
        <nav
          id="main-navigation"
          aria-label="Navegación principal"
          className={`${isMenuOpen ? 'block' : 'hidden'} absolute inset-x-0 top-full bg-navy md:static md:block`}
        >
          <ul className="flex flex-col gap-1 px-4 pb-4 md:flex-row md:items-center md:gap-8 md:p-0">
            <li><a className={navigationLinkClass} href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a></li>
            <li><a className={navigationLinkClass} href="#catalogo" onClick={() => setIsMenuOpen(false)}>Catálogo</a></li>
            <li>
              <a className="inline-flex min-h-11 items-center rounded-md border border-brass px-4 text-cream hover:bg-brass hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass" href="#login" onClick={() => setIsMenuOpen(false)}>
                Iniciar sesión
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
