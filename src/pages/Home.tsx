import {
  Hero,
  AboutSection,
  AsSeenIn,
  VideosSection,
  DestinationsSection,
  Newsletter,
  CurrentLocation,
  InstagramFeed,
} from '@/components/sections';

export function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <AsSeenIn />
      <VideosSection />
      <DestinationsSection />
      <Newsletter />
      <CurrentLocation />
      <InstagramFeed />
    </>
  );
}
