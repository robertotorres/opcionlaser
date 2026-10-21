import { mediaData } from '../data/mediaData.js';
import { socialLinks } from '../data/socialLinks.js';
import { ArrowDown } from 'lucide-react';

function Hero() {
  const heroImage = mediaData.images.hero;  

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-graphite text-white" id="inicio">
      <img alt="" aria-hidden="true" className="absolute inset-0 z-0 size-full object-cover object-center" fetchPriority="high" src={heroImage} />      
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-graphite/90 via-graphite/55 to-graphite/10"/>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-graphite/70 via-transparent to-graphite/25" />
      <div className="section-container relative z-10 grid w-full items-center gap-10 py-hero pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.45fr)]">
        <div className="max-w-4xl">
          <p className="hero-enter mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-laser-gold uppercase sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-laser-gold" />
            Grabado láser personalizado
          </p>
          <h1 className="hero-enter hero-enter-delay-1 max-w-4xl text-5xl leading-[0.98] font-semibold sm:text-7xl lg:text-8xl">
            Hazlo único.
            <br />
            <span className="text-laser-gold">Hazlo tuyo.</span>
          </h1>
          <p className="hero-enter hero-enter-delay-2 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Nombres, fechas y diseños propios, grabados con precisión para convertir productos en recuerdos personales.
          </p>
          <div className="hero-enter hero-enter-delay-3 mt-9 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <a className="btn-primary focus-visible:outline-offset-4 focus-visible:outline-white" href={socialLinks.whatsapp} rel="noreferrer" target="_blank">
              Cotizar por WhatsApp
            </a>
            <a className="btn-secondary focus-visible:outline-offset-4 focus-visible:outline-white" href="#trabajos">
              Ver Trabajos
            </a>
          </div>
        </div>
        <div aria-hidden="true" className="hero-enter hero-enter-delay-2 hidden justify-self-end border-l border-laser-gold/70 py-3 pl-6 lg:block">
          <p className="text-xs font-semibold tracking-[0.18em] text-laser-gold uppercase">De la idea al detalle</p>
          <p className="mt-3 max-w-48 text-sm leading-6 text-white/80">Una pieza personal. Un acabado hecho con cuidado.</p>
        </div>
      </div>
      <a className="absolute bottom-7 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[0.65rem] font-semibold tracking-[0.16em] text-white/65 uppercase transition-colors hover:text-laser-gold focus-visible:text-laser-gold motion-reduce:transition-none" href="#servicios">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-white/25">
          <ArrowDown className="size-4" strokeWidth={1.6} />
        </span>
        Desplázate para explorar
      </a>
    </section>
  );
}

export default Hero;