import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data';

// 🎬 IDs DE YOUTUBE
const VIDEO_DESKTOP = "c9dRw1KIfDk";
const VIDEO_MOBILE = "y-B9ReggOfM";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width < 768) {
        // 📱 teléfonos
        setIsMobile(true);
      } else if (width < 1024 && height > width) {
        // 📲 tablets en vertical
        setIsMobile(true);
      } else {
        // 💻 desktop o tablet horizontal
        setIsMobile(false);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleScroll = () => {
      if (!heroRef.current || !contentRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(scrollY / (heroHeight * 0.5), 1);

      contentRef.current.style.opacity = `${1 - progress}`;
      contentRef.current.style.transform = `translateY(${-scrollY * 0.2}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const videoId = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: '100vw',
            height: '100vh',
            transform: 'translate(-50%, -50%) scale(1.3)',
          }}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          title="Hero video"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center section-padding"
      >
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 opacity-0 animate-fade-in-up">
            {siteConfig.tagline}
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 max-w-lg opacity-0 animate-fade-in-up animation-delay-200">
            {siteConfig.description}
          </p>
        </div>
      </div>
    </section>
  );
}