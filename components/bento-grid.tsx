"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Feather } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface Post {
  id: string;
  title: string;
  slug: string;
}

interface BentoGridProps {
  categories: Category[];
  recentPosts: Post[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

const floatAnimation = (delay: number) => ({
  y: [0, -10, 0],
  x: [0, 5, 0],
  rotate: [0, 3, -3, 0],
  transition: {
    delay,
    duration: 6,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  },
});

export default function BentoGrid({ categories, recentPosts }: BentoGridProps) {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[620px] mt-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* --- LEFT COLUMN --- */}
      <div className="md:col-span-3 flex flex-col gap-5 h-full">
        {/* Dynamic Categories */}
        <motion.div
          variants={cardVariants}
          className="flex-1 bg-gradient-to-br from-blue-50 to-white rounded-[1.5rem] relative overflow-hidden min-h-[220px] border border-blue-100/50 shadow-sm"
        >
          <div className="absolute inset-0 p-6">
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">
              Topics
            </h3>
            {categories.slice(0, 3).map((cat, i) => (
              <motion.span
                key={cat.id}
                animate={floatAnimation(i * 0.5)}
                className={`absolute bg-white/80 backdrop-blur-md border border-blue-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm cursor-default`}
                style={{
                  top: `${25 + i * 25}%`,
                  [i % 2 === 0 ? "left" : "right"]: "10%",
                }}
              >
                {cat.name}{" "}
                <span className="text-xs text-blue-400">({cat.count})</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Recent Drafts */}
        <motion.div
          variants={cardVariants}
          className="flex-1 bg-[#FFFDF7] rounded-[1.5rem] p-6 min-h-[200px] border border-orange-100/50 shadow-sm flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-5 text-amber-900/80 font-serif font-medium">
            <BookOpen size={18} />
            <span>Recent Writings</span>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-200 group-hover:bg-amber-400 transition-colors"></div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors font-medium truncate">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- CENTER COLUMN --- */}
      <div className="md:col-span-5 flex flex-col gap-5 h-full">
        {/* Feature Block (Semi-static logic: features the first post if desired) */}
        <motion.div
          variants={cardVariants}
          className="flex-[1.5] bg-[#F1EEF9] rounded-[1.5rem] p-8 flex flex-col justify-between relative overflow-hidden min-h-[250px] border border-purple-100/50 shadow-sm group"
        >
          <div className="absolute top-[-20px] right-[-20px] text-purple-200/50 rotate-12 pointer-events-none">
            <Feather size={180} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-bold text-purple-900 mb-4">
              Latest
            </span>
            <h2 className="text-3xl font-serif text-gray-900 leading-tight">
              {recentPosts[0]?.title || "The Unwritten Story"}
            </h2>
          </div>
          <div className="flex justify-end items-end relative z-10 mt-4">
            <Link href={recentPosts[0] ? `/posts/${recentPosts[0].slug}` : "#"}>
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer">
                Read Now
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Input Block (Kept static as it's UI functionality, not content) */}
        <motion.div
          variants={cardVariants}
          className="flex-1 bg-[#FDEDEC] rounded-[1.5rem] p-6 flex flex-col justify-between min-h-[160px] border border-red-100/50 shadow-sm"
        >
          {/* ... Input code remains the same as it's interactive UI ... */}
          <div className="flex items-center gap-2 text-gray-800 font-serif italic text-lg">
            Finish the line...
          </div>
          <div className="relative group">
            <input
              disabled
              placeholder="The moon whispered to the..."
              className="w-full bg-white/60 backdrop-blur-sm p-4 pr-14 rounded-2xl text-sm placeholder:text-gray-400 outline-none border border-white/50"
            />
            <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center">
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- RIGHT COLUMN --- */}
      <motion.div
        variants={cardVariants}
        className="md:col-span-4 bg-[#E7F3F8] rounded-[1.5rem] h-full min-h-[400px] relative overflow-hidden p-8 flex flex-col justify-between border border-blue-100/50 shadow-sm"
      >
        <div className="z-10 relative">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-cyan-600" />
            Editor's Pick
          </h3>
          <p className="text-cyan-900/70 text-sm leading-relaxed font-medium">
            "To see a World in a Grain of Sand <br /> And a Heaven in a Wild
            Flower..."
          </p>
        </div>
        {/* Artistic shapes remain the same */}
      </motion.div>
    </motion.div>
  );
}
