import { CurrentLocation } from '@/components/sections/CurrentLocation';
import {
  Hero,
  AboutSection,
  RecentPosts,
  DestinationsSection,
} from '../components/sections'

export function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <RecentPosts />
      <DestinationsSection />
      <CurrentLocation />
    </>
  );
}
