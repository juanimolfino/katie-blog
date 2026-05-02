import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogCategoryLabels, getPostBySlug, getRelatedPosts } from '@/data';
import {
  fetchPublishedPostBySlug,
  fetchRelatedPublishedPosts,
  type PublicPost,
  type PublicPostBlock,
} from '@/lib/publicPosts';
import type { BlogCategorySlug, BlogPost } from '@/types';

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function categoryLabel(category: BlogCategorySlug | string) {
  return blogCategoryLabels[category as BlogCategorySlug] ?? category;
}

function getYouTubeId(url: string | undefined) {
  if (!url) return '';

  const trimmedUrl = url.trim();
  const directId = /^[a-zA-Z0-9_-]{11}$/.test(trimmedUrl) ? trimmedUrl : '';
  if (directId) return directId;

  try {
    const parsedUrl = new URL(trimmedUrl);
    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '').slice(0, 11);
    }

    if (parsedUrl.pathname.includes('/shorts/')) {
      return parsedUrl.pathname.split('/shorts/')[1]?.split('/')[0] ?? '';
    }

    if (parsedUrl.pathname.includes('/embed/')) {
      return parsedUrl.pathname.split('/embed/')[1]?.split('/')[0] ?? '';
    }

    return parsedUrl.searchParams.get('v') ?? '';
  } catch {
    return '';
  }
}

function YouTubeBlock({ block }: { block: PublicPostBlock }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useMobileVideo, setUseMobileVideo] = useState(false);

  useEffect(() => {
    const checkVideoLayout = () => {
      setUseMobileVideo(window.innerWidth < 768 && window.innerHeight >= window.innerWidth);
    };

    checkVideoLayout();
    window.addEventListener('resize', checkVideoLayout);
    window.addEventListener('orientationchange', checkVideoLayout);

    return () => {
      window.removeEventListener('resize', checkVideoLayout);
      window.removeEventListener('orientationchange', checkVideoLayout);
    };
  }, []);

  const primaryId = getYouTubeId(block.content.youtubeUrl);
  const mobileId = getYouTubeId(block.content.youtubeUrlMobile);
  const videoId = useMobileVideo && mobileId ? mobileId : primaryId || mobileId;
  const isPortrait = useMobileVideo && mobileId ? true : block.content.orientation === 'portrait';
  const aspectClass = isPortrait ? 'aspect-[9/16] max-w-sm' : 'aspect-video max-w-5xl';

  if (!videoId) return null;

  const title = block.content.videoTitle || 'Katie video';

  return (
    <figure className={`${aspectClass} mx-auto space-y-3`}>
      <div className="relative h-full w-full overflow-hidden bg-black">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group relative h-full w-full"
            aria-label={`Play ${title}`}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-black shadow-[0_10px_40px_rgba(0,0,0,0.28)] transition-transform group-hover:scale-105">
              <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[17px] border-y-transparent border-l-ocean" />
            </span>
          </button>
        )}
      </div>
      {block.content.caption && (
        <figcaption className="font-body text-sm text-black/55">
          {block.content.caption}
        </figcaption>
      )}
    </figure>
  );
}

function PostNotFound() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-black/40 mb-4">
          Post not found
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-black mb-6">
          This story isn&apos;t here yet
        </h1>
        <p className="font-body text-black/65 mb-8">
          The link may be old, or the post is still being prepared.
        </p>
        <Link to="/" className="btn-ocean inline-flex items-center gap-2">
          <span>Back home</span>
        </Link>
      </div>
    </div>
  );
}

function PostLoading() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <p className="font-body text-sm tracking-[0.2em] uppercase text-black/40">
          Loading story...
        </p>
      </div>
    </div>
  );
}

