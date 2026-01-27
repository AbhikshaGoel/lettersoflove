"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Added for navigation
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// --- Types ---
interface WPPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: { node: { name: string } };
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

interface SplitHeroProps {
  posts: WPPost[];
}

// --- Dynamic Styling Helpers ---
const THEMES = [
  {
    name: "amber",
    text: "text-amber-600 dark:text-amber-400",
    btn: "bg-amber-600 hover:bg-amber-700",
    border: "border-amber-500",
    accent: "bg-amber-600",
  },
  {
    name: "purple",
    text: "text-purple-600 dark:text-purple-400",
    btn: "bg-purple-600 hover:bg-purple-700",
    border: "border-purple-500",
    accent: "bg-purple-600",
  },
  {
    name: "slate",
    text: "text-slate-600 dark:text-slate-400",
    btn: "bg-slate-700 hover:bg-slate-800",
    border: "border-slate-500",
    accent: "bg-slate-600",
  },
  {
    name: "rose",
    text: "text-rose-600 dark:text-rose-400",
    btn: "bg-rose-600 hover:bg-rose-700",
    border: "border-rose-500",
    accent: "bg-rose-600",
  },
  {
    name: "blue",
    text: "text-blue-600 dark:text-blue-400",
    btn: "bg-blue-600 hover:bg-blue-700",
    border: "border-blue-500",
    accent: "bg-blue-600",
  },
];

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function SplitHero({ posts }: SplitHeroProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // If no posts, don't render or render a skeleton
  if (!posts || posts.length === 0) return null;

  // Transform WP Data to Component Data with Color Themes
  const processedStories = posts.map((post, index) => {
    const theme = THEMES[index % THEMES.length];
    const year = new Date(post.date).getFullYear();
    // Strip HTML from excerpt for safety
    const cleanExcerpt =
      post.excerpt.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

    return {
      ...post,
      displayYear: year,
      cleanExcerpt,
      theme,
      // Fallback image if WP post has no image
      imageUrl:
        post.featuredImage?.node?.sourceUrl ||
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80",
    };
  });

  // Duplicate for infinite loop illusion
  const stories = [...processedStories, ...processedStories];
  const activeStory = processedStories[current] || processedStories[0];

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() % processedStories.length);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() % processedStories.length);
    });
  }, [api, processedStories.length]);

  return (
    <section className="relative w-full flex flex-col md:flex-row bg-[#FFFBF7] dark:bg-[#020617] overflow-hidden transition-colors duration-500 min-h-[80vh] md:h-[80vh]">
      {/* --- LEFT SIDE --- */}
      <div className="w-full md:w-1/2 flex flex-col h-full relative z-20 border-r border-gray-100 dark:border-gray-800/50 bg-[#FFFBF7] dark:bg-[#020617]">
        <motion.div
          layoutId="accent-line"
          className={`absolute top-0 left-0 w-full h-1.5 opacity-60 ${activeStory.theme.accent}`}
        />

        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-8 md:py-0 overflow-y-auto md:overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              className="flex flex-col items-start w-full"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`w-8 h-1 rounded-full ${activeStory.theme.accent}`}
                />
                <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
                  Featured
                </span>
              </div>

              <h1
                className={cn(
                  "text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.1] mb-6 tracking-tight transition-colors duration-300",
                  activeStory.theme.text,
                )}
              >
                {activeStory.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mb-8 font-medium border-l-2 border-gray-200 dark:border-gray-800 pl-4">
                "{activeStory.cleanExcerpt}"
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link href={`/posts/${activeStory.slug}`}>
                  <button
                    className={cn(
                      "px-8 py-4 rounded-full text-white text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1",
                      activeStory.theme.btn,
                    )}
                  >
                    Read Full Piece <ArrowRight size={16} />
                  </button>
                </Link>
                <button className="p-4 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm">
                  <BookOpen
                    size={20}
                    className="text-gray-700 dark:text-gray-200"
                  />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- CAROUSEL --- */}
          <div className="w-full mt-2">
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {stories.map((story, index) => {
                  const isMatch = index % processedStories.length === current;
                  return (
                    <CarouselItem
                      key={`${story.id}-${index}`}
                      className="pl-4 basis-1/2 md:basis-1/3"
                    >
                      <div
                        className={cn(
                          "relative aspect-4/3 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 border-2 group",
                          isMatch
                            ? `scale-100 shadow-md ${story.theme.border}`
                            : "opacity-70 hover:opacity-100 border-transparent scale-95",
                        )}
                        onClick={() => api?.scrollTo(index)}
                      >
                        <Image
                          src={story.imageUrl}
                          alt={story.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized={true} // Consider removing if remotePatterns configured
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20" />
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-xs font-bold truncate">
                            {story.title}
                          </p>
                          <p className="text-white/70 text-[10px] uppercase">
                            {story.author.node.name}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE (Image) --- */}
      <div className="hidden md:block w-1/2 h-full relative bg-gray-900 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeStory.id}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeStory.imageUrl}
              alt={activeStory.title}
              fill
              className="object-cover opacity-90"
              priority
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={`meta-${activeStory.id}`}
          initial={{ opacity: 0, x: 20, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute bottom-12 right-12 max-w-md z-10 p-8 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-end">
            <p className="font-serif text-3xl md:text-4xl italic leading-tight text-white drop-shadow-sm text-right mb-4">
              "{activeStory.title}"
            </p>
            <div className="flex items-center justify-end gap-3 opacity-100">
              <span
                className={`h-2 w-12 shadow-sm ${activeStory.theme.accent}`}
              ></span>
              <span className="text-xs font-bold tracking-widest text-white uppercase shadow-black/10 drop-shadow-sm">
                {activeStory.author.node.name}, {activeStory.displayYear}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
