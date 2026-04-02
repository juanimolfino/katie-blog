import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-cream overflow-hidden">
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={siteConfig.author.avatar}
                alt={siteConfig.author.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Decorative shadow */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-terracotta/10 -z-10" />
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-terracotta/5 rounded-full animate-float" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-terracotta/5 rounded-full animate-float animation-delay-500" />
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-20'
            }`}
          >
            {/* Eyebrow */}
            <span className="font-display text-xl italic text-terracotta mb-4 block">
              Hello there!
            </span>

            {/* Headline */}
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              I'm {siteConfig.author.name}
            </h2>

            {/* Bio */}
            <p className="font-body text-base leading-relaxed text-black/70 mb-8 max-w-lg">
              {siteConfig.author.bio}
            </p>

            {/* CTA Button */}
            <Link
              to="/about"
              className="btn-primary inline-flex items-center gap-3 group"
            >
              <span>More about me</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
