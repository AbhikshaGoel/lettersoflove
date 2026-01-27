import { Feather } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border dark:bg-slate-900 bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Feather className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold tracking-wide text-foreground">
              Ink & Reverie
            </span>
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-lg italic text-muted-foreground max-w-md mb-6">
            "We write to taste life twice, in the moment and in retrospect."
          </blockquote>
          <p className="text-sm text-muted-foreground mb-12 font-medium">
            — Anaïs Nin
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-2 mb-12">
            <Link
              href="/poetry"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Poetry
            </Link>
            <Link
              href="/stories"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Stories
            </Link>
            <Link
              href="/essays"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Essays
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground ">
            © {new Date().getFullYear()} Letters of Soul Ink & Reverie. All
            words remain with their author.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
