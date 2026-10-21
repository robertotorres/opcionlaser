import { socialLinks } from '../data/socialLinks.js';
import {
  ArrowUpRight,
  Building2,
  Gift,
  MessageCircle,
  ScanLine,
} from 'lucide-react';

const contactReasons = [
  { icon: MessageCircle, label: 'Cotizaciones' },
  { icon: Gift, label: 'Regalos personalizados' },
  { icon: ScanLine, label: 'Termos grabados' },
  { icon: Building2, label: 'Promociones empresariales' },
];

function ContactCTA() {
  return (
    <section
      className="relative isolate overflow-hidden bg-graphite text-technical-ivory"
      id="contacto"
    >
      <div className="section-container pt-16 pb-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.62fr)] lg:items-center lg:gap-16">

          <div className="max-w-3xl">
            <p className="section-kicker text-laser-gold">
              Hagamos algo especial
            </p>

            <h2 className="section-title max-w-3xl text-4xl text-white sm:text-6xl">
              Una idea tuya.
              <br />
              <span className="text-laser-gold">
                Un detalle inolvidable.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Cotiza regalos personalizados, termos grabados o promociones
              para tu empresa. Cuéntanos qué tienes en mente y revisamos las
              opciones contigo.
            </p>

            <p className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/55">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-laser-gold"
              />
              ¿Tienes una fecha en mente? Escríbenos con tiempo para conversar
              sobre tu proyecto.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 lg:pl-8">
            <a
              className="inline-flex min-h-[4.5rem] w-full items-center justify-between gap-4 rounded-control bg-laser-gold px-5 py-4 text-base font-semibold text-graphite shadow-lg shadow-laser-gold/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-technical-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={socialLinks.whatsapp}
              rel="noreferrer"
              target="_blank"
            >
              <span className="inline-flex items-center gap-3">
                <MessageCircle
                  aria-hidden="true"
                  className="size-6 shrink-0"
                  strokeWidth={1.8}
                />
                Cotizar por WhatsApp
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="size-5 shrink-0"
                strokeWidth={1.8}
              />
            </a>

            <p className="text-center text-sm text-white/55 sm:text-left">
              También puedes llamarnos al{' '}
              <a
                className="font-semibold text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-laser-gold"
                href="tel:+526624514272"
              >
                662 451 4272
              </a>
            </p>
          </div>
        </div>

        <ul
          aria-label="Opciones de personalización"
          className="mt-8 grid grid-cols-2 border-t border-white/15 lg:grid-cols-4"
        >
          {contactReasons.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="
                flex
                min-h-14
                items-center
                gap-3
                border-b
                border-white/15
                py-3
                text-sm
                text-white/75
                transition-colors
                hover:text-laser-gold
                sm:min-h-16
                sm:gap-4
                sm:py-3
                lg:border-b-0
                lg:border-r
                lg:px-5
                lg:first:pl-0
                lg:last:border-r-0
              "
            >
              <Icon
                aria-hidden="true"
                className="size-5 shrink-0 text-laser-gold"
                strokeWidth={1.7}
              />

              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ContactCTA;