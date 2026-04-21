import {
  Hero,
  AboutSection,
  RecentPosts,
  DestinationsSection,
} from '../components/sections'

import { NextStops } from '@/components/sections/nextStops';

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
