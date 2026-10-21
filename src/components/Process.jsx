import {
  MessageCircle,
  PencilRuler,
  ScanLine,
  PackageCheck,
  Building2,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Elige del catálogo o compártenos tu idea',
    text: 'Puedes elegir un diseño existente, un producto personalizado o enviarnos tu propia idea.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Te presentamos una o varias propuestas',
    text: 'Generamos propuestas según tu producto, estilo y nivel de personalización.',
    icon: PencilRuler,
  },
  {
    number: '03',
    title: 'Ajustamos la opción elegida',
    text: 'Realizamos cambios de texto, nombres, detalles o composición hasta llegar al resultado deseado.',
    icon: ScanLine,
  },
  {
    number: '04',
    title: 'Te mostramos una vista previa',
    text: 'Si lo necesitas, te mostramos una representación para visualizar mejor el resultado final.',
    icon: PackageCheck,
  },
  {
    number: '05',
    title: 'Confirmación e inicio de producción',
    text: 'Una vez confirmado el diseño y recibido el anticipo, iniciamos la producción.',
    icon: Building2,
  },
];

function Process() {
  return (
    <section
      className="section-spacing bg-technical-ivory text-graphite"
      id="proceso"
    >
      <div className="section-container">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="section-kicker">
            Así puedes hacer tu pedido
          </p>

          <h2 className="section-title">
            Rápido, claro y personalizado.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-graphite/65 sm:text-base">
            Nuestro proceso está diseñado para que puedas personalizar tu
            producto de forma sencilla, visualizar el resultado y aprobarlo
            antes de iniciar producción.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {steps.map(({ number, title, text, icon: Icon }) => (
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
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;