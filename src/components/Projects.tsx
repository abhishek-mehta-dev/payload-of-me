"use client"

import { motion, TargetAndTransition, useInView, Variants } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Eye, Code2, Zap } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  

  const projects = [
    {
      title: "DAHN – Hospice Nurse Documentation Support App",
      description:
        "Full-stack Hospice Nurse Documentation application built with MERN stack featuring user authentication, payment integration, and admin dashboard.",
      image: "/assets/images/dahnai.png",
      technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      liveUrl: "https://www.dahn.ai",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Full-Stack",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      title: "Task Management API",
      description:
        "RESTful API for task management with user authentication, CRUD operations, and real-time notifications using Django REST Framework.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["Django", "Django REST Framework", "PostgreSQL", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      status: "Development",
      category: "Backend",
      gradient: "from-green-500 to-emerald-500",
      shadowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
      title: "Real-time Chat Application",
      description:
        "Real-time messaging application with Socket.io, featuring group chats, file sharing, and message encryption.",
      image: "/placeholder.svg?height=200&width=300",
      technologies: ["React.js", "Node.js", "Socket.io", "MongoDB", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      status: "Completed",
      category: "Full-Stack",
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "rgba(147, 51, 234, 0.3)",
    },
  ]

  // Animation variants
  const containerVariants :Variants= {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants :Variants= {
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
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  const imageVariants :Variants= {
    hidden: {
      scale: 1.2,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
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

  const buttonVariants :Variants= {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const floatingAnimation :TargetAndTransition= {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200"
      case "Development":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 30, 0],
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
                Featured
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                Projects
              </motion.span>
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
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
              A showcase of my recent work and technical projects demonstrating full-stack development skills
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  boxShadow: `0 25px 50px ${project.shadowColor}`,
                }}
                whileTap={{ scale: 0.98 }}
                className={project.featured ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg relative group">
                  {/* Featured badge */}
                  {project.featured && (
                    <motion.div
                      className="absolute top-4 left-4 z-20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.5 }}
                    >
                      <motion.div
                        className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        animate={floatingAnimation}
                      >
                        <Star className="h-3 w-3" />
                        <span>Featured</span>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Status badge */}
                  <motion.div
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.7 }}
                  >
                    <Badge className={`${getStatusColor(project.status)} border font-medium`}>{project.status}</Badge>
                  </motion.div>

                  {/* Project Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                    />
                    <motion.div
                      variants={imageVariants}
                      className="relative h-full w-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                    </motion.div>

                    {/* Overlay with category */}
                    <motion.div
                      className="absolute bottom-4 left-4 z-20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.9 }}
                    >
                      <Badge className="bg-white/90 text-gray-700 border-0 backdrop-blur-sm">
                        <Code2 className="h-3 w-3 mr-1" />
                        {project.category}
                      </Badge>
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="flex items-center space-x-2 text-white"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye className="h-5 w-5" />
                        <span className="font-medium">View Project</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  <CardHeader className="relative">
                    <CardTitle className="text-xl">
                      <motion.span
                        className="text-gray-800 font-bold"
                        whileHover={{
                          color: "#3B82F6",
                          transition: { duration: 0.3 },
                        }}
                      >
                        {project.title}
                      </motion.span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative">
                    <motion.p
                      className="text-gray-700 mb-4 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.15 + 1.1 }}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.3 },
                      }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div
                      className="flex flex-wrap gap-2 mb-6"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          variants={badgeVariants}
                          custom={techIndex}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            boxShadow: `0 8px 25px ${project.shadowColor}`,
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-3"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      <motion.div
                        className="flex-1"
                        variants={buttonVariants}
                        custom={0}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className={`w-full bg-gradient-to-r ${project.gradient} hover:shadow-lg transition-all duration-300 border-0`}
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                            </motion.div>
                            Live Demo
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex-1"
                        variants={buttonVariants}
                        custom={1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Github className="h-4 w-4 mr-2" />
                            </motion.div>
                            Code
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Project stats */}
                    <motion.div
                      className="mt-4 flex items-center justify-between text-xs text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.15 + 1.5 }}
                    >
                      <span className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>{project.technologies.length} Technologies</span>
                      </span>
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </CardContent>

                  {/* Decorative corner element */}
                  <motion.div
                    className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${project.gradient} opacity-10 rounded-bl-full`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.15 + 1.2, duration: 0.6 }}
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
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm"
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
                <Code2 className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-lg">More Projects Coming Soon</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Github className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
