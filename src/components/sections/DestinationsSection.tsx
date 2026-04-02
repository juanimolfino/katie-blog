import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinations, categories } from '@/data';


export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDestinations = activeCategory === 'all'
    ? destinations
    : destinations.filter(d => d.continent === activeCategory);

  const featuredDestination = filteredDestinations.find(d => d.featured) || filteredDestinations[0];
  const otherDestinations = filteredDestinations.filter(d => d.id !== featuredDestination?.id).slice(0, 4);

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <h2
            className={`font-display text-4xl md:text-5xl font-light transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Best Places to Visit
          </h2>
          
          <Link
            to="/destinations"
            className={`inline-flex items-center gap-2 font-body text-sm text-black/70 hover:text-terracotta transition-all duration-300 mt-4 md:mt-0 group ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>view all</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-200 ${
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

        {/* Destinations Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Destination */}
          {featuredDestination && (
            <Link
              to={`/destinations/${featuredDestination.slug}`}
              className={`lg:col-span-2 lg:row-span-2 group relative overflow-hidden transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                <img
                  src={featuredDestination.coverImage}
                  alt={featuredDestination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="font-body text-xs tracking-wider uppercase text-white/70 mb-2 block">
                    {featuredDestination.country}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl text-white font-light">
                    {featuredDestination.name}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* Other Destinations */}
          {otherDestinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.slug}`}
              className={`group relative overflow-hidden transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100 + 400}ms`,
              }}
            >
              <div className="aspect-[4/3]">
                <img
                  src={destination.coverImage}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-body text-xs tracking-wider uppercase text-white/70 mb-1 block">
                    {destination.country}
                  </span>
                  <h3 className="font-display text-lg text-white font-light">
                    {destination.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
