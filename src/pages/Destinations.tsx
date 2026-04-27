import { useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts, siteConfig } from '@/data';
import type { BlogPost, Continent } from '@/types';

type ContinentOption = {
  slug: Continent;
  name: string;
  shortName: string;
  mapLabel: string;
  x: number;
  y: number;
  shapeClassName: string;
};

const CONTINENTS: ContinentOption[] = [
  {
    slug: 'asia',
    name: 'Asia',
    shortName: 'Asia',
    mapLabel: 'Asia',
    x: 600,
    y: 165,
    shapeClassName:
      'M464 96l38-8 34 5 27-9 54 7 42 16 52 2 38 14 29 28 36 18 7 24-20 16-42 2-16 17-36 6-20 18-35-2-16 16-30-7-21 9-8 26-21 23-18-14 6-31-26-31-19-3-16-24-28-8-15-20-31-5-20-21 8-27-18-17 19-17z M549 232l25 17 12 31-16 34-25-11-10-35 14-36z M663 262l23 12 2 28-18 21-18-21 11-40z M716 199l22 10 14 22-15 18-25-10-1-24 5-16z M746 185l19 4 7 16-16 11-15-10 5-21z M782 178l17 7 4 14-14 9-14-10 7-20z',
  },
  {
    slug: 'europe',
    name: 'Europe',
    shortName: 'Europe',
    mapLabel: 'Europe',
    x: 405,
    y: 130,
    shapeClassName:
      'M354 82l34-15 39 3 19 12 24-3 16 14-14 16 22 16-10 24-28-3-12 16-23-9-17 19-20-12-21 7-21-15 12-20-16-16 16-34z M326 110l17 7-3 18-20 5-12-13 18-17z M397 172l15 10 5 24-18 8-10-18 8-24z M431 166l20 14-5 17-20-5 5-26z',
  },
  {
    slug: 'oceania',
    name: 'Oceania',
    shortName: 'Oceania',
    mapLabel: 'Oceania',
    x: 698,
    y: 343,
    shapeClassName:
      'M627 315l36-20 45 7 32 24 9 32-24 20-45 8-41-14-20-29 8-28z M738 393l17-12 17 9 1 18-18 13-18-9 1-19z M772 378l11 4 2 11-10 6-9-8 6-13z M607 287l25-7 20 12-8 16-29-1-8-20z M682 279l12 5 3 12-12 6-10-10 7-13z',
  },
  {
    slug: 'north-america',
    name: 'North America',
    shortName: 'North America',
    mapLabel: 'North America',
    x: 178,
    y: 150,
    shapeClassName:
      'M44 122l31-20 45-8 23-20 53-9 42 12 34-12 33 8 20 25-18 28 25 21-3 32-33 16-24 30-38 3-17 24-25-7-30 13-31-12-17-29-31-9-5-32-28-12-7-33z M158 238l29 9 17 23-4 31-23 5-21-22-15-26 17-20z M310 41l40-18 42 4 18 22-15 34-33 20-37-7-27-22 12-33z M111 84l25-22 38-8 14-19 29 7-19 24-35 10-23 18-29-10z',
  },
  {
    slug: 'central-america',
    name: 'Central America',
    shortName: 'Central America',
    mapLabel: 'Central America',
    x: 254,
    y: 272,
    shapeClassName:
      'M205 262l24-12 31 6 20 18 25 5 19 15-6 16-29-6-23-14-25-2-19-10-17-16z M319 254m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M334 263m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M348 275m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M301 242m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  },
  {
    slug: 'south-america',
    name: 'South America',
    shortName: 'South America',
    mapLabel: 'South America',
    x: 298,
    y: 342,
    shapeClassName:
      'M286 278l38 14 26 31 1 38-18 35-5 31-22 24-20-20-9-36-22-27-7-38-25-26 17-24 46-2z M273 414l13 9-7 15-13-7 7-17z',
  },
  {
    slug: 'africa',
    name: 'Africa',
    shortName: 'Africa',
    mapLabel: 'Africa',
    x: 430,
    y: 282,
    shapeClassName:
      'M394 183l54-9 46 21 26 45-8 48 16 38-18 53-38 46-35-13-17-52-34-32-20-51 7-55 21-39z M531 344l20 24-6 34-24 18-11-29 21-47z',
  },
];

const CONTINENT_PAGE_SIZE = 6;
const CONTINENT_INCREMENT = 3;
const SEARCH_PAGE_SIZE = 6;

function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function DestinationPostCard({ post }: { post: BlogPost }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-x-3 gap-y-2 font-body text-[11px] uppercase tracking-[0.16em] text-ocean">
        {post.destination && <span>{post.destination}</span>}
        {post.country && <span>{post.country}</span>}
      </div>

      <h3 className="font-display text-2xl text-black group-hover:text-ocean transition-colors mb-2">
        {post.title}
      </h3>

      <p className="font-body text-sm text-black/48 mb-3">
        {formatPostDate(post.publishedAt)}
      </p>

      <p className="font-body text-base text-black/68 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
    </Link>
  );
}

