import heroImage from '../assets/hero-bastion-pexels-author.jay-noble.jpg'

function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[65vh] items-center bg-navy bg-cover bg-center text-cream"
      style={{ backgroundImage: `url("${heroImage}")` }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/30" />
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
            Estilo que habla por ti.
          </h1>
          <p className="mt-4 text-xl text-mist sm:text-lg">
            En Bastion reunimos ropa, accesorios y fragancias para acompañarte
            con estilo en cada ocasión.
          </p>
          <a
            href="#catalogo"
            className="mt-8 inline-flex min-h-11 items-center rounded-md bg-brass px-6 font-semibold text-navy hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Ir al catálogo
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
