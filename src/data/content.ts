import type { BlogCategorySlug, BlogPost, Destination } from '@/types';

export const blogCategoryLabels: Record<BlogCategorySlug, string> = {
  travel: 'Travel',
  diving: 'Diving',
  encounters: 'Encounters',
  guides: 'Guides',
  'dive-instructor-life': 'Dive Instructor Life',
};

const katieAuthor = {
  id: 'katie',
  name: 'Katie',
  bio: 'Dive instructor, skipper, and ocean storyteller.',
  avatar: '/images/about/about-katie.jpg',
};

// Blog Posts - Static for now, structured to map cleanly to a future app
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'swimming-with-hammerheads-in-the-galapagos',
    title: 'Swimming with Hammerheads in the Galapagos',
    subtitle:
      'Strong currents, volcanic islands, and one of the most unforgettable animal encounters I have ever had underwater.',
    excerpt:
      'A personal account of diving in the Galapagos, the rhythm of life on board, and the moment the hammerheads finally appeared.',
    coverImage: '/images/destinations/galapagos.jpg',
    categories: ['travel', 'diving', 'encounters'],
    tags: ['galapagos', 'hammerheads', 'sharks', 'ecuador', 'liveaboard'],
    author: katieAuthor,
    publishedAt: '2026-04-26',
    readTime: 7,
    destination: 'Galapagos',
    country: 'Ecuador',
    continent: 'south-america',
    intro: [
      'There are some places that stay in your head long before you ever arrive. For me, the Galapagos was one of them. It had lived for years in the part of my mind reserved for wild places, strong currents, and animal encounters that feel almost unreal.',
      'By the time I finally made it there, I already knew it would be intense. What I did not know was how quiet the moment itself would feel when the hammerheads finally emerged from the blue.',
    ],
    sections: [
      {
        id: 'arriving-at-sea',
        title: 'Arriving at Sea',
        paragraphs: [
          'The journey already felt different from the beginning. The water had a heaviness to it, the kind that makes you pay attention. There was excitement on board, but also a certain respect. Everyone knew the Galapagos was not the kind of place you drift casually through.',
          'Between dives, the landscape felt almost prehistoric. Dark rock, open sky, sea birds circling overhead, and the constant sense that this ecosystem follows its own logic. It is beautiful, but not soft. That is part of what makes it unforgettable.',
        ],
        images: [
          {
            src: '/images/destinations/galapagos.jpg',
            alt: 'Galapagos volcanic coastline',
          },
        ],
      },
      {
        id: 'the-wait',
        title: 'The Wait Before the Encounter',
        paragraphs: [
          'One of the things people do not always talk about is how much waiting is part of a big encounter. You descend, settle, watch the current, stay calm, and hope the ocean decides to reveal something. Sometimes that anticipation is almost as intense as the sighting itself.',
          'I remember scanning the water over and over, letting my breathing slow down, trying not to rush the moment before it had even happened.',
        ],
        quote: {
          text: 'The best underwater moments rarely arrive on your timeline. They arrive when you are finally still enough to notice them.',
        },
      },
      {
        id: 'hammerheads',
        title: 'When the Hammerheads Finally Appeared',
        paragraphs: [
          'And then they were there. Not in a dramatic burst, but gradually, like the ocean was sketching them into view. First one shape, then another, then the unmistakable silhouette of hammerheads moving with that calm, confident rhythm only sharks seem to have.',
          'It was one of those moments where everything narrows. The noise in your head disappears. You are not thinking about your camera, your checklist, or the next dive. You are just there, suspended in the water, watching something ancient move past you.',
        ],
        images: [
          {
            src: '/images/about/about-called-by-ocean-1.JPG',
            alt: 'Katie underwater during a dive',
          },
          {
            src: '/images/about/about-called-by-ocean-2.JPG',
            alt: 'Blue water underwater scene',
          },
        ],
      },
      {
        id: 'why-it-stayed',
        title: 'Why It Stayed With Me',
        paragraphs: [
          'What stayed with me was not only the encounter itself, but the feeling around it. The Galapagos reminded me why I keep choosing this life. Not because every dive guarantees something spectacular, but because every once in a while the ocean gives you a moment that resets your sense of wonder.',
          'That is what this trip became for me: a reminder that awe still exists, and that sometimes it arrives quietly, far from shore, in the shape of a hammerhead crossing through the blue.',
        ],
      },
    ],
    relatedPostSlugs: ['great-barrier-reef-guide', 'raja-ampat-diving'],
    featured: true,
    meta: {
      title: 'Swimming with Hammerheads in the Galapagos | What Katie Seas',
      description:
        'Katie shares her Galapagos diving experience, the anticipation of the blue, and the unforgettable moment hammerheads appeared.',
      ogImage: '/images/destinations/galapagos.jpg',
    },
  },
  {
    id: '2',
    slug: 'great-barrier-reef-guide',
    title: 'A Quiet Guide to the Great Barrier Reef',
    subtitle:
      'What makes this place so special, when to go, and why reef life feels different when you stay long enough to notice the details.',
    excerpt:
      'A practical but personal guide to the Great Barrier Reef, from timing and conditions to the slower magic of reef life.',
    coverImage: '/images/destinations/gbr.jpg',
    categories: ['travel', 'diving', 'guides'],
    tags: ['great-barrier-reef', 'australia', 'reef-life', 'guide'],
    author: katieAuthor,
    publishedAt: '2026-04-18',
    readTime: 6,
    destination: 'Great Barrier Reef',
    country: 'Australia',
    continent: 'oceania',
    intro: [
      'The Great Barrier Reef is one of those names people know before they know the place. It sounds enormous because it is. But what makes it memorable is not only its scale. It is the way life keeps revealing itself in layers once you slow down enough to really see it.',
    ],
    sections: [
      {
        id: 'first-impression',
        title: 'More Than a Bucket-List Dive',
        paragraphs: [
          'The reef is often described in superlatives, but what I love most about it is not how famous it is. It is the texture of daily life around it: early boat mornings, changing visibility, soft coral movement, turtles passing by without urgency.',
          'If you are planning a trip here, it helps to think beyond one perfect dive. The experience is richer when you let the place unfold gradually.',
        ],
      },
      {
        id: 'timing',
        title: 'When to Go',
        paragraphs: [
          'Conditions vary by season, and what you want to see matters. Some months feel calmer, others bring bigger marine life activity. The best timing depends on whether you are chasing visibility, warmer water, wildlife, or fewer crowds.',
        ],
        images: [
          {
            src: '/images/destinations/gbr.jpg',
            alt: 'Great Barrier Reef coral and blue water',
          },
        ],
      },
      {
        id: 'why-return',
        title: 'Why People Keep Coming Back',
        paragraphs: [
          'The reef is not a one-look place. It changes with weather, light, current, and season. The more time you spend there, the more it becomes a place of rhythm rather than spectacle alone.',
        ],
      },
    ],
    relatedPostSlugs: ['swimming-with-hammerheads-in-the-galapagos', 'raja-ampat-diving'],
    meta: {
      title: 'A Quiet Guide to the Great Barrier Reef | What Katie Seas',
      description:
        'A personal and practical guide to the Great Barrier Reef, including timing, atmosphere, and what makes the reef unforgettable.',
      ogImage: '/images/destinations/gbr.jpg',
    },
  },
  {
    id: '3',
    slug: 'raja-ampat-diving',
    title: 'Why Raja Ampat Feels Like Another Planet',
    subtitle:
      'A place of impossible blues, dense marine life, and the kind of underwater abundance that changes the way you think about the ocean.',
    excerpt:
      'Reflections on diving Raja Ampat and why its richness feels less like a trip and more like entering another world.',
    coverImage: '/images/destinations/raja-ampat.jpg',
    categories: ['travel', 'diving', 'encounters'],
    tags: ['raja-ampat', 'indonesia', 'biodiversity', 'reef'],
    author: katieAuthor,
    publishedAt: '2026-04-10',
    readTime: 5,
    destination: 'Raja Ampat',
    country: 'Indonesia',
    continent: 'asia',
    intro: [
      'Some dive destinations impress you. Raja Ampat overwhelms you, but in the best possible way. There is so much life everywhere that your eyes never quite know where to settle.',
    ],
    sections: [
      {
        id: 'first-drop',
        title: 'The First Drop In',
        paragraphs: [
          'Even the first minutes underwater felt full. Fish everywhere, coral in every direction, movement layered over movement. It was the kind of dive where you surface knowing your brain could not possibly have processed everything it just saw.',
        ],
        images: [
          {
            src: '/images/destinations/raja-ampat.jpg',
            alt: 'Raja Ampat island landscape',
          },
        ],
      },
      {
        id: 'underwater-density',
        title: 'So Much Life, So Little Silence',
        paragraphs: [
          'What makes Raja Ampat feel different is the density of it all. Not only beauty, but activity. It feels alive in a very complete way, as if every space in the reef is occupied by something moving, feeding, cleaning, hiding, or passing through.',
        ],
      },
      {
        id: 'memory',
        title: 'A Place That Changes Your Scale',
        paragraphs: [
          'Trips like this remind you that the ocean is still bigger, stranger, and more generous than we can easily describe. Raja Ampat is one of those places that recalibrates your idea of what healthy marine life can look like.',
        ],
      },
    ],
    relatedPostSlugs: ['swimming-with-hammerheads-in-the-galapagos', 'great-barrier-reef-guide'],
    meta: {
      title: 'Why Raja Ampat Feels Like Another Planet | What Katie Seas',
      description:
        'A reflective look at Raja Ampat, its marine biodiversity, and why diving there feels unlike anywhere else.',
      ogImage: '/images/destinations/raja-ampat.jpg',
    },
  },
  {
    id: '4',
    slug: 'learning-to-start-over-in-tenerife',
    title: 'Learning to Start Over in Tenerife',
    subtitle:
      'What it felt like to leave an office life behind, move to the Canary Islands, and begin building something new from the water up.',
    excerpt:
      'A personal story about moving to Tenerife, reconnecting with family roots, and stepping into a completely different version of life.',
    coverImage: '/images/about/about-leap-to-unknown-1.jpeg',
    categories: ['travel', 'dive-instructor-life'],
    tags: ['tenerife', 'canary-islands', 'spain', 'new-beginnings'],
    author: katieAuthor,
    publishedAt: '2026-04-03',
    readTime: 5,
    destination: 'Tenerife',
    country: 'Spain',
    continent: 'europe',
    intro: [
      'Tenerife was not only a move on the map. It was the place where I finally stopped treating the life I wanted as a distant idea and started building it for real.',
    ],
    sections: [
      {
        id: 'why-tenerife',
        title: 'Why Tenerife',
        paragraphs: [
          'Part of the decision was practical, and part of it felt deeply personal. I had always wanted to live in a Spanish-speaking place, and Tenerife carried a family connection that made the whole leap feel even more meaningful.',
          'The island felt volcanic, raw, sunlit, and full of possibility. It asked something of me immediately: show up fully, or stay where you were.',
        ],
        images: [
          {
            src: '/images/about/about-leap-to-unknown-1.jpeg',
            alt: 'Katie in Tenerife',
          },
        ],
      },
      {
        id: 'becoming-someone-new',
        title: 'Becoming Someone New',
        paragraphs: [
          'My days started to revolve around training, water time, and the slow confidence that comes from doing hard things repeatedly. It was uncomfortable at first, but it was the right kind of uncomfortable: the kind that tells you something is changing.',
        ],
      },
    ],
    relatedPostSlugs: ['great-barrier-reef-guide'],
    meta: {
      title: 'Learning to Start Over in Tenerife | What Katie Seas',
      description:
        'A personal reflection on moving to Tenerife, reconnecting with roots, and beginning a life shaped by the ocean.',
      ogImage: '/images/about/about-leap-to-unknown-1.jpeg',
    },
  },
  {
    id: '5',
    slug: 'why-the-red-sea-stays-with-you',
    title: 'Why the Red Sea Stays With You',
    subtitle:
      'Clear water, dramatic reef walls, and the kind of dives that stay vivid in your head long after you surface.',
    excerpt:
      'Reflections on diving the Red Sea and why its visibility, scale, and atmosphere make it so memorable.',
    coverImage: '/images/destinations/red-sea.jpg',
    categories: ['travel', 'diving', 'encounters'],
    tags: ['red-sea', 'egypt', 'reef', 'visibility'],
    author: katieAuthor,
    publishedAt: '2026-03-26',
    readTime: 5,
    destination: 'Red Sea',
    country: 'Egypt',
    continent: 'africa',
    intro: [
      'Some dive destinations impress you with detail. The Red Sea also impresses you with space: vast blue water, steep reef walls, and the feeling that visibility itself becomes part of the experience.',
    ],
    sections: [
      {
        id: 'clarity',
        title: 'The Clarity of It All',
        paragraphs: [
          'The visibility changes the way you experience distance underwater. You feel the scale of the reefs sooner, and the whole dive seems to open outward in every direction.',
          'It creates a kind of calm that is hard to explain until you are there, looking through impossibly clear water at a reef wall that keeps disappearing into blue.',
        ],
        images: [
          {
            src: '/images/destinations/red-sea.jpg',
            alt: 'Clear blue water in the Red Sea',
          },
        ],
      },
      {
        id: 'why-return-red-sea',
        title: 'Why It Lingers',
        paragraphs: [
          'The Red Sea stays with you because it feels both powerful and clean. It has drama, but it also has stillness. That combination is what makes it so easy to replay in your mind long after the trip ends.',
        ],
      },
    ],
    relatedPostSlugs: ['great-barrier-reef-guide', 'swimming-with-hammerheads-in-the-galapagos'],
    meta: {
      title: 'Why the Red Sea Stays With You | What Katie Seas',
      description:
        'A reflective look at Red Sea diving, crystal-clear visibility, reef walls, and why the experience lingers.',
      ogImage: '/images/destinations/red-sea.jpg',
    },
  },
];

