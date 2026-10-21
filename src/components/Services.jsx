import {
  ScanLine,
  Gift,
  Building2,
} from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Grabado personalizado',
    description:
      'Nombres, fechas, fotografías, logotipos y diseños especiales para convertir cualquier artículo en algo único.',
    icon: ScanLine,
  },
  {
    number: '02',
    title: 'Regalos con significado',
    description:
      'Termos, vasos, llaveros y detalles personalizados para cumpleaños, aniversarios, graduaciones y ocasiones especiales.',
    icon: Gift,
  },
  {
    number: '03',
    title: 'Diseños para negocios',
    description:
      'Artículos promocionales, regalos corporativos y productos personalizados para fortalecer la identidad de tu marca.',
    icon: Building2,
  },
];

function Services() {
  return (
    <section
      className="section-spacing bg-technical-ivory text-graphite"
      id="servicios"
    >
      <div className="section-container">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="section-kicker">
            Lo que hacemos
          </p>

          <h2 className="section-title">
            Cada idea merece su propio detalle.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite/65 sm:text-base">
            Transformamos ideas en productos personalizados mediante grabado
            láser de alta precisión, cuidando cada detalle para lograr un
            resultado profesional y memorable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="
                rounded-2xl
                border
                border-laser-gold/20
                bg-white
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-laser-gold/40
                hover:shadow-lg
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-laser-gold
                    text-graphite
                    font-bold
                  "
                >
                  {number}
                </div>

                <Icon
                  className="h-6 w-6 text-laser-gold"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-graphite/65">
                {description}
              </p>

              <a
                className="
                  mt-5
                  inline-block
                  font-semibold
                  text-graphite
                  transition-colors
                  hover:text-laser-gold
                "
                href="#contacto"
              >
                Consultar esta idea →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;