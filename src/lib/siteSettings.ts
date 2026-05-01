import { siteConfig } from '@/data';
import { supabase } from '@/lib/supabase';

export type SiteSettings = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  logoLight: string;
  logoDark: string;
  logoFooter: string;
  instagram: string;
  youtube: string;
  pinterest: string;
  homeHeroVideoDesktop: string;
  homeHeroVideoMobile: string;
  homeHeroFallbackImage: string;
  homeAboutTitle: string;
  homeAboutGreeting: string;
  homeAboutParagraph1: string;
  homeAboutParagraph2: string;
  homeAboutParagraph3: string;
  homeAboutImage: string;
  homeNextEyebrow: string;
  homeNextTitle: string;
  homeNextSubtitle: string;
  homeNextImage: string;
  homeNextStops: string;
  aboutHeroImage: string;
  aboutHeroTitle: string;
};

export const defaultSiteSettings: SiteSettings = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  email: 'whatkatieseas@gmail.com',
  logoLight: '/images/brand/Up3logowhite.png',
  logoDark: '/images/brand/Updblacklogo.png',
  logoFooter: '/images/brand/logo_con_nombre.png',
  instagram: siteConfig.social.instagram,
  youtube: siteConfig.social.youtube,
  pinterest: siteConfig.social.pinterest ?? '',
  homeHeroVideoDesktop: 'c9dRw1KIfDk',
  homeHeroVideoMobile: 'y-B9ReggOfM',
  homeHeroFallbackImage: '/images/home/hero-bg.jpg',
  homeAboutTitle: 'About Me',
  homeAboutGreeting: 'Hello There!',
  homeAboutParagraph1:
    "I'm Katie - a dive instructor and skipper currently living on Heron Island on the Great Barrier Reef.",
  homeAboutParagraph2:
    "For the past few years, I've been traveling the world, working in the ocean, and building a life centered around saltwater, adventure, and exploration. From remote islands to unforgettable underwater encounters, this blog is where I share the moments that have shaped me - the beauty, the chaos, and everything in between.",
  homeAboutParagraph3:
    'The ocean has always felt like home, and this space is a reflection of that - a collection of stories, experiences, and lessons from a life lived beneath the surface.',
  homeAboutImage: '/images/about/about-katie.jpg',
  homeNextEyebrow: 'Up Next',
  homeNextTitle: 'Places on the horizon',
  homeNextSubtitle: "New oceans, new cultures, and places we're excited to explore soon.",
  homeNextImage: '/images/home/next_destinations.jpg',
  homeNextStops: 'Ecuador\nArgentina\nCosta Rica',
  aboutHeroImage: '/images/about/about-hero.jpg',
  aboutHeroTitle: 'My Story',
};

function normalizeSiteSettings(value: Partial<SiteSettings> | null | undefined): SiteSettings {
  return {
    ...defaultSiteSettings,
    ...(value ?? {}),
  };
}

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  return supabase;
}

export async function fetchSiteSettings() {
  if (!supabase) return defaultSiteSettings;

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'site')
    .maybeSingle();

  if (error) throw error;
  return normalizeSiteSettings(data?.value as Partial<SiteSettings> | null | undefined);
}

export async function updateSiteSettings(settings: SiteSettings) {
  const client = requireSupabase();
  const { data, error } = await client
    .from('site_settings')
    .upsert({ key: 'site', value: settings }, { onConflict: 'key' })
    .select('value')
    .single();

  if (error) throw error;
  return normalizeSiteSettings(data.value as Partial<SiteSettings>);
}