// Destinations - Static for now
export const destinations: Destination[] = [
  {
    id: '1',
    slug: 'great-barrier-reef',
    name: 'Great Barrier Reef',
    country: 'Australia',
    continent: 'oceania',
    description:
      "The world's largest coral reef system, stretching over 2,300 kilometers along Australia's coast. Home to incredible marine biodiversity.",
    coverImage: '/images/destinations/gbr.jpg',
    highlights: ['Ribbon Reefs', 'Osprey Reef', 'Heron Island', 'Whale watching'],
    bestTimeToVisit: 'June to October',
    featured: true,
  },
  {
    id: '2',
    slug: 'raja-ampat',
    name: 'Raja Ampat',
    country: 'Indonesia',
    continent: 'asia',
    description:
      'The most biodiverse marine ecosystem on Earth, with over 1,500 species of fish and 600 species of coral.',
    coverImage: '/images/destinations/raja-ampat.jpg',
    highlights: ['Cape Kri', 'Manta Sandy', 'Misool Island', 'Wayag Islands'],
    bestTimeToVisit: 'October to April',
    featured: false,
  },
  {
    id: '3',
    slug: 'galapagos',
    name: 'Galápagos Islands',
    country: 'Ecuador',
    continent: 'south-america',
    description:
      'A unique diving destination where you can swim with hammerhead sharks, marine iguanas, and playful sea lions.',
    coverImage: '/images/destinations/galapagos.jpg',
    highlights: ["Darwin's Arch", 'Wolf Island', 'Cabo Marshall', 'Roca Redonda'],
    bestTimeToVisit: 'June to November',
    featured: false,
  },
  {
    id: '4',
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    continent: 'asia',
    description:
      'Crystal clear waters, vibrant coral reefs, and abundant marine life make the Maldives a paradise for divers of all levels.',
    coverImage: '/images/destinations/maldives.jpg',
    highlights: ['Maaya Thila', 'Manta Point', 'Banana Reef', 'HP Reef'],
    bestTimeToVisit: 'November to May',
    featured: false,
  },
  {
    id: '5',
    slug: 'similan-islands',
    name: 'Similan Islands',
    country: 'Thailand',
    continent: 'asia',
    description:
      'Nine granite islands surrounded by crystal-clear waters, famous for vibrant coral gardens and whale shark encounters.',
    coverImage: '/images/destinations/similan.jpg',
    highlights: ['Richelieu Rock', 'Koh Bon', 'West of Eden', 'Elephant Head Rock'],
    bestTimeToVisit: 'November to May',
    featured: false,
  },
  {
    id: '6',
    slug: 'red-sea',
    name: 'Red Sea',
    country: 'Egypt',
    continent: 'africa',
    description:
      'World-class diving with stunning coral walls, historic wrecks, and incredible visibility year-round.',
    coverImage: '/images/destinations/red-sea.jpg',
    highlights: ['Blue Hole', 'Thistlegorm Wreck', 'Ras Mohammed', 'Brothers Islands'],
    bestTimeToVisit: 'March to May, September to November',
    featured: false,
  },
];

