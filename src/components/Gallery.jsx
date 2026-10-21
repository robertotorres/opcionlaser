import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, Images, X } from 'lucide-react';
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
  carin: 'Carín',
  colibri: 'Colibrí',
  granados: 'Granados',
  hermosillo: 'Hermosillo',
  huepac: 'Huépac',
  jordan: 'Jordan',
  'kobe-bryant': 'Kobe Bryant',
  naranjeros: 'Naranjeros',
  nirvana: 'Nirvana',
  ohtani: 'Ohtani',
  patriots: 'Patriots',
  'pueblo-yaqui': 'Pueblo Yaqui',
  'san-jose-de-batuc': 'San José de Batuc',
  'san-judas': 'San Judas',
  yankees: 'Yankees',
};

const projects = workSlugs.map((slug) => ({
  slug,
  title: workTitles[slug],
  images: mediaData.imageGroups[slug] ?? [],
})).filter(({ images }) => images.length > 0);

function Gallery() {
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const galleryRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const selectedProject = selectedWorkIndex === null ? null : projects[selectedWorkIndex];
  const selectedImage = selectedProject?.images[selectedImageIndex];

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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) dialog.showModal();
    if (!selectedProject && dialog.open) dialog.close();
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) triggerRef.current?.focus();
  }, [selectedProject]);

  const changeImage = (direction) => {
    if (!selectedProject) return;
    setSelectedImageIndex((currentIndex) => (currentIndex + direction + selectedProject.images.length) % selectedProject.images.length);
  };

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

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedWorkIndex(null);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      changeImage(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      changeImage(-1);
    }
  };

  return (
    <section className="section-spacing overflow-hidden bg-white text-graphite" id="trabajos">
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
            {projects.map((project, index) => (
              <figure className="gallery-carousel-card gallery-reveal group min-w-0" data-gallery-item key={project.slug}>
              <button
                aria-label={`Ver ${project.images.length} ${project.images.length === 1 ? 'imagen' : 'imágenes'} de ${project.title}`}
                className="gallery-image-button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setSelectedImageIndex(0);
                  setSelectedWorkIndex(index);
                }}
                type="button"
              >
                <img
                  alt={`Trabajo de grabado personalizado: ${project.title}`}
                  className="gallery-image aspect-[4/5]"
                  decoding="async"
                  loading="lazy"
                  sizes="(min-width: 1280px) 30vw, (min-width: 640px) 48vw, 94vw"
                  src={project.images[0].src}
                />
                <span aria-hidden="true" className="gallery-image-overlay" />
                <span aria-hidden="true" className="gallery-expand-icon"><Expand className="size-4" strokeWidth={1.8} /></span>
                <span className="gallery-photo-count">
                  <Images aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                  {project.images.length}
                </span>
              </button>
              <figcaption className="flex items-baseline justify-between gap-3 px-1 pt-3">
                <span className="font-display text-sm font-semibold sm:text-base">{project.title}</span>
                <span className="text-right text-[0.7rem] text-graphite/60 sm:text-xs">{project.images.length} {project.images.length === 1 ? 'imagen' : 'imágenes'}</span>
              </figcaption>
              </figure>
            ))}
          </div>
          <button aria-label="Siguientes trabajos" className="gallery-carousel-control gallery-edge-control gallery-edge-control-right" disabled={!canScrollNext} onClick={() => scrollCarousel(1)} type="button">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <dialog
        aria-label="Vista ampliada de trabajos"
        className="gallery-lightbox"
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedWorkIndex(null);
        }}
        onKeyDown={handleDialogKeyDown}
        onClose={() => setSelectedWorkIndex(null)}
        ref={dialogRef}
      >
        {selectedProject && (
          <div className="gallery-lightbox-content">
            <div className="flex items-center justify-between gap-4 px-1 pb-3 text-white">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-laser-gold uppercase">{selectedImage?.filename}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{selectedProject.title}</h3>
              </div>
              <button aria-label="Cerrar imagen ampliada" className="gallery-lightbox-control" onClick={() => setSelectedWorkIndex(null)} type="button">
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="gallery-lightbox-frame">
              <button aria-label="Imagen anterior" className="gallery-lightbox-control gallery-lightbox-arrow gallery-lightbox-arrow-left" onClick={() => changeImage(-1)} type="button">
                <ArrowLeft aria-hidden="true" className="size-5" />
              </button>
              <img alt={`Trabajo de grabado personalizado: ${selectedProject.title}`} className="gallery-lightbox-image" src={selectedImage?.src} />
              <button aria-label="Imagen siguiente" className="gallery-lightbox-control gallery-lightbox-arrow gallery-lightbox-arrow-right" onClick={() => changeImage(1)} type="button">
                <ArrowRight aria-hidden="true" className="size-5" />
              </button>
            </div>
            <p className="px-1 pt-3 text-xs text-white/60">{selectedImageIndex + 1} / {selectedProject.images.length}</p>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default Gallery;