import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !contentRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(scrollY / (heroHeight * 0.5), 1);
      
      // Parallax effect on content only
      if (contentRef.current) {
        contentRef.current.style.opacity = `${1 - progress}`;
        contentRef.current.style.transform = `translateY(${-scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/about-katie.jpg"
        >
          <source src="/videos/hero-dive.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center section-padding"
      >
        <div className="max-w-2xl">
          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 opacity-0 animate-fade-in-up">
            {siteConfig.tagline}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-white/80 max-w-lg opacity-0 animate-fade-in-up animation-delay-200">
            {siteConfig.description}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animation-delay-1000">
        <span className="font-body text-xs tracking-wider uppercase text-white/60">Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  );
}
