import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { mediaData } from '../data/mediaData.js';
import { socialLinks } from '../data/socialLinks.js';

const navigation = [
  ['Servicios', '#servicios'],
  ['Trabajos', '#trabajos'],
  ['Videos', '#videos'],
  ['Proceso', '#proceso'],
  ['Redes', '#redes'],
];

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none ${isScrolled ? 'border-b border-white/10 bg-graphite/90 shadow-lg shadow-black/10 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
      <div className="section-container flex min-h-24 items-center justify-between gap-3 sm:min-h-32 sm:gap-5">        
        <a className="group flex min-w-0 shrink-0 items-center gap-2.5 text-white sm:gap-3" href="#inicio" aria-label="Opción Laser, inicio" onClick={closeMenu}>
          <img alt="" className="size-20 shrink-0 object-contain sm:size-28" src={mediaData.logo} />
          <span className="text-xs font-semibold tracking-[0.08em] transition-colors duration-300 group-hover:text-laser-gold sm:text-sm lg:text-base">OPCIÓN LASER</span>
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-5 text-sm text-white/80 lg:flex xl:gap-7">
          {navigation.map(([label, href]) => (
            <a className="transition-colors duration-200 hover:text-laser-gold focus-visible:text-laser-gold motion-reduce:transition-none" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <a className="btn-primary min-h-10 gap-2 px-3 py-2 text-xs sm:px-4 sm:text-sm" href={socialLinks.whatsapp} rel="noreferrer" target="_blank">
            <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.8} />
            <span><span className="sm:hidden">Cotizar</span><span className="hidden sm:inline">Cotizar por WhatsApp</span></span>
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="grid size-10 place-items-center rounded-control border border-white/25 text-white transition-colors hover:border-laser-gold hover:text-laser-gold focus-visible:outline-2 focus-visible:outline-laser-gold motion-reduce:transition-none lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        aria-label="Navegación móvil"
        className={`${isMenuOpen ? 'grid' : 'hidden'} absolute inset-x-0 top-full gap-1 border-b border-white/10 bg-graphite/95 px-page pb-5 pt-3 text-white shadow-xl backdrop-blur-xl lg:hidden`}
        id="mobile-navigation"
      >
        {navigation.map(([label, href]) => (
          <a className="rounded-control px-3 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-laser-gold focus-visible:text-laser-gold motion-reduce:transition-none" href={href} key={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Header;