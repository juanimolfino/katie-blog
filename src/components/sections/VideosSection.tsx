import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedVideos } from '@/data';

export function VideosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const videos = getFeaturedVideos();

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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
      <div className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2
              className={`font-display text-4xl md:text-5xl font-light transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              check out my
              <br />
              latest videos
            </h2>
          </div>
          
          <Link
            to="/videos"
            className={`btn-primary mt-6 md:mt-0 inline-flex items-center gap-3 group self-start transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>Subscribe</span>
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <Link
              key={video.id}
              to={`/videos/${video.slug}`}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150 + 300}ms`,
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                  </div>
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-body">
                  {video.duration}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="font-display text-xl font-light mt-4 group-hover:text-terracotta transition-colors">
                {video.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
