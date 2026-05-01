import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublishedPosts } from '@/lib/publicPosts';
import type { BlogPost } from '@/types';

export function RecentPosts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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
        if (isMounted) setPosts(publishedPosts.slice(0, 3));
      } catch (error) {
        console.error('Unable to load recent posts from Supabase', error);
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

        {isLoadingPosts ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading posts...
          </p>
        ) : posts.length > 0 ? (
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
        ) : (
          <p className="font-body text-base text-black/60">
            New posts are coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
