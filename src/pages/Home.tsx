import { NextStops } from '../components/sections/nextStops';
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
      <NextStops />
    </>
  );
}
