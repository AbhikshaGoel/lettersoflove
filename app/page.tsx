import React from "react";
import Hero from "@/components/hero";
import BentoGrid from "@/components/bento-grid";
import StoryFeed from "@/components/story-feed";
import Footer from "@/components/footer";
import SplitHero from "@/components/split-hero";

import { PAGE_DATA_QUERY } from "@/lib/custom-query";
import { fetchGraphQL } from "@/lib/querymaker";

export default async function EchoesPage() {
  // 1. Fetch Dynamic Data
  const data = await fetchGraphQL(PAGE_DATA_QUERY);

  // 2. Safe Data Extraction
  const allPosts = data?.posts?.nodes || [];
  const categories = data?.categories?.nodes || [];

  // 3. Split data for specific sections
  // First 5 posts for the Split Hero Slider
  const heroPosts = allPosts.slice(0, 5);
  // Remaining posts for the Story Feed
  const feedPosts = allPosts.slice(5);

  return (
    <div className="min-h-screen font-sans flex flex-col selection:bg-purple-100 selection:text-purple-900 dark:selection:bg-purple-900 dark:selection:text-purple-100">
      <main className="grow w-full">
        {/* Pass first 5 posts to the Slider */}
        <SplitHero posts={heroPosts} />

        <Hero />

        {/* Pass data to Grid */}
        <BentoGrid
          categories={categories}
          recentPosts={allPosts.slice(0, 3)} // Show top 3 titles in Bento
        />

        {/* Pass older posts to the main feed */}
        <StoryFeed posts={feedPosts} />
      </main>

      <Footer />
    </div>
  );
}
