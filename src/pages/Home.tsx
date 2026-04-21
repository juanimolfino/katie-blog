import {
  Hero,
  AboutSection,
  RecentPosts,
  DestinationsSection,
} from '../components/sections'

import { NextStops } from '@/components/sections/Next';

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
