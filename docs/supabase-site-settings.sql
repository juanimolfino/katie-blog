-- What Katie Seas: editable site settings
-- Paste this in Supabase SQL Editor after docs/supabase-admin-security.sql.

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

insert into public.site_settings (key, value)
values (
  'site',
  '{
    "name": "What Katie Seas",
    "tagline": "Chasing the Ocean, One Dive at a Time",
    "description": "I''m Katie - a dive instructor traveling the world, sharing real stories from life underwater and beyond.",
    "email": "whatkatieseas@gmail.com",
    "logoLight": "/images/brand/Up3logowhite.png",
    "logoDark": "/images/brand/Updblacklogo.png",
    "logoFooter": "/images/brand/logo_con_nombre.png",
    "instagram": "https://www.instagram.com/whatkatie.seas",
    "youtube": "https://www.youtube.com/@whatkatieseas",
    "pinterest": "https://www.pinterest.com/whatkatieseas",
    "homeHeroVideoDesktop": "c9dRw1KIfDk",
    "homeHeroVideoMobile": "y-B9ReggOfM",
    "homeHeroFallbackImage": "/images/home/hero-bg.jpg",
    "homeAboutTitle": "About Me",
    "homeAboutGreeting": "Hello There!",
    "homeAboutParagraph1": "I''m Katie - a dive instructor and skipper currently living on Heron Island on the Great Barrier Reef.",
    "homeAboutParagraph2": "For the past few years, I''ve been traveling the world, working in the ocean, and building a life centered around saltwater, adventure, and exploration. From remote islands to unforgettable underwater encounters, this blog is where I share the moments that have shaped me - the beauty, the chaos, and everything in between.",
    "homeAboutParagraph3": "The ocean has always felt like home, and this space is a reflection of that - a collection of stories, experiences, and lessons from a life lived beneath the surface.",
    "homeAboutImage": "/images/about/about-katie.jpg",
    "homeNextEyebrow": "Up Next",
    "homeNextTitle": "Places on the horizon",
    "homeNextSubtitle": "New oceans, new cultures, and places we''re excited to explore soon.",
    "homeNextImage": "/images/home/next_destinations.jpg",
    "homeNextStops": "Ecuador\nArgentina\nCosta Rica",
    "aboutHeroImage": "/images/about/about-hero.jpg",
    "aboutHeroTitle": "My Story"
  }'::jsonb
)
on conflict (key) do update
set value = excluded.value || site_settings.value;

alter table public.site_settings enable row level security;

drop policy if exists "Anyone can read site settings" on public.site_settings;
create policy "Anyone can read site settings"
on public.site_settings
for select
to anon, authenticated
using (key = 'site');

drop policy if exists "Admins can create site settings" on public.site_settings;
create policy "Admins can create site settings"
on public.site_settings
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
on public.site_settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());
