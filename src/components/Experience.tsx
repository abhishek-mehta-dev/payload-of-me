"use client"

import { motion, TargetAndTransition, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, GraduationCap, Code, Award, TrendingUp } from "lucide-react"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const experiences = [
    {
      title: "MERN Stack Developer",
      company: "Current Position",
      period: "2024 - Present",
      description:
        "Working as a full-stack developer, building scalable web applications using the MERN stack. Focusing on backend development, API design, and system performance optimization.",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "RESTful APIs"],
      type: "work",
      icon: Briefcase,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "rgba(59, 130, 246, 0.3)",
      status: "current",
    },
    {
      title: "Master's in Computer Applications",
      company: "Chandigarh University",
      period: "2022 - 2024",
      description:
        "Completed advanced studies in computer applications with focus on software development, algorithms, and system design. Gained strong foundation in programming and software engineering principles.",
      technologies: ["Python", "Data Structures", "Algorithms", "Software Engineering", "Database Systems"],
      type: "education",
      icon: GraduationCap,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "rgba(147, 51, 234, 0.3)",
      status: "completed",
    },
  ]

  // Animation variants
  const containerVariants :Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants :Variants= {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      rotateY: -15,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  const timelineVariants :Variants= {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "100%",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  }

  const badgeVariants :Variants= {
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
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      },
    }),
  }

  const titleVariants :Variants= {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  }

  const iconFloat :Variants= {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const pulseAnimation: TargetAndTransition = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }


  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
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
        className="absolute bottom-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"
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

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-4xl mx-auto">
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
                Experience
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#7C3AED",
                  transition: { duration: 0.3 },
                }}
              >
                &
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                Education
              </motion.span>
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
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
              My professional journey and educational background in software development
            </motion.p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-8 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={timelineVariants}
              style={{ height: "calc(100% - 2rem)" }}
            />

            {/* Experience Cards */}
            <motion.div
              className="space-y-12"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-20"
                  variants={cardVariants}
                  custom={index}
                  whileHover={{ x: 10 }}
                >
                  {/* Timeline Node */}
                  <motion.div
                    className={`absolute left-4 top-8 w-8 h-8 bg-gradient-to-r ${exp.gradient} rounded-full shadow-lg border-4 border-white z-10`}
                    whileHover={{
                      scale: 1.3,
                      boxShadow: `0 0 30px ${exp.shadowColor}`,
                    }}
                    animate={pulseAnimation}
                    
                  >
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      variants={iconFloat}
                      animate="animate"
                    >
                      <exp.icon className="h-4 w-4 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      boxShadow: `0 25px 50px ${exp.shadowColor}`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative group">
                      {/* Card glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      {/* Status indicator */}
                      {exp.status === "current" && (
                        <motion.div
                          className="absolute top-4 right-4 flex items-center space-x-2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 + 0.5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={pulseAnimation}
                            
                          />
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Current
                          </span>
                        </motion.div>
                      )}

                      <CardHeader className="relative">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center text-xl mb-2">
                              <motion.div
                                className={`p-2 rounded-lg bg-gradient-to-r ${exp.gradient} mr-3 shadow-md`}
                                whileHover={{
                                  scale: 1.1,
                                  rotate: 360,
                                  transition: { duration: 0.6 },
                                }}
                              >
                                <exp.icon className="h-5 w-5 text-white" />
                              </motion.div>
                              <motion.span
                                className="text-gray-800 font-bold"
                                whileHover={{
                                  color: exp.color === "blue" ? "#3B82F6" : "#7C3AED",
                                  transition: { duration: 0.3 },
                                }}
                              >
                                {exp.title}
                              </motion.span>
                            </CardTitle>
                            <motion.p
                              className="text-lg font-semibold text-gray-700"
                              whileHover={{
                                color: "#374151",
                                scale: 1.02,
                                transition: { duration: 0.3 },
                              }}
                            >
                              {exp.company}
                            </motion.p>
                          </div>
                          <motion.div
                            whileHover={{
                              scale: 1.05,
                              boxShadow: `0 8px 25px ${exp.shadowColor}`,
                            }}
                          >
                            <Badge
                              variant="outline"
                              className={`flex items-center border-2 border-${exp.color}-200 text-${exp.color}-700 bg-${exp.color}-50 hover:bg-${exp.color}-100 transition-all duration-300`}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              {exp.period}
                            </Badge>
                          </motion.div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative">
                        <motion.p
                          className="text-gray-700 mb-6 leading-relaxed text-base"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ delay: index * 0.2 + 0.8 }}
                          whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.3 },
                          }}
                        >
                          {exp.description}
                        </motion.p>

                        <motion.div
                          className="flex flex-wrap gap-3"
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          variants={containerVariants}
                        >
                          {exp.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={techIndex}
                              variants={badgeVariants}
                              custom={techIndex}
                              whileHover={{
                                scale: 1.1,
                                y: -3,
                                boxShadow: `0 8px 25px ${exp.shadowColor}`,
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-sm font-medium px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Achievement indicator */}
                        <motion.div
                          className="mt-6 flex items-center justify-between"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: index * 0.2 + 1.2 }}
                        >
                          <motion.div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              {exp.type === "work" ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <Award className="h-4 w-4 text-purple-500" />
                              )}
                            </motion.div>
                            <span className="text-xs text-gray-500 font-medium">
                              {exp.type === "work" ? "Professional Experience" : "Academic Achievement"}
                            </span>
                          </motion.div>
                          <motion.div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.gradient}`}
                            animate={pulseAnimation}
                            
                          />
                        </motion.div>
                      </CardContent>

                      {/* Decorative corner element */}
                      <motion.div
                        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${exp.gradient} opacity-10 rounded-bl-full`}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.2 + 0.8, duration: 0.6 }}
                      />
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Briefcase className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-lg">Ready for New Challenges</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Code className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
