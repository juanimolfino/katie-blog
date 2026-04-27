import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

const videos = [
  {
    id: "1",
    slug: "australia-diving",
    title: "Australia's Most Beautiful Dive Sites",
    description: "Discover the best diving spots along the Great Barrier Reef.",
    thumbnail: "/images/destinations/gbr.jpg",
    duration: "12:34",
    category: "Oceania",
    publishedAt: "2024-03-10",
  },
  {
    id: "2",
    slug: "raja-ampat-adventure",
    title: "My Solo Trip to Raja Ampat - Paradise Found",
    description: "Join me on my solo adventure through the most biodiverse marine ecosystem.",
    thumbnail: "/images/destinations/raja-ampat.jpg",
    duration: "18:45",
    category: "Asia",
    publishedAt: "2024-02-20",
  },
  {
    id: "3",
    slug: "galapagos-diving",
    title: "Galápagos Diving Experience of a Lifetime",
    description: "Swimming with hammerhead sharks and marine iguanas.",
    thumbnail: "/images/destinations/galapagos.jpg",
    duration: "15:20",
    category: "Americas",
    publishedAt: "2024-01-25",
  },
  {
    id: "4",
    slug: "maldives-paradise",
    title: "Maldives - The Perfect Dive Getaway",
    description: "Experience the ultimate diving vacation in the Maldives.",
    thumbnail: "/images/destinations/maldives.jpg",
    duration: "14:10",
    category: "Asia",
    publishedAt: "2024-01-10",
  },
  {
    id: "5",
    slug: "similan-islands",
    title: "Similan Islands - Thailand's Best Kept Secret",
    description: "Exploring the stunning Similan Islands.",
    thumbnail: "/images/destinations/similan.jpg",
    duration: "20:15",
    category: "Asia",
    publishedAt: "2023-12-20",
  },
  {
    id: "6",
    slug: "red-sea-diving",
    title: "Red Sea Adventures - Egypt's Underwater Treasures",
    description: "Diving the world-famous Red Sea.",
    thumbnail: "/images/destinations/red-sea.jpg",
    duration: "16:30",
    category: "Africa",
    publishedAt: "2023-12-05",
  },
];

export function Videos() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
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
      <section className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-body text-sm font-medium tracking-[2px] uppercase text-black/50 mb-6 block">
              videos
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light">
              Watch My Adventures
            </h1>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: { id: string; slug: string; title: string; thumbnail: string; duration: string; description: string; category: string; publishedAt: string }, index: number) => (
              <div
                key={video.id}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                {/* Thumbnail / Video */}
                <div className="relative aspect-video overflow-hidden">
                  {playingVideo === video.id ? (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <p className="text-white font-body">
                        Video player would load here
                      </p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-ocean-dark/20 transition-colors duration-300 group-hover:bg-ocean-dark/58" />
                      
                      {/* Play Button */}
                      <button
                        onClick={() => setPlayingVideo(video.id)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                          <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                        </div>
                      </button>
                      
                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-body">
                        {video.duration}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="font-body text-xs uppercase tracking-[0.18em] text-sky-200 block mb-2">
                          {video.category}
                        </span>
                        <h3 className="font-display text-2xl text-white">
                          {video.title}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Info */}
                <div className="mt-4">
                  <p className="font-body text-sm text-black/60 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 lg:py-32 bg-white border-t border-black/5">
        <div className="section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
              Subscribe to my channel
            </h2>
            <p className="font-body text-base text-black/70 mb-8">
              Get notified when I upload new diving videos and ocean adventures.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ocean inline-flex items-center gap-3"
            >
              <Play className="w-5 h-5" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
