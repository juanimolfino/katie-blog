import type { SiteConfig, CurrentLocation, NavItem, NextStop } from '@/types';

export const siteConfig: SiteConfig = {
  name: "What Katie Seas",
  tagline: "Chasing the Ocean, One Dive at a Time",
  description: "I'm Katie - a dive instructor traveling the world, sharing real stories from life underwater and beyond.",
  url: "https://whatkatieseas.com",
  author: {
    id: "katie",
    name: "Katie",
    bio: "I'm Katie - a dive instructor and skipper currently living on Heron Island on the Great Barrier Reef. For the past few years, I've been traveling the world, working in the ocean, and building a life centered around saltwater, adventure, and exploration.",
    avatar: "/images/about/about-katie.jpg",
    social: {
      instagram: "https://instagram.com/whatkatieseas",
      youtube: "https://youtube.com/whatkatieseas",
    },
  },
  social: {
    instagram: "https://instagram.com/whatkatieseas",
    youtube: "https://youtube.com/whatkatieseas",
  },
  seo: {
    title: "What Katie Seas | Dive Instructor & Ocean Explorer",
    description: "A dive instructor traveling the world, sharing real stories from life underwater and beyond. Explore dive destinations, travel tips, and ocean adventures.",
    ogImage: "/images/about/about-katie.jpg",
  },
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
];

export const currentLocation: CurrentLocation = {
  city: "Heron Island",
  country: "Great Barrier Reef, Australia",
  image: "/images/about/about-katie.jpg",
  nextStops: [
    "Raja Ampat, Indonesia",
    "Similan Islands, Thailand",
    "Galápagos Islands",
    "Maldives",
  ],
};

export const nextStops:NextStop[] = [
  { country: "Argentina" },
  { country: "Costa rica" },
];

export const categories = [
  { id: "all", slug: "all", name: "View All" },
  { id: "europe", slug: "europe", name: "Europe" },
  { id: "americas", slug: "americas", name: "The Americas" },
  { id: "asia", slug: "asia", name: "Asia" },
  { id: "africa", slug: "africa", name: "Africa" },
  { id: "oceania", slug: "oceania", name: "Oceania" },
];

export const continents = [
  { id: "europe", name: "Europe", slug: "europe" },
  { id: "americas", name: "The Americas", slug: "americas" },
  { id: "asia", name: "Asia", slug: "asia" },
  { id: "africa", name: "Africa", slug: "africa" },
  { id: "oceania", name: "Oceania", slug: "oceania" },
] as const;