export const partners = [
  { name: 'PADI', logo: 'PADI' },
  { name: 'SSI', logo: 'SSI' },
  { name: 'NAUI', logo: 'NAUI' },
  { name: 'Project AWARE', logo: 'PROJECT AWARE' },
  { name: 'DAN', logo: 'DAN' },
];

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRecentPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  if (categorySlug === 'all') return blogPosts;
  return blogPosts.filter((post) => post.categories.includes(categorySlug as BlogCategorySlug));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const explicit = (post.relatedPostSlugs ?? [])
    .map((slug) => getPostBySlug(slug))
    .filter((candidate): candidate is BlogPost => Boolean(candidate && candidate.slug !== post.slug));

  if (explicit.length >= count) return explicit.slice(0, count);

  const fallback = blogPosts.filter(
    (candidate) =>
      candidate.slug !== post.slug &&
      candidate.categories.some((category) => post.categories.includes(category))
  );

  const deduped = [...explicit];
  fallback.forEach((candidate) => {
    if (!deduped.some((item) => item.slug === candidate.slug)) {
      deduped.push(candidate);
    }
  });

  return deduped.slice(0, count);
}

export function getDestinationsByContinent(continent: string): Destination[] {
  if (continent === 'all') return destinations;
  return destinations.filter((dest) => dest.continent === continent);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((dest) => dest.featured);
}
