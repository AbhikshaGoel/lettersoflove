import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import type { Metadata } from "next";

// --- Imports ---
import { GET_POST_BY_SLUG, GET_ALL_SLUGS } from "@/lib/custom-query";
import Footer from "@/components/footer";
import { fetchGraphQL } from "@/lib/querymaker";
import { FloatingShare, ScrollToTop } from "@/components/post-interactions";

// --- Utilities ---
function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "");
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanText = stripHtml(content);
  const wordCount = cleanText.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

type Props = {
  params: Promise<{ slug: string }>;
};

// --- Static Params ---
export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_ALL_SLUGS);
  return data?.posts?.nodes.map((post: any) => ({ slug: post.slug })) || [];
}

// --- Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // Await the promise

  // Always decode for database queries (WordPress needs the Hindi characters)
  const decodedSlug = decodeURIComponent(slug);

  const data = await fetchGraphQL(GET_POST_BY_SLUG, { slug: decodedSlug });
  const post = data?.post;

  if (!post) return { title: "Post Not Found" };

  const cleanTitle = decodeHtmlEntities(post.title);
  const cleanExcerpt = decodeHtmlEntities(stripHtml(post.excerpt || "")).slice(
    0,
    160,
  );

  return {
    title: `${cleanTitle} | Letters of Soul`,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      images: [post.featuredImage?.node?.sourceUrl || ""],
      type: "article",
    },
  };
}

// --- Page Component ---
export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  // 1. Decode Hindi/Special Slugs for the Query
  const decodedSlug = decodeURIComponent(slug);
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { slug: decodedSlug });
  const post = data?.post;

  if (!post) notFound();

  // 2. Data Preparation
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = calculateReadTime(post.content);
  const plainTextExcerpt = decodeHtmlEntities(
    stripHtml(post.excerpt || ""),
  ).slice(0, 150);
  const cleanTitle = decodeHtmlEntities(post.title);

  // 3. Construct URL Correctly (Using the raw slug from params ensures the link works)
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://lettersofsoul.com";
  const postUrl = `${siteUrl}/${slug}`;

  return (
    <div className="min-h-screen bg-[#FFFBF7] dark:bg-[#020617] transition-colors duration-500 font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* Scroll & Share */}
      <ScrollToTop />
      <FloatingShare
        title={cleanTitle}
        excerpt={plainTextExcerpt}
        url={postUrl}
      />

      {/* --- Top Gradient Accent --- */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/10 dark:to-transparent pointer-events-none" />

      {/* --- Navbar --- */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-6">
        <Link
          href="/"
          className="
            group inline-flex items-center gap-2 px-5 py-2.5 rounded-full 
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
            border border-gray-200 dark:border-slate-800
            text-sm font-medium text-slate-600 dark:text-slate-300
            hover:border-purple-300 dark:hover:border-purple-700
            hover:shadow-md hover:-translate-y-0.5
            transition-all duration-300
          "
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Garden</span>
        </Link>
      </nav>

      <article className="relative pb-24">
        {/* --- HEADER SECTION --- */}
        <div className="max-w-4xl mx-auto px-6 pt-8 mb-16">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
            {post.categories?.nodes.map((cat: any) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}>
                <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                  {decodeHtmlEntities(cat.name)}
                </span>
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white leading-[1.1] mb-10 text-left animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {/* Author Block (Styled as a Card/Pill) */}
          <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
            <div className="flex items-center gap-3 pr-6">
              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-purple-100 dark:ring-purple-900/30">
                <Image
                  src={
                    post.author?.node?.avatar?.url ||
                    `https://ui-avatars.com/api/?name=${post.author?.node?.name}&background=random`
                  }
                  alt={post.author?.node?.name || "Author"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {post.author?.node?.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Author
                </span>
              </div>
            </div>

            {/* Divider (Hidden on mobile) */}
            <div className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-700" />

            {/* Meta Stats */}
            <div className="flex items-center gap-6 text-xs font-medium text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-purple-500" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-purple-500" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- FEATURED IMAGE (Wide & Cinematic) --- */}
        {post.featuredImage && (
          <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mb-20 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/10 ring-1 ring-black/5 dark:ring-white/10">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={decodeHtmlEntities(
                  post.featuredImage.node.altText || post.title,
                )}
                fill
                className="object-cover transition-transform duration-[30s] hover:scale-105"
                priority
                unoptimized={true}
              />
            </div>
          </div>
        )}

        {/* --- MAIN CONTENT BODY --- */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="
              prose prose-lg md:prose-xl dark:prose-invert mx-auto
              
              /* 1. TYPOGRAPHY */
              prose-p:font-sans prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-purple-500
              
              /* 2. AUDIO PLAYERS */
              prose-audio:w-full prose-audio:rounded-full prose-audio:border prose-audio:border-gray-200 dark:prose-audio:border-gray-700 prose-audio:shadow-sm
              
              /* 3. QUOTES */
              prose-blockquote:border-l-[4px] prose-blockquote:border-purple-500 
              prose-blockquote:bg-purple-50/50 dark:prose-blockquote:bg-purple-900/10
              prose-blockquote:py-4 prose-blockquote:pl-6 prose-blockquote:pr-4 
              prose-blockquote:rounded-r-lg 
              prose-blockquote:italic prose-blockquote:font-serif
              prose-blockquote:text-gray-800 dark:prose-blockquote:text-gray-200
              
              /* 4. IMAGES */
              prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:object-cover
              
              /* 5. VIDEOS */
              prose-video:w-full prose-video:rounded-xl prose-video:shadow-md
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* End Ornament */}
          <div className="flex justify-center mt-20 mb-10 text-purple-300 dark:text-purple-800 opacity-60">
            <span className="text-4xl font-serif">~ ❦ ~</span>
          </div>

          {/* Footer Tags */}
          <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                <Tag size={16} /> Filed under:
              </span>
              {post.categories?.nodes.map((cat: any) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 transition-colors"
                >
                  {decodeHtmlEntities(cat.name)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
