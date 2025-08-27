"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Server, Brain, Wrench } from "lucide-react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "JavaScript", "TypeScript", "Bash"],
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      title: "Frameworks & Libraries",
      icon: Server,
      skills: [
        "Express.js",
        "Node.js",
        "Django",
        "Django Rest Framework",
        "React.js",
        "Next.js",
      ],
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      shadowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
      title: "Database Management",
      icon: Database,
      skills: ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL"],
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "rgba(147, 51, 234, 0.3)",
    },
    {
      title: "API Development",
      icon: Wrench,
      skills: ["RESTful Services", "Third-party API Integrations"],
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
      shadowColor: "rgba(249, 115, 22, 0.3)",
    },
    {
      title: "Server & Infrastructure",
      icon: Server,
      skills: ["Linux Fundamentals", "Nginx", "Docker Basics"],
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      shadowColor: "rgba(239, 68, 68, 0.3)",
    },
    {
      title: "Emerging Technologies",
      icon: Brain,
      skills: [
        "Machine Learning Basics",
        "DevOps Tools",
        "AI Agents",
        "AWS",
        "Azure",
        "GCP",
      ],
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
      shadowColor: "rgba(99, 102, 241, 0.3)",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateX: -15,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const badgeVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      },
    }),
  };
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconFloat: Variants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
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
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/3 rounded-full blur-3xl"
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
            className="text-center mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#3B82F6",
                  transition: { duration: 0.3 },
                }}
              >
                Technical
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                Expertise
              </motion.span>
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
            <motion.p
              className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              A comprehensive overview of my technical skills and expertise
              across various domains
            </motion.p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  boxShadow: `0 25px 50px ${category.shadowColor}`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative group">
                  {/* Card glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <CardHeader className="relative">
                    <CardTitle className="flex items-center text-lg">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-r ${category.gradient} mr-4 shadow-lg`}
                        variants={iconFloat}
                        animate="animate"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.6 },
                        }}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <motion.span
                        className="text-gray-800 font-semibold"
                        whileHover={{
                          color: category.color
                            .replace("bg-", "#")
                            .replace("-500", ""),
                          transition: { duration: 0.3 },
                        }}
                      >
                        {category.title}
                      </motion.span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative">
                    <motion.div
                      className="flex flex-wrap gap-3"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          variants={badgeVariants}
                          custom={skillIndex}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            boxShadow: `0 8px 25px ${category.shadowColor}`,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-sm font-medium px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Skill count indicator */}
                    <motion.div
                      className="mt-4 flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <motion.span className="text-xs text-gray-500 font-medium">
                        {category.skills.length} Skills
                      </motion.span>
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
                        variants={pulseAnimation}
                        animate="animate"
                      />
                    </motion.div>
                  </CardContent>

                  {/* Decorative corner element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${category.gradient} opacity-10 rounded-bl-full`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Brain className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-lg">
                Always Learning New Technologies
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Code className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
