import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ImagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { uploadMediaFile } from '@/lib/adminMedia';
import {
  defaultSiteSettings,
  fetchSiteSettings,
  updateSiteSettings,
  type SiteSettings,
} from '@/lib/siteSettings';

type UploadField =
  | 'logoLight'
  | 'logoDark'
  | 'logoFooter'
  | 'homeHeroFallbackImage'
  | 'homeAboutImage'
  | 'homeNextImage'
  | 'aboutHeroImage';

const uploadFieldLabels: Record<UploadField, string> = {
  logoLight: 'Light logo',
  logoDark: 'Dark logo',
  logoFooter: 'Footer logo',
  homeHeroFallbackImage: 'Home fallback image',
  homeAboutImage: 'Home about image',
  homeNextImage: 'Up Next image',
  aboutHeroImage: 'About hero image',
};

const imageUploadFields: UploadField[] = [
  'homeHeroFallbackImage',
  'homeAboutImage',
  'homeNextImage',
  'aboutHeroImage',
];

export function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<UploadField | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadSettings() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const nextSettings = await fetchSiteSettings();
        if (isMounted) setSettings(nextSettings);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Unable to load settings. Make sure docs/supabase-site-settings.sql has been run.'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateField = (field: keyof SiteSettings, value: string) => {
    setSuccessMessage('');
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const handleLogoUpload = async (field: UploadField, file: File | undefined) => {
    if (!file) return;

    setErrorMessage('');
    setSuccessMessage('');
    setUploadingField(field);

    try {
      const publicUrl = await uploadMediaFile(file, 'site', {
        maxWidth: field.startsWith('logo') ? 1000 : 1800,
        quality: field.startsWith('logo') ? 0.86 : 0.78,
        targetSize: field.startsWith('logo') ? 350 * 1024 : 900 * 1024,
        minWidth: field.startsWith('logo') ? 600 : 1200,
        minQuality: field.startsWith('logo') ? 0.72 : 0.6,
      });
      updateField(field, publicUrl);
      setSuccessMessage('Logo uploaded. Save settings to publish it.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to upload logo.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSaving(true);

    try {
      const nextSettings = await updateSiteSettings({
        ...settings,
        name: settings.name.trim(),
        tagline: settings.tagline.trim(),
        description: settings.description.trim(),
        email: settings.email.trim(),
        logoLight: settings.logoLight.trim(),
        logoDark: settings.logoDark.trim(),
        logoFooter: settings.logoFooter.trim(),
        instagram: settings.instagram.trim(),
        youtube: settings.youtube.trim(),
        pinterest: settings.pinterest.trim(),
        homeHeroVideoDesktop: settings.homeHeroVideoDesktop.trim(),
        homeHeroVideoMobile: settings.homeHeroVideoMobile.trim(),
        homeHeroFallbackImage: settings.homeHeroFallbackImage.trim(),
        homeAboutTitle: settings.homeAboutTitle.trim(),
        homeAboutGreeting: settings.homeAboutGreeting.trim(),
        homeAboutParagraph1: settings.homeAboutParagraph1.trim(),
        homeAboutParagraph2: settings.homeAboutParagraph2.trim(),
        homeAboutParagraph3: settings.homeAboutParagraph3.trim(),
        homeAboutImage: settings.homeAboutImage.trim(),
        homeNextEyebrow: settings.homeNextEyebrow.trim(),
        homeNextTitle: settings.homeNextTitle.trim(),
        homeNextSubtitle: settings.homeNextSubtitle.trim(),
        homeNextImage: settings.homeNextImage.trim(),
        homeNextStops: settings.homeNextStops.trim(),
        aboutHeroImage: settings.aboutHeroImage.trim(),
        aboutHeroTitle: settings.aboutHeroTitle.trim(),
      });
      setSettings(nextSettings);
      setSuccessMessage('Site settings saved.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="mx-auto max-w-5xl px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10 border-b border-black/10 pb-8">
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
            Site Settings
          </h1>
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

        {isLoading ? (
          <p className="font-body text-sm uppercase tracking-[0.18em] text-black/45">
            Loading settings...
          </p>
        ) : (
          <form onSubmit={(event) => void handleSubmit(event)} className="grid gap-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Site name</span>
                <input
                  value={settings.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Email</span>
                <input
                  value={settings.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Tagline</span>
              <input
                value={settings.tagline}
                onChange={(event) => updateField('tagline', event.target.value)}
                className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-body text-sm text-black/60">Description</span>
              <textarea
                value={settings.description}
                onChange={(event) => updateField('description', event.target.value)}
                rows={4}
                className="w-full border border-black/10 bg-cream px-4 py-3 font-body text-base outline-none focus:border-ocean"
              />
            </label>

            <div className="grid gap-5 md:grid-cols-3">
              {([
                ['logoLight', 'Light logo'],
                ['logoDark', 'Dark logo'],
                ['logoFooter', 'Footer logo'],
              ] as const).map(([field, label]) => (
                <div key={field} className="border border-black/10 bg-cream p-4">
                  <span className="mb-3 block font-body text-sm text-black/60">{label}</span>
                  <div className="mb-3 flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                    {settings[field] ? (
                      <img
                        src={settings[field]}
                        alt={label}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ImagePlus className="h-8 w-8 text-black/30" />
                    )}
                  </div>
                  <input
                    value={settings[field]}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="mb-3 h-10 w-full border border-black/10 bg-white px-3 font-body text-sm outline-none focus:border-ocean"
                  />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => void handleLogoUpload(field, event.target.files?.[0])}
                    className="font-body text-xs text-black/55 file:mr-3 file:border-0 file:bg-ocean file:px-3 file:py-2 file:font-body file:text-xs file:text-white hover:file:bg-ocean-light"
                  />
                  {uploadingField === field && (
                    <p className="mt-2 font-body text-xs text-black/45">Uploading...</p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Instagram URL</span>
                <input
                  value={settings.instagram}
                  onChange={(event) => updateField('instagram', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">YouTube URL</span>
                <input
                  value={settings.youtube}
                  onChange={(event) => updateField('youtube', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-body text-sm text-black/60">Pinterest URL</span>
                <input
                  value={settings.pinterest}
                  onChange={(event) => updateField('pinterest', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h2 className="mb-5 font-display text-3xl text-black">Home hero</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">
                    Desktop YouTube video ID
                  </span>
                  <input
                    value={settings.homeHeroVideoDesktop}
                    onChange={(event) => updateField('homeHeroVideoDesktop', event.target.value)}
                    placeholder="c9dRw1KIfDk"
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                  <p className="mt-2 font-body text-xs leading-relaxed text-black/45">
                    Paste only the YouTube video ID, not the full link.
                  </p>
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">
                    Mobile YouTube video ID
                  </span>
                  <input
                    value={settings.homeHeroVideoMobile}
                    onChange={(event) => updateField('homeHeroVideoMobile', event.target.value)}
                    placeholder="y-B9ReggOfM"
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h2 className="mb-5 font-display text-3xl text-black">Home about me</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">Title</span>
                  <input
                    value={settings.homeAboutTitle}
                    onChange={(event) => updateField('homeAboutTitle', event.target.value)}
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">Greeting</span>
                  <input
                    value={settings.homeAboutGreeting}
                    onChange={(event) => updateField('homeAboutGreeting', event.target.value)}
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5">
                {([
                  ['homeAboutParagraph1', 'Paragraph 1'],
                  ['homeAboutParagraph2', 'Paragraph 2'],
                  ['homeAboutParagraph3', 'Paragraph 3'],
                ] as const).map(([field, label]) => (
                  <label key={field} className="block">
                    <span className="mb-2 block font-body text-sm text-black/60">{label}</span>
                    <textarea
                      value={settings[field]}
                      onChange={(event) => updateField(field, event.target.value)}
                      rows={3}
                      className="w-full border border-black/10 bg-cream px-4 py-3 font-body text-base outline-none focus:border-ocean"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h2 className="mb-5 font-display text-3xl text-black">Up Next</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">Left heading</span>
                  <input
                    value={settings.homeNextEyebrow}
                    onChange={(event) => updateField('homeNextEyebrow', event.target.value)}
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">Title</span>
                  <input
                    value={settings.homeNextTitle}
                    onChange={(event) => updateField('homeNextTitle', event.target.value)}
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block font-body text-sm text-black/60">Subtitle</span>
                  <input
                    value={settings.homeNextSubtitle}
                    onChange={(event) => updateField('homeNextSubtitle', event.target.value)}
                    className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block font-body text-sm text-black/60">
                  Destinations, one per line
                </span>
                <textarea
                  value={settings.homeNextStops}
                  onChange={(event) => updateField('homeNextStops', event.target.value)}
                  rows={5}
                  className="w-full border border-black/10 bg-cream px-4 py-3 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h2 className="mb-5 font-display text-3xl text-black">About page hero</h2>
              <label className="block max-w-xl">
                <span className="mb-2 block font-body text-sm text-black/60">Hero title</span>
                <input
                  value={settings.aboutHeroTitle}
                  onChange={(event) => updateField('aboutHeroTitle', event.target.value)}
                  className="h-12 w-full border border-black/10 bg-cream px-4 font-body text-base outline-none focus:border-ocean"
                />
              </label>
            </div>

            <div className="border-t border-black/10 pt-8">
              <h2 className="mb-5 font-display text-3xl text-black">Editable images</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {imageUploadFields.map((field) => (
                  <div key={field} className="border border-black/10 bg-cream p-4">
                    <span className="mb-3 block font-body text-sm text-black/60">
                      {uploadFieldLabels[field]}
                    </span>
                    <div className="mb-3 aspect-[16/9] overflow-hidden bg-white">
                      {settings[field] ? (
                        <img
                          src={settings[field]}
                          alt={uploadFieldLabels[field]}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ImagePlus className="h-8 w-8 text-black/30" />
                        </div>
                      )}
                    </div>
                    <input
                      value={settings[field]}
                      onChange={(event) => updateField(field, event.target.value)}
                      className="mb-3 h-10 w-full border border-black/10 bg-white px-3 font-body text-sm outline-none focus:border-ocean"
                    />
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(event) => void handleLogoUpload(field, event.target.files?.[0])}
                      className="font-body text-xs text-black/55 file:mr-3 file:border-0 file:bg-ocean file:px-3 file:py-2 file:font-body file:text-xs file:text-white hover:file:bg-ocean-light"
                    />
                    {uploadingField === field && (
                      <p className="mt-2 font-body text-xs text-black/45">Uploading...</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-black/10 pt-8">
              <button
                type="submit"
                disabled={isSaving || uploadingField !== null}
                className="btn-ocean disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save settings'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
