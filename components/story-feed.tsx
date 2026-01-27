"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  categories: { nodes: { name: string }[] };
}

interface StoryFeedProps {
  posts: Post[];
}

const TAG_STYLES = [
  {
    tagStyle:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
    border: "border-purple-100 dark:border-purple-900/30",
    accent: "bg-purple-100 dark:bg-purple-500",
  },
  {
    tagStyle:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
    border: "border-orange-100 dark:border-orange-900/30",
    accent: "bg-orange-100 dark:bg-orange-500",
  },
  {
    tagStyle:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
    border: "border-blue-100 dark:border-blue-900/30",
    accent: "bg-blue-100 dark:bg-blue-500",
  },
];

export default function StoryFeed({ posts }: StoryFeedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-4xl font-serif text-gray-900 dark:text-white mb-2">
            Curated Works
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Handpicked selections from the garden.
          </p>
        </div>
        <Link
          href="/archive"
          className="group flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-gray-200 mt-4 md:mt-0"
        >
          View Archive{" "}
          <ArrowUpRight
            size={18}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, i) => {
          // Cycle through styles based on index
          const style = TAG_STYLES[i % TAG_STYLES.length];
          const categoryName =
            post.categories?.nodes[0]?.name || "Uncategorized";
          const formattedDate = new Date(post.date).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" },
          );
          const cleanExcerpt =
            post.excerpt.replace(/<[^>]+>/g, "").slice(0, 100) + "...";

          return (
            <Link href={`/posts/${post.slug}`} key={post.id} className="block">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group relative bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 border ${style.border} cursor-pointer overflow-hidden h-full flex flex-col`}
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${style.accent} opacity-50`}
                />

                <div className="flex justify-between items-start mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${style.tagStyle}`}
                  >
                    {categoryName}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600 text-sm font-serif italic">
                    {formattedDate}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3 grow">
                  {cleanExcerpt}
                </p>

                <div className="flex items-center text-sm font-bold text-gray-900 dark:text-gray-200 border-t border-gray-100 dark:border-slate-800 pt-6 mt-auto">
                  Read Story
                  <ArrowUpRight
                    size={16}
                    className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </motion.article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
