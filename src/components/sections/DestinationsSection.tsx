import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '@/data';
import { fetchPublishedPosts } from '@/lib/publicPosts';
import type { BlogPost } from '@/types';

const DESTINATION_CARD_LIMIT = 6;

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const destinationPosts = posts.filter((post) => post.destination || post.country);
  const filteredDestinations = activeCategory === 'all'
    ? destinationPosts
    : destinationPosts.filter((post) => post.continent === activeCategory);
  const visibleDestinations = filteredDestinations.slice(0, DESTINATION_CARD_LIMIT);

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

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setIsLoadingPosts(true);

      try {
        const publishedPosts = await fetchPublishedPosts();
        if (isMounted) setPosts(publishedPosts);
      } catch (error) {
        console.error('Unable to load destination posts from Supabase', error);
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setIsLoadingPosts(false);
      }
    }

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-10 bg-white">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <h2
            className={`font-display text-5xl md:text-6xl lg:text-7xl font-light transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Destinations
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
        {isLoadingPosts ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading destinations...
          </p>
        ) : visibleDestinations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/blog/${destination.slug}`}
              className={`group relative overflow-hidden bg-gray-100 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100 + 250}ms`,
              }}
            >
              <div className="aspect-[4/3]">
                <img
                  src={destination.coverImage}
                  alt={destination.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-2 block font-body text-xs uppercase tracking-wider text-white/70">
                    {[destination.destination, destination.country].filter(Boolean).join(', ')}
                  </span>
                  <h3 className="font-display text-xl text-white font-light leading-tight">
                    {destination.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        ) : (
          <p className="font-body text-base text-black/60">
            Destination stories are coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
