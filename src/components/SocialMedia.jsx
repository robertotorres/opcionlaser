import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { socialLinks } from '../data/socialLinks.js';

const networks = [
  {
    label: 'Facebook',
    icon: FaFacebook,
    href: socialLinks.facebook,
    color: 'text-blue-600',
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    href: socialLinks.instagram,
    color: 'text-pink-500',
  },  
  {
    label: 'TikTok',
    icon: FaTiktok,
    href: socialLinks.tiktok,
    color: 'text-slate-900',
  },
];

function SocialMedia() {
  return (
    <section
      className="section-spacing-compact bg-white text-graphite"
      id="redes"
    >
      <div className="section-container flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <p className="section-kicker">Síguenos en redes sociales</p>

          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Encuéntranos en redes.
          </h2>

          <p className="mt-3 text-sm text-graphite/65">
            Descubre nuevos trabajos, procesos de grabado láser y contenido exclusivo.
          </p>
        </div>

        <div className="flex items-center gap-8">
          {networks.map(({ label, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`group transition-all duration-300 hover:scale-110 ${color}`}
            >
              <Icon
                size={52}
                className={`
                    ${color}
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:drop-shadow-lg
                `}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialMedia;