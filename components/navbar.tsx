"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, PenLine, Menu, X, Sun, Moon, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "bg-sky/80 dark:bg-sky/80 backdrop-blur-md dark:border-slate-600 py-2 shadow-sm"
            : "bg-transparent border-transparent py-2",
        )}
      >
        <div className="px-6 flex items-center justify-between gap-4">
          {/* --- LOGO --- */}
          <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white shrink-0 font-serif z-50">
            /echoes
          </div>

          {/* --- DESKTOP SEARCH --- */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-4">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search poems, stories..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-200 dark:bg-slate-900/50 border border-transparent hover:bg-gray-300 dark:hover:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-gray-300 dark:focus:ring-slate-700 outline-none transition-all text-sm placeholder:text-gray-400 dark:text-gray-100"
            />
          </div>

          {/* --- ACTIONS (Right Side) --- */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
              <PenLine size={16} />
              <span>Write</span>
            </Button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-gray-200 to-gray-100 p-1 cursor-pointer hover:ring-2 ring-offset-2 ring-gray-200 dark:ring-offset-slate-950 dark:ring-slate-700 transition-all">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                alt="User"
                className="w-full h-full rounded-full bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          {/* --- MOBILE TOGGLES --- */}
          <div className="flex md:hidden items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 dark:text-gray-300"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 z-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white dark:bg-[#020617] border-t border-gray-100 dark:border-slate-800 md:hidden flex flex-col p-6 overflow-y-auto"
          >
            <div className="relative mb-8">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-900 border-none outline-none dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-6 text-lg font-medium text-gray-800 dark:text-gray-200">
              <a
                href="#"
                className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg"
              >
                <PenLine size={20} /> Write a Story
              </a>
              <a
                href="#"
                className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg"
              >
                <Bell size={20} /> Notifications
              </a>
              <a
                href="#"
                className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg"
              >
                <User size={20} /> Profile
              </a>
            </div>

            <div className="mt-auto pt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
                  alt="User"
                />
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">
                  Felix The Poet
                </p>
                <p className="text-xs text-gray-500">@felix_writes</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
