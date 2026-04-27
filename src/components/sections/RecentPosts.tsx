import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecentPosts } from '@/data';

export function RecentPosts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const posts = getRecentPosts(3);

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
    <section ref={sectionRef} className="py-24 lg:pb-32 lg:pt-10 bg-gray-100">
      <div className="section-padding">
        {/* Header */}
        <div className="mb-12">
          <h2
            className={`font-display text-5xl md:text-6xl lg:text-7xl font-light transition-all duration-700 text-terracotta/80 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Recent
            <br />
            Posts
          </h2>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 150 + 200}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ocean-dark/0 transition-colors duration-300 group-hover:bg-ocean-dark/58" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-display text-2xl text-white">
                    {post.title}
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <p className="font-body text-sm text-black/50 mb-3">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              
              <p className="font-body text-sm text-black/70 line-clamp-3 mb-3">
                {post.excerpt}
              </p>
              
              <span className="inline-flex items-center font-body text-sm text-ocean group-hover:underline">
                Read more
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
