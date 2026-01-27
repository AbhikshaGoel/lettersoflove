"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-purple-900 dark:text-purple-100 uppercase bg-purple-50 dark:bg-purple-900/40 rounded-full border border-purple-100 dark:border-purple-800">
          Letters of Soul
        </span>

        <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[1.1] text-gray-900 dark:text-white tracking-tight">
          Where thoughts <br />
          <span className="text-gray-400 dark:text-gray-500 italic font-light pr-2">
            drift
          </span>{" "}
          into stories.
        </h1>

        <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
          A curated space for your fleeting metaphors, unfinished verses, and
          visual poetry.
        </p>
      </motion.div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-purple-100/50 via-blue-100/30 to-transparent dark:from-purple-900/20 dark:via-blue-900/10 blur-3xl -z-10 rounded-full opacity-60 pointer-events-none" />
    </section>
  );
}