export function Destinations() {
  const [activeContinent, setActiveContinent] = useState<Continent>('asia');
  const [continentVisibleCount, setContinentVisibleCount] = useState(CONTINENT_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchContinent, setSearchContinent] = useState<'all' | Continent>('all');
  const [searchCountry, setSearchCountry] = useState<'all' | string>('all');
  const [searchVisibleCount, setSearchVisibleCount] = useState(SEARCH_PAGE_SIZE);
  const continentResultsRef = useRef<HTMLElement | null>(null);

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      ),
    []
  );

  const postsByContinent = useMemo(
    () => sortedPosts.filter((post) => post.continent === activeContinent),
    [activeContinent, sortedPosts]
  );

  const availableCountriesByContinent = useMemo(() => {
    const map = new Map<Continent, string[]>();

    CONTINENTS.forEach((continent) => {
      const countries = sortedPosts
        .filter((post) => post.continent === continent.slug && post.country)
        .map((post) => post.country as string);
      map.set(continent.slug, [...new Set(countries)].sort());
    });

    return map;
  }, [sortedPosts]);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesContinent =
        searchContinent === 'all' ? true : post.continent === searchContinent;
      const matchesCountry = searchCountry === 'all' ? true : post.country === searchCountry;
      const haystack = [
        post.title,
        post.subtitle,
        post.excerpt,
        post.destination,
        post.country,
        post.continent,
        ...post.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = normalizedSearch ? haystack.includes(normalizedSearch) : true;
      return matchesContinent && matchesCountry && matchesQuery;
    });
  }, [normalizedSearch, searchContinent, searchCountry, sortedPosts]);

  const currentContinent = CONTINENTS.find((continent) => continent.slug === activeContinent)!;
  const visibleContinentPosts = postsByContinent.slice(0, continentVisibleCount);
  const visibleSearchResults = searchResults.slice(0, searchVisibleCount);
  const availableCountries =
    searchContinent === 'all' ? [] : availableCountriesByContinent.get(searchContinent) ?? [];

  const handleContinentSelect = (continent: Continent) => {
    setActiveContinent(continent);
    setContinentVisibleCount(CONTINENT_PAGE_SIZE);
    requestAnimationFrame(() => {
      continentResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/destinations/maldives.jpg"
            alt="Clear ocean water and tropical shoreline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ocean-dark/45" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-28 text-center text-white">
          <h1 className="font-logo text-5xl md:text-6xl lg:text-7xl leading-none mb-5">
            {siteConfig.name}
          </h1>
          <p className="font-body text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            Explore stories by place, follow the journey continent by continent, and find the parts of the world that keep calling Katie back.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
              Explore by Continent
            </h2>
            <p className="font-body text-base md:text-lg text-black/62 max-w-3xl leading-relaxed">
              Tap a continent to jump into the stories from that part of the world.
            </p>
          </div>

          <div className="bg-ocean-dark rounded-sm overflow-hidden p-6 md:p-10">
            <div className="relative mx-auto max-w-5xl">
              <svg
                viewBox="0 0 840 430"
                className="w-full h-auto"
                role="img"
                aria-label="Interactive world map by continent"
              >
                <rect width="840" height="430" fill="transparent" />
                {CONTINENTS.map((continent) => (
                  <path
                    key={continent.slug}
                    d={continent.shapeClassName}
                    fill={activeContinent === continent.slug ? '#7dd3fc' : 'rgba(255,255,255,0.24)'}
                    stroke={activeContinent === continent.slug ? '#ffffff' : 'rgba(255,255,255,0.15)'}
                    strokeWidth="2"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => handleContinentSelect(continent.slug)}
                  />
                ))}
              </svg>

              {CONTINENTS.map((continent) => (
                <button
                  key={continent.slug}
                  onClick={() => handleContinentSelect(continent.slug)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-2 font-body text-xs md:text-sm uppercase tracking-[0.16em] transition-all duration-300 ${
                    activeContinent === continent.slug
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  }`}
                  style={{ left: `${(continent.x / 840) * 100}%`, top: `${(continent.y / 430) * 100}%` }}
                >
                  {continent.mapLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={continentResultsRef}
        className="py-16 md:py-20 bg-white border-b border-black/5 scroll-mt-28"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="font-body text-sm uppercase tracking-[0.18em] text-black/40 block mb-3">
                Selected continent
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-black">
                {currentContinent.name}
              </h2>
            </div>

            {postsByContinent.length > continentVisibleCount && (
              <button
                onClick={() => setContinentVisibleCount(postsByContinent.length)}
                className="font-body text-sm uppercase tracking-[0.16em] text-black/55 hover:text-ocean transition-colors"
              >
                View all -&gt;
              </button>
            )}
          </div>

          {postsByContinent.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleContinentPosts.map((post) => (
                  <DestinationPostCard key={`${post.slug}-continent`} post={post} />
                ))}
              </div>

              {continentVisibleCount < postsByContinent.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() =>
                      setContinentVisibleCount((current) => current + CONTINENT_INCREMENT)
                    }
                    className="btn-ocean"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="font-body text-base text-black/60">
              There are no published posts in this continent yet.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mb-10">
            <h2 className="font-display text-4xl md:text-5xl text-black mb-4">
              Search Destinations
            </h2>
            <p className="font-body text-base md:text-lg text-black/62 max-w-3xl leading-relaxed">
              Search by destination, country, animal, or travel keyword. You can also narrow the results by continent and then by country.
            </p>
          </div>

          <div className="max-w-2xl relative mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/35" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSearchVisibleCount(SEARCH_PAGE_SIZE);
              }}
              placeholder="Try Galapagos, sharks, Tenerife, Egypt..."
              className="w-full h-14 pl-14 pr-5 bg-cream border border-black/10 font-body text-base text-black placeholder:text-black/35 focus:outline-none focus:border-ocean transition-colors"
            />
          </div>

          <div className="mb-8">
            <p className="font-body text-sm uppercase tracking-[0.18em] text-black/40 mb-4">
              Filter by continent
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSearchContinent('all');
                  setSearchCountry('all');
                  setSearchVisibleCount(SEARCH_PAGE_SIZE);
                }}
                className={`px-4 py-2 border text-sm font-body uppercase tracking-[0.14em] transition-colors ${
                  searchContinent === 'all'
                    ? 'bg-ocean text-white border-ocean'
                    : 'border-black/10 text-black/65 hover:border-ocean hover:text-ocean'
                }`}
              >
                All
              </button>
              {CONTINENTS.map((continent) => (
                <button
                  key={continent.slug}
                  onClick={() => {
                    setSearchContinent(continent.slug);
                    setSearchCountry('all');
                    setSearchVisibleCount(SEARCH_PAGE_SIZE);
                  }}
                  className={`px-4 py-2 border text-sm font-body uppercase tracking-[0.14em] transition-colors ${
                    searchContinent === continent.slug
                      ? 'bg-ocean text-white border-ocean'
                      : 'border-black/10 text-black/65 hover:border-ocean hover:text-ocean'
                  }`}
                >
                  {continent.shortName}
                </button>
              ))}
            </div>
          </div>

          {availableCountries.length > 0 && (
            <div className="mb-10">
              <p className="font-body text-sm uppercase tracking-[0.18em] text-black/40 mb-4">
                Countries with blog posts
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setSearchCountry('all');
                    setSearchVisibleCount(SEARCH_PAGE_SIZE);
                  }}
                  className={`px-4 py-2 border text-sm font-body uppercase tracking-[0.14em] transition-colors ${
                    searchCountry === 'all'
                      ? 'bg-ocean text-white border-ocean'
                      : 'border-black/10 text-black/65 hover:border-ocean hover:text-ocean'
                  }`}
                >
                  All countries
                </button>
                {availableCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSearchCountry(country);
                      setSearchVisibleCount(SEARCH_PAGE_SIZE);
                    }}
                    className={`px-4 py-2 border text-sm font-body uppercase tracking-[0.14em] transition-colors ${
                      searchCountry === country
                        ? 'bg-ocean text-white border-ocean'
                        : 'border-black/10 text-black/65 hover:border-ocean hover:text-ocean'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="font-body text-sm uppercase tracking-[0.16em] text-black/40">
              {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleSearchResults.map((post) => (
                  <DestinationPostCard key={`${post.slug}-search`} post={post} />
                ))}
              </div>

              {searchVisibleCount < searchResults.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setSearchVisibleCount((current) => current + CONTINENT_INCREMENT)}
                    className="btn-ocean"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="font-body text-base text-black/60">
              No destination posts matched that search yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
