"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
  Minus,
  Terminal,
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const PORTFOLIO_CONTEXT = `
You are a helpful assistant for Abhishek Mehta's portfolio website. Here's comprehensive information about Abhishek:

**About Abhishek Mehta:**
I build backend-driven systems that are designed to scale — not just to work.

With a Master’s in Computer Applications (2024) and hands-on production experience, I specialize in backend architecture, secure API design, authentication flows, payment systems, and end-to-end feature delivery.

My focus is not just writing code — it’s engineering systems that behave reliably under load, over time, and at scale.

I primarily work within the Node.js and Python ecosystems, designing scalable REST APIs, AI-powered applications, and cloud-native backend services. My experience includes building and deploying production-grade systems across multiple domains:

   • Scalable API Architecture & Backend System Design
   • Secure Authentication & Authorization Workflows
   • Payment Gateway Integration (Stripe) & Subscription Systems
   • AI Workflows, RAG Pipelines & Agent Orchestration
   • Real-Time Location Tracking using Redis
   • Push Notification Systems using Firebase Cloud Messaging (FCM)
   • Google Maps API Integration & Navigation Services
   • File Storage Architecture with Amazon S3
   • CDN Optimization & Content Delivery using Amazon CloudFront
   • NGINX Reverse Proxy, Load Balancing & Infrastructure Optimization
   • CI/CD Automation & Linux-Based Server Management
   • Database Design, Query Optimization & Performance Tuning

I’m particularly interested in backend-driven AI systems — where model intelligence meets solid architecture, observability, and operational reliability.

Currently, I’m deepening my expertise in:

   Cloud-native system design
   DevOps automation
   Distributed systems
   Applied AI engineering

My long-term goal is simple:
To become an end-to-end engineer who can design, build, deploy, operate, and optimize complex systems independently.

I believe great software is not defined by how quickly it is built, but by how reliably it performs in production.


**Technical Skills:**

*Programming Languages:*
- Python, JavaScript, TypeScript, Go (Golang), Bash

*Frameworks & Libraries:*
- Express.js, Nest.js, Node.js, Django, Django Rest Framework, React.js, Next.js, FastAPI, LangChain

*Database Management:*
- SQL, NoSQL, MongoDB, PostgreSQL, MySQL, Redis

*API Development:*
- RESTful Services, Third-party API Integrations, GraphQL

*Server & Infrastructure:*
- Linux Fundamentals, Nginx, Docker, GitHub Actions, PM2, SSH

*Emerging Technologies:*
- Machine Learning Basics, DevOps Tools, AI Agents, AWS, Azure, GCP

**Featured Projects:**

1. **DAHN – Hospice Nurse Documentation Support App** (Live)
   - Live: https://www.getdahn.com
   - Full-stack hospice nurse documentation app (MERN) with auth, payments, and admin dashboard
   - Stack: React.js, Next.js, Node.js, Express.js, MongoDB, Stripe API, Plivo Verify API
   - Roles: Full-Stack Developer, DevOps Engineer
   - Built secure RBAC healthcare SaaS with Next.js, Node.js, Express.js, and MongoDB
   - HIPAA-compliant architecture with encrypted PHI/patient notes storage
   - Administrative, technical, and physical safeguards for patient data privacy
   - Clinical notes module: create, auto-draft, update, audit logging, soft-delete
   - RBAC for Admins, Agencies, and Nurses with permission-based workflows
   - Stripe subscriptions: plans, coupons, renewals, invoice generation
   - Plivo Verify API (cx.plivo.com) for SMS OTP and phone number verification
   - Email MFA, secure sessions, multi-device login tracking
   - Secure media/file uploads for clinical documentation
   - TanStack React Query for frontend performance and sync
   - AWS EC2 deployment/monitoring with PM2; GitHub CI/CD

2. **Signature K9 – Dog Training LMS & Subscription Platform** (Live)
   - Live: https://portal.signaturek9trainingacademy.com
   - End-to-end subscription LMS for The 30-Day Reset program
   - Stack: TypeScript, Next.js, React, NestJS, Prisma, PostgreSQL, Stripe, PayPal, AWS S3/CloudFront, hls.js, Nginx, JWT, Swagger, Puppeteer
   - Roles: Full-Stack Developer, Platform Engineer
   - Next.js App Router frontend + modular NestJS API + PostgreSQL
   - Curriculum navigation, HLS/MP4 playback with resume progress, quiz gating, certification
   - Stripe Elements + PayPal checkout, 3DS recovery, plan changes, vaulted payment methods
   - Learner dashboard: progress, community, upgrades, plan-gated training guides
   - Community with categories, threads, media, admin moderation
   - Admin consoles for courses, users, billing, FAQ, community, certification quizzes
   - CloudFront signed cookies, HLS.js adaptive streaming, MP4 fallback
   - JWT access/refresh cookies, role guards, plan-based access control
   - Certificate PDF generation and milestone email notifications
   - S3 uploads, CloudFront delivery, FFmpeg HLS transcoding
   - Production nginx reverse proxy, CORS, CDN media on dedicated domain

3. **Taxificient – Enterprise Mobility & Intelligent Fleet Dispatch SaaS** (In Progress)
   - Backend: https://backend.taxificient.ai/
   - Ride booking, dispatch automation, and fleet management for mobility operators
   - Stack: Next.js, React.js, Nest.js, TypeORM, PostgreSQL, Redis, Socket.io, Firebase Admin, Google Maps API
   - Roles: Full-Stack Architect, DevOps Engineer
   - Dynamic RBAC for Super Admins, Company Admins, Dispatchers, Drivers, Passengers
   - Secure user impersonation for higher-level admins
   - Passenger booking: pickup/drop-off, multi-stop, fare estimation, live status
   - Dispatcher allocation with bulk assignment and accept/reject flows
   - Live driver GPS tracking for passengers and dispatch teams
   - Vehicle/fleet management: registration, maintenance, driver assignment
   - Google Maps geolocation, routes, places, Haversine fare distance
   - WebSocket chat with typing indicators and read receipts
   - Firebase Cloud Messaging for ride lifecycle notifications
   - Subscription billing with renewals and plan-gated access
   - Redis caching/pub-sub/queues; production AWS Linux + PM2

4. **VentSpace AI – Mental Health Companion & Admin Intelligence Platform** (Live)
   - Live: https://ai.ventspaceapp.com/admin
   - AI microservice for anonymous mental health companion + Pyrl™ Admin dashboard
   - Stack: TypeScript, Node.js, Express.js, Next.js, TypeORM, MySQL, Socket.IO, OpenAI (GPT-4o-mini, Whisper, Moderation), Recharts, JWT, Nginx
   - Roles: Full-Stack Developer, Platform Engineer
   - Express/TypeORM backend + Next.js admin + Nginx routing (/, /api, /socket)
   - Real-time chat, OpenAI summaries, voice transcription, mood tracking, nightly reflections
   - Multi-tier safety engine (self-harm, harm-to-others, abuse) with crisis resources and audit logs
   - Laravel SSO/JWT cookie auth and user sync into AI database
   - Pyrl™ Admin: 8 analytics modules (KPIs, mood journey, conversation health, emotional trends, reflections, crisis, AI insights, research)
   - TanStack React Query, Zod, Recharts, range filters (7d/30d/90d/all)
   - Anonymized admin analytics APIs and production WebSocket /socket path fix

5. **Next Level Speed – Subscription Training & Mentorship Platform** (Live)
   - Live: https://portal.nextlevelspeedmiami.com
   - Sports performance platform: subscriptions, video programs, community, elite mentorship, admin ops
   - Stack: TypeScript, Next.js, NestJS, Prisma, PostgreSQL, Stripe, JWT, SSE, Puppeteer, GitHub Actions, Vercel, PM2
   - Roles: Full-Stack Developer, Platform Engineer
   - Modular NestJS API + Next.js App Router frontend
   - JWT cookie auth, checkout-token flows, subscription-gated access
   - Stripe payment intents, saved cards, cancel/resume, upgrades, invoices
   - Program/module/lesson portal with React Player and progress persistence
   - Community articles, FAQ, support forms, SSE in-app notifications
   - Admin dashboards, CRUD, mentorship management, CSV transaction export
   - Elite Mentorship seat capacity with race-safe payment verification
   - GitHub Actions → Vercel frontend; optional VPS SSH + PM2 backend deploys

6. **Dynamic Landing Page & Automation Integration** (Live)
   - Live: https://go.neuropage.io/profile?u=abhishek-mehta-neuropage
   - Node.js server + Bubble.io workflows auto-generating Webflow landing pages per lead
   - Stack: Node.js, Express.js, Bubble.io, Webflow, REST API, PM2
   - Roles: Full-Stack Developer, Automation Engineer
   - Webhook server for Bubble.io automation lead data
   - APIs to feed Webflow dynamic components and return page URLs to Bubble.io
   - Modular reusable sections for unified landing pages
   - PM2 deployments, structured API logging, cross-platform error handling

7. **DocuAI Pro** (Development)
   - Coming soon; GitHub: https://github.com/abhishek-mehta-dev/DocuAI-Pro
   - AI document chatbot with Retrieval-Augmented Generation (RAG)
   - Stack: FastAPI, Next.js, PostgreSQL, PayPal, PyMuPDF, FAISS, LangChain, Hugging Face
   - Roles: AI Engineer, Backend Developer, Frontend Developer
   - LangChain + FAISS document processing and vector search
   - FastAPI + PyMuPDF parsing; Hugging Face NLU models
   - Next.js ChatGPT-like UI; OAuth + PayPal subscriptions
   - PostgreSQL schema for users and documents

8. **Stripe Connect Integration** (Completed)
   - Coming soon; GitHub: https://github.com/abhishek-mehta-dev/stripe_connect
   - Multi-vendor Stripe Connect app with onboarding and payment flows
   - Stack: Next.js, React, Stripe Connect, Node.js, MongoDB
   - Roles: Payment Integration Specialist, Full-Stack Developer, API Developer
   - Secure vendor onboarding/verification
   - Payment management/analytics dashboard
   - MongoDB for vendors and transactions

**Experience:**
- **Current Role:** MERN Stack / Backend Developer (2024 - Present)
  - Building scalable web applications with a backend-first mindset
  - Core focus on backend architecture, API design, database optimization, and system performance
  - Experience designing and deploying production systems across Node.js (Express, NestJS) and Python (FastAPI, Django)
  - Implemented real-time location tracking (Redis), FCM push notifications, WebSockets (Socket.io), payment gateways (Stripe, PayPal), and AI RAG pipelines (LangChain, OpenAI)
  - Managing Linux servers, Nginx reverse proxies, Docker containerization, PM2 process management, and AWS infrastructure

- **Education:** Master's in Computer Applications (2022 - 2024)
  - Chandigarh University
  - Specialization in software engineering, data structures, algorithms, database management systems, and distributed system design

**Key Strengths:**
- Backend Architecture & Scalable REST/GraphQL API Design
- Database Design, Query Tuning & Caching (PostgreSQL, MongoDB, Redis, MySQL)
- Production DevOps, Linux Hardening, Nginx Reverse Proxies & AWS Cloud Infrastructure
- Applied AI Engineering, RAG Systems & LangChain Orchestration
- Real-Time Infrastructure (WebSockets, Socket.io, Firebase FCM)
- Payment Gateway Architecture & Subscription Engines (Stripe, PayPal)
- Secure Authentication, RBAC & Compliance (JWT, OAuth, HIPAA-aware safeguards)
- End-to-End System Reliability & Performance Optimization

Please answer questions about Abhishek's background, skills, experience, and projects in a helpful, professional, and encouraging manner. If someone asks about contacting Abhishek, direct them to the contact section of the portfolio. Be specific about his projects and technical expertise when relevant.
`;

