"use client";

import {
  motion,
  AnimatePresence,
  type TargetAndTransition,
  useInView,
  type Variants,
} from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  Github,
  Star,
  Eye,
  Code2,
  Zap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  User,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function Projects() {
  const ref = useRef(null);
  const [showOops] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (showOops) {
    return <div>OopsPage placeholder</div>;
  }

  const projects = [
    {
      title: "Automated Landing Page System with Low-Code Workflow Integration",
      description:
        "Built a Node.js server integrated with Bubble.io workflows to capture automation data and render dynamic Webflow landing pages. Delivered a seamless API-driven system to generate and update lead-specific pages automatically.",
      image: "/assets/images/neuropage.png?height=200&width=300",
      technologies: [
        "Node.js",
        "Express.js",
        "Bubble.io",
        "Webflow",
        "REST API",
        "PM2",
      ],
      liveUrl:
        "https://go.neuropage.io?Full_name=Abhishek%20Mehta&company=Neuropage",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Automation & Full-Stack",
      gradient: "from-green-500 to-teal-500",
      shadowColor: "rgba(16, 185, 129, 0.3)",
      roles: ["Full-Stack Developer", "Automation Engineer"],
      responsibilities: [
        "Developed a Node.js webhook server to capture and process automation data via Bubble.io API connector",
        "Integrated Node.js APIs into Bubble.io backend workflows to receive automation-triggered lead data",
        "Created APIs to serve processed lead data to Webflow for dynamic page rendering",
        "Implemented Webflow dynamic components and symbols to build scalable landing pages",
        "Developed an API to send generated landing page URLs back to Bubble.io for record keeping",
        "Automated workflows between Node.js, Bubble.io, and Webflow for seamless data-driven page creation",
        "Ensured modular, reusable architecture for combining multiple dynamic sections into unified landing pages",
        "Managed Node.js server deployments and uptime monitoring using PM2",
        "Applied structured API logging to track requests, monitor usage, and debug efficiently",
        "Optimized API communication, error handling, and data consistency across platforms",
      ],
    },
    {
      title: "DAHN – Hospice Nurse Documentation Support App",
      description:
        "Full-stack Hospice Nurse Documentation application built with MERN stack featuring user authentication, payment integration, and admin dashboard.",
      image: "/assets/images/dahnai.png?height=200&width=300",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Stripe API",
      ],
      liveUrl: "https://www.dahn.ai",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Full-Stack",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "rgba(59, 130, 246, 0.3)",
      roles: ["Full-Stack Developer", "DevOps Engineer"],
      responsibilities: [
        "Built a role-based healthcare web application with Next.js, Node.js, Express.js, and MongoDB",
        "Implemented patient notes system with create, draft, update, and soft-delete features",
        "Integrated Stripe for subscription billing and automated renewals via cron jobs",
        "Developed role-based access control (RBAC) for Admins, Agencies, and Nurses",
        "Added video upload functionality and automated invoice generation",
        "Optimized frontend with TanStack React Query and improved UX with SweetAlert",
        "Managed server deployments, monitoring, and scaling on AWS EC2 using PM2",
        "Oversaw development and operational workflows, including version control with Git and GitHub",
      ],
    },
    {
      title: "DocuAI Pro",
      description:
        "An AI-powered document chatbot with Retrieval-Augmented Generation (RAG). Features include OAuth authentication, PayPal subscription management, and a ChatGPT-like UI.",
      image: "/assets/images/docuaipro.jpeg",
      technologies: [
        "FastAPI",
        "Next.js",
        "PostgreSQL",
        "PayPal",
        "PyMuPDF",
        "FAISS",
        "LangChain",
        "Hugging Face",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/abhishek-mehta-dev/DocuAI-Pro",
      featured: true,
      status: "Development",
      category: "Fullstack",
      gradient: "from-purple-500 to-indigo-500",
      shadowColor: "rgba(139, 92, 246, 0.3)",
      roles: ["AI Engineer", "Backend Developer", "Frontend Developer"],
      responsibilities: [
        "Architected RAG system using LangChain and FAISS for document processing",
        "Built FastAPI backend with efficient document parsing using PyMuPDF",
        "Integrated Hugging Face models for natural language understanding",
        "Developed Next.js frontend with ChatGPT-like conversational interface",
        "Implemented OAuth authentication and PayPal subscription system",
        "Optimized vector search and retrieval for large document collections",
        "Created PostgreSQL database schema for user and document management",
        "Designed responsive UI/UX for seamless document interaction",
      ],
    },
    {
      title: "Stripe Connect Integration",
      description:
        "Full-featured Stripe Connect application built with Next.js, enabling seamless onboarding, account management, and secure payment flows for multi-vendor platforms.",
      image: "/assets/images/stripe_connect.png",
      technologies: [
        "Next.js",
        "React",
        "Stripe Connect",
        "Node.js",
        "MongoDB",
      ],
      liveUrl: "/coming-soon",
      githubUrl: "https://github.com/abhishek-mehta-dev/stripe_connect",
      featured: true,
      status: "Completed",
      category: "Full-Stack",
      gradient: "from-blue-500 to-indigo-500",
      shadowColor: "rgba(59, 130, 246, 0.3)",
      roles: [
        "Payment Integration Specialist",
        "Full-Stack Developer",
        "API Developer",
      ],
      responsibilities: [
        "Implemented complete Stripe Connect integration for multi-vendor payments",
        "Built secure onboarding flow for vendor account creation and verification",
        "Developed dashboard for payment management and analytics",
        "Designed responsive frontend using Next.js and React",
        "Integrated MongoDB for storing vendor and transaction data",
      ],
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  // Animation variants
  const titleVariants: Variants = {
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
  };

  const pageVariants: Variants = {
    enter: {
      rotateY: 90,
      opacity: 0,
      scale: 0.8,
      x: 300,
    },
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      scale: 0.8,
      x: -300,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants: Variants = {
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
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      },
    }),
  };

  const floatingAnimation: TargetAndTransition = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-700 border-green-200";
      case "Development":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const currentProjectData = projects[currentProject];

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
        <div className="max-w-7xl mx-auto">
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
              A showcase of my recent work and technical projects demonstrating
              Full-stack development skills
            </motion.p>
          </motion.div>

          {/* Book Container */}
          <div className="relative perspective-1000 max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <motion.button
              onClick={prevProject}
              disabled={currentProject === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 1 }}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={nextProject}
              disabled={currentProject === projects.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 1 }}
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>

            {/* Book Page Container */}
            <div className="relative h-[600px] preserve-3d">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 preserve-3d"
                  style={{ perspective: "1000px" }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-xl relative group animate-book-float">
                    {/* Featured badge */}
                    {currentProjectData.featured && (
                      <motion.div
                        className="absolute top-6 left-6 z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                          animate={floatingAnimation}
                        >
                          <Star className="h-4 w-4" />
                          <span>Featured</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Status badge */}
                    <motion.div
                      className="absolute top-6 right-6 z-20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Badge
                        className={`${getStatusColor(
                          currentProjectData.status
                        )} border font-medium px-3 py-1`}
                      >
                        {currentProjectData.status}
                      </Badge>
                    </motion.div>

                    {/* Main Content - Side by Side Layout */}
                    <div className="grid md:grid-cols-2 h-full">
                      {/* Left Side - Project Image */}
                      <div className="relative overflow-hidden">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${currentProjectData.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                        />
                        <motion.div
                          variants={imageVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative h-full w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={currentProjectData.image || "/placeholder.svg"}
                            alt={currentProjectData.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-contain transition-transform duration-500"
                          />
                        </motion.div>

                        {/* Category overlay */}
                        <motion.div
                          className="absolute bottom-6 left-6 z-20"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <Badge className="bg-white/95 text-gray-700 border-0 backdrop-blur-sm px-3 py-1">
                            <Code2 className="h-3 w-3 mr-2" />
                            {currentProjectData.category}
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
                            <Eye className="h-6 w-6" />
                            <span className="font-medium text-lg">
                              View Project
                            </span>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Right Side - Project Details */}
                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl md:text-3xl">
                              <motion.span
                                className="text-gray-800 font-bold leading-tight"
                                whileHover={{
                                  color: "#3B82F6",
                                  transition: { duration: 0.3 },
                                }}
                              >
                                {currentProjectData.title}
                              </motion.span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-0">
                            <motion.p
                              className="text-gray-700 mb-6 leading-relaxed text-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {currentProjectData.description}
                            </motion.p>

                            {/* Technologies */}
                            <motion.div
                              className="flex flex-wrap gap-3 mb-8"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              {currentProjectData.technologies.map(
                                (tech, techIndex) => (
                                  <motion.div
                                    key={techIndex}
                                    variants={badgeVariants}
                                    custom={techIndex}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{
                                      scale: 1.1,
                                      y: -2,
                                      boxShadow: `0 8px 25px ${currentProjectData.shadowColor}`,
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="text-sm font-medium px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                                    >
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                )
                              )}
                            </motion.div>
                          </CardContent>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                          className="flex gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <motion.div
                            className="flex-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              size="lg"
                              className={`w-full bg-gradient-to-r ${currentProjectData.gradient} hover:shadow-lg transition-all duration-300 border-0 text-lg py-3`}
                              asChild
                            >
                              <a
                                href={currentProjectData.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                >
                                  <ExternalLink className="h-5 w-5 mr-2" />
                                </motion.div>
                                Live Demo
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div
                            className="flex-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {currentProjectData.githubUrl === "#" ? (
                              <Button
                                size="lg"
                                variant="outline"
                                className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-lg py-3"
                                asChild
                              >
                                <a
                                  href="/oops"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Code2 className="h-5 w-5 mr-2" />
                                  Code
                                </a>
                              </Button>
                            ) : (
                              <Button
                                size="lg"
                                variant="outline"
                                className="w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-lg py-3"
                                asChild
                              >
                                <a
                                  href={currentProjectData.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 20,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "linear",
                                    }}
                                  >
                                    <Github className="h-5 w-5 mr-2" />
                                  </motion.div>
                                  Code
                                </a>
                              </Button>
                            )}
                          </motion.div>
                        </motion.div>

                        {/* Roles & Responsibilities Button */}
                        <motion.div
                          className="mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Dialog>
                            <DialogTrigger asChild>
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="outline"
                                  size="lg"
                                  className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 text-lg py-3"
                                >
                                  <User className="h-5 w-5 mr-2" />
                                  View Roles & Responsibilities
                                </Button>
                              </motion.div>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                                  {currentProjectData.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 text-lg">
                                  Roles and responsibilities in this project
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 mt-6">
                                {/* Roles Section */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <User className="h-5 w-5 mr-2 text-blue-500" />
                                    My Roles
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {currentProjectData.roles?.map(
                                      (role, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: index * 0.1 }}
                                        >
                                          <Badge
                                            className={`text-sm font-medium px-4 py-2 bg-gradient-to-r ${currentProjectData.gradient} text-white border-0`}
                                          >
                                            {role}
                                          </Badge>
                                        </motion.div>
                                      )
                                    )}
                                  </div>
                                </div>

                                {/* Responsibilities Section */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                                    Key Responsibilities
                                  </h3>
                                  <div className="space-y-3">
                                    {currentProjectData.responsibilities?.map(
                                      (responsibility, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.05 }}
                                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                        >
                                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-gray-700 leading-relaxed">
                                            {responsibility}
                                          </span>
                                        </motion.div>
                                      )
                                    )}
                                  </div>
                                </div>

                                {/* Technologies Used */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Code2 className="h-5 w-5 mr-2 text-purple-500" />
                                    Technologies Used
                                  </h3>
                                  <div className="flex flex-wrap gap-2">
                                    {currentProjectData.technologies.map(
                                      (tech, index) => (
                                        <motion.div
                                          key={index}
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: index * 0.05 }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            className="text-sm font-medium px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                          >
                                            {tech}
                                          </Badge>
                                        </motion.div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </motion.div>

                        {/* Project stats */}
                        <motion.div
                          className="mt-6 flex items-center justify-between text-sm text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          <span className="flex items-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>
                              {currentProjectData.technologies.length}{" "}
                              Technologies
                            </span>
                          </span>
                          <motion.div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentProjectData.gradient}`}
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
                      </div>
                    </div>

                    {/* Decorative corner element */}
                    <motion.div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${currentProjectData.gradient} opacity-10 rounded-bl-full`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Page Indicators */}
            <motion.div
              className="flex justify-center items-center space-x-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 font-medium">
                  Page {currentProject + 1} of {projects.length}
                </span>
              </motion.div>
              <div className="flex space-x-2 ml-4">
                {projects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentProject
                        ? "bg-blue-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: index === currentProject ? 1.25 : 1 }}
                    transition={{ delay: index * 0.1 + 1.3 }}
                  />
                ))}
              </div>
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
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Code2 className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-lg">
                More Projects Coming Soon
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Github className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
