function Footer() {
  return (
    <footer className="bg-navy text-mist">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-2 md:grid-cols-3">
          <section>
            <h2 className="font-display tracking-[0.3em] text-brass">BASTION</h2>
            <p className="mt-3 text-sm">Estilo y elegancia para caballeros.</p>
          </section>
          <nav className="hidden md:block" aria-label="Enlaces del pie de página">
            <h2 className="font-semibold text-cream">Explora</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a className="hover:text-brass focus-visible:outline-2 focus-visible:outline-brass" href="#inicio">Inicio</a></li>
              <li><a className="hover:text-brass focus-visible:outline-2 focus-visible:outline-brass" href="#catalogo">Catálogo</a></li>
              <li><a className="hover:text-brass focus-visible:outline-2 focus-visible:outline-brass" href="#nosotros">Nosotros</a></li>
            </ul>
          </nav>
          <section>
            <h2 className="font-semibold text-cream">Contacto</h2>
            <p className="mt-3 text-sm">chancrismar@gmail.com</p>
          </section>
        </div>
        <p className="mt-10 border-t border-mist/30 pt-6 text-center text-sm">
          © 2026 Bastion. Proyecto de prueba técnica.
        </p>
      </div>
    </footer>
  )
}

export default Footer
