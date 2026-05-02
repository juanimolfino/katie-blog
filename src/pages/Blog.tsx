import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogCategoryLabels } from '@/data';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { fetchPublishedPosts } from '@/lib/publicPosts';
import type { BlogCategorySlug, BlogPost } from '@/types';

const BLOG_CATEGORIES: BlogCategorySlug[] = [
  'travel',
  'diving',
  'encounters',
  'guides',
  'dive-instructor-life',
];

const CATEGORY_PAGE_SIZE = 3;
const SEARCH_PAGE_SIZE = 6;
const RECENT_PAGE_SIZE = 6;

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function buildSearchText(post: BlogPost) {
  return [
    post.title,
    post.subtitle,
    post.excerpt,
    post.destination,
    post.country,
    post.continent,
    ...post.tags,
    ...post.categories.map((category) => blogCategoryLabels[category]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/72 via-ocean-dark/20 to-transparent transition-colors duration-300 group-hover:from-ocean-dark/82 group-hover:via-ocean-dark/35" />
        <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-300 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="font-body text-[11px] uppercase tracking-[0.15em] text-sky-200"
              >
                {blogCategoryLabels[category]}
              </span>
            ))}
          </div>
          <h3 className="font-display text-2xl text-white">
            {post.title}
          </h3>
        </div>
      </div>

      <p className="font-body text-sm text-black/48 mb-3">
        {formatPostDate(post.publishedAt)}
      </p>

      <p className="font-body text-base text-black/68 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
    </Link>
  );
}

export function Blog() {
  const settings = useSiteSettings();
  const [activeCategory, setActiveCategory] = useState<BlogCategorySlug>('travel');
  const [categoryVisibleCount, setCategoryVisibleCount] = useState(CATEGORY_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisibleCount, setSearchVisibleCount] = useState(SEARCH_PAGE_SIZE);
  const [recentVisibleCount, setRecentVisibleCount] = useState(RECENT_PAGE_SIZE);
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsErrorMessage, setPostsErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      setIsLoadingPosts(true);
      setPostsErrorMessage('');

      try {
        const posts = await fetchPublishedPosts();
        if (isMounted) setPublishedPosts(posts);
      } catch (error) {
        if (isMounted) {
          setPostsErrorMessage(
            error instanceof Error ? error.message : 'Unable to load published posts.'
          );
        }
      } finally {
        if (isMounted) setIsLoadingPosts(false);
      }
    }

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const sortedPosts = useMemo(
    () =>
      [...publishedPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    [publishedPosts]
  );

  const categoryPosts = useMemo(
    () => sortedPosts.filter((post) => post.categories.includes(activeCategory)),
    [activeCategory, sortedPosts]
  );

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedSearch) return [];
    return sortedPosts.filter((post) => buildSearchText(post).includes(normalizedSearch));
  }, [normalizedSearch, sortedPosts]);

  const handleCategoryChange = (category: BlogCategorySlug) => {
    setActiveCategory(category);
    setCategoryVisibleCount(CATEGORY_PAGE_SIZE);
  };

  const visibleCategoryPosts = categoryPosts.slice(0, categoryVisibleCount);
  const visibleSearchResults = searchResults.slice(0, searchVisibleCount);
  const visibleRecentPosts = sortedPosts.slice(0, recentVisibleCount);

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="py-16 md:py-20 bg-ocean-dark text-white border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <h1 className="font-logo text-5xl md:text-6xl lg:text-7xl leading-none mb-5">
            {settings.name}
          </h1>
          <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {settings.tagline}
          </p>
        </div>
      </section>

      <section className="bg-ocean text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-center gap-5 md:gap-8 py-6">
            <div className="font-logo text-3xl md:text-4xl leading-none">
              Categories
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-4">
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`font-body text-left md:text-center text-base md:text-lg tracking-wide transition-all duration-300 border-b pb-3 ${
                    activeCategory === category
                      ? 'text-white border-white'
                      : 'text-white/70 border-white/20 hover:text-white hover:border-white/45'
                  }`}
                >
                  {blogCategoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {postsErrorMessage && (
            <div className="mb-8 border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
              {postsErrorMessage}
            </div>
          )}

          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-black">
                {blogCategoryLabels[activeCategory]}
              </h2>
            </div>
            {categoryPosts.length > categoryVisibleCount && (
              <button
                onClick={() => setCategoryVisibleCount(categoryPosts.length)}
                className="font-body text-sm uppercase tracking-[0.16em] text-black/55 hover:text-ocean transition-colors"
              >
                View all -&gt;
              </button>
            )}
          </div>

          {isLoadingPosts ? (
            <p className="font-body text-sm uppercase tracking-[0.18em] text-black/40">
              Loading published posts...
            </p>
          ) : visibleCategoryPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleCategoryPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>

              {categoryVisibleCount < categoryPosts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() =>
                      setCategoryVisibleCount((current) => current + CATEGORY_PAGE_SIZE)
                    }
                    className="btn-ocean"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="font-body text-base text-black/60">
              No published posts in this category yet.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-black mb-4">
              Search
            </h2>
            <p className="font-body text-base md:text-lg text-black/62 max-w-2xl leading-relaxed">
              Search by destination, animal, gear, travel style, or anything else you might be looking for.
            </p>
          </div>

          <div className="max-w-2xl relative mb-12">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/35" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchVisibleCount(SEARCH_PAGE_SIZE);
              }}
              placeholder="Try Galapagos, sharks, gear, hotels..."
              className="w-full h-14 pl-14 pr-5 bg-cream border border-black/10 font-body text-base text-black placeholder:text-black/35 focus:outline-none focus:border-ocean transition-colors"
            />
          </div>

          {isLoadingPosts ? (
            <p className="font-body text-sm uppercase tracking-[0.18em] text-black/40">
              Loading published posts...
            </p>
          ) : normalizedSearch ? (
            <>
              <div className="mb-8">
                <p className="font-body text-sm uppercase tracking-[0.16em] text-black/40">
                  {searchResults.length} result{searchResults.length === 1 ? '' : 's'} for &quot;{searchQuery}&quot;
                </p>
              </div>

              {searchResults.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleSearchResults.map((post) => (
                      <BlogPostCard key={`${post.slug}-search`} post={post} />
                    ))}
                  </div>

                  {searchVisibleCount < searchResults.length && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={() =>
                          setSearchVisibleCount((current) => current + SEARCH_PAGE_SIZE)
                        }
                        className="btn-ocean"
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="font-body text-base text-black/60">
                  No posts matched that search yet.
                </p>
              )}
            </>
          ) : (
            <p className="font-body text-base text-black/55">
              Start typing to search through destinations, categories, and post keywords.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-black">
              Recent Posts
            </h2>
            {sortedPosts.length > recentVisibleCount && (
              <button
                onClick={() => setRecentVisibleCount(sortedPosts.length)}
                className="font-body text-sm uppercase tracking-[0.16em] text-black/55 hover:text-ocean transition-colors"
              >
                View all -&gt;
              </button>
            )}
          </div>

          {isLoadingPosts ? (
            <p className="font-body text-sm uppercase tracking-[0.18em] text-black/40">
              Loading published posts...
            </p>
          ) : visibleRecentPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleRecentPosts.map((post) => (
                  <BlogPostCard key={`${post.slug}-recent`} post={post} />
                ))}
              </div>

              {recentVisibleCount < sortedPosts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setRecentVisibleCount((current) => current + RECENT_PAGE_SIZE)}
                    className="btn-ocean"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="font-body text-base text-black/60">
              No published posts yet. Publish the first post from the admin panel.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
