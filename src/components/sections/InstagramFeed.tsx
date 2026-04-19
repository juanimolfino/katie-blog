import { useEffect, useRef, useState } from 'react';
import { Instagram } from 'lucide-react';
import { siteConfig } from '@/data';

// Instagram posts estáticos
const instagramPosts = [
  { id: "1", imageUrl: "/images/destinations/gbr.jpg", link: siteConfig.social.instagram || "#" },
  { id: "2", imageUrl: "/images/destinations/raja-ampat.jpg", link: siteConfig.social.instagram || "#" },
  { id: "3", imageUrl: "/images/destinations/galapagos.jpg", link: siteConfig.social.instagram || "#" },
  { id: "4", imageUrl: "/images/destinations/maldives.jpg", link: siteConfig.social.instagram || "#" },
  { id: "5", imageUrl: "/images/destinations/similan.jpg", link: siteConfig.social.instagram || "#" },
];

export function InstagramFeed() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <h2
            className={`font-display text-3xl md:text-4xl font-light transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Instagram
          </h2>
          
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 font-body text-sm text-black/70 hover:text-ocean transition-all duration-300 mt-4 md:mt-0 group ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {instagramPosts.map((post: { id: string; imageUrl: string; link: string }, index: number) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square overflow-hidden transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: `${index * 100 + 200}ms`,
              }}
            >
              <img
                src={post.imageUrl}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
