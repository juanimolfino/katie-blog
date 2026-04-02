import type { BlogPost, Video, Destination, InstagramPost } from '@/types';

// Blog Posts - Escalable: reemplazar con llamadas a CMS
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "santorini-greece-guide",
    title: "Santorini: The Ultimate Greek Island Guide",
    excerpt: "Discover the magic of Santorini with this comprehensive guide to the best beaches, restaurants, and sunset spots.",
    content: "Santorini is one of the most iconic Greek islands, known for its white-washed buildings, blue domes, and breathtaking sunsets...",
    coverImage: "/images/destinations/santorini.jpg",
    category: { id: "europe", slug: "europe", name: "Europe" },
    tags: ["greece", "islands", "beach", "romance", "sunset"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2024-03-15",
    readTime: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "kyoto-japan-temples",
    title: "Kyoto's Hidden Temples: A Spiritual Journey",
    excerpt: "Explore the ancient temples of Kyoto, away from the tourist crowds, and find your inner peace.",
    content: "Kyoto is home to over 2,000 temples and shrines, each with its own unique history and charm...",
    coverImage: "/images/destinations/kyoto.jpg",
    category: { id: "asia", slug: "asia", name: "Asia" },
    tags: ["japan", "temples", "culture", "spiritual"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2024-02-28",
    readTime: 6,
    featured: false,
  },
  {
    id: "3",
    slug: "patagonia-trekking",
    title: "Trekking Through Patagonia: A Complete Guide",
    excerpt: "Everything you need to know about trekking in Patagonia, from gear to the best trails.",
    content: "Patagonia is a trekker's paradise, with its dramatic landscapes, glaciers, and rugged mountains...",
    coverImage: "/images/destinations/patagonia.jpg",
    category: { id: "americas", slug: "americas", name: "The Americas" },
    tags: ["argentina", "chile", "trekking", "adventure", "nature"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2024-02-10",
    readTime: 10,
    featured: false,
  },
  {
    id: "4",
    slug: "morocco-desert-safari",
    title: "Sahara Desert Safari: A Moroccan Adventure",
    excerpt: "Experience the magic of the Sahara Desert with this guide to the best desert safaris in Morocco.",
    content: "The Sahara Desert is one of the most iconic landscapes in the world, and Morocco offers some of the best access...",
    coverImage: "/images/destinations/morocco.jpg",
    category: { id: "africa", slug: "africa", name: "Africa" },
    tags: ["morocco", "desert", "safari", "adventure"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2024-01-20",
    readTime: 7,
    featured: false,
  },
  {
    id: "5",
    slug: "bali-hidden-gems",
    title: "Bali Beyond the Tourist Trail",
    excerpt: "Discover the hidden gems of Bali that most tourists never see.",
    content: "Bali is known for its beaches and temples, but there's so much more to explore...",
    coverImage: "/images/destinations/bali.jpg",
    category: { id: "asia", slug: "asia", name: "Asia" },
    tags: ["indonesia", "bali", "hidden-gems", "culture"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2024-01-05",
    readTime: 5,
    featured: false,
  },
  {
    id: "6",
    slug: "iceland-northern-lights",
    title: "Chasing the Northern Lights in Iceland",
    excerpt: "The ultimate guide to seeing the Northern Lights in Iceland.",
    content: "Iceland is one of the best places in the world to see the Northern Lights...",
    coverImage: "/images/destinations/iceland.jpg",
    category: { id: "europe", slug: "europe", name: "Europe" },
    tags: ["iceland", "northern-lights", "winter", "nature"],
    author: {
      id: "eva",
      name: "Eva",
      bio: "Travel blogger and photographer",
      avatar: "/images/about-eva.jpg",
    },
    publishedAt: "2023-12-15",
    readTime: 6,
    featured: false,
  },
];

// Videos - Escalable: reemplazar con llamadas a CMS o YouTube API
export const videos: Video[] = [
  {
    id: "1",
    slug: "australia-island-budget",
    title: "Australia's Most Beautiful Island on a Budget",
    description: "Discover how to explore one of Australia's most stunning islands without breaking the bank.",
    thumbnail: "/images/videos/australia-island.jpg",
    videoUrl: "https://youtube.com/watch?v=example1",
    duration: "12:34",
    category: { id: "oceania", slug: "oceania", name: "Oceania" },
    publishedAt: "2024-03-10",
    views: 125000,
    featured: true,
  },
  {
    id: "2",
    slug: "alaska-solo-trip",
    title: "My Solo Trip to Alaska - 6 Days in Paradise",
    description: "Join me on my solo adventure through the wild landscapes of Alaska.",
    thumbnail: "/images/videos/alaska.jpg",
    videoUrl: "https://youtube.com/watch?v=example2",
    duration: "18:45",
    category: { id: "americas", slug: "americas", name: "The Americas" },
    publishedAt: "2024-02-20",
    views: 98000,
    featured: true,
  },
  {
    id: "3",
    slug: "maldives-luxury",
    title: "Luxury Maldives Experience, The Perfect Getaway",
    description: "Experience the ultimate luxury vacation in the Maldives.",
    thumbnail: "/images/videos/maldives.jpg",
    videoUrl: "https://youtube.com/watch?v=example3",
    duration: "15:20",
    category: { id: "asia", slug: "asia", name: "Asia" },
    publishedAt: "2024-01-25",
    views: 156000,
    featured: true,
  },
  {
    id: "4",
    slug: "mumbai-india",
    title: "Mumbai, India / A world of color & joy!",
    description: "Exploring the vibrant streets and culture of Mumbai.",
    thumbnail: "/images/videos/mumbai.jpg",
    videoUrl: "https://youtube.com/watch?v=example4",
    duration: "14:10",
    category: { id: "asia", slug: "asia", name: "Asia" },
    publishedAt: "2024-01-10",
    views: 87000,
    featured: false,
  },
  {
    id: "5",
    slug: "greece-island-hopping",
    title: "Greece - A place full of wonders",
    description: "Island hopping through the Greek islands.",
    thumbnail: "/images/videos/greece.jpg",
    videoUrl: "https://youtube.com/watch?v=example5",
    duration: "20:15",
    category: { id: "europe", slug: "europe", name: "Europe" },
    publishedAt: "2023-12-20",
    views: 112000,
    featured: false,
  },
  {
    id: "6",
    slug: "phuket-thailand",
    title: "Phuket, Thailand / A place full of adventures",
    description: "Discovering the best of Phuket, Thailand.",
    thumbnail: "/images/videos/phuket.jpg",
    videoUrl: "https://youtube.com/watch?v=example6",
    duration: "16:30",
    category: { id: "asia", slug: "asia", name: "Asia" },
    publishedAt: "2023-12-05",
    views: 94000,
    featured: false,
  },
];

// Destinations - Escalable: reemplazar con llamadas a CMS
export const destinations: Destination[] = [
  {
    id: "1",
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    continent: "europe",
    description: "Famous for its dramatic views, stunning sunsets from Oia town, the strange white aubergine, and its very own active volcano.",
    coverImage: "/images/destinations/santorini.jpg",
    gallery: ["/images/destinations/santorini-1.jpg", "/images/destinations/santorini-2.jpg"],
    highlights: ["Oia Sunset", "Red Beach", "Ancient Akrotiri", "Wine Tasting"],
    bestTimeToVisit: "April to October",
    tips: ["Book sunset dinner reservations early", "Stay in Oia or Fira for best views"],
    featured: true,
  },
  {
    id: "2",
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    continent: "asia",
    description: "The cultural heart of Japan, with over 2,000 temples and shrines, traditional gardens, and geisha districts.",
    coverImage: "/images/destinations/kyoto.jpg",
    highlights: ["Fushimi Inari Shrine", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Gion District"],
    bestTimeToVisit: "March-May or October-November",
    featured: false,
  },
  {
    id: "3",
    slug: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    continent: "americas",
    description: "The iconic Incan citadel set high in the Andes Mountains, a testament to ancient engineering.",
    coverImage: "/images/destinations/machu-picchu.jpg",
    highlights: ["Inca Trail", "Sun Gate", "Temple of the Sun", "Huayna Picchu"],
    bestTimeToVisit: "April to October",
    featured: false,
  },
  {
    id: "4",
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    continent: "africa",
    description: "A major economic center and home to mosques, palaces and gardens, known as the Red City.",
    coverImage: "/images/destinations/marrakech.jpg",
    highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace", "Medina Souks"],
    bestTimeToVisit: "March to May or September to November",
    featured: false,
  },
  {
    id: "5",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    continent: "asia",
    description: "An Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.",
    coverImage: "/images/destinations/bali.jpg",
    highlights: ["Ubud Monkey Forest", "Uluwatu Temple", "Tegalalang Rice Terrace", "Seminyak Beach"],
    bestTimeToVisit: "April to October",
    featured: false,
  },
  {
    id: "6",
    slug: "iceland",
    name: "Iceland",
    country: "Iceland",
    continent: "europe",
    description: "The land of fire and ice, famous for its dramatic landscapes, volcanoes, geysers, hot springs and lava fields.",
    coverImage: "/images/destinations/iceland.jpg",
    highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights", "Skógafoss Waterfall"],
    bestTimeToVisit: "June to August for midnight sun, September to March for Northern Lights",
    featured: false,
  },
  {
    id: "7",
    slug: "new-york",
    name: "New York City",
    country: "USA",
    continent: "americas",
    description: "The city that never sleeps, with iconic landmarks, world-class museums, and diverse neighborhoods.",
    coverImage: "/images/destinations/new-york.jpg",
    highlights: ["Central Park", "Times Square", "Statue of Liberty", "Brooklyn Bridge"],
    bestTimeToVisit: "April to June or September to November",
    featured: false,
  },
  {
    id: "8",
    slug: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    continent: "africa",
    description: "A port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain.",
    coverImage: "/images/destinations/cape-town.jpg",
    highlights: ["Table Mountain", "Robben Island", "V&A Waterfront", "Kirstenbosch Gardens"],
    bestTimeToVisit: "October to April",
    featured: false,
  },
];

// Instagram Posts - Escalable: reemplazar con Instagram API
export const instagramPosts: InstagramPost[] = [
  {
    id: "1",
    imageUrl: "/images/instagram/insta-1.jpg",
    link: "https://instagram.com/p/example1",
    caption: "Sunset in Santorini 🌅 #greece #travel",
    likes: 12500,
  },
  {
    id: "2",
    imageUrl: "/images/instagram/insta-2.jpg",
    link: "https://instagram.com/p/example2",
    caption: "Lost in the streets of Kyoto 🏮 #japan",
    likes: 9800,
  },
  {
    id: "3",
    imageUrl: "/images/instagram/insta-3.jpg",
    link: "https://instagram.com/p/example3",
    caption: "Northern Lights in Iceland ✨ #iceland",
    likes: 15200,
  },
  {
    id: "4",
    imageUrl: "/images/instagram/insta-4.jpg",
    link: "https://instagram.com/p/example4",
    caption: "Maldives paradise 🏝️ #maldives",
    likes: 18900,
  },
  {
    id: "5",
    imageUrl: "/images/instagram/insta-5.jpg",
    link: "https://instagram.com/p/example5",
    caption: "Adventures in Patagonia 🏔️ #argentina",
    likes: 11300,
  },
];

// Helper functions para filtrar contenido
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  if (categorySlug === 'all') return blogPosts;
  return blogPosts.filter(post => post.category.slug === categorySlug);
}

export function getFeaturedVideos(): Video[] {
  return videos.filter(video => video.featured);
}

export function getDestinationsByContinent(continent: string): Destination[] {
  if (continent === 'all') return destinations;
  return destinations.filter(dest => dest.continent === continent);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter(dest => dest.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(dest => dest.slug === slug);
}

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find(video => video.slug === slug);
}
