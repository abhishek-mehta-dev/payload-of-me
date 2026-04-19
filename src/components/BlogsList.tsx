"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, BookOpen, Clock, CalendarDays } from "lucide-react";

type BlogType = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  created_at: string;
};

function readingTime(excerpt: string) {
  return Math.max(1, Math.ceil(excerpt.split(" ").length / 40)) + " min read";
}

// Assign a gradient accent per card index
const ACCENTS = [
  { from: "from-blue-500", to: "to-cyan-500", glow: "rgba(59,130,246,0.15)", dot: "bg-blue-500" },
  { from: "from-purple-500", to: "to-pink-500", glow: "rgba(168,85,247,0.15)", dot: "bg-purple-500" },
  { from: "from-emerald-500", to: "to-teal-500", glow: "rgba(16,185,129,0.15)", dot: "bg-emerald-500" },
];

export default function BlogsList({ blogs }: { blogs: BlogType[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 120 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: "easeOut", type: "spring", stiffness: 130 },
    }),
  };

  return (
    <section
      id="blogs"
      className="py-20 md:py-32 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900/50 dark:to-blue-900/10 relative overflow-hidden px-6"
    >
      {/* Ambient blobs — same as Projects section */}
      <motion.div
        className="absolute top-20 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2], y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>

        {/* ── Section header — mirrors Projects heading style ── */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500 shrink-0" />
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05, color: "#3B82F6", transition: { duration: 0.3 } }}
            >
              Latest
            </motion.span>{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              Writing
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: "5rem" } : { width: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Thoughts, deep-dives, and technical articles on things I find worth writing about.
          </p>
        </motion.div>

        {/* ── Blog cards grid ── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {blogs.map((blog, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <motion.div
                key={blog.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ y: -6, scale: 1.02 }}
                className="h-full"
                style={{ filter: "drop-shadow(0 0 0 transparent)" }}
              >
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col h-full relative overflow-hidden rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 hover:border-blue-300/50 dark:hover:border-blue-700/50"
                  style={{
                    boxShadow: `0 4px 24px ${accent.glow}`,
                  }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${accent.from} ${accent.to} rounded-t-2xl`} />

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 dark:text-gray-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {readingTime(blog.excerpt)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 flex-1 mb-5">
                      {blog.excerpt}
                    </p>

                    {/* Footer CTA */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Read article
                      </span>
                      <motion.div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.from} ${accent.to} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative large icon watermark */}
                  <div className="absolute bottom-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity pointer-events-none transform translate-x-3 translate-y-3">
                    <BookOpen className="w-28 h-28 text-blue-500" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── View all CTA — centered, matches Projects "More Projects" button style ── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-sm border border-blue-500/40 text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-900/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-blue-500/25 hover:shadow-lg"
            >
              View all articles
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
