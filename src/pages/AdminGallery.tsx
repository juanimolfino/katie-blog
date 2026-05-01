import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Edit, ImagePlus, Plus, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { uploadMediaFile } from '@/lib/adminMedia';
import {
  createGalleryItem,
  deleteGalleryItem,
  fetchAdminGalleryItems,
  updateGalleryItem,
  type GalleryItem,
  type GalleryItemInput,
  type GalleryItemOrientation,
} from '@/lib/galleryItems';
import type { Continent } from '@/types';

const continents: { value: Continent; label: string }[] = [
  { value: 'asia', label: 'Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'oceania', label: 'Oceania' },
  { value: 'north-america', label: 'North America' },
  { value: 'central-america', label: 'Central America' },
  { value: 'south-america', label: 'South America' },
  { value: 'africa', label: 'Africa' },
];

const orientations: { value: GalleryItemOrientation; label: string }[] = [
  { value: 'landscape', label: 'Landscape' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'square', label: 'Square' },
];

const emptyForm: GalleryItemInput = {
  title: '',
  location: '',
  continent: 'asia',
  image_url: '',
  alt_text: '',
  orientation: 'landscape',
  sort_order: 0,
  is_visible: true,
};

const imageAspectClass: Record<GalleryItemOrientation, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<GalleryItemInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadItems = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const nextItems = await fetchAdminGalleryItems();
      setItems(nextItems);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load gallery. Make sure docs/supabase-gallery.sql has been run in Supabase.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setUploadError('');
    setSuccessMessage('');
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      location: item.location,
      continent: item.continent,
      image_url: item.image_url,
      alt_text: item.alt_text,
      orientation: item.orientation,
      sort_order: item.sort_order,
      is_visible: item.is_visible,
    });
    setUploadError('');
    setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return;

    setUploadError('');
    setUploadingImage(true);

    try {
      const publicUrl = await uploadMediaFile(file, 'gallery', {
        maxWidth: 1600,
        quality: 0.78,
        targetSize: 900 * 1024,
        minWidth: 1200,
        minQuality: 0.6,
      });
      setForm((current) => ({ ...current, image_url: publicUrl }));
      setSuccessMessage('Image uploaded and optimized. Save the gallery photo to publish it.');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Unable to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSaving(true);

    try {
      const input: GalleryItemInput = {
        ...form,
        title: form.title.trim(),
        location: form.location.trim(),
        image_url: form.image_url.trim(),
        alt_text: form.alt_text.trim(),
        sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 0,
      };

      if (!input.title || !input.image_url) {
        throw new Error('Title and image are required.');
      }

      if (editingId) {
        await updateGalleryItem(editingId, input);
        setSuccessMessage('Gallery photo updated.');
      } else {
        await createGalleryItem(input);
        setSuccessMessage('Gallery photo created.');
      }

      resetForm();
      await loadItems();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save gallery photo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    const confirmed = window.confirm(`Delete "${item.title}" from the gallery?`);
    if (!confirmed) return;

    try {
      await deleteGalleryItem(item.id);
      setItems((current) => current.filter((nextItem) => nextItem.id !== item.id));
      if (editingId === item.id) resetForm();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete gallery photo.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/admin"
              className="mb-5 inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-ocean"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="mb-3 block font-body text-sm uppercase tracking-[0.18em] text-ocean">
              Admin
            </span>
            <h1 className="font-display text-5xl text-black md:text-6xl">
              Gallery
            </h1>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 border border-ocean/20 bg-sky-50 p-4 font-body text-sm text-ocean">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={(event) => void handleSubmit(event)}
          className="mb-12 border border-black/10 bg-cream p-5 md:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl text-black">
              {editingId ? 'Edit photo' : 'New photo'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 font-body text-sm uppercase tracking-[0.14em] text-black/50 transition-colors hover:text-ocean"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Title</span>
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                required
                className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Location</span>
              <input
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({ ...current, location: event.target.value }))
                }
                placeholder="Raja Ampat, Indonesia"
                className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Continent</span>
              <select
                value={form.continent}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    continent: event.target.value as Continent,
                  }))
                }
                className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
              >
                {continents.map((continent) => (
                  <option key={continent.value} value={continent.value}>
                    {continent.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Orientation</span>
              <select
                value={form.orientation}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    orientation: event.target.value as GalleryItemOrientation,
                  }))
                }
                className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
              >
                {orientations.map((orientation) => (
                  <option key={orientation.value} value={orientation.value}>
                    {orientation.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Sort order</span>
              <input
                type="number"
                value={form.sort_order}
                onChange={(event) =>
                  setForm((current) => ({ ...current, sort_order: Number(event.target.value) }))
                }
                className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="flex items-center gap-3 pt-8 font-body text-sm text-black/65">
              <input
                type="checkbox"
                checked={form.is_visible}
                onChange={(event) =>
                  setForm((current) => ({ ...current, is_visible: event.target.checked }))
                }
                className="h-4 w-4 accent-ocean"
              />
              Visible on public gallery
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_220px] md:items-start">
            <div>
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Image URL</span>
                <input
                  value={form.image_url}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, image_url: event.target.value }))
                  }
                  required
                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(event) => void handleImageUpload(event.target.files?.[0])}
                  className="font-body text-sm text-black/55 file:mr-4 file:border-0 file:bg-ocean file:px-4 file:py-2 file:font-body file:text-sm file:text-white hover:file:bg-ocean-light"
                />
                {uploadingImage && (
                  <span className="font-body text-sm text-black/45">Uploading image...</span>
                )}
              </div>

              <p className="mt-3 font-body text-xs leading-relaxed text-black/45">
                JPG, PNG, WebP, or GIF. Large JPG/PNG/WebP files are optimized before upload.
              </p>

              {uploadError && (
                <p className="mt-3 font-body text-sm leading-relaxed text-red-700">
                  {uploadError}
                </p>
              )}

              <label className="mt-5 block">
                <span className="mb-2 block font-body text-sm text-black/60">Alt text</span>
                <input
                  value={form.alt_text}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, alt_text: event.target.value }))
                  }
                  placeholder="Describe the photo for accessibility"
                  className="h-12 w-full border border-black/10 bg-white px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <div className={`${imageAspectClass[form.orientation]} overflow-hidden bg-white`}>
              {form.image_url ? (
                <img
                  src={form.image_url}
                  alt={form.alt_text || form.title || 'Gallery preview'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-black/15 text-black/35">
                  <ImagePlus className="h-8 w-8" />
                  <span className="font-body text-sm">Preview</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={isSaving || uploadingImage} className="btn-ocean">
              <Plus className="h-4 w-4" />
              {isSaving ? 'Saving...' : editingId ? 'Save photo' : 'Create photo'}
            </button>
          </div>
        </form>

        {isLoading ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading gallery...
          </p>
        ) : items.length === 0 ? (
          <div className="border border-black/10 bg-cream p-8">
            <h2 className="mb-3 font-display text-3xl text-black">No photos yet</h2>
            <p className="font-body text-base leading-relaxed text-black/60">
              Create the first gallery photo and it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="border border-black/10 bg-white">
                <div className={`${imageAspectClass[item.orientation]} bg-gray-100`}>
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl text-black">{item.title}</h2>
                      <p className="mt-1 font-body text-sm text-black/50">{item.location}</p>
                    </div>
                    <span
                      className={`shrink-0 px-3 py-1 font-body text-xs uppercase tracking-[0.14em] ${
                        item.is_visible
                          ? 'bg-ocean/10 text-ocean'
                          : 'bg-black/5 text-black/45'
                      }`}
                    >
                      {item.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>

                  <p className="mb-4 font-body text-xs uppercase tracking-[0.14em] text-black/40">
                    {item.continent.replace('-', ' ')} / order {item.sort_order}
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="text-black/50 transition-colors hover:text-ocean"
                      aria-label={`Edit ${item.title}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item)}
                      className="text-black/45 transition-colors hover:text-red-700"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
