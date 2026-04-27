import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Continent } from '@/types';

type GalleryFilter = 'all' | Continent;

type GalleryImage = {
  id: string;
  title: string;
  location: string;
  continent: Continent;
  image: string;
  orientation: 'portrait' | 'landscape' | 'square';
};

const galleryFilters: { slug: GalleryFilter; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'asia', label: 'Asia' },
  { slug: 'europe', label: 'Europe' },
  { slug: 'oceania', label: 'Oceania' },
  { slug: 'north-america', label: 'North America' },
  { slug: 'central-america', label: 'Central America' },
  { slug: 'south-america', label: 'South America' },
  { slug: 'africa', label: 'Africa' },
];

const galleryImages: GalleryImage[] = [
  {
    id: 'raja-ampat-islands',
    title: 'Blue Layers',
    location: 'Raja Ampat, Indonesia',
    continent: 'asia',
    image: '/images/destinations/raja-ampat.jpg',
    orientation: 'portrait',
  },
  {
    id: 'great-barrier-reef',
    title: 'Reef Light',
    location: 'Great Barrier Reef, Australia',
    continent: 'oceania',
    image: '/images/destinations/gbr.jpg',
    orientation: 'landscape',
  },
  {
    id: 'galapagos-coast',
    title: 'Volcanic Water',
    location: 'Galapagos, Ecuador',
    continent: 'south-america',
    image: '/images/destinations/galapagos.jpg',
    orientation: 'square',
  },
  {
    id: 'tenerife-memory',
    title: 'Island Start',
    location: 'Tenerife, Spain',
    continent: 'europe',
    image: '/images/about/about-leap-to-unknown-1.jpeg',
    orientation: 'portrait',
  },
  {
    id: 'red-sea-blue',
    title: 'Clear Blue',
    location: 'Red Sea, Egypt',
    continent: 'africa',
    image: '/images/destinations/red-sea.jpg',
    orientation: 'landscape',
  },
  {
    id: 'maldives-shore',
    title: 'Soft Current',
    location: 'Maldives',
    continent: 'asia',
    image: '/images/destinations/maldives.jpg',
    orientation: 'portrait',
  },
  {
    id: 'similan-rock',
    title: 'Granite Islands',
    location: 'Similan Islands, Thailand',
    continent: 'asia',
    image: '/images/destinations/similan.jpg',
    orientation: 'square',
  },
  {
    id: 'costa-rica-next',
    title: 'Green Coast',
    location: 'Costa Rica',
    continent: 'central-america',
    image: '/images/home/next_destinations.jpg',
    orientation: 'landscape',
  },
  {
    id: 'new-york-light',
    title: 'City Pause',
    location: 'New York, United States',
    continent: 'north-america',
    image: '/images/destinations/new-york.jpg',
    orientation: 'portrait',
  },
  {
    id: 'bali-texture',
    title: 'Island Texture',
    location: 'Bali, Indonesia',
    continent: 'asia',
    image: '/images/destinations/bali.jpg',
    orientation: 'landscape',
  },
  {
    id: 'santorini-white',
    title: 'White Edge',
    location: 'Santorini, Greece',
    continent: 'europe',
    image: '/images/destinations/santorini.jpg',
    orientation: 'square',
  },
  {
    id: 'cape-town-sky',
    title: 'Southern Edge',
    location: 'Cape Town, South Africa',
    continent: 'africa',
    image: '/images/destinations/cape-town.jpg',
    orientation: 'portrait',
  },
];

const imageAspectClass: Record<GalleryImage['orientation'], string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const visibleImages = useMemo(() => {
    if (activeFilter === 'all') return galleryImages;
    return galleryImages.filter((image) => image.continent === activeFilter);
  }, [activeFilter]);

  const activeImage =
    activeImageIndex === null ? null : visibleImages[activeImageIndex] ?? null;

  const openImage = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeImage = () => {
    setActiveImageIndex(null);
  };

  const showPreviousImage = () => {
    setActiveImageIndex((current) => {
      if (current === null) return current;
      return current === 0 ? visibleImages.length - 1 : current - 1;
    });
  };

  const showNextImage = () => {
    setActiveImageIndex((current) => {
      if (current === null) return current;
      return current === visibleImages.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') showPreviousImage();
      if (event.key === 'ArrowRight') showNextImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, visibleImages.length]);

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="relative min-h-[42vh] md:min-h-[48vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about/about-hero.jpg"
            alt="Katie diving underwater"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean-dark/35" />
        </div>

        <div className="relative min-h-[42vh] md:min-h-[48vh] max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-none">
              Gallery
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-ocean-dark text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5">
          <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-8 md:gap-5 md:overflow-visible">
            {galleryFilters.map((filter) => (
              <button
                key={filter.slug}
                onClick={() => setActiveFilter(filter.slug)}
                className={`shrink-0 border-b pb-3 text-left md:text-center font-body text-sm md:text-base tracking-wide transition-colors ${
                  activeFilter === filter.slug
                    ? 'text-white border-white'
                    : 'text-white/62 border-white/20 hover:text-white hover:border-white/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="font-body text-sm uppercase tracking-[0.18em] text-black/40 block mb-3">
                {visibleImages.length} photo{visibleImages.length === 1 ? '' : 's'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-black">
                {galleryFilters.find((filter) => filter.slug === activeFilter)?.label}
              </h2>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {visibleImages.map((image, index) => (
              <figure key={image.id} className="group mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => openImage(index)}
                  className={`${imageAspectClass[image.orientation]} relative block w-full overflow-hidden bg-gray-100 text-left`}
                  aria-label={`Open ${image.title}`}
                >
                  <img
                    src={image.image}
                    alt={`${image.title} in ${image.location}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ocean-dark/0 transition-colors duration-300 group-hover:bg-ocean-dark/58 group-focus-within:bg-ocean-dark/58" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <span className="font-body text-xs uppercase tracking-[0.18em] text-sky-200 block mb-2">
                      {image.location}
                    </span>
                    <h3 className="font-display text-2xl text-white">
                      {image.title}
                    </h3>
                  </div>
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] bg-white px-4 py-6 md:px-8 md:py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={closeImage}
            className="fixed right-4 top-4 z-[120] flex h-11 w-11 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white md:right-8 md:top-8"
            aria-label="Close gallery image"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            className="fixed left-3 top-1/2 z-[120] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white md:left-8 md:h-14 md:w-14"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 md:w-9 md:h-9" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            className="fixed right-3 top-1/2 z-[120] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-colors hover:bg-black hover:text-white md:right-8 md:h-14 md:w-14"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 md:w-9 md:h-9" />
          </button>

          <div
            className="h-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-5 px-10 md:px-16"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="min-h-0 w-full flex-1 flex items-center justify-center">
              <img
                src={activeImage.image}
                alt={`${activeImage.title} in ${activeImage.location}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="text-center text-black">
              <h2 className="font-display text-2xl md:text-3xl">
                {activeImage.title}
              </h2>
              <p className="font-body text-sm md:text-base text-black/55 mt-1">
                {activeImage.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
