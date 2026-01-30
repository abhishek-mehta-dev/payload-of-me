"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Brain,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "🤔 Something went wrong while processing your request. Please try again in a moment.",
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
    "Tell me about his projects",
    "What's his experience?",
    "How can I contact him?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
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
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MessageCircle className="h-7 w-7 text-white relative z-10" />
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
            className={`fixed ${isMinimized ? "bottom-24 right-6 w-80 h-16" : "bottom-24 right-6 w-96 h-[600px]"} z-50 transition-all duration-500 ease-in-out`}
          >
            {/* Glassmorphism container */}
            <div className="relative h-full w-full">
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl">
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
              <div className="relative h-full flex flex-col bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/20 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-t-2xl">
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
                        className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
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
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <motion.div
                          className="h-2 w-2 bg-green-500 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        Online • Powered by Gemini AI
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setIsMinimized(!isMinimized)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white/20 transition-colors duration-200"
                    >
                      {isMinimized ? (
                        <Maximize2 className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Minimize2 className="h-4 w-4 text-gray-600" />
                      )}
                    </Button>
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
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                  {message.text}
                                </p>
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
