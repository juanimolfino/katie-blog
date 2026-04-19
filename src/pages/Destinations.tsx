import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { destinations, categories } from '@/data';

export function Destinations() {
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const filteredDestinations = activeCategory === 'all'
    ? destinations
    : destinations.filter(d => d.continent === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-body text-sm font-medium tracking-[2px] uppercase text-black/50 mb-6 block">
              destination
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light">
              Explore the World
            </h1>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
        <div className="section-padding">
          {/* Category Tabs */}
          <div
            className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`font-body text-sm tracking-wide transition-all duration-300 relative pb-2 ${
                  activeCategory === category.slug
                    ? 'text-terracotta'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {category.name}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-terracotta transition-all duration-300 ${
                    activeCategory === category.slug ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className={`group relative overflow-hidden transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={destination.coverImage}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="font-body text-xs tracking-wider uppercase text-white/70 mb-2 block">
                      {destination.country}
                    </span>
                    <h3 className="font-display text-2xl text-white font-light mb-2">
                      {destination.name}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-white/80 font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="font-body text-lg text-black/50">
                No destinations found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
