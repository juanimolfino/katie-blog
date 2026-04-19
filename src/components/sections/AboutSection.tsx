import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data';

export function AboutSection() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content - Left side */}
          <div
            className={`order-2 lg:order-1 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            {/* Title */}
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-4">
              About
            </h2>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-light mb-6">
              Me
            </h2>

            {/* Hello */}
            <p className="font-body text-lg font-medium text-black mb-4">
              Hello There!
            </p>

            {/* Bio paragraphs */}
            <p className="font-body text-base leading-relaxed text-black/70 mb-4">
              I'm Katie — a dive instructor and skipper currently living on Heron Island on the Great Barrier Reef.
            </p>

            <p className="font-body text-base leading-relaxed text-black/70 mb-4">
              For the past few years, I've been traveling the world, working in the ocean, and building a life centered around saltwater, adventure, and exploration. From remote islands to unforgettable underwater encounters, this blog is where I share the moments that have shaped me — the beauty, the chaos, and everything in between.
            </p>

            <p className="font-body text-base leading-relaxed text-black/70 mb-8">
              The ocean has always felt like home, and this space is a reflection of that — a collection of stories, experiences, and lessons from a life lived beneath the surface.
            </p>

            {/* CTA Link */}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-body text-sm text-black/70 hover:text-ocean transition-colors group border-b border-black/20 hover:border-ocean pb-1"
            >
              <span>Read more about my journey</span>
            </Link>
          </div>

          {/* Images - Right side with overlay */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
          >
            {/* Main large image */}
            <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <img
                src="/images/about-katie.jpg"
                alt={siteConfig.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlapping small image */}
            <div className="absolute -bottom-8 -left-8 lg:-left-16 w-48 lg:w-64 aspect-[4/3] overflow-hidden shadow-xl">
              <img
                src="/images/about-katie-small.jpg"
                alt={`${siteConfig.author.name} on a boat`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
