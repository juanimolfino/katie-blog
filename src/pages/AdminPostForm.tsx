import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createAdminPost,
  fetchAdminPost,
  fetchAdminPostBlocks,
  replaceAdminPostBlocks,
  updateAdminPost,
  type AdminPostBlockContent,
  type AdminPostBlockInput,
  type AdminPostBlockType,
  type AdminPostInput,
  type AdminPostStatus,
} from '@/lib/adminPosts';
import { uploadMediaFile } from '@/lib/adminMedia';
import type { BlogCategorySlug, Continent } from '@/types';

const categoryOptions: { value: BlogCategorySlug; label: string }[] = [
  { value: 'travel', label: 'Travel' },
  { value: 'diving', label: 'Diving' },
  { value: 'encounters', label: 'Encounters' },
  { value: 'guides', label: 'Guides' },
  { value: 'dive-instructor-life', label: 'Dive Instructor Life' },
];

const continentOptions: { value: Continent; label: string }[] = [
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'north-america', label: 'North America' },
  { value: 'central-america', label: 'Central America' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
];

const blockTypeOptions: { value: AdminPostBlockType; label: string }[] = [
  { value: 'heading', label: 'Heading' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'image', label: 'Image' },
  { value: 'image-pair', label: 'Two images' },
  { value: 'youtube', label: 'YouTube video' },
  { value: 'divider', label: 'Divider line' },
  { value: 'quote', label: 'Quote' },
  { value: 'link', label: 'Link' },
  { value: 'list', label: 'Title + list' },
];

type EditableBlock = {
  localId: string;
  type: AdminPostBlockType;
  content: AdminPostBlockContent;
};

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function createEmptyBlock(type: AdminPostBlockType): EditableBlock {
  return {
    localId: crypto.randomUUID(),
    type,
    content:
      type === 'image'
        ? { src: '', alt: '', caption: '' }
        : type === 'image-pair'
          ? {
              src: '',
              alt: '',
              caption: '',
              srcSecondary: '',
              altSecondary: '',
              captionSecondary: '',
              orientation: 'landscape',
            }
        : type === 'youtube'
          ? {
              youtubeUrl: '',
              youtubeUrlMobile: '',
              orientation: 'landscape',
              videoTitle: '',
              caption: '',
            }
        : type === 'divider'
          ? {}
        : type === 'link'
          ? { text: '', href: '', label: 'Read more' }
        : type === 'list'
          ? { text: '', items: [''] }
        : type === 'quote'
          ? { text: '', attribution: '' }
          : { text: '' },
  };
}

