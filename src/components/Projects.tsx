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
      title: "DAHN – Hospice Nurse Documentation Support App",
      description:
        "Full-stack Hospice Nurse Documentation application built with MERN stack featuring user authentication, payment integration, and admin dashboard.",
      image: "/assets/images/dahn.png?height=200&width=300",
      technologies: [
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Stripe API",
      ],
      liveUrl: "https://www.getdahn.com",
      githubUrl: "#",
      featured: true,
      status: "Live",
      category: "Full-Stack",
      gradient: "from-blue-500 to-cyan-500",
      shadowColor: "rgba(59, 130, 246, 0.3)",
      roles: ["Full-Stack Developer", "DevOps Engineer"],
      responsibilities: [
  "Built a secure role-based healthcare SaaS platform using Next.js, Node.js, Express.js, and MongoDB",
  "Implemented HIPAA-compliant architecture with encrypted storage for Protected Health Information (PHI) and patient notes",
  "Applied administrative, technical, and physical safeguards to strengthen patient data privacy and breach prevention",
  "Developed clinical notes module with create, auto-draft, update, audit logging, and soft-delete capabilities",
  "Implemented role-based access control (RBAC) for Admins, Agencies, and Nurses with permission-based workflows",
  "Integrated Stripe subscription billing with plan management, coupon codes, automated renewals, and invoice generation",
  "Built multi-factor authentication (email MFA), secure session handling, and multi-device login tracking",
  "Added secure media/file upload workflows for clinical documentation and supporting records",
  "Optimized frontend performance and data synchronization using TanStack React Query with enhanced UX flows",
  "Managed deployment, monitoring, scaling, and background job processes on AWS EC2 using PM2",
  "Maintained CI/CD workflows, source control, and collaboration pipelines using Git and GitHub",
]
    },
   {
  title: "Signature K9 – Dog Training LMS & Subscription Platform",
  description:
    "End-to-end subscription training platform for The 30-Day Reset program—Next.js learner portal, NestJS API, protected video delivery, community, certification, and dual-gateway billing—live at portal.signaturek9trainingacademy.com.",
  image: "/assets/images/signaturek9.png?height=200&width=300",
  technologies: [
    "TypeScript",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TanStack React Query",
    "React Hook Form",
    "Zod",
    "Node.js",
    "NestJS",
    "Prisma ORM",
    "PostgreSQL",
    "Stripe API",
    "PayPal API",
    "hls.js",
    "AWS S3",
    "AWS CloudFront",
    "Nginx",
    "JWT Authentication",
    "Swagger/OpenAPI",
    "Puppeteer",
  ],
  liveUrl: "https://portal.signaturek9trainingacademy.com",
  githubUrl: "#",
  featured: true,
  status: "Live",
  category: "Full-Stack",
  gradient: "from-orange-500 to-amber-500",
  shadowColor: "rgba(249, 115, 22, 0.3)",
  roles: ["Full-Stack Developer", "Platform Engineer"],
  responsibilities: [
    "Built the platform end-to-end: Next.js App Router frontend, modular NestJS API, and PostgreSQL data layer for a subscription-based dog training LMS.",
    "Developed the student learning experience—curriculum navigation, HLS/MP4 lesson playback with resume-at progress tracking, quiz gating, and certification quiz flows.",
    "Built checkout and subscription management UI with Stripe Elements and PayPal embedded checkout, 3DS recovery, plan changes, and vaulted payment method updates.",
    "Delivered the learner dashboard with course progress metrics, community activity, upgrade paths, and training-guide downloads tied to plan entitlements.",
    "Built community and discussion interfaces with category filters, threaded posts and comments, media attachments, and admin moderation workflows.",
    "Created admin consoles for course/module/lesson management, user directory, billing, transactions, FAQ, community content, and certification quiz administration.",
    "Implemented secure client-side media playback with CloudFront signed-cookie bootstrap, HLS.js adaptive streaming, and MP4 fallback for lesson videos.",
    "Architected NestJS domain modules for authentication, LMS, subscriptions, payments, community, certificates, invoices, and admin operations.",
    "Implemented JWT access/refresh cookie auth, role-based route guards, password recovery, and plan-based access control across training, portal, and one-time products.",
    "Built LMS and certification APIs with progress tracking, quiz grading, certificate PDF generation, and automated milestone email notifications.",
    "Integrated Stripe and PayPal with checkout verification, payment method vaulting, recurring billing jobs, invoice PDFs, and payment reconciliation utilities.",
    "Implemented cloud media pipelines with AWS S3 uploads, CloudFront-secured delivery, FFmpeg HLS transcoding, and migration/backfill scripts for production media.",
    "Deployed and configured production at portal.signaturek9trainingacademy.com with nginx reverse proxy, secure cross-domain cookies, CORS, and CDN media on a dedicated domain.",
    "Maintained production reliability through curriculum seeding, media normalization scripts, typed DTOs/entities, utility test coverage, and OpenAPI-documented APIs.",
  ],
},
    {
  title: "Taxificient – Enterprise Mobility & Intelligent Fleet Dispatch SaaS",
  description:
    "Full-scale SaaS platform for ride booking, dispatch automation, and fleet management built for taxi operators and mobility companies. Features multi-role access, live ride orchestration, driver tracking, real-time communication, subscription billing, and operational intelligence across the complete transportation lifecycle.",
  image: "/assets/images/taxificientimg.png?height=200&width=500",
  technologies: [
    "Next.js",
    "React.js",
    "Nest.js",
    "TypeORM",
    "PostgreSQL",
    "Redis",
    "Socket.io",
    "Firebase Admin",
    "Google Maps API"
  ],
  liveUrl: "https://backend.taxificient.ai/",
  githubUrl: "#",
  featured: true,
  status: "In Progress",
  category: "SaaS & Fleet Management",
  gradient: "from-emerald-600 to-teal-600",
  shadowColor: "rgba(16, 185, 129, 0.3)",
  roles: ["Full-Stack Architect", "DevOps Engineer"],
  responsibilities: [
    "Architected a scalable ride-booking and fleet management platform using Next.js, NestJS, PostgreSQL, and Redis",
    "Designed dynamic RBAC system with role-based dashboards, protected routes, and tailored UI flows for Super Admins, Company Admins, Dispatchers, Drivers, and Passengers",
    "Implemented secure user impersonation for higher-level administrators to manage and support subordinate accounts",
    "Built passenger ride booking workflows with pickup/drop-off, multiple stops, fare estimation, and live ride status tracking",
    "Developed dispatcher allocation system with real-time driver availability, bulk ride assignment, and acceptance/rejection workflows",
    "Engineered live driver GPS tracking with continuous location updates for passengers and dispatch teams",
    "Built vehicle and fleet management modules covering registration, maintenance scheduling, lifecycle records, and driver assignments",
    "Integrated Google Maps APIs for geolocation, route visualization, place search, and distance-based fare calculations using Haversine logic",
    "Developed WebSocket-based real-time chat with ride-restricted sessions, typing indicators, and read receipts",
    "Integrated Firebase Cloud Messaging for instant notifications across assignments, ride updates, cancellations, and status changes",
    "Implemented subscription billing system with recurring plan cycles, upgrades, renewals, and access control based on active plans",
    "Built ride lifecycle workflows with strict status transitions, filtering, pagination, reporting, soft deletes, and automated scheduler jobs",
    "Optimized platform performance using Redis caching, pub/sub, queue processing, and React Query state synchronization",
    "Managed production deployments, monitoring, background workers, and scaling on AWS Linux servers with PM2/process management",
    "Resolved production real-time infrastructure issues involving WebSockets, Firebase services, and secure server configurations"
  ]
},
   {
  title: "VentSpace AI – Mental Health Companion & Admin Intelligence Platform",
  description:
    "End-to-end AI microservice for an anonymous mental health companion app, including real-time chat, safety workflows, mood analytics, and a production Pyrl™ Admin dashboard—integrated with the main Laravel platform via SSO and deployed behind Nginx.",
  image: "/assets/images/ventspace-ai.png?height=200&width=300",
  technologies: [
    "TypeScript",
    "Node.js",
    "Express.js",
    "Next.js",
    "React",
    "TypeORM",
    "MySQL",
    "Socket.IO",
    "OpenAI API (GPT-4o-mini, Whisper, Moderation)",
    "TanStack React Query",
    "Recharts",
    "Zod",
    "Tailwind CSS",
    "JWT Authentication",
    "Swagger/OpenAPI",
    "Node-Cron",
    "Axios",
    "Nginx",
  ],
  liveUrl: "https://ai.ventspaceapp.com/admin",
  githubUrl: "#",
  featured: true,
  status: "Live",
  category: "Full-Stack",
  gradient: "from-indigo-500 to-cyan-500",
  shadowColor: "rgba(99, 102, 241, 0.3)",
  roles: ["Full-Stack Developer", "Platform Engineer"],
  responsibilities: [
    "Designed and delivered a full-stack AI microservice architecture with an Express/TypeORM backend, Next.js admin frontend, and Nginx-based production routing across /, /api, and /socket.",
    "Built the AI companion backend with REST + Socket.IO real-time messaging, OpenAI-powered chat/summaries, voice transcription, mood tracking, and automated nightly reflection generation via cron jobs.",
    "Implemented a multi-tier safety engine (self-harm, harm-to-others, abuse) using keyword detection, NLP moderation, crisis resource injection, post-response validation, and safety audit logging.",
    "Developed secure authentication flows integrated with the external Laravel auth server, including JWT verification, HttpOnly cookie sessions, user-sync into the AI database, and SSO handoff from the main admin platform.",
    "Created SSO endpoints and callback flows (one-time code exchange, verify-token validation, session/logout APIs) to enable seamless admin access from the primary VentSpace Laravel dashboard.",
    "Engineered a feature-based Next.js 16 admin dashboard (Pyrl™ Admin) with 8 analytics modules: dashboard KPIs, mood journey, conversation health, emotional trends, reflection usage, crisis resources, AI insights, and research metrics.",
    "Built a scalable frontend architecture using TanStack React Query, Axios, Zod schema validation, Recharts visualizations, reusable panel/container patterns, and range-based filtering (7d/30d/90d/all).",
    "Implemented frontend auth middleware and SSO callback routing with environment-aware behavior (open access in dev for testing, enforced auth in production).",
    "Configured same-origin API integration through Next.js rewrites and credential-based requests to support secure HttpOnly cookie authentication in production.",
    "Developed comprehensive admin analytics APIs with aggregated, anonymized metrics for operators and research teams, including mood trends, usage patterns, emotional demographics, and plain-English AI-generated insights.",
    "Added compliance-oriented terms/privacy acknowledgment logging, health/readiness endpoints, global rate limiting, Swagger/OpenAPI docs, and structured error handling for production reliability.",
    "Resolved production WebSocket routing conflicts by moving Socket.IO to a dedicated /socket path and aligning backend, mobile client docs, and Nginx proxy configuration for stable real-time connectivity.",
    "Deployed and maintained the live environment at ai.ventspaceapp.com with split routing (Next.js frontend, Express API, Socket.IO), environment-based configuration, and operational scripts for seeding, UTC migration, and data maintenance.",
  ],
},
    {
  title: "Next Level Speed – Subscription Training & Mentorship Platform",
  description:
    "End-to-end sports performance platform with subscription billing, video-based training programs, community content, elite mentorship enrollment, admin operations, and automated deployment to production.",
  image: "/assets/images/next-level-speed.png?height=200&width=300",
  technologies: [
    "TypeScript",
    "Next.js",
    "React",
    "Tailwind CSS",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Node.js",
    "NestJS",
    "Prisma ORM",
    "PostgreSQL",
    "Stripe API",
    "JWT Authentication",
    "Swagger/OpenAPI",
    "Nodemailer",
    "Puppeteer",
    "Server-Sent Events (SSE)",
    "GitHub Actions",
    "Vercel",
    "PM2",
  ],
  liveUrl: "https://portal.nextlevelspeedmiami.com",
  githubUrl: "#",
  featured: true,
  status: "Live",
  category: "Full-Stack",
  gradient: "from-blue-500 to-cyan-500",
  shadowColor: "rgba(59, 130, 246, 0.3)",
  roles: ["Full-Stack Developer", "Platform Engineer"],
  responsibilities: [
    "Architected and delivered the full platform across a modular NestJS API and a Next.js App Router frontend, with feature-based modules for auth, subscriptions, programs, mentorship, notifications, support, and admin operations.",
    "Built secure authentication end-to-end using JWT access/refresh HttpOnly cookies, checkout-token flows, role-based route guards, subscription-access enforcement, and automatic session refresh with inactive-subscription redirects on the client.",
    "Implemented subscription commerce flows on both layers: Stripe payment intents, saved-card billing, reactivation, cancel/resume, plan upgrades/downgrades, invoice generation, and matching frontend checkout, reactivation, and subscription-management experiences with Stripe Elements.",
    "Developed the student learning portal with program/module/lesson navigation, React Player video delivery, resume-from-last-lesson behavior, playback progress persistence, completion tracking, and subscription-gated content access.",
    "Built the community and content experience with article browsing/detail views, support/contact forms, FAQ management, promo video surfaces, and real-time in-app notifications powered by SSE with reconnect and unread-count handling.",
    "Delivered a full admin console with dashboards, program/article CRUD, member and elite-mentorship management, transaction reporting with CSV export, FAQ/contact moderation, and role-specific navigation/layout systems.",
    "Engineered Elite Mentorship as a separate purchase flow with seat-capacity checks, race-condition-safe payment verification, enrollment lifecycle management, and dedicated admin/member visibility in the UI.",
    "Implemented production operations including Puppeteer-based invoice PDFs, batched transactional email campaigns, scheduled subscription renewal/maintenance jobs, and OpenAPI-documented backend APIs consumed by typed frontend service layers.",
    "Set up deployment pipelines with GitHub Actions for frontend releases to Vercel and optional VPS deployment over SSH with PM2 restarts, environment-based API configuration, and a live production portal at portal.nextlevelspeedmiami.com.",
    "Maintained code quality through typed DTOs/entities, React Query data orchestration, form validation with Zod, reusable UI/feature modules, and unit coverage for critical billing/subscription utilities.",
  ],
},
    {
      title: "Dynamic Landing Page & Automation Integration",
      description:
        "Developed a Node.js server integrated with Bubble.io workflows to capture automation data and auto-generate dynamic Webflow landing pages for individual leads",
      image: "/assets/images/neuropage.png?height=200&width=300",
      technologies: [
        "Node.js",
        "Express.js",
        "Bubble.io",
        "Webflow",
        "REST API",
        "PM2",
      ],
      liveUrl: "https://go.neuropage.io/profile?u=abhishek-mehta-neuropage",
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
      liveUrl: "/comming-soon",
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
      className="py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900/50 dark:to-blue-900/10 relative overflow-hidden"
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
            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
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
              className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "5rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
            <motion.p
              className="text-gray-600 dark:text-gray-300 mt-4 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-xl lg:max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              A showcase of my recent work and technical projects demonstrating
              Full-stack development skills
            </motion.p>
          </motion.div>

          {/* Book Container */}
          <div className="relative perspective-1000 max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <motion.button
              onClick={prevProject}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] touch-manipulation"
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 1 }}
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </motion.button>

            <motion.button
              onClick={nextProject}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[44px] min-h-[44px] touch-manipulation"
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 1 }}
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </motion.button>

            {/* Book Page Container */}
            <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] preserve-3d">
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
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-0 shadow-xl relative group animate-book-float touch-manipulation">
                    {/* Featured badge */}
                    {currentProjectData.featured && (
                      <motion.div
                        className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg"
                          animate={floatingAnimation}
                        >
                          <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden xs:inline">Featured</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Status badge */}
                    <motion.div
                      className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 z-20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Badge
                        className={`${getStatusColor(
                          currentProjectData.status,
                        )} border font-medium px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm`}
                      >
                        {currentProjectData.status}
                      </Badge>
                    </motion.div>

                    {/* Main Content - Responsive Layout */}
                    <div className="flex flex-col lg:grid lg:grid-cols-2 h-full min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px]">
                      {/* Left Side - Project Image */}
                      <div className="relative w-full p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center bg-gray-50/50 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0">
                        <motion.div
                          variants={imageVariants}
                          initial="hidden"
                          animate="visible"
                          className="relative w-full max-w-md aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-slate-900 group/mockup"
                          whileHover={{ y: -5, transition: { duration: 0.3 } }}
                        >
                          {/* Browser Top Bar */}
                          <div className="absolute top-0 inset-x-0 h-5 sm:h-6 md:h-7 bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 flex items-center px-2 sm:px-3 gap-1 sm:gap-1.5 z-20">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400/80" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400/80" />
                            <div className="ml-1 sm:ml-2 w-20 sm:w-32 h-1.5 sm:h-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50" />
                          </div>

                          {/* Project Image */}
                          <div className="absolute inset-0 pt-5 sm:pt-6 md:pt-7 overflow-hidden">
                            <motion.div
                              className="h-full w-full"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Image
                                src={
                                  currentProjectData.image || "/placeholder.svg"
                                }
                                alt={currentProjectData.title}
                                fill
                                className="object-cover object-top transition-transform duration-700"
                                priority
                              />
                            </motion.div>
                          </div>

                          {/* Glass Highlight Overlay */}
                          <div className="absolute inset-x-0 top-5 sm:top-6 md:top-7 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />

                          {/* Hover Action Overlay */}
                          <motion.div
                            className="absolute inset-0 pt-5 sm:pt-6 md:pt-7 bg-black/60 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 backdrop-blur-[2px]"
                            initial={{ opacity: 0 }}
                          >
                            <motion.div
                              className="flex flex-col items-center space-y-2 sm:space-y-3 text-white"
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="p-2 sm:p-2.5 md:p-3 bg-white/20 rounded-full backdrop-blur-md border border-white/30">
                                <Eye className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                              </div>
                              <span className="font-semibold text-sm sm:text-base md:text-lg tracking-wide">
                                Explore Project
                              </span>
                            </motion.div>
                          </motion.div>
                        </motion.div>

                        {/* Technology Category Badge - Hidden on very small screens */}
                        <motion.div
                          className="hidden sm:block absolute bottom-6 md:bottom-8 lg:bottom-10 left-6 md:left-8 lg:left-10 z-30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 }}
                        >
                          <Badge className="bg-white/90 dark:bg-slate-800/90 text-gray-800 dark:text-gray-200 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md px-3 md:px-4 py-1 md:py-1.5 shadow-lg flex items-center gap-2 text-xs md:text-sm">
                            <Zap className="h-3 w-3 md:h-3.5 md:w-3.5 text-amber-500" />
                            {currentProjectData.category}
                          </Badge>
                        </motion.div>
                      </div>

                      {/* Right Side - Project Details */}
                      <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto max-h-[350px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-none">
                        <div className="space-y-2 sm:space-y-3">
                          <CardHeader className="p-0">
                            <CardTitle className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight">
                              <motion.span
                                className="text-gray-800 dark:text-gray-100 font-bold"
                                whileHover={{
                                  color: "#3B82F6",
                                  transition: { duration: 0.3 },
                                }}
                              >
                                {currentProjectData.title}
                              </motion.span>
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-0 space-y-3 sm:space-y-4">
                            <motion.p
                              className="text-gray-700 dark:text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg line-clamp-3 sm:line-clamp-4 md:line-clamp-none"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {currentProjectData.description}
                            </motion.p>

                            {/* Technologies */}
                            <motion.div
                              className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 max-h-[80px] sm:max-h-[100px] md:max-h-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
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
                                      className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                                    >
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                ),
                              )}
                            </motion.div>
                          </CardContent>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                          className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <motion.div
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              className={`w-full bg-gradient-to-r ${currentProjectData.gradient} hover:shadow-lg transition-all duration-300 border-0 text-xs sm:text-sm md:text-base py-2 sm:py-3 md:py-4 min-h-[40px] sm:min-h-[44px] touch-manipulation`}
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
                                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                </motion.div>
                                <span className="hidden xs:inline">Live Demo</span>
                                <span className="xs:hidden">Demo</span>
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {currentProjectData.githubUrl === "#" ? (
                              <Button
                                variant="outline"
                                className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 text-xs sm:text-sm md:text-base py-2 sm:py-3 md:py-4 text-gray-900 dark:text-white min-h-[40px] sm:min-h-[44px] touch-manipulation"
                                asChild
                              >
                                <a
                                  href="/oops"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Code2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                  Code
                                </a>
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                className="w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 text-xs sm:text-sm md:text-base py-2 sm:py-3 md:py-4 text-gray-900 dark:text-white min-h-[40px] sm:min-h-[44px] touch-manipulation"
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
                                    <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                  </motion.div>
                                  Code
                                </a>
                              </Button>
                            )}
                          </motion.div>
                        </motion.div>

                        {/* Roles & Responsibilities Button */}
                        <motion.div
                          className="mt-1.5 sm:mt-2"
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
                                  className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-700 dark:hover:to-slate-600 border-2 border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg py-2 sm:py-3 text-gray-900 dark:text-white min-h-[40px] sm:min-h-[44px] touch-manipulation"
                                >
                                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                  <span className="hidden sm:inline">View Roles & Responsibilities</span>
                                  <span className="sm:hidden">View Details</span>
                                </Button>
                              </motion.div>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                  {currentProjectData.title}
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 dark:text-gray-300 text-lg">
                                  Roles and responsibilities in this project
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 mt-6">
                                {/* Roles Section */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
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
                                      ),
                                    )}
                                  </div>
                                </div>

                                {/* Responsibilities Section */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
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
                                          className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                                        >
                                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {responsibility}
                                          </span>
                                        </motion.div>
                                      ),
                                    )}
                                  </div>
                                </div>

                                {/* Technologies Used */}
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
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
                                          <Badge className="text-sm font-medium px-3 py-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600">
                                            {tech}
                                          </Badge>
                                        </motion.div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </motion.div>

                        {/* Project stats */}
                        <motion.div
                          className="mt-3 sm:mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400"
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
                <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">
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
              <span className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
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
