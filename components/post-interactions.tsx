"use client";

import React, { useState, useEffect } from "react";
import {
  Share2,
  ArrowUp,
  X,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Smartphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. SCROLL TO TOP ---
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-8 right-8 z-40 p-3 rounded-full bg-white dark:bg-slate-800 text-purple-600 shadow-lg border border-purple-100 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}

// --- 2. SMART FLOATING SHARE ---
interface ShareProps {
  title: string;
  excerpt: string; // We will pass the 150 char limit here
  url: string;
}

export function FloatingShare({ title, excerpt, url }: ShareProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title: title,
    text: `${excerpt}...\n\nRead more at: `,
    url: url,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      setIsOpen(!isOpen); // Fallback for Desktop
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setIsOpen(false);
    alert("Link copied!");
  };

  return (
    <div className="fixed bottom-24 right-8 z-50 flex flex-col items-end gap-3">
      {/* Fallback Menu for Desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="flex flex-col gap-2 mb-2"
          >
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + url)}`}
              target="_blank"
              className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <Smartphone size={20} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              className="bg-[#1877F2] text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <Facebook size={20} />
            </a>
            <button
              onClick={copyLink}
              className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 p-3 rounded-full shadow-lg hover:scale-110 transition"
            >
              <LinkIcon size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600 text-white shadow-xl shadow-purple-900/20 hover:bg-purple-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Share2 size={24} />}
      </motion.button>
    </div>
  );
}