export function AdminPostForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<AdminPostStatus>('draft');
  const [categories, setCategories] = useState<BlogCategorySlug[]>(['travel']);
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState(5);
  const [destination, setDestination] = useState('');
  const [country, setCountry] = useState('');
  const [continent, setContinent] = useState<'' | Continent>('');
  const [publishedAt, setPublishedAt] = useState('');
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [blocks, setBlocks] = useState<EditableBlock[]>([]);
  const [blockSaveMessage, setBlockSaveMessage] = useState('');
  const [blockErrorMessage, setBlockErrorMessage] = useState('');
  const [isSavingBlocks, setIsSavingBlocks] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [coverUploadError, setCoverUploadError] = useState('');
  const [coverUploadMessage, setCoverUploadMessage] = useState('');
  const [blockUploadErrors, setBlockUploadErrors] = useState<Record<string, string>>({});
  const [blockUploadMessages, setBlockUploadMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const [post, postBlocks] = await Promise.all([
          fetchAdminPost(id as string),
          fetchAdminPostBlocks(id as string),
        ]);
        setTitle(post.title);
        setSlug(post.slug);
        setSubtitle(post.subtitle ?? '');
        setExcerpt(post.excerpt);
        setCoverImage(post.cover_image ?? '');
        setStatus(post.status);
        setCategories(post.categories.length > 0 ? post.categories : ['travel']);
        setTags(post.tags.join(', '));
        setReadTime(post.read_time);
        setDestination(post.destination ?? '');
        setCountry(post.country ?? '');
        setContinent(post.continent ?? '');
        setPublishedAt(post.published_at ?? '');
        setBlocks(
          postBlocks.map((block) => ({
            localId: block.id,
            type: block.type,
            content: block.content,
          }))
        );
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Unable to load post.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadPost();
  }, [id]);

  const pageTitle = useMemo(() => (isEditing ? 'Edit post' : 'New post'), [isEditing]);

  const handleTitleChange = (nextTitle: string) => {
    setTitle(nextTitle);
    if (!isEditing || !slug) setSlug(createSlug(nextTitle));
  };

  const toggleCategory = (category: BlogCategorySlug) => {
    setCategories((current) => {
      if (current.includes(category)) {
        const next = current.filter((item) => item !== category);
        return next.length > 0 ? next : current;
      }

      return [...current, category];
    });
  };

  const buildPostInput = (): AdminPostInput => ({
      title: title.trim(),
      slug: slug.trim(),
      subtitle: subtitle.trim(),
      excerpt: excerpt.trim(),
      cover_image: coverImage.trim(),
      status,
      categories,
      tags: splitList(tags),
      read_time: readTime,
      destination: destination.trim(),
      country: country.trim(),
      continent: continent || null,
      published_at: publishedAt || null,
  });

  const savePostMetadata = async () => {
    const input = buildPostInput();

    if (id) {
      return updateAdminPost(id, input);
    }

    return createAdminPost(input);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await savePostMetadata();
      navigate('/admin/posts');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;

    setErrorMessage('');
    setCoverUploadError('');
    setCoverUploadMessage('');
    setUploadingField('cover');

    try {
      const publicUrl = await uploadMediaFile(file, 'posts/covers', {
        maxWidth: 1600,
        quality: 0.78,
        targetSize: 900 * 1024,
        minWidth: 1200,
        minQuality: 0.6,
      });
      setCoverImage(publicUrl);
      setCoverUploadMessage('Image uploaded and optimized. Save the post to publish this cover.');
    } catch (error) {
      setCoverUploadError(
        error instanceof Error ? error.message : 'Unable to upload cover image.'
      );
    } finally {
      setUploadingField(null);
    }
  };

  const handleBlockImageUpload = async (
    localId: string,
    file: File | undefined,
    field: 'src' | 'srcSecondary' = 'src'
  ) => {
    if (!file) return;

    setBlockErrorMessage('');
    setBlockSaveMessage('');
    const uploadKey = `${localId}-${field}`;
    setBlockUploadErrors((current) => ({ ...current, [uploadKey]: '' }));
    setBlockUploadMessages((current) => ({ ...current, [uploadKey]: '' }));
    setUploadingField(`block-${uploadKey}`);

    try {
      const publicUrl = await uploadMediaFile(file, 'posts/blocks', {
        maxWidth: 1400,
        quality: 0.76,
        targetSize: 800 * 1024,
        minWidth: 1100,
        minQuality: 0.58,
      });
      updateBlockContent(localId, field, publicUrl);
      setBlockUploadMessages((current) => ({
        ...current,
        [uploadKey]: 'Image uploaded and optimized. Save blocks to publish this image.',
      }));
    } catch (error) {
      setBlockUploadErrors((current) => ({
        ...current,
        [uploadKey]: error instanceof Error ? error.message : 'Unable to upload block image.',
      }));
    } finally {
      setUploadingField(null);
    }
  };

  const addBlock = (type: AdminPostBlockType) => {
    setBlockSaveMessage('');
    setBlockErrorMessage('');
    setBlocks((current) => [...current, createEmptyBlock(type)]);
  };

  const updateBlockType = (localId: string, type: AdminPostBlockType) => {
    setBlockSaveMessage('');
    setBlocks((current) =>
      current.map((block) => (block.localId === localId ? createEmptyBlock(type) : block))
    );
  };

  const updateBlockContent = (
    localId: string,
    field: keyof AdminPostBlockContent,
    value: string
  ) => {
    setBlockSaveMessage('');
    setBlocks((current) =>
      current.map((block) =>
        block.localId === localId
          ? { ...block, content: { ...block.content, [field]: value } }
          : block
      )
    );
  };

  const updateListItem = (localId: string, itemIndex: number, value: string) => {
    setBlockSaveMessage('');
    setBlocks((current) =>
      current.map((block) => {
        if (block.localId !== localId) return block;

        const items = [...(block.content.items ?? [''])];
        items[itemIndex] = value;
        return { ...block, content: { ...block.content, items } };
      })
    );
  };

  const addListItem = (localId: string) => {
    setBlockSaveMessage('');
    setBlocks((current) =>
      current.map((block) =>
        block.localId === localId
          ? {
              ...block,
              content: {
                ...block.content,
                items: [...(block.content.items ?? []), ''],
              },
            }
          : block
      )
    );
  };

  const removeListItem = (localId: string, itemIndex: number) => {
    setBlockSaveMessage('');
    setBlocks((current) =>
      current.map((block) => {
        if (block.localId !== localId) return block;

        const nextItems = (block.content.items ?? []).filter((_, index) => index !== itemIndex);
        return {
          ...block,
          content: {
            ...block.content,
            items: nextItems.length > 0 ? nextItems : [''],
          },
        };
      })
    );
  };

  const moveBlock = (localId: string, direction: -1 | 1) => {
    setBlockSaveMessage('');
    setBlocks((current) => {
      const index = current.findIndex((block) => block.localId === localId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;

      const next = [...current];
      const [block] = next.splice(index, 1);
      next.splice(nextIndex, 0, block);
      return next;
    });
  };

  const duplicateBlock = (localId: string) => {
    setBlockSaveMessage('');
    setBlockErrorMessage('');
    setBlocks((current) => {
      const index = current.findIndex((block) => block.localId === localId);
      if (index < 0) return current;

      const source = current[index];
      const duplicate: EditableBlock = {
        localId: crypto.randomUUID(),
        type: source.type,
        content: { ...source.content },
      };
      const next = [...current];
      next.splice(index + 1, 0, duplicate);
      return next;
    });
  };

  const removeBlock = (localId: string) => {
    setBlockSaveMessage('');
    setBlocks((current) => current.filter((block) => block.localId !== localId));
  };

  const saveBlocks = async () => {
    if (!id) return [];
    setBlockErrorMessage('');
    setBlockSaveMessage('');

    const blockInputs: AdminPostBlockInput[] = blocks.map((block, index) => ({
      type: block.type,
      position: index,
      content: block.content,
    }));

    const savedBlocks = await replaceAdminPostBlocks(id, blockInputs);
    setBlocks(
      savedBlocks.map((block) => ({
        localId: block.id,
        type: block.type,
        content: block.content,
      }))
    );

    return savedBlocks;
  };

  const handleSaveBlocks = async () => {
    if (!id) return;

    setIsSavingBlocks(true);

    try {
      await saveBlocks();
      setBlockSaveMessage('Content blocks saved.');
    } catch (error) {
      setBlockErrorMessage(
        error instanceof Error ? error.message : 'Unable to save content blocks.'
      );
    } finally {
      setIsSavingBlocks(false);
    }
  };

  const handleSaveAll = async () => {
    if (!id) return;

    setErrorMessage('');
    setBlockErrorMessage('');
    setBlockSaveMessage('');
    setIsSubmitting(true);
    setIsSavingBlocks(true);

    try {
      await savePostMetadata();
      await saveBlocks();
      setBlockSaveMessage('Post and content blocks saved.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save post.';
      setErrorMessage(message);
      setBlockErrorMessage(message);
    } finally {
      setIsSubmitting(false);
      setIsSavingBlocks(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 border-b border-black/10 pb-8">
          <Link
            to="/admin/posts"
            className="mb-5 inline-block font-body text-sm uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-ocean"
          >
            Back to posts
          </Link>
          <h1 className="font-display text-5xl text-black md:text-6xl">
            {pageTitle}
          </h1>
        </div>

        {isLoading ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading post...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-8">
            {errorMessage && (
              <div className="border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Title</span>
                <input
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  required
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Slug</span>
                <input
                  value={slug}
                  onChange={(event) => setSlug(createSlug(event.target.value))}
                  required
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Subtitle</span>
              <input
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Excerpt</span>
              <textarea
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                required
                rows={4}
                className="w-full border border-black/10 bg-cream px-4 py-3 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Cover image URL</span>
              <div className="grid gap-3">
                <input
                  value={coverImage}
                  onChange={(event) => setCoverImage(event.target.value)}
                  placeholder="/images/destinations/galapagos.jpg"
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => void handleCoverUpload(event.target.files?.[0])}
                    className="font-body text-sm text-black/55 file:mr-4 file:border-0 file:bg-ocean file:px-4 file:py-2 file:font-body file:text-sm file:text-white hover:file:bg-ocean-light"
                  />
                  {uploadingField === 'cover' && (
                    <span className="font-body text-sm text-black/45">Uploading cover...</span>
                  )}
                </div>
                <p className="font-body text-xs leading-relaxed text-black/45">
                  JPG, PNG, WebP, or GIF. Large JPG/PNG/WebP files are automatically optimized before upload.
                </p>
                {coverUploadError && (
                  <p className="font-body text-sm leading-relaxed text-red-700">
                    {coverUploadError}
                  </p>
                )}
                {coverUploadMessage && (
                  <p className="font-body text-sm leading-relaxed text-ocean">
                    {coverUploadMessage}
                  </p>
                )}
                {coverImage && (
                  <div className="relative aspect-[16/9] max-w-sm overflow-hidden bg-gray-100">
                    <img src={coverImage} alt="" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>
            </label>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Status</span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as AdminPostStatus)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Published date</span>
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(event) => setPublishedAt(event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Read time</span>
                <input
                  type="number"
                  min={1}
                  value={readTime}
                  onChange={(event) => setReadTime(Number(event.target.value))}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <div>
              <span className="mb-3 block font-body text-sm text-black/60">Categories</span>
              <div className="flex flex-wrap gap-3">
                {categoryOptions.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => toggleCategory(category.value)}
                    className={`border px-4 py-2 font-body text-sm uppercase tracking-[0.12em] transition-colors ${
                      categories.includes(category.value)
                        ? 'border-ocean bg-ocean text-white'
                        : 'border-black/10 text-black/60 hover:border-ocean hover:text-ocean'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Tags</span>
              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                placeholder="galapagos, sharks, diving"
                className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Destination</span>
                <input
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Country</span>
                <input
                  value={country}
                  onChange={(event) => setCountry(event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Continent</span>
                <select
                  value={continent}
                  onChange={(event) => setContinent(event.target.value as '' | Continent)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                >
                  <option value="">None</option>
                  {continentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-ocean justify-center disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save post'}
              </button>
              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => void handleSaveAll()}
                    disabled={isSubmitting || isSavingBlocks}
                    className="btn-secondary justify-center disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting || isSavingBlocks ? 'Saving all...' : 'Save all'}
                  </button>
                  <Link
                    to={`/blog/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-center"
                  >
                    Preview
                  </Link>
                </>
              )}
              <Link to="/admin/posts" className="btn-secondary justify-center">
                Cancel
              </Link>
            </div>

            <div className="border-t border-black/10 pt-10">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="mb-2 block font-body text-sm uppercase tracking-[0.16em] text-ocean">
                    Content
                  </span>
                  <h2 className="font-display text-4xl text-black">
                    Content blocks
                  </h2>
                </div>

                {isEditing && (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => void handleSaveAll()}
                      disabled={isSubmitting || isSavingBlocks}
                      className="btn-secondary justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting || isSavingBlocks ? 'Saving all...' : 'Save all'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleSaveBlocks()}
                      disabled={isSavingBlocks}
                      className="btn-ocean justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSavingBlocks ? 'Saving blocks...' : 'Save blocks'}
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="border border-black/10 bg-cream p-5">
                  <p className="font-body text-base leading-relaxed text-black/65">
                    Save the post metadata first. Then reopen it to add the story blocks.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex flex-wrap gap-3">
                    {blockTypeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => addBlock(option.value)}
                        className="border border-black/10 px-4 py-2 font-body text-sm uppercase tracking-[0.12em] text-black/60 transition-colors hover:border-ocean hover:text-ocean"
                      >
                        Add {option.label}
                      </button>
                    ))}
                  </div>

                  {blockErrorMessage && (
                    <div className="mb-5 border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
                      {blockErrorMessage}
                    </div>
                  )}

                  {blockSaveMessage && (
                    <div className="mb-5 border border-ocean/20 bg-sky-50 p-4 font-body text-sm text-ocean">
                      {blockSaveMessage}
                    </div>
                  )}

                  {blocks.length === 0 ? (
                    <div className="border border-black/10 bg-cream p-5">
                      <p className="font-body text-base leading-relaxed text-black/65">
                        No blocks yet. Add a heading, paragraph, image, quote, or link to start the story.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-5">
                      {blocks.map((block, index) => (
                        <div key={block.localId} className="border border-black/10 bg-cream p-5">
                          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center bg-ocean font-body text-sm text-white">
                                {index + 1}
                              </span>
                              <select
                                value={block.type}
                                onChange={(event) =>
                                  updateBlockType(
                                    block.localId,
                                    event.target.value as AdminPostBlockType
                                  )
                                }
                                className="h-10 border border-black/10 bg-white px-3 font-body text-sm outline-none focus:border-ocean"
                              >
                                {blockTypeOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => moveBlock(block.localId, -1)}
                                disabled={index === 0}
                                className="font-body text-sm uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-ocean disabled:opacity-30"
                              >
                                Up
                              </button>
                              <button
                                type="button"
                                onClick={() => moveBlock(block.localId, 1)}
                                disabled={index === blocks.length - 1}
                                className="font-body text-sm uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-ocean disabled:opacity-30"
                              >
                                Down
                              </button>
                              <button
                                type="button"
                                onClick={() => duplicateBlock(block.localId)}
                                className="font-body text-sm uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-ocean"
                              >
                                Duplicate
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBlock(block.localId)}
                                className="font-body text-sm uppercase tracking-[0.12em] text-red-700/70 transition-colors hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {block.type === 'image' ? (
                            <div className="grid gap-4">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Image URL
                                </span>
                                <div className="grid gap-3">
                                  <input
                                    value={block.content.src ?? ''}
                                    onChange={(event) =>
                                      updateBlockContent(block.localId, 'src', event.target.value)
                                    }
                                    className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                  />
                                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <input
                                      type="file"
                                      accept="image/jpeg,image/png,image/webp,image/gif"
                                      onChange={(event) =>
                                        void handleBlockImageUpload(
                                          block.localId,
                                          event.target.files?.[0]
                                        )
                                      }
                                      className="font-body text-sm text-black/55 file:mr-4 file:border-0 file:bg-ocean file:px-4 file:py-2 file:font-body file:text-sm file:text-white hover:file:bg-ocean-light"
                                    />
                                    {uploadingField === `block-${block.localId}-src` && (
                                      <span className="font-body text-sm text-black/45">
                                        Uploading image...
                                      </span>
                                    )}
                                  </div>
                                  <p className="font-body text-xs leading-relaxed text-black/45">
                                    JPG, PNG, WebP, or GIF. Large JPG/PNG/WebP files are automatically optimized.
                                  </p>
                                  {blockUploadErrors[`${block.localId}-src`] && (
                                    <p className="font-body text-sm leading-relaxed text-red-700">
                                      {blockUploadErrors[`${block.localId}-src`]}
                                    </p>
                                  )}
                                  {blockUploadMessages[`${block.localId}-src`] && (
                                    <p className="font-body text-sm leading-relaxed text-ocean">
                                      {blockUploadMessages[`${block.localId}-src`]}
                                    </p>
                                  )}
                                  {block.content.src && (
                                    <div className="relative aspect-[16/9] max-w-sm overflow-hidden bg-gray-100">
                                      <img
                                        src={block.content.src}
                                        alt=""
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  )}
                                </div>
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Alt text
                                </span>
                                <input
                                  value={block.content.alt ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'alt', event.target.value)
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Caption
                                </span>
                                <input
                                  value={block.content.caption ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'caption',
                                      event.target.value
                                    )
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                            </div>
                          ) : block.type === 'image-pair' ? (
                            <div className="grid gap-5">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Image orientation
                                </span>
                                <select
                                  value={block.content.orientation ?? 'landscape'}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'orientation',
                                      event.target.value
                                    )
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                >
                                  <option value="landscape">Horizontal photos</option>
                                  <option value="portrait">Vertical photos</option>
                                </select>
                              </label>

                              <div className="grid gap-5 md:grid-cols-2">
                                {[
                                  {
                                    label: 'First image',
                                    srcField: 'src' as const,
                                    altField: 'alt' as const,
                                    captionField: 'caption' as const,
                                  },
                                  {
                                    label: 'Second image',
                                    srcField: 'srcSecondary' as const,
                                    altField: 'altSecondary' as const,
                                    captionField: 'captionSecondary' as const,
                                  },
                                ].map((imageField) => {
                                  const uploadKey = `${block.localId}-${imageField.srcField}`;
                                  const imageUrl = block.content[imageField.srcField] ?? '';

                                  return (
                                    <div
                                      key={imageField.srcField}
                                      className="grid gap-4 border border-black/10 bg-white/55 p-4"
                                    >
                                      <label className="block">
                                        <span className="mb-2 block font-body text-sm text-black/60">
                                          {imageField.label} URL
                                        </span>
                                        <input
                                          value={imageUrl}
                                          onChange={(event) =>
                                            updateBlockContent(
                                              block.localId,
                                              imageField.srcField,
                                              event.target.value
                                            )
                                          }
                                          className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                        />
                                      </label>

                                      <div className="grid gap-3">
                                        <input
                                          type="file"
                                          accept="image/jpeg,image/png,image/webp,image/gif"
                                          onChange={(event) =>
                                            void handleBlockImageUpload(
                                              block.localId,
                                              event.target.files?.[0],
                                              imageField.srcField
                                            )
                                          }
                                          className="font-body text-sm text-black/55 file:mr-4 file:border-0 file:bg-ocean file:px-4 file:py-2 file:font-body file:text-sm file:text-white hover:file:bg-ocean-light"
                                        />
                                        {uploadingField === `block-${uploadKey}` && (
                                          <span className="font-body text-sm text-black/45">
                                            Uploading image...
                                          </span>
                                        )}
                                        {blockUploadErrors[uploadKey] && (
                                          <p className="font-body text-sm leading-relaxed text-red-700">
                                            {blockUploadErrors[uploadKey]}
                                          </p>
                                        )}
                                        {blockUploadMessages[uploadKey] && (
                                          <p className="font-body text-sm leading-relaxed text-ocean">
                                            {blockUploadMessages[uploadKey]}
                                          </p>
                                        )}
                                      </div>

                                      {imageUrl && (
                                        <div
                                          className={`relative overflow-hidden bg-gray-100 ${
                                            block.content.orientation === 'portrait'
                                              ? 'aspect-[3/4]'
                                              : 'aspect-[4/3]'
                                          }`}
                                        >
                                          <img
                                            src={imageUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                      )}

                                      <label className="block">
                                        <span className="mb-2 block font-body text-sm text-black/60">
                                          Alt text
                                        </span>
                                        <input
                                          value={block.content[imageField.altField] ?? ''}
                                          onChange={(event) =>
                                            updateBlockContent(
                                              block.localId,
                                              imageField.altField,
                                              event.target.value
                                            )
                                          }
                                          className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                        />
                                      </label>

                                      <label className="block">
                                        <span className="mb-2 block font-body text-sm text-black/60">
                                          Caption
                                        </span>
                                        <input
                                          value={block.content[imageField.captionField] ?? ''}
                                          onChange={(event) =>
                                            updateBlockContent(
                                              block.localId,
                                              imageField.captionField,
                                              event.target.value
                                            )
                                          }
                                          className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                        />
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : block.type === 'youtube' ? (
                            <div className="grid gap-4">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Desktop or main YouTube URL
                                </span>
                                <input
                                  value={block.content.youtubeUrl ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'youtubeUrl',
                                      event.target.value
                                    )
                                  }
                                  placeholder="https://www.youtube.com/watch?v=..."
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>

                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Optional vertical mobile YouTube URL
                                </span>
                                <input
                                  value={block.content.youtubeUrlMobile ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'youtubeUrlMobile',
                                      event.target.value
                                    )
                                  }
                                  placeholder="Use only if Katie has a vertical version"
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>

                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Single-video orientation
                                </span>
                                <select
                                  value={block.content.orientation ?? 'landscape'}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'orientation',
                                      event.target.value
                                    )
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                >
                                  <option value="landscape">Horizontal video</option>
                                  <option value="portrait">Vertical video</option>
                                </select>
                              </label>

                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Optional video title
                                </span>
                                <input
                                  value={block.content.videoTitle ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'videoTitle',
                                      event.target.value
                                    )
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>

                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Optional caption
                                </span>
                                <input
                                  value={block.content.caption ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'caption', event.target.value)
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                            </div>
                          ) : block.type === 'divider' ? (
                            <div className="border border-black/10 bg-white/60 p-4">
                              <p className="font-body text-sm leading-relaxed text-black/55">
                                This block adds a thin divider line to the post. There is nothing
                                else to fill in.
                              </p>
                            </div>
                          ) : block.type === 'link' ? (
                            <div className="grid gap-4">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Intro text
                                </span>
                                <textarea
                                  value={block.content.text ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'text', event.target.value)
                                  }
                                  rows={3}
                                  placeholder="For more on this trip, read the full guide."
                                  className="w-full border border-black/10 bg-white px-4 py-3 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Button label
                                </span>
                                <input
                                  value={block.content.label ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'label', event.target.value)
                                  }
                                  placeholder="Read more"
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Link URL
                                </span>
                                <input
                                  value={block.content.href ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'href', event.target.value)
                                  }
                                  placeholder="/blog/my-other-post or /gallery"
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                            </div>
                          ) : block.type === 'quote' ? (
                            <div className="grid gap-4">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Quote
                                </span>
                                <textarea
                                  value={block.content.text ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'text', event.target.value)
                                  }
                                  rows={3}
                                  className="w-full border border-black/10 bg-white px-4 py-3 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Attribution
                                </span>
                                <input
                                  value={block.content.attribution ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(
                                      block.localId,
                                      'attribution',
                                      event.target.value
                                    )
                                  }
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>
                            </div>
                          ) : block.type === 'list' ? (
                            <div className="grid gap-4">
                              <label className="block">
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  Optional title
                                </span>
                                <input
                                  value={block.content.text ?? ''}
                                  onChange={(event) =>
                                    updateBlockContent(block.localId, 'text', event.target.value)
                                  }
                                  placeholder="Things to pack, dive notes, where to stay..."
                                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                />
                              </label>

                              <div>
                                <span className="mb-2 block font-body text-sm text-black/60">
                                  List items
                                </span>
                                <div className="grid gap-3">
                                  {(block.content.items ?? ['']).map((item, itemIndex) => (
                                    <div
                                      key={`${block.localId}-item-${itemIndex}`}
                                      className="grid gap-2 sm:grid-cols-[1fr_auto]"
                                    >
                                      <input
                                        value={item}
                                        onChange={(event) =>
                                          updateListItem(
                                            block.localId,
                                            itemIndex,
                                            event.target.value
                                          )
                                        }
                                        placeholder={`Item ${itemIndex + 1}`}
                                        className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeListItem(block.localId, itemIndex)}
                                        className="border border-black/10 px-4 font-body text-sm uppercase tracking-[0.12em] text-black/50 transition-colors hover:border-red-700 hover:text-red-700"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => addListItem(block.localId)}
                                  className="mt-3 border border-black/10 px-4 py-2 font-body text-sm uppercase tracking-[0.12em] text-black/60 transition-colors hover:border-ocean hover:text-ocean"
                                >
                                  Add item
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label className="block">
                              <span className="mb-2 block font-body text-sm text-black/60">
                                {block.type === 'heading' ? 'Heading text' : 'Paragraph text'}
                              </span>
                              <textarea
                                value={block.content.text ?? ''}
                                onChange={(event) =>
                                  updateBlockContent(block.localId, 'text', event.target.value)
                                }
                                rows={block.type === 'heading' ? 2 : 5}
                                className="w-full border border-black/10 bg-white px-4 py-3 font-body text-base outline-none focus:border-ocean"
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
