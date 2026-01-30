"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Minimize2,
  Maximize2,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi there! I'm Abhishek's AI assistant. I can tell you all about his skills, projects, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Wandering animation state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Start wandering only if not open and not hovering
    if (isOpen || isHovering) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const moveInterval = setInterval(() => {
      // Calculate random positions within a larger range
      // Moving left (negative x) and up (negative y)
      // Range: x: 0 to -500px, y: 0 to -400px to travel more across the screen
      const randomX = Math.floor(Math.random() * -500); 
      const randomY = Math.floor(Math.random() * -400); 
      
      setPosition({ x: randomX, y: randomY });
    }, 5000); // New target every 5 seconds

    return () => clearInterval(moveInterval);
  }, [isOpen, isHovering]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          context: PORTFOLIO_CONTEXT,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Update offline mode status based on response
      setIsOfflineMode(data.isFromFallback || false);

      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsOfflineMode(true);
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "🔌 **Connection Issue** 🔌\n\nI'm having trouble connecting to my AI service, but I can still help you with information about Abhishek's skills, projects, and experience using my offline knowledge base!\n\n💡 Try asking about:\n• His technical skills and expertise\n• Featured projects like DAHN or Taxificient\n• His educational background\n• GitHub repositories and contributions",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What are Abhishek's main skills?",
    "Tell me about his featured projects",
    "What's his professional experience?",
    "Show me his GitHub activity",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180, x: 0, y: 0 }}
        animate={{ 
          scale: 1, 
          // Add a slight rotation tilt based on movement direction logic could be complex, 
          // simply adding a continuous gentle wobble rotation
          rotate: [0, 5, -5, 0],
          x: isOpen ? 0 : position.x,
          y: isOpen ? 0 : [position.y, position.y - 10, position.y], // Add floating effect on Y
        }}
        transition={{
          x: {
            duration: 5,
            ease: "easeInOut",
          },
          y: {
            duration: 5, // Main movement
            ease: "easeInOut",
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-4 whitespace-nowrap bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xl border border-blue-200/50"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, 10],
              scale: [0.9, 1, 1, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ask me about Abhishek! 🤖
            </span>
            {/* Triangle pointing down */}
            <div className="absolute -bottom-2 right-6 border-8 border-transparent border-t-white/90" />
          </motion.div>

          {/* Main button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group"
            size="icon"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  "linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)",
                  "linear-gradient(45deg, #8b5cf6, #06b6d4, #3b82f6)",
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/10 shadow-inner border border-white/20">
                <img
                  src="/assets/robo-teddy.png"
                  alt="AI Assistant"
                  className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </motion.div>

            {/* Sparkle effects */}
            <motion.div
              className="absolute top-2 right-2"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <Sparkles className="h-3 w-3 text-yellow-300" />
            </motion.div>
          </Button>

          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 500 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              AI
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, rotateX: -15 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${
              isMinimized
                ? "bottom-24 right-6 w-80 h-16"
                : isExpanded
                ? "inset-4 md:inset-x-32 md:inset-y-20 lg:inset-x-40 lg:inset-y-24"
                : "bottom-24 right-6 w-96 h-[600px]"
            } z-50 transition-all duration-500 ease-in-out`}
          >
            {/* Glassmorphism container */}
            <div className="relative h-full w-full">
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl transition-all duration-500">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-5"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
                      "linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)",
                      "linear-gradient(45deg, #8b5cf6, #06b6d4, #3b82f6)",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Main content */}
              <div className="relative h-full flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl transition-all duration-500">
                {/* Header */}
                <div className={`flex items-center justify-between ${isMinimized ? "p-3" : "p-4"} border-b border-white/20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-t-2xl transition-all duration-300`}>
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="relative h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                          "0 0 30px rgba(139, 92, 246, 0.4)",
                          "0 0 20px rgba(59, 130, 246, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Brain className="h-5 w-5 text-white" />
                      </motion.div>

                      {/* AI indicator */}
                      <motion.div
                        className={`absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          isOfflineMode ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>

                    <div>
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <span>AI Assistant</span>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </motion.div>
                      </h3>
                      {!isMinimized && (
                        <div className="text-xs text-gray-600 flex items-center gap-1">
                          <motion.div
                            className={`h-2 w-2 rounded-full ${
                              isOfflineMode ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          {isOfflineMode ? 'Offline Mode • Knowledge Base' : 'Online • Powered by Gemini AI'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Expand/Collapse Button */}
                    {!isMinimized && (
                      <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white/20 transition-colors duration-200 hidden md:flex"
                        title={isExpanded ? "Restore" : "Maximize"}
                      >
                        {isExpanded ? (
                          <Minimize2 className="h-4 w-4 text-gray-600" />
                        ) : (
                          <Maximize2 className="h-4 w-4 text-gray-600" />
                        )}
                      </Button>
                    )}

                    {/* Minimize Button */}
                    <Button
                      onClick={() => {
                        setIsMinimized(!isMinimized);
                        if (!isMinimized) setIsExpanded(false); // Reset expansion when minimizing
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/20 transition-colors duration-200"
                      title={isMinimized ? "Restore" : "Minimize"}
                    >
                      {isMinimized ? (
                        <Maximize2 className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Minus className="h-4 w-4 text-gray-600" />
                      )}
                    </Button>

                    {/* Close Button */}
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-500/20 hover:text-red-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {!isMinimized && (
                  <>
                    {/* Quick Questions */}
                    {messages.length === 1 && (
                      <motion.div
                        className="p-4 border-b border-white/10"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-sm text-gray-600 mb-3 font-medium">
                          💡 Quick questions to get started:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {quickQuestions.map((question, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setInputValue(question)}
                              className="text-left text-sm p-2 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 hover:border-blue-300/50 transition-all duration-200 text-gray-700 hover:text-gray-800"
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index + 0.5 }}
                            >
                              {question}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl p-4 shadow-lg backdrop-blur-sm border ${
                              message.isUser
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300/30 ml-4"
                                : "bg-white/90 text-gray-800 border-white/40 mr-4"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {!message.isUser && (
                                <motion.div
                                  className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mt-0.5"
                                  animate={{ rotate: [0, 360] }}
                                  transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <Bot className="h-3 w-3 text-white" />
                                </motion.div>
                              )}
                              {message.isUser && (
                                <motion.div
                                  className="flex-shrink-0 h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mt-0.5"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <User className="h-3 w-3 text-white" />
                                </motion.div>
                              )}
                              <div className="flex-1">
                                <div className="text-sm leading-relaxed">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                      ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                                      ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                                      li: ({ children }) => <li className="mb-1">{children}</li>,
                                      h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
                                      h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>,
                                      h3: ({ children }) => <h3 className="text-sm font-bold mb-2 mt-2 first:mt-0">{children}</h3>,
                                      strong: ({ children }) => <span className="font-bold text-inherit">{children}</span>,
                                      em: ({ children }) => <span className="italic text-inherit">{children}</span>,
                                      code: ({ className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || "");
                                        const isInline = !match;
                                        return isInline ? (
                                          <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                                            {children}
                                          </code>
                                        ) : (
                                          <div className="relative my-2 rounded-lg overflow-hidden bg-gray-900 border border-white/10">
                                            <div className="px-4 py-2 bg-gray-800/50 border-b border-white/10 text-xs text-gray-400 font-mono">
                                              {match?.[1] || "code"}
                                            </div>
                                            <pre className="p-4 overflow-x-auto text-sm text-gray-100 font-mono scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                              <code>{children}</code>
                                            </pre>
                                          </div>
                                        );
                                      },
                                      blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-blue-500/50 pl-4 py-1 my-2 bg-blue-500/5 rounded-r italic">
                                          {children}
                                        </blockquote>
                                      ),
                                      a: ({ href, children }) => (
                                        <a 
                                          href={href} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-blue-600 hover:text-blue-500 underline decoration-blue-400/30 hover:decoration-blue-500 transition-colors"
                                        >
                                          {children}
                                        </a>
                                      ),
                                    }}
                                  >
                                    {message.text}
                                  </ReactMarkdown>
                                </div>
                                <p
                                  className={`text-xs mt-2 opacity-70 ${message.isUser ? "text-white/70" : "text-gray-500"}`}
                                >
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="max-w-[85%] rounded-2xl p-4 bg-white/90 border border-white/40 shadow-lg backdrop-blur-sm mr-4">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Bot className="h-3 w-3 text-white" />
                              </motion.div>
                              <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                AI is thinking...
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/20 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-indigo-50/50 rounded-b-2xl">
                      <div className="flex space-x-3">
                        <div className="flex-1 relative">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about Abhishek..."
                            className="w-full bg-white/80 backdrop-blur-sm border-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 shadow-lg transition-all duration-200"
                            disabled={isLoading}
                          />
                          {/* Input decoration */}
                          <motion.div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={sendMessage}
                            disabled={!inputValue.trim() || isLoading}
                            className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
                            size="icon"
                          >
                            <motion.div
                              animate={isLoading ? { rotate: 360 } : {}}
                              transition={
                                isLoading
                                  ? {
                                      duration: 1,
                                      repeat: Infinity,
                                      ease: "linear",
                                    }
                                  : {}
                              }
                            >
                              <Send className="h-5 w-5 text-white" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </div>

                      {/* Footer */}
                      <motion.div
                        className="flex items-center justify-center mt-3 text-xs text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >
                        <span className="flex items-center gap-1">
                          Powered by
                          <motion.span
                            className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Gemini AI
                          </motion.span>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            ✨
                          </motion.div>
                        </span>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
