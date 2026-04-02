import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      
      // Parallax effect on background - only translateY, no scale to prevent overflow
      const bgElement = heroRef.current.querySelector('.hero-bg img') as HTMLElement;
      if (bgElement) {
        bgElement.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      
      // Fade out content on scroll
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
      {/* Background Image */}
      <div className="hero-bg absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="Travel adventure"
          className="w-full h-full object-cover scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center section-padding"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block font-body text-sm font-medium tracking-[3px] uppercase text-white/80 mb-6 opacity-0 animate-fade-in-up">
            Welcome!
          </span>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            {siteConfig.tagline}
          </h1>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in-up animation-delay-400">
            <Link
              to="/destinations"
              className="btn-primary inline-flex items-center gap-3 group"
            >
              <span>Start today</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}