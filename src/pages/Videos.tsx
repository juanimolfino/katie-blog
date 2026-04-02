import { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { videos } from '@/data';

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
      <section className="py-24 lg:py-32 bg-cream">
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
      <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
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
                      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
                      
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
                    </>
                  )}
                </div>
                
                {/* Info */}
                <div className="mt-4">
                  <span className="font-body text-xs tracking-wider uppercase text-black/50 mb-2 block">
                    {video.category.name}
                  </span>
                  <h3 className="font-display text-xl font-light group-hover:text-terracotta transition-colors">
                    {video.title}
                  </h3>
                  <p className="font-body text-sm text-black/60 mt-2 line-clamp-2">
                    {video.description}
                  </p>
                  {video.views && (
                    <p className="font-body text-xs text-black/40 mt-2">
                      {video.views.toLocaleString()} views
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-24 lg:py-32 bg-cream border-t border-black/5">
        <div className="section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
              Subscribe to my channel
            </h2>
            <p className="font-body text-base text-black/70 mb-8">
              Get notified when I upload new travel videos and adventures.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3"
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