function DynamicBlock({ block }: { block: PublicPostBlock }) {
  if (block.type === 'heading') {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-black">
          {block.content.text}
        </h2>
      </div>
    );
  }

  if (block.type === 'paragraph') {
    return (
      <div className="max-w-3xl mx-auto">
        <p className="whitespace-pre-line font-body text-lg leading-relaxed text-black/78">
          {block.content.text}
        </p>
      </div>
    );
  }

  if (block.type === 'quote') {
    return (
      <div className="max-w-3xl mx-auto border-l border-ocean/30 pl-6 md:pl-8">
        <p className="font-display text-2xl md:text-3xl italic text-black/85 leading-relaxed">
          {block.content.text}
        </p>
        {block.content.attribution && (
          <p className="font-body text-sm uppercase tracking-[0.16em] text-black/45 mt-4">
            {block.content.attribution}
          </p>
        )}
      </div>
    );
  }

  if (block.type === 'divider') {
    return (
      <div className="max-w-3xl mx-auto py-3">
        <div className="h-px w-full bg-black/10" />
      </div>
    );
  }

  if (block.type === 'youtube') {
    return <YouTubeBlock block={block} />;
  }

  if (block.type === 'link') {
    const href = block.content.href ?? '';
    const isInternal = href.startsWith('/');
    const linkLabel = block.content.label || 'Read more';

    return (
      <div className="max-w-3xl mx-auto border border-ocean/15 bg-sky-50 p-6 md:p-7">
        {block.content.text && (
          <p className="mb-5 whitespace-pre-line font-body text-lg leading-relaxed text-black/72">
            {block.content.text}
          </p>
        )}
        {href && (
          isInternal ? (
            <Link to={href} className="btn-ocean">
              {linkLabel}
            </Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn-ocean">
              {linkLabel}
            </a>
          )
        )}
      </div>
    );
  }

  if (block.type === 'list') {
    const items = (block.content.items ?? []).map((item) => item.trim()).filter(Boolean);

    if (!block.content.text && items.length === 0) return null;

    return (
      <div className="max-w-3xl mx-auto border-l border-ocean/25 pl-6 md:pl-8">
        {block.content.text && (
          <h2 className="mb-5 font-display text-3xl md:text-4xl text-black">
            {block.content.text}
          </h2>
        )}
        {items.length > 0 && (
          <ul className="space-y-3 font-body text-lg leading-relaxed text-black/78">
            {items.map((item, index) => (
              <li key={`${block.id}-item-${index}`} className="flex gap-3">
                <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-ocean" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (block.type === 'image-pair') {
    const images = [
      {
        src: block.content.src,
        alt: block.content.alt,
        caption: block.content.caption,
      },
      {
        src: block.content.srcSecondary,
        alt: block.content.altSecondary,
        caption: block.content.captionSecondary,
      },
    ].filter((image) => image.src);
    const aspectClass =
      block.content.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]';

    if (images.length === 0) return null;

    return (
      <div className="max-w-5xl mx-auto grid gap-5 md:grid-cols-2">
        {images.map((image, index) => (
          <figure key={`${block.id}-image-${index}`} className="space-y-3">
            <div className={`${aspectClass} overflow-hidden bg-gray-100`}>
              <img
                src={image.src}
                alt={image.alt || ''}
                className="h-full w-full object-cover"
              />
            </div>
            {image.caption && (
              <figcaption className="font-body text-sm text-black/55">
                {image.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  return (
    <figure className="max-w-5xl mx-auto space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={block.content.src || '/images/home/hero-bg.jpg'}
          alt={block.content.alt || ''}
          className="w-full h-full object-cover"
        />
      </div>
      {block.content.caption && (
        <figcaption className="font-body text-sm text-black/55">
          {block.content.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RelatedPostsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-8 mt-24 md:mt-28 pt-16 md:pt-20 border-t border-black/10">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-body text-sm tracking-[0.18em] uppercase text-black/40 block mb-3">
            Keep reading
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-black">
            Related Posts
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((relatedPost) => (
          <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
              <img
                src={relatedPost.coverImage}
                alt={relatedPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {relatedPost.categories.slice(0, 2).map((category) => (
                <span
                  key={category}
                  className="font-body text-[11px] uppercase tracking-[0.14em] text-ocean"
                >
                  {categoryLabel(category)}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl text-black group-hover:text-ocean transition-colors mb-2">
              {relatedPost.title}
            </h3>
            <p className="font-body text-sm text-black/48 mb-3">
              {formatPostDate(relatedPost.publishedAt)}
            </p>
            <p className="font-body text-base text-black/68 leading-relaxed">
              {relatedPost.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StaticPostArticle({ post }: { post: BlogPost }) {
  if (!post) {
    return <PostNotFound />;
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <article className="bg-white pt-24 md:pt-28 pb-24">
      <header className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {post.categories.map((category) => (
              <span
                key={category}
                className="font-body text-xs tracking-[0.18em] uppercase text-ocean"
              >
                {categoryLabel(category)}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[1.1] mb-5">
            {post.title}
          </h1>

          <p className="font-body text-lg md:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto mb-6">
            {post.subtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 font-body text-sm text-black/45 uppercase tracking-[0.14em]">
            <span>{formatPostDate(post.publishedAt)}</span>
            <span className="hidden sm:inline text-black/25">/</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="mt-12 md:mt-14">
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-8 mt-14 md:mt-18">
        <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
          {post.intro.map((paragraph, index) => (
            <p
              key={`${post.slug}-intro-${index}`}
              className="font-body text-lg leading-relaxed text-black/80"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 md:mt-20 space-y-16 md:space-y-20">
          {post.sections.map((section) => (
            <section key={section.id} className="space-y-8">
              <div className="max-w-3xl mx-auto">
                {section.title && (
                  <h2 className="font-display text-3xl md:text-4xl text-black mb-6">
                    {section.title}
                  </h2>
                )}

                <div className="space-y-5">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${section.id}-paragraph-${index}`}
                      className="font-body text-lg leading-relaxed text-black/78"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {section.quote && (
                <div className="max-w-3xl mx-auto border-l border-ocean/30 pl-6 md:pl-8">
                  <p className="font-display text-2xl md:text-3xl italic text-black/85 leading-relaxed">
                    {section.quote.text}
                  </p>
                  {section.quote.attribution && (
                    <p className="font-body text-sm uppercase tracking-[0.16em] text-black/45 mt-4">
                      {section.quote.attribution}
                    </p>
                  )}
                </div>
              )}

              {section.images && section.images.length > 0 && (
                <div
                  className={`max-w-5xl mx-auto grid gap-5 ${
                    section.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                  }`}
                >
                  {section.images.map((image) => (
                    <figure key={image.src} className="space-y-3">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {image.caption && (
                        <figcaption className="font-body text-sm text-black/55">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <RelatedPostsSection posts={relatedPosts} />
    </article>
  );
}

function DynamicPostArticle({
  post,
  blocks,
  relatedPosts,
}: {
  post: PublicPost;
  blocks: PublicPostBlock[];
  relatedPosts: BlogPost[];
}) {
  return (
    <article className="bg-white pt-24 md:pt-28 pb-24">
      <header className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {post.categories.map((category) => (
              <span
                key={category}
                className="font-body text-xs tracking-[0.18em] uppercase text-ocean"
              >
                {categoryLabel(category)}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-black leading-[1.1] mb-5">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="font-body text-lg md:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto mb-6">
              {post.subtitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 font-body text-sm text-black/45 uppercase tracking-[0.14em]">
            <span>{formatPostDate(post.published_at ?? post.created_at)}</span>
            <span className="hidden sm:inline text-black/25">/</span>
            <span>{post.read_time} min read</span>
          </div>
        </div>

        {post.cover_image && (
          <div className="mt-12 md:mt-14">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-6 md:px-8 mt-14 md:mt-18">
        {blocks.length > 0 ? (
          <div className="space-y-10 md:space-y-12">
            {blocks.map((block) => (
              <DynamicBlock key={block.id} block={block} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-lg leading-relaxed text-black/78">
              {post.excerpt}
            </p>
          </div>
        )}
      </div>

      <RelatedPostsSection posts={relatedPosts} />
    </article>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const staticPost = slug ? getPostBySlug(slug) : undefined;
  const [dynamicPost, setDynamicPost] = useState<PublicPost | null>(null);
  const [dynamicBlocks, setDynamicBlocks] = useState<PublicPostBlock[]>([]);
  const [dynamicRelatedPosts, setDynamicRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoadingDynamicPost, setIsLoadingDynamicPost] = useState(Boolean(slug));

  useEffect(() => {
    let isMounted = true;

    async function loadDynamicPost() {
      if (!slug) {
        setIsLoadingDynamicPost(false);
        return;
      }

      try {
        const result = await fetchPublishedPostBySlug(slug);
        if (!isMounted) return;

        setDynamicPost(result?.post ?? null);
        setDynamicBlocks(result?.blocks ?? []);

        if (result?.post) {
          const relatedPosts = await fetchRelatedPublishedPosts(result.post, 3);
          if (!isMounted) return;
          setDynamicRelatedPosts(relatedPosts);
        } else {
          setDynamicRelatedPosts([]);
        }
      } catch (error) {
        console.error('Unable to load published post from Supabase', error);
      } finally {
        if (isMounted) setIsLoadingDynamicPost(false);
      }
    }

    void loadDynamicPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoadingDynamicPost && !staticPost) {
    return <PostLoading />;
  }

  if (dynamicPost) {
    return (
      <DynamicPostArticle
        post={dynamicPost}
        blocks={dynamicBlocks}
        relatedPosts={dynamicRelatedPosts}
      />
    );
  }

  if (staticPost) {
    return <StaticPostArticle post={staticPost} />;
  }

  return <PostNotFound />;
}
