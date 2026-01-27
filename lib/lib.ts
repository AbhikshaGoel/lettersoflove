const toCamelCase = (str: string) => {
  if (!str || typeof str !== "string") return ""; // Handle null/undefined

  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/[\s\-_]+/g, ""); // Removes spaces, hyphens, and underscores
};

// lib/post-theme.ts

// 1. Define your Color Palettes
export const POST_THEMES = [
  {
    id: "purple",
    name: "Mystic Purple",
    accent: "bg-purple-600",
    textAccent: "text-purple-600 dark:text-purple-400",
    textHover: "hover:text-purple-600 dark:hover:text-purple-400",
    bgLight: "bg-purple-100",
    bgDark: "dark:bg-purple-900/40",
    border: "border-purple-500",
    borderHover: "hover:border-purple-300 dark:hover:border-purple-700",
    selection: "selection:bg-purple-200 selection:text-purple-900",
    gradient: "from-purple-50/50 dark:from-purple-900/10",
    ring: "ring-purple-100 dark:ring-purple-900/30",
    blockquoteBorder: "border-purple-500",
    blockquoteBg: "bg-purple-50/50 dark:bg-purple-900/10",
  },
  {
    id: "amber",
    name: "Golden Amber",
    accent: "bg-amber-600",
    textAccent: "text-amber-600 dark:text-amber-400",
    textHover: "hover:text-amber-600 dark:hover:text-amber-400",
    bgLight: "bg-amber-100",
    bgDark: "dark:bg-amber-900/40",
    border: "border-amber-500",
    borderHover: "hover:border-amber-300 dark:hover:border-amber-700",
    selection: "selection:bg-amber-200 selection:text-amber-900",
    gradient: "from-amber-50/50 dark:from-amber-900/10",
    ring: "ring-amber-100 dark:ring-amber-900/30",
    blockquoteBorder: "border-amber-500",
    blockquoteBg: "bg-amber-50/50 dark:bg-amber-900/10",
  },
  {
    id: "rose",
    name: "Velvet Rose",
    accent: "bg-rose-600",
    textAccent: "text-rose-600 dark:text-rose-400",
    textHover: "hover:text-rose-600 dark:hover:text-rose-400",
    bgLight: "bg-rose-100",
    bgDark: "dark:bg-rose-900/40",
    border: "border-rose-500",
    borderHover: "hover:border-rose-300 dark:hover:border-rose-700",
    selection: "selection:bg-rose-200 selection:text-rose-900",
    gradient: "from-rose-50/50 dark:from-rose-900/10",
    ring: "ring-rose-100 dark:ring-rose-900/30",
    blockquoteBorder: "border-rose-500",
    blockquoteBg: "bg-rose-50/50 dark:bg-rose-900/10",
  },
  {
    id: "teal",
    name: "Ocean Teal",
    accent: "bg-teal-600",
    textAccent: "text-teal-600 dark:text-teal-400",
    textHover: "hover:text-teal-600 dark:hover:text-teal-400",
    bgLight: "bg-teal-100",
    bgDark: "dark:bg-teal-900/40",
    border: "border-teal-500",
    borderHover: "hover:border-teal-300 dark:hover:border-teal-700",
    selection: "selection:bg-teal-200 selection:text-teal-900",
    gradient: "from-teal-50/50 dark:from-teal-900/10",
    ring: "ring-teal-100 dark:ring-teal-900/30",
    blockquoteBorder: "border-teal-500",
    blockquoteBg: "bg-teal-50/50 dark:bg-teal-900/10",
  },
  {
    id: "slate",
    name: "Classic Slate",
    accent: "bg-slate-600",
    textAccent: "text-slate-600 dark:text-slate-400",
    textHover: "hover:text-slate-600 dark:hover:text-slate-400",
    bgLight: "bg-slate-200",
    bgDark: "dark:bg-slate-800",
    border: "border-slate-500",
    borderHover: "hover:border-slate-400 dark:hover:border-slate-600",
    selection: "selection:bg-slate-300 selection:text-slate-900",
    gradient: "from-slate-200/50 dark:from-slate-800/10",
    ring: "ring-slate-200 dark:ring-slate-800",
    blockquoteBorder: "border-slate-500",
    blockquoteBg: "bg-slate-100 dark:bg-slate-800/50",
  },
];

// 2. The Logic: Turn a Slug ("my-post-title") into a fixed number
export function getPostTheme(slug: string) {
  if (!slug) return POST_THEMES[0];

  // Sum the character codes of the slug
  const hash = slug
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Modulo by number of themes to pick one
  const index = hash % POST_THEMES.length;

  return POST_THEMES[index];
}