const quickQuestions = [
  "What are Abhishek's main skills?",
  "Tell me about his featured projects",
  "What's his professional experience?",
  "Show me his GitHub activity",
];

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi — I'm Abhishek's portfolio agent. Ask about skills, projects, servers, or experience.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Wandering floating FAB
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Keep FAB parked on touch / small screens — wandering covers CTAs
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || !wide || isOpen || isHovering) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const moveInterval = setInterval(() => {
      setPosition({
        x: Math.floor(Math.random() * -280),
        y: Math.floor(Math.random() * -220),
      });
    }, 5000);

    return () => clearInterval(moveInterval);
  }, [isOpen, isHovering]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (preset?: string) => {
    const text = (preset ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: PORTFOLIO_CONTEXT,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setIsOfflineMode(data.isFromFallback || false);

      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: data.response,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 700);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsOfflineMode(true);
      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Connection issue — using offline knowledge. Ask about skills, projects (DAHN, Signature K9, Taxificient), or experience.",
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 700);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Floating FAB — wanders until open / hovered */}
      <motion.div
        className="fixed z-50 bottom-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+0.75rem))] right-[max(1rem,calc(env(safe-area-inset-right,0px)+0.75rem))]"
        initial={{ scale: 0, rotate: -180, x: 0, y: 0 }}
        animate={{
          scale: 1,
          rotate: [0, 5, -5, 0],
          x: isOpen ? 0 : position.x,
          y: isOpen ? 0 : [position.y, position.y - 10, position.y],
        }}
        transition={{
          x: { duration: 5, ease: "easeInOut" },
          y: { duration: 5, ease: "easeInOut" },
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-brand/25"
            animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute bottom-full right-0 mb-3 hidden md:block whitespace-nowrap rounded-md border border-line bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-lg"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [8, 0, 0, 8],
              scale: [0.95, 1, 1, 0.95],
            }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 5 }}
          >
            Ask me about Abhishek
            <span className="absolute -bottom-1.5 right-5 h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-card" />
          </motion.div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-line bg-card shadow-[0_12px_40px_-12px_color-mix(in_oklch,var(--brand)_45%,transparent)]"
            aria-label="Open AI assistant"
          >
            <motion.div
              className="relative h-12 w-12 overflow-hidden rounded-full"
              animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/robo-teddy.png"
                alt="AI Assistant"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute top-1.5 right-1.5"
              animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="h-3 w-3 text-brand" />
            </motion.div>
          </button>

          <motion.div
            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded border border-line bg-brand px-1 font-mono text-[9px] font-bold text-brand-foreground"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 500 }}
          >
            AI
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed z-50 ${
              isExpanded
                ? "inset-4 sm:inset-8 md:inset-12"
                : "bottom-[max(5.5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] right-[max(0.75rem,calc(env(safe-area-inset-right,0px)+0.75rem))] left-[max(0.75rem,calc(env(safe-area-inset-left,0px)+0.75rem))] w-auto max-w-[400px] ml-auto"
            }`}
          >
            <div
              className={`flex flex-col overflow-hidden rounded-lg border border-line bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] ${
                isMinimized
                  ? "h-auto"
                  : isExpanded
                    ? "h-full"
                    : "h-[min(70dvh,560px)] max-h-[calc(100dvh-8rem)]"
              }`}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between gap-3 border-b border-line bg-surface/80 px-3.5 py-2.5 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-card">
                    <Image
                      src="/assets/robo-teddy.png"
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card ${
                        isOfflineMode ? "bg-amber-500" : "bg-brand"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-foreground truncate flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-brand shrink-0" />
                      agent — portfolio
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isOfflineMode ? "bg-amber-500" : "bg-brand animate-pulse"
                        }`}
                      />
                      {isOfflineMode ? "offline fallback" : "gemini online"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    className="hidden md:flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                    onClick={() => setIsExpanded((v) => !v)}
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                    onClick={() => setIsMinimized((v) => !v)}
                    aria-label={isMinimized ? "Restore" : "Minimize"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpanded(false);
                      setIsMinimized(false);
                    }}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Quick prompts */}
                  {messages.length <= 1 && (
                    <div className="shrink-0 border-b border-line px-3.5 py-3 bg-surface/40">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-brand" />
                        quick prompts
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {quickQuestions.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => void sendMessage(q)}
                            className="text-left rounded-md border border-line bg-background/70 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-brand/40 hover:text-foreground transition-colors"
                          >
                            $ {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3.5 py-3 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-md border px-3 py-2.5 text-sm leading-relaxed ${
                            message.isUser
                              ? "border-brand/40 bg-brand text-brand-foreground"
                              : "border-line bg-surface text-foreground"
                          }`}
                        >
                          <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] opacity-70">
                            {message.isUser ? (
                              <User className="h-3 w-3" />
                            ) : (
                              <Bot className="h-3 w-3" />
                            )}
                            {message.isUser ? "you" : "agent"}
                            <span className="ml-auto">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {message.isUser ? (
                            <p>{message.text}</p>
                          ) : (
                            <div className="prose-chat">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ children }) => (
                                    <p className="mb-2 last:mb-0">{children}</p>
                                  ),
                                  ul: ({ children }) => (
                                    <ul className="mb-2 list-disc space-y-1 pl-4">
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol className="mb-2 list-decimal space-y-1 pl-4">
                                      {children}
                                    </ol>
                                  ),
                                  strong: ({ children }) => (
                                    <strong className="font-semibold text-brand">
                                      {children}
                                    </strong>
                                  ),
                                  code: ({ className, children, ...props }) => {
                                    const block = /language-/.test(
                                      className || "",
                                    );
                                    if (!block) {
                                      return (
                                        <code
                                          className="rounded bg-background/80 px-1 py-0.5 font-mono text-xs"
                                          {...props}
                                        >
                                          {children}
                                        </code>
                                      );
                                    }
                                    return (
                                      <pre className="my-2 overflow-x-auto rounded-md border border-line bg-background p-3 font-mono text-xs">
                                        <code {...props}>{children}</code>
                                      </pre>
                                    );
                                  },
                                  a: ({ href, children }) => (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-brand underline underline-offset-2"
                                    >
                                      {children}
                                    </a>
                                  ),
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="rounded-md border border-line bg-surface px-3 py-2.5 font-mono text-xs text-muted-foreground">
                          agent is typing
                          <span className="caret-blink ml-1 inline-block w-1.5 h-3 bg-brand align-middle" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="shrink-0 border-t border-line bg-surface/50 p-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="$ ask about skills, projects…"
                        disabled={isLoading}
                        className="flex-1 rounded-md border border-line bg-background px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-brand/50"
                      />
                      <button
                        type="button"
                        onClick={() => void sendMessage()}
                        disabled={!inputValue.trim() || isLoading}
                        className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground disabled:opacity-40 transition-opacity"
                        aria-label="Send"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground/70">
                      powered by gemini
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
