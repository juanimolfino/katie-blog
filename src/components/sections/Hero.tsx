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
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <iframe
          src="https://www.youtube.com/embed/TY-BdeeivkM?autoplay=1&mute=1&loop=1&controls=0&playlist=TY-BdeeivkM&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ 
            width: '100vw', 
            height: '100vh',
            transform: 'scale(1.2)'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          title="Hero video"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
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