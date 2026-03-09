"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Link from 'next/link';
import { ArrowRightIcon, BookOpen } from 'lucide-react';

export default function BlogsList({ blogs }: { blogs: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 120 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut", type: "spring", stiffness: 150 }
    })
  };

  return (
    <>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
      <motion.div 
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <div>
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground flex items-center justify-center md:justify-start gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
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
            className="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto md:mx-0 mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
          <p className="text-muted-foreground text-base sm:text-lg">
            Thoughts, learnings, and technical articles.
          </p>
        </div>
        <motion.div
          whileHover={{ x: 5 }}
        >
          <Link
            href="/blogs"
            className="group flex items-center justify-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800/50"
          >
            View all articles
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -5, scale: 1.02 }}
            className="h-full"
          >
            <Link
              href={`/blogs/${blog.slug}`}
              className="group flex flex-col h-full relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-300 transform -rotate-12 translate-x-4 -translate-y-4">
                 <BookOpen className="w-24 h-24 text-blue-500" />
              </div>
              
              <div className="text-xs font-semibold text-blue-500 dark:text-blue-400 tracking-wider uppercase mb-3 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                {blog.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6 flex-1">
                {blog.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                 <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Read Article</span>
                 <motion.div
                    className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors"
                 >
                    <ArrowRightIcon className="w-4 h-4" />
                 </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
    </>
  );
}
