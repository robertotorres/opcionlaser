import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mediaData } from '../data/mediaData.js';

const workSlugs = [
  'bacadehuachi',
  'bacerac',
  'betty-boop',
  'call-of-duty',
  'carin',
  'colibri',
  'granados',
  'hermosillo',
  'huepac',
  'jordan',
  'kobe-bryant',
  'naranjeros',
  'nirvana',
  'ohtani',
  'patriots',
  'pueblo-yaqui',
  'san-jose-de-batuc',
  'san-judas',
  'yankees',
];

const workTitles = {
  bacadehuachi: 'Bacadéhuachi',
  bacerac: 'Bacerac',
  'betty-boop': 'Betty Boop',
  'call-of-duty': 'Call of Duty',
  carin: 'Carín Leon',
  colibri: 'Colibrí',
  granados: 'Granados',
  hermosillo: 'Hermosillo',
  huepac: 'Huépac',
  jordan: 'Michael Jordan',
  'kobe-bryant': 'Kobe Bryant',
  naranjeros: 'Naranjeros de Hermosillo',
  nirvana: 'Nirvana',
  ohtani: 'Shohei Ohtani',
  patriots: 'New England Patriots',
  'pueblo-yaqui': 'Pueblo Yaqui',
  'san-jose-de-batuc': 'San José de Batuc',
  'san-judas': 'San Judas Tadeo',
  yankees: 'New York Yankees',
};

const projects = workSlugs.map((slug) => ({
  slug,
  title: workTitles[slug],
  images: mediaData.imageGroups[slug] ?? [],
})).filter(({ images }) => images.length > 0);

function Gallery() {
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const track = gallery.querySelector('.gallery-carousel-track');
    const items = gallery.querySelectorAll('[data-gallery-item]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gallery-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = galleryRef.current;
    if (!track) return undefined;

    const updateScrollState = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setCanScrollPrevious(track.scrollLeft > 2);
      setCanScrollNext(track.scrollLeft < maxScroll - 2);
    };

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollCarousel = (direction) => {
    const track = galleryRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.gallery-carousel-card');
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardStep = (firstCard?.getBoundingClientRect().width ?? 0) + gap;
    const distance = Math.max(track.clientWidth * 0.82, cardStep);
    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.min(maxScroll, Math.max(0, track.scrollLeft + direction * distance)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="overflow-hidden bg-white py-16 text-graphite lg:py-24" id="trabajos">
      <div className="section-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Hechos para compartir</p>
            <h2 className="section-title">Trabajos que cuentan historias.</h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <p className="max-w-sm text-sm leading-6 text-graphite/65">{projects.length} trabajos personalizados</p>
            <div className="gallery-mobile-controls flex shrink-0 gap-2 lg:hidden">
              <button aria-label="Trabajos anteriores" className="gallery-carousel-control" disabled={!canScrollPrevious} onClick={() => scrollCarousel(-1)} type="button">
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button aria-label="Siguientes trabajos" className="gallery-carousel-control" disabled={!canScrollNext} onClick={() => scrollCarousel(1)} type="button">
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="gallery-carousel-shell">
          <button aria-label="Trabajos anteriores" className="gallery-carousel-control gallery-edge-control gallery-edge-control-left" disabled={!canScrollPrevious} onClick={() => scrollCarousel(-1)} type="button">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div aria-label="Trabajos principales" className="gallery-carousel-track" ref={galleryRef}>
            {projects.map((project) => (
              <figure
                className="gallery-carousel-card gallery-reveal min-w-0"
                data-gallery-item
                key={project.slug}
              >
                <img
                  alt={`Trabajo de grabado personalizado: ${project.title}`}
                  className="gallery-image aspect-[4/5]"
                  decoding="async"
                  loading="lazy"
                  sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 94vw"
                  src={project.images[0].src}
                />

                <figcaption className="px-1 pt-3">
                  <span className="font-display text-sm font-semibold sm:text-base">
                    {project.title}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <button aria-label="Siguientes trabajos" className="gallery-carousel-control gallery-edge-control gallery-edge-control-right" disabled={!canScrollNext} onClick={() => scrollCarousel(1)} type="button">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Gallery;