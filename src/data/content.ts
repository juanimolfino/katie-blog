import type { BlogPost, Destination } from '@/types';

// Blog Posts - Estático por ahora
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "great-barrier-reef-guide",
    title: "The Ultimate Great Barrier Reef Diving Guide",
    excerpt: "Everything you need to know about diving the world's largest coral reef system from someone who lives here.",
    content: "The Great Barrier Reef is one of the most incredible places on Earth...",
    coverImage: "/images/destinations/gbr.jpg",
    category: { id: "oceania", slug: "oceania", name: "Oceania" },
    tags: ["diving", "australia", "great-barrier-reef", "marine-life"],
    author: {
      id: "katie",
      name: "Katie",
      bio: "Dive instructor and ocean explorer",
      avatar: "/images/about/about-katie.jpg",
    },
    publishedAt: "2024-03-15",
    readTime: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "raja-ampat-diving",
    title: "Why Raja Ampat is Every Diver's Dream",
    excerpt: "Discover the most biodiverse marine ecosystem on the planet in the heart of Indonesia.",
    content: "Raja Ampat is often called the last paradise on Earth...",
    coverImage: "/images/destinations/raja-ampat.jpg",
    category: { id: "asia", slug: "asia", name: "Asia" },
    tags: ["diving", "indonesia", "raja-ampat", "biodiversity"],
    author: {
      id: "katie",
      name: "Katie",
      bio: "Dive instructor and ocean explorer",
      avatar: "/images/about/about-katie.jpg",
    },
    publishedAt: "2024-02-28",
    readTime: 6,
    featured: false,
  },
  {
    id: "3",
    slug: "galapagos-diving-experience",
    title: "Swimming with Sharks in the Galápagos",
    excerpt: "My unforgettable encounter with hammerhead sharks and marine iguanas in this unique archipelago.",
    content: "The Galápagos Islands offer one of the most unique diving experiences...",
    coverImage: "/images/destinations/galapagos.jpg",
    category: { id: "americas", slug: "americas", name: "The Americas" },
    tags: ["diving", "galapagos", "sharks", "ecuador"],
    author: {
      id: "katie",
      name: "Katie",
      bio: "Dive instructor and ocean explorer",
      avatar: "/images/about/about-katie.jpg",
    },
    publishedAt: "2024-02-10",
    readTime: 10,
    featured: false,
  },
];

// Destinations - Estático por ahora
export const destinations: Destination[] = [
  {
    id: "1",
    slug: "great-barrier-reef",
    name: "Great Barrier Reef",
    country: "Australia",
    continent: "oceania",
    description: "The world's largest coral reef system, stretching over 2,300 kilometers along Australia's coast. Home to incredible marine biodiversity.",
    coverImage: "/images/destinations/gbr.jpg",
    highlights: ["Ribbon Reefs", "Osprey Reef", "Heron Island", "Whale watching"],
    bestTimeToVisit: "June to October",
    featured: true,
  },
  {
    id: "2",
    slug: "raja-ampat",
    name: "Raja Ampat",
    country: "Indonesia",
    continent: "asia",
    description: "The most biodiverse marine ecosystem on Earth, with over 1,500 species of fish and 600 species of coral.",
    coverImage: "/images/destinations/raja-ampat.jpg",
    highlights: ["Cape Kri", "Manta Sandy", "Misool Island", "Wayag Islands"],
    bestTimeToVisit: "October to April",
    featured: false,
  },
  {
    id: "3",
    slug: "galapagos",
    name: "Galápagos Islands",
    country: "Ecuador",
    continent: "americas",
    description: "A unique diving destination where you can swim with hammerhead sharks, marine iguanas, and playful sea lions.",
    coverImage: "/images/destinations/galapagos.jpg",
    highlights: ["Darwin's Arch", "Wolf Island", "Cabo Marshall", "Roca Redonda"],
    bestTimeToVisit: "June to November",
    featured: false,
  },
  {
    id: "4",
    slug: "maldives",
    name: "Maldives",
    country: "Maldives",
    continent: "asia",
    description: "Crystal clear waters, vibrant coral reefs, and abundant marine life make the Maldives a paradise for divers of all levels.",
    coverImage: "/images/destinations/maldives.jpg",
    highlights: ["Maaya Thila", "Manta Point", "Banana Reef", "HP Reef"],
    bestTimeToVisit: "November to May",
    featured: false,
  },
  {
    id: "5",
    slug: "similan-islands",
    name: "Similan Islands",
    country: "Thailand",
    continent: "asia",
    description: "Nine granite islands surrounded by crystal-clear waters, famous for vibrant coral gardens and whale shark encounters.",
    coverImage: "/images/destinations/similan.jpg",
    highlights: ["Richelieu Rock", "Koh Bon", "West of Eden", "Elephant Head Rock"],
    bestTimeToVisit: "November to May",
    featured: false,
  },
  {
    id: "6",
    slug: "red-sea",
    name: "Red Sea",
    country: "Egypt",
    continent: "africa",
    description: "World-class diving with stunning coral walls, historic wrecks, and incredible visibility year-round.",
    coverImage: "/images/destinations/red-sea.jpg",
    highlights: ["Blue Hole", "Thistlegorm Wreck", "Ras Mohammed", "Brothers Islands"],
    bestTimeToVisit: "March to May, September to November",
    featured: false,
  },
];

// Partners
export const partners = [
  { name: "PADI", logo: "PADI" },
  { name: "SSI", logo: "SSI" },
  { name: "NAUI", logo: "NAUI" },
  { name: "Project AWARE", logo: "PROJECT AWARE" },
  { name: "DAN", logo: "DAN" },
];

// Helper functions
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  if (categorySlug === 'all') return blogPosts;
  return blogPosts.filter(post => post.category.slug === categorySlug);
}

export function getDestinationsByContinent(continent: string): Destination[] {
  if (continent === 'all') return destinations;
  return destinations.filter(dest => dest.continent === continent);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter(dest => dest.featured);
}
