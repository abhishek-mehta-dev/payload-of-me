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
- Dedicated Full-Stack & Backend Developer with Master's in Computer Applications (2024) from Chandigarh University
- Currently working as a MERN Stack Developer since 2024
- Strong foundation in backend development with focus on system performance optimization
- Passionate about AI/ML, DevOps, and intelligent automation
- Continuously expanding knowledge in cloud technologies and modern software development

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
   - Full-stack healthcare application with Next.js, Node.js, Express.js, MongoDB
   - Role-based access control (RBAC) for Admins, Agencies, and Nurses
   - Stripe integration for subscription billing and automated renewals
   - Patient notes system with CRUD operations and soft-delete features
   - Video upload functionality and automated invoice generation
   - AWS EC2 deployment with PM2 for server management

2. **Dynamic Landing Page & Automation Integration** (Live)
   - Node.js server integrated with Bubble.io workflows
   - Auto-generates dynamic Webflow landing pages for individual leads
   - Webhook server for automation data processing
   - API integration between Node.js, Bubble.io, and Webflow
   - Automated workflows for data-driven page creation

3. **Taxificient – Advanced Ride & Fleet Management** (In Progress)
   - Sophisticated SaaS platform using Nest.js, TypeORM, React.js, Next.js
   - Multi-passenger ride architecture with real-time dispatcher controls
   - One-to-many and many-to-one chat system for drivers and passengers
   - Firebase Cloud Messaging (FCM) for real-time notifications
   - Granular permission-based authorization system
   - PostgreSQL database with Socket.io for real-time features

4. **DocuAI Pro** (Development)
   - AI-powered document chatbot with Retrieval-Augmented Generation (RAG)
   - FastAPI backend with Next.js frontend
   - LangChain and FAISS for document processing and vector search
   - Hugging Face models for natural language understanding
   - OAuth authentication and PayPal subscription management
   - ChatGPT-like conversational interface

5. **Stripe Connect Integration** (Completed)
   - Full-featured Stripe Connect application with Next.js
   - Multi-vendor payment platform with secure onboarding flows
   - Account management and payment analytics dashboard
   - MongoDB integration for vendor and transaction data

**Experience:**
- **Current Role:** MERN Stack Developer (2024 - Present)
  - Building scalable web applications using MERN stack
  - Focus on backend development, API design, and system performance optimization
  - Working with modern development practices and cloud technologies

- **Education:** Master's in Computer Applications (2022 - 2024)
  - Chandigarh University
  - Advanced studies in software development, algorithms, and system design
  - Strong foundation in programming and software engineering principles

**Key Strengths:**
- Full-stack development with emphasis on backend architecture
- API design and third-party integrations
- Database design and optimization
- Cloud deployment and DevOps practices
- AI/ML integration in web applications
- Real-time systems and WebSocket implementations
- Payment gateway integrations (Stripe, PayPal)
- Healthcare and SaaS application development

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