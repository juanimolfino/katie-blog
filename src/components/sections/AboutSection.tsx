import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export function AboutSection() {
  const settings = useSiteSettings();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-0 bg-white overflow-hidden">
      <div className="section-padding">
        {/* OPCIÓN 3: Grid 40/60 (texto más chico, foto más grande) */}
        <div className="grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
          {/* Content - Left side */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 mr-0 md:mr-0 lg:mr-28 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            {/* Title */}
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-4">
              {settings.homeAboutTitle}
            </h2>

            {/* Hello */}
            <p className="font-body text-lg font-medium text-black mb-4">
              {settings.homeAboutGreeting}
            </p>

            {/* Bio paragraphs */}
            <p className="font-body text-base leading-relaxed text-black/70 mb-4">
              {settings.homeAboutParagraph1}
            </p>

            <p className="font-body text-base leading-relaxed text-black/70 mb-4">
              {settings.homeAboutParagraph2}
            </p>

            <p className="font-body text-base leading-relaxed text-black/70 mb-8">
              {settings.homeAboutParagraph3}
            </p>

            {/* CTA Link */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-black/70 hover:text-ocean transition-colors group border-b border-black/20 hover:border-ocean pb-1"
            >
              <span>Read more about my journey</span>
            </Link>
          </div>

          {/* Images - Right side */}
          {/* OPCIÓN 2: Margen negativo derecho para extenderse más */}
          <div
            className={`order-1 lg:order-2 relative lg:-mr-20 transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
          >
            {/* Main large image */}
            {/* OPCIÓN 1: Aspect ratio más ancho */}
            <div className="relative aspect-[3/4] lg:aspect-[3/4] overflow-hidden">
              <img
                src={settings.homeAboutImage}
                alt={settings.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlapping small image */}
            {/* <div className="absolute -bottom-8 -left-8 lg:-left-16 w-48 lg:w-64 aspect-[4/3] overflow-hidden shadow-xl">
              <img
                src="/images/about/about-katie-small.jpg"
                alt={`${siteConfig.author.name} on a boat`}
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
