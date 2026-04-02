import type { SiteConfig, CurrentLocation, Partner, NavItem } from '@/types';

export const siteConfig: SiteConfig = {
  name: "Travel Blogger & Influencer",
  tagline: "Let's explore the world together, one destination at a time.",
  description: "Join me on my adventures around the world. Discover travel tips, destination guides, and inspiring stories from my journeys.",
  url: "https://travelblogger.com",
  author: {
    id: "eva",
    name: "Eva",
    bio: "I'm a travel blogger and influencer with a passion for exploring new places and sharing my experiences. Over the past 10 years, I've visited more than 50 countries and documented my adventures through photography, videos, and stories.",
    avatar: "/images/about-eva.jpg",
    social: {
      instagram: "https://instagram.com/evatravels",
      youtube: "https://youtube.com/evatravels",
      twitter: "https://twitter.com/evatravels",
      facebook: "https://facebook.com/evatravels",
    },
  },
  social: {
    instagram: "https://instagram.com/evatravels",
    youtube: "https://youtube.com/evatravels",
    twitter: "https://twitter.com/evatravels",
    facebook: "https://facebook.com/evatravels",
    pinterest: "https://pinterest.com/evatravels",
  },
  seo: {
    title: "Travel Blogger & Influencer | Explore the World with Eva",
    description: "Join me on my adventures around the world. Discover travel tips, destination guides, and inspiring stories from my journeys.",
    ogImage: "/images/og-image.jpg",
  },
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About me", href: "/about" },
  { label: "Destination", href: "/destinations" },
  { label: "Videos", href: "/videos" },
  { label: "Work with me", href: "/contact" },
];

export const currentLocation: CurrentLocation = {
  city: "Jasper National Park",
  country: "Canada",
  image: "/images/location-jasper.jpg",
  coordinates: {
    lat: 52.8734,
    lng: -118.0814,
  },
  nextStops: [
    "Niagara Falls",
    "Quebec City",
    "Prince Edward Island",
    "Vancouver Island",
  ],
};

export const partners: Partner[] = [
  { name: "National Geographic", logo: "/images/partners/natgeo.svg", url: "#" },
  { name: "Lonely Planet", logo: "/images/partners/lonelyplanet.svg", url: "#" },
  { name: "Condé Nast Traveler", logo: "/images/partners/conde.svg", url: "#" },
  { name: "Travel + Leisure", logo: "/images/partners/travelleisure.svg", url: "#" },
  { name: "BBC Travel", logo: "/images/partners/bbc.svg", url: "#" },
];

export const categories = [
  { id: "all", slug: "all", name: "View All" },
  { id: "europe", slug: "europe", name: "Europe" },
  { id: "americas", slug: "americas", name: "The Americas" },
  { id: "asia", slug: "asia", name: "Asia" },
  { id: "africa", slug: "africa", name: "Africa" },
];

export const continents = [
  { id: "europe", name: "Europe", slug: "europe" },
  { id: "americas", name: "The Americas", slug: "americas" },
  { id: "asia", name: "Asia", slug: "asia" },
  { id: "africa", name: "Africa", slug: "africa" },
  { id: "oceania", name: "Oceania", slug: "oceania" },
] as const;
