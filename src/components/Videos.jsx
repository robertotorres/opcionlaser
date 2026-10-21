import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { mediaData } from '../data/mediaData.js';

const videoTitles = {
  bettyBoop: 'Betty Boop',
  callOfDuty: 'Call of Duty',
  carin: 'Carín Leon',
  colibri: 'Colibrí',
  hermosillo: 'Hermosillo',
  jordan: 'Michael Jordan',
  kobeBryant: 'Kobe Bryant',
  naranjeros: 'Naranjeros de Hermosillo',
  nirvana: 'Nirvana',
  ohtani: 'Shohei Ohtani',
  patriots: 'New England Patriots',
  puebloYaqui: 'Pueblo Yaqui',
  sanJudas: 'San Judas Tadeo',
  yankees: 'New York Yankees',
};

const videos = Object.entries(mediaData.videos).map(([slug, src]) => ({
  slug,
  src,
  title: videoTitles[slug] ?? slug,
  poster: mediaData.images[slug] ?? mediaData.images.coleccionSonora,
}));

function Videos() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const pausedHeroVideoRef = useRef(null);
  const selectedVideo = selectedVideoIndex === null ? null : videos[selectedVideoIndex];

  useEffect(() => {
    const track = trackRef.current;
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

    if (selectedVideo) {
      if (!dialog.open) dialog.showModal();
      const heroVideo = document.querySelector('#inicio video');
      if (heroVideo && !heroVideo.paused) {
        heroVideo.pause();
        pausedHeroVideoRef.current = heroVideo;
      }
      return;
    }

    if (dialog.open) dialog.close();
    const heroVideo = pausedHeroVideoRef.current;
    if (heroVideo?.isConnected) heroVideo.play().catch(() => {});
    pausedHeroVideoRef.current = null;
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo) triggerRef.current?.focus();
  }, [selectedVideo]);

  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector('.video-reel-card');
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardStep = (firstCard?.getBoundingClientRect().width ?? 0) + gap;
    const distance = Math.max(track.clientWidth * 0.82, cardStep);
    const maxScroll = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.min(maxScroll, Math.max(0, track.scrollLeft + direction * distance)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const changeVideo = (direction) => {
    if (selectedVideoIndex === null) return;
    setSelectedVideoIndex((currentIndex) => (currentIndex + direction + videos.length) % videos.length);
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedVideoIndex(null);
      return;
    }

    if (event.target instanceof HTMLVideoElement) return;    
  };

  return (
    <section className="section-spacing overflow-hidden bg-graphite text-technical-ivory" id="videos">
      <div className="section-container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5 sm:mb-12">
          <div className="max-w-2xl">
            <p className="section-kicker text-laser-gold">En movimiento</p>
            <h2 className="section-title text-white">El trabajo, desde todos sus ángulos.</h2>
          </div>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <p className="max-w-sm text-sm leading-6 text-white/65">{videos.length} trabajos en video</p>
            <div className="flex shrink-0 gap-2 lg:hidden">
              <button aria-label="Videos anteriores" className="gallery-carousel-control" disabled={!canScrollPrevious} onClick={() => scrollCarousel(-1)} type="button">
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button aria-label="Siguientes videos" className="gallery-carousel-control" disabled={!canScrollNext} onClick={() => scrollCarousel(1)} type="button">
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="video-carousel-shell">
          <button aria-label="Videos anteriores" className="gallery-carousel-control gallery-edge-control gallery-edge-control-left" disabled={!canScrollPrevious} onClick={() => scrollCarousel(-1)} type="button">
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>
          <div aria-label="Videos de trabajos realizados" className="video-reel-track" ref={trackRef}>
            {videos.map((video, index) => (
              <figure className="video-reel-card" key={video.slug}>
                <button
                  aria-label={`Ver video: ${video.title}`}
                  className="video-poster-button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelectedVideoIndex(index);
                  }}
                  type="button"
                >
                  <img alt="" className="video-poster-image" decoding="async" loading="lazy" sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, (min-width: 640px) 42vw, 78vw" src={video.poster} />
                  <span aria-hidden="true" className="video-poster-overlay" />
                </button>
                <figcaption className="px-1 pt-3 font-display text-sm font-semibold text-white sm:text-base">{video.title}</figcaption>
              </figure>
            ))}
          </div>
          <button aria-label="Siguientes videos" className="gallery-carousel-control gallery-edge-control gallery-edge-control-right" disabled={!canScrollNext} onClick={() => scrollCarousel(1)} type="button">
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <dialog
        aria-label="Reproductor de videos"
        className="gallery-lightbox video-lightbox"
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedVideoIndex(null);
        }}
        onKeyDown={handleDialogKeyDown}
        onClose={() => setSelectedVideoIndex(null)}
        ref={dialogRef}
      >
        {selectedVideo && (
          <div className="gallery-lightbox-content">
            <div className="flex items-center justify-between gap-4 px-1 pb-3 text-white">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-laser-gold uppercase">Video {selectedVideoIndex + 1} de {videos.length}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{selectedVideo.title}</h3>
              </div>
              <button aria-label="Cerrar video" className="gallery-lightbox-control" onClick={() => setSelectedVideoIndex(null)} type="button">
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="video-lightbox-frame">
              <video key={selectedVideo.src} aria-label={selectedVideo.title} className="video-lightbox-player" controls autoPlay playsInline poster={selectedVideo.poster} preload="auto">
                <source src={selectedVideo.src} type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default Videos;