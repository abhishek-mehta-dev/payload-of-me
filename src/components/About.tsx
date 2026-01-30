"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code, Target } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotate: -2,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const slideInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
      rotate: 2,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 150,
      },
    }),
  };

  const textReveal: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const iconFloat: Variants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {" "}
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#3B82F6",
                  transition: { duration: 0.3 },
                }}
              >
                About
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                Me
              </motion.span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
              variants={fadeInUp}
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Left Content */}
            <motion.div variants={slideInLeft}>
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
                variants={textReveal}
                custom={0}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{
                    scale: 1.02,
                    color: "#059669",
                    transition: { duration: 0.3 },
                  }}
                >
                  Dedicated Full-Stack Developer
                </motion.span>
              </motion.h3>

              <motion.div className="space-y-6">
                <motion.p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  variants={textReveal}
                  custom={1}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                >
                  As a dedicated software developer with a strong foundation in
                  backend and Full-stack development, I bring expertise in
                  building scalable and efficient web applications. I completed
                  my Master&apos;s in Computer Applications in 2024 from
                  Chandigarh University.
                </motion.p>

                <motion.p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  variants={textReveal}
                  custom={2}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                >
                  Since graduation, I have been working as a MERN Stack
                  Developer, sharpening my skills in dynamic and challenging
                  environments. With a strong focus on backend development, I am
                  passionate about leveraging my skills to create innovative
                  solutions and enhance system performance.
                </motion.p>

                <motion.p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                  variants={textReveal}
                  custom={3}
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.3 },
                  }}
                >
                  I am continuously expanding my knowledge in AI development,
                  DevOps practices, and cloud technologies to stay at the
                  forefront of modern software development
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Right Content - Cards */}
            <motion.div className="space-y-6" variants={slideInRight}>
              {/* Education Card */}
              <motion.div
                variants={cardVariants}
                custom={0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
                  borderColor: "#3B82F6",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-l-4 border-l-blue-500 hover:border-l-blue-600 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl dark:border-t-0 dark:border-r-0 dark:border-b-0">
                  <CardContent className="p-6">
                    <motion.div className="flex items-center mb-3">
                      <motion.div variants={iconFloat} animate="animate">
                        <GraduationCap className="h-6 w-6 text-blue-500 mr-3" />
                      </motion.div>
                      <motion.h4
                        className="font-semibold text-gray-900 dark:text-gray-100"
                        whileHover={{ color: "#3B82F6" }}
                      >
                        Education
                      </motion.h4>
                    </motion.div>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Master&apos;s in Computer Applications
                    </motion.p>
                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Chandigarh University, 2024
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Current Role Card */}
              <motion.div
                variants={cardVariants}
                custom={1}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)",
                  borderColor: "#22C55E",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-l-4 border-l-green-500 hover:border-l-green-600 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl dark:border-t-0 dark:border-r-0 dark:border-b-0">
                  <CardContent className="p-6">
                    <motion.div className="flex items-center mb-3">
                      <motion.div
                        variants={iconFloat}
                        animate="animate"
                        transition={{ delay: 0.5 }}
                      >
                        <Code className="h-6 w-6 text-green-500 mr-3" />
                      </motion.div>
                      <motion.h4
                        className="font-semibold text-gray-900 dark:text-gray-100"
                        whileHover={{ color: "#22C55E" }}
                      >
                        Current Role
                      </motion.h4>
                    </motion.div>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      MERN Stack Developer
                    </motion.p>
                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Full-Stack Development
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Focus Areas Card */}
              <motion.div
                variants={cardVariants}
                custom={2}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.15)",
                  borderColor: "#9333EA",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="border-l-4 border-l-purple-500 hover:border-l-purple-600 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl dark:border-t-0 dark:border-r-0 dark:border-b-0">
                  <CardContent className="p-6">
                    <motion.div className="flex items-center mb-3">
                      <motion.div
                        variants={iconFloat}
                        animate="animate"
                        transition={{ delay: 1 }}
                      >
                        <Target className="h-6 w-6 text-purple-500 mr-3" />
                      </motion.div>
                      <motion.h4
                        className="font-semibold text-gray-900 dark:text-gray-100"
                        whileHover={{ color: "#9333EA" }}
                      >
                        Focus Areas
                      </motion.h4>
                    </motion.div>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      Backend Development & System Performance
                    </motion.p>
                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      DevOps & Cloud Technologies
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Additional animated elements */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Code className="h-5 w-5 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Always Learning, Always Growing
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
