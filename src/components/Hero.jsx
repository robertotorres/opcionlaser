import { mediaData } from '../data/mediaData.js';

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
        </div>        
      </div>
    </section>
  );
}

export default Hero;