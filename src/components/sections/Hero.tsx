import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data';

// 🎬 IDs DE YOUTUBE - Reemplazar con los de Katie
const VIDEO_DESKTOP = "c9dRw1KIfDk";  // Video horizontal
const VIDEO_MOBILE = "y-B9ReggOfM"; // YouTube Short (vertical)

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const videoId = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
    >
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`}
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