import { MessageCircle, Phone } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { mediaData } from '../data/mediaData.js';
import { socialLinks } from '../data/socialLinks.js';

const footerLinks = [
  ['Trabajos', '#trabajos'],
  ['Videos', '#videos'],
  ['Proceso', '#proceso'],
  ['Redes sociales', '#redes'],  
];

const socialNetworks = [
  { label: 'Facebook', Icon: FaFacebook, href: socialLinks.facebook },
  { label: 'Instagram', Icon: FaInstagram, href: socialLinks.instagram },
  { label: 'TikTok', Icon: FaTiktok, href: socialLinks.tiktok },
];

function Footer() {
  return (
    <footer className="border-t border-laser-gold/35 bg-graphite text-technical-ivory">
      <div className="section-container">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1fr] lg:gap-12 lg:py-16">

          <div className="col-span-2 max-w-sm lg:col-span-1">
            <a
              aria-label="Opción Laser, volver al inicio"
              className="group inline-flex items-center gap-3"
              href="#inicio"
            >
              <img
                alt=""
                className="size-14 rounded-full border border-white/15 object-cover"
                src={mediaData.logo}
              />
              <span className="font-display text-sm font-semibold tracking-[0.08em] transition-colors duration-300 group-hover:text-laser-gold">
                OPCIÓN LASER
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              Grabado láser personalizado para transformar ideas y regalos en piezas hechas para durar.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-laser-gold uppercase">
              Explora
            </h2>

            <ul className="grid gap-3 text-sm text-white/65">
              {footerLinks.map(([label, href]) => (
                <li key={href}>
                  <a
                    className="transition-colors duration-300 hover:text-laser-gold focus-visible:text-laser-gold"
                    href={href}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-laser-gold uppercase">
              Redes
            </h2>

            <ul
              aria-label="Redes sociales de Opción Laser"
              className="grid gap-3 text-sm text-white/55"
            >
              {socialNetworks.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                    className="group inline-flex items-center gap-3 transition-colors duration-300 hover:text-laser-gold"
                  >
                    <Icon
                      className="text-white/45 transition-colors duration-300 group-hover:text-laser-gold"
                      size={16}
                    />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="mb-4 text-xs font-semibold tracking-[0.16em] text-laser-gold uppercase">
              Hablemos
            </h2>

            <p className="mb-3 max-w-xs text-sm leading-6 text-white/60">
              ¿Tienes un proyecto en mente? Conversemos por WhatsApp.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-control border border-white/20 px-3.5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-laser-gold hover:text-laser-gold"
                href={socialLinks.whatsapp}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4 transition-colors duration-300 group-hover:text-laser-gold"
                  strokeWidth={1.8}
                />
                WhatsApp
              </a>

              <a
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-control border border-white/20 px-3.5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-laser-gold hover:text-laser-gold"
                href="tel:+526624514272"
              >
                <Phone
                  aria-hidden="true"
                  className="size-4 transition-colors duration-300 group-hover:text-laser-gold"
                  strokeWidth={1.7}
                />
                662 451 4272
              </a>
            </div>

          </div>

        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Opción Laser. Todos los derechos reservados.
          </p>

          <a
            className="text-laser-gold transition-colors duration-300 hover:text-white"
            href="#inicio"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;