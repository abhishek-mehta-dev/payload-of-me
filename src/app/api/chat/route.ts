import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import { fallbackService } from '@/services/fallback'
import { githubService } from '@/services/github'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Enhanced context with GitHub integration
async function getEnhancedContext(): Promise<string> {
  const baseContext = `
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
- SQL, NoSQL, MongoDB, PostgreSQL, MySQL

*API Development:*
- RESTful Services, Third-party API Integrations, GraphQL

*Server & Infrastructure:*
- Linux Fundamentals, Nginx, Docker, GitHub Actions

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

  // Try to enhance with live GitHub data
  try {
    const [user, repos] = await Promise.all([
      githubService.getUserProfile(),
      githubService.getUserRepositories(5)
    ]);

    if (user && repos) {
      const githubContext = `

**Live GitHub Data:**
- GitHub Profile: ${user.name} (@${user.login})
- Bio: ${user.bio}
- Location: ${user.location}
- Public Repositories: ${user.public_repos}
- Followers: ${user.followers}
- Following: ${user.following}
- Member since: ${new Date(user.created_at).getFullYear()}

**Recent Repositories:**
${repos.slice(0, 5).map(repo => 
  `- ${repo.name}: ${repo.description || 'No description'} (${repo.language || 'Mixed'})`
).join('\n')}
`;
      return baseContext + githubContext;
    }
  } catch (error) {
    console.error('Error fetching GitHub data for context:', error);
  }

  return baseContext;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if Gemini API is available
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key found, using fallback response');
      const fallbackResponse = await fallbackService.getEnhancedResponse(message);
      return NextResponse.json({ 
        response: fallbackResponse.text,
        isFromFallback: true,
        category: fallbackResponse.category
      });
    }

    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

      // Get enhanced context with GitHub data
      const enhancedContext = await getEnhancedContext();

      // Create the prompt with enhanced context
      const prompt = `${enhancedContext}

User Question: ${message}

Please provide a helpful, professional response about Abhishek Mehta based on the context provided. Keep responses concise but informative. If the question is not related to Abhishek's portfolio or professional background, politely redirect the conversation back to his professional experience and skills.`

      // Generate response with timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const responsePromise = model.generateContent(prompt);
      
      const result = await Promise.race([responsePromise, timeoutPromise]) as Awaited<ReturnType<typeof model.generateContent>>;
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ 
        response: text,
        isFromFallback: false
      });

    } catch (aiError: unknown) {
      console.error('Gemini AI error:', aiError);
      
      const errorMessage = aiError instanceof Error ? aiError.message : 'Unknown error';
      
      // Check for specific error types
      if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
        console.log('API quota exceeded, using enhanced fallback response');
        const fallbackResponse = await fallbackService.getEnhancedResponse(message);
        return NextResponse.json({ 
          response: `⚡ **AI Service Temporarily Unavailable** ⚡\n\n${fallbackResponse.text}\n\n💡 *This response is from my offline knowledge base. The AI service will be back online soon!*`,
          isFromFallback: true,
          category: fallbackResponse.category,
          reason: 'quota_exceeded'
        });
      }

      if (errorMessage.includes('timeout') || errorMessage.includes('Request timeout')) {
        console.log('AI request timeout, using fallback response');
        const fallbackResponse = await fallbackService.getFallbackResponse(message);
        return NextResponse.json({ 
          response: `⏱️ **Response Taking Too Long** ⏱️\n\n${fallbackResponse.text}\n\n🔄 *Try asking again in a moment for AI-powered responses!*`,
          isFromFallback: true,
          category: fallbackResponse.category,
          reason: 'timeout'
        });
      }

      // Generic AI error fallback
      console.log('Generic AI error, using fallback response');
      const fallbackResponse = await fallbackService.getEnhancedResponse(message);
      return NextResponse.json({ 
        response: `🤖 **AI Assistant Temporarily Down** 🤖\n\n${fallbackResponse.text}\n\n✨ *Don't worry, I still have comprehensive information about Abhishek!*`,
        isFromFallback: true,
        category: fallbackResponse.category,
        reason: 'ai_error'
      });
    }

  } catch (error) {
    console.error('General error in chat API:', error);
    
    // Last resort fallback
    try {
      const fallbackResponse = await fallbackService.getErrorResponse();
      return NextResponse.json({ 
        response: fallbackResponse.text,
        isFromFallback: true,
        category: 'error',
        reason: 'general_error'
      });
    } catch (fallbackError) {
      console.error('Fallback service also failed:', fallbackError);
      return NextResponse.json(
        { 
          response: "I'm experiencing technical difficulties, but I'm here to help! Please try asking about Abhishek's skills, projects, or experience.",
          isFromFallback: true,
          category: 'error',
          reason: 'complete_failure'
        },
        { status: 200 } // Still return 200 to avoid breaking the UI
      );
    }
  }
}