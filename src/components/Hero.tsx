"use client";

import { useState, useEffect, useMemo } from "react";
import {
  motion,
  type TargetAndTransition,
  useScroll,
  useTransform,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronDown,
  Code,
  Database,
  Server,
  Cpu,
  Globe,
  Award,
  Layers,
  GitBranch,
  Terminal,
} from "lucide-react";
import {
  SiDjango,
  SiExpress,
  SiTypescript,
  SiReact,
  SiMongodb,
  SiNodedotjs,
  SiNextdotjs,
  SiFastapi,
  SiLangchain,
  SiDocker,
  SiNestjs,
} from "react-icons/si";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const techStack = [
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Express", icon: SiExpress },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "LangChain", icon: SiLangchain },
  { name: "NestJS", icon: SiNestjs },
];

const skillsData = [
  { name: "React.js", icon: SiReact, proficiency: 90, category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, proficiency: 88, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, proficiency: 85, category: "Frontend" },
  { name: "Node.js", icon: SiNodedotjs, proficiency: 92, category: "Backend" },
  { name: "Express.js", icon: SiExpress, proficiency: 90, category: "Backend" },
  { name: "NestJS", icon: SiNestjs, proficiency: 85, category: "Backend" },
  { name: "Django", icon: SiDjango, proficiency: 80, category: "Backend" },
  { name: "FastAPI", icon: SiFastapi, proficiency: 88, category: "Backend" },
  { name: "MongoDB", icon: SiMongodb, proficiency: 87, category: "Database" },
  { name: "PostgreSQL", icon: Database, proficiency: 85, category: "Database" },
  { name: "Docker", icon: SiDocker, proficiency: 82, category: "DevOps" },
  { name: "LangChain", icon: SiLangchain, proficiency: 78, category: "AI/ML" },
];

const stats = [
  { number: "10+", label: "Fullstack Projects", icon: Code },
  { number: "1+", label: "Years Experience", icon: Award },
  { number: "6+", label: "Technologies Used", icon: Layers },
  { number: "15+", label: "Contributions / PRs", icon: GitBranch },
];

const services = [
  {
    title: "Full-Stack Development",
    icon: Globe,
    description: "End‑to‑end web applications",
  },
  {
    title: "Backend APIs",
    icon: Server,
    description: "Scalable server solutions",
  },
  {
    title: "Database Design",
    icon: Database,
    description: "Optimized data architecture",
  },
  {
    title: "Server Architecture",
    icon: Cpu,
    description: "Robust server infrastructure",
  },
];

type Particle = {
  id: number;
  left: string;
  top: string;
  y: number[];
  x: number[];
  opacity: number[];
  color: string;
  duration: number;
  delay: number;
};

const codeSnippets = [
  "import express from 'express';",
  "npm run build && npm run dev",
  "uvicorn main:app --reload",
  "python manage.py runserver",
  "git commit -m 'clean backend shipped'",
  "docker pull ubuntu:latest",
];

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [mounted, setMounted] = useState(false);
  const fullText = codeSnippets[currentSnippet];

  useEffect(() => {
    const newParticles = [...Array(25)].map((_, i) => {
      const colors = [
        "bg-blue-400/20",
        "bg-cyan-400/15",
        "bg-purple-400/18",
        "bg-teal-400/12",
        "bg-indigo-400/16",
        "bg-violet-400/14",
      ];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        y: [0, -Math.random() * 100 - 50, 0],
        x: [0, Math.random() * 40 - 20, 0],
        opacity: [0.2, 1, 0.2],
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
      };
    });
    setParticles(newParticles);
  }, []);

  const titles = useMemo(
    () => ["Full Stack Developer", "Backend Engineer", "Tech Enthusiast"],
    []
  );

  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    setMounted(true);
    if (!mounted) return;

    let i = 0;
    const snippet = codeSnippets[currentSnippet];

    const interval = setInterval(() => {
      setTerminalText(snippet.slice(0, i));
      i++;

      if (i > snippet.length) {
        clearInterval(interval);

        setTimeout(() => {
          setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
          setTerminalText("");
        }, 1000);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [currentSnippet, mounted]);

  // const letters = titles[currentTitle].split("");

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const slideInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotate: -5,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const slideInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
      rotate: 5,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  const scaleIn: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -10,
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 150,
      },
    }),
  };

  const floatingAnimation: TargetAndTransition = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Base gradient layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-cyan-900/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-900/20 to-pink-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 1 }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/12 to-pink-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/8 to-emerald-500/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating elements with motion */}
        <motion.div
          className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-blue-600/8 rounded-full blur-2xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-violet-500/8 to-purple-600/6 rounded-full blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            transition: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
          }}
        />

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute w-1 h-1 ${particle.color} rounded-full`}
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: particle.y,
              x: particle.x,
              opacity: particle.opacity,
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16"
        style={{ y: textY }}
      >
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
            </div>
            <span className="text-emerald-400 font-mono text-sm font-semibold tracking-wide">
              ~/👋 Hello, I&apos;m Abhishek Mehta
            </span>
          </div>
        </motion.div>

        {/* Terminal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden hover:shadow-cyan-500/10 hover:border-slate-600/80 transition-all duration-500">
            {/* Top bar */}
            <div className="bg-gradient-to-r from-slate-800/90 to-slate-800/80 px-6 py-4 flex items-center justify-between border-b border-slate-700/50">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 text-sm font-mono font-semibold">
                  terminal
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500 hover:bg-slate-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-slate-500 hover:bg-slate-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-slate-500 hover:bg-slate-400 transition-colors" />
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-10 font-mono space-y-6">
              <div className="text-emerald-400 text-sm font-semibold tracking-wide">
                <span className="text-cyan-400">$ </span>whoami
              </div>

              <div className="text-white text-4xl md:text-6xl font-bold tracking-tight">
                Abhishek Mehta
              </div>

              {/* Animated title */}
              <div className="h-12 flex items-center">
                <span className="text-emerald-400 mr-3 text-lg">→</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTitle}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
                  >
                    {titles[currentTitle]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Terminal typing */}
              <div className="relative text-slate-300 font-medium tracking-wide text-base sm:text-lg whitespace-nowrap overflow-hidden">
                {/* Invisible full text for stable layout */}
                <span className="opacity-0 pointer-events-none">
                  {fullText}
                </span>

                {/* Typing animation appears on top */}
                <div className="absolute top-0 left-0 flex items-center h-full">
                  {/* Typed text */}
                  <span className="text-emerald-300">{terminalText}</span>

                  {/* Cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-4 sm:w-2 sm:h-6 bg-emerald-400 ml-1"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="text-slate-200 text-base md:text-lg leading-relaxed space-y-2 max-w-2xl font-medium">
                <div>
                  <span className="text-slate-500"># </span>
                  <span>
                    Building scalable applications with modern tech stacks
                  </span>
                </div>

                <div>
                  <span className="text-slate-500"># </span>
                  <span>
                    Transforming ideas into elegant, performant solutions
                  </span>
                </div>
              </div>

              {/* Buttons - CHANGE: Enhanced button styling */}
              <div className="flex flex-wrap gap-4 mt-10 pt-4 border-t border-slate-700/50">
                <motion.button
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-mono font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50"
                >
                  <Mail className="w-4 h-4" />$ contact --now
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  href="/assets/images/Abhishek_Mehta_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 border-2 border-emerald-400/60 text-emerald-300 hover:text-emerald-200 bg-emerald-500/5 hover:bg-emerald-500/15 font-mono font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-400/30 hover:border-emerald-300"
                >
                  <Download className="w-4 h-4" />$ download --resume
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 my-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: Github,
              href: "https://github.com/abhishek-mehta-dev",
              label: "GitHub",
            },
            {
              icon: Linkedin,
              href: "https://www.linkedin.com/in/abhishek-mehta-0724ab256/",
              label: "LinkedIn",
            },
            {
              icon: Mail,
              href: "mailto:mehtaabhishek.dev@gmail.com",
              label: "Email",
            },
            {
              icon: SiDocker,
              href: "https://hub.docker.com/u/abhishekmehtadev/",
              label: "Docker Hub",
            },
          ].map(({ icon: Icon, href, label }, index) => (
            <motion.a
              key={label}
              href={href}
              className="group p-4 rounded-full bg-slate-800/50 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 backdrop-blur-md border border-slate-600/40 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-400/30"
              aria-label={label}
              variants={scaleIn}
              custom={index}
              whileHover={{
                scale: 1.25,
                rotate: 360,
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="h-6 w-6 text-slate-300 group-hover:text-cyan-300 transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {stats.map(({ number, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              variants={slideInLeft}
              custom={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/70 backdrop-blur-md border border-slate-600/40 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20"
              whileHover={{
                scale: 1.08,
                y: -12,
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {number}
              </motion.div>
              <div className="text-sm text-slate-300 font-medium">{label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight"
            variants={fadeInUp}
            custom={0}
          >
            Tech Stack & Expertise
          </motion.h3>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={containerVariants}
          >
            {techStack.map(({ name, icon: Icon }, index) => (
              <motion.div
                key={name}
                variants={scaleIn}
                custom={index}
                className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-md rounded-full border border-slate-600/50 hover:border-cyan-400/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/20"
                whileHover={{
                  scale: 1.12,
                  y: -8,
                  boxShadow: "0 15px 40px rgba(6, 182, 212, 0.25)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Icon className="text-2xl text-cyan-300" />
                </motion.div>
                <span className="text-slate-200 font-semibold">{name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill Visualizations with Charts */}
          <motion.div
            className="max-w-6xl mx-auto mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h4
              className="text-xl md:text-2xl font-bold text-cyan-300 mb-12 text-center"
              variants={fadeInUp}
              custom={0}
            >
              Skill Proficiency Visualization
            </motion.h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Radar Chart */}
              <motion.div
                variants={fadeInUp}
                custom={1}
                className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40 hover:border-cyan-400/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10"
              >
                <h5 className="text-lg font-bold text-slate-200 mb-6 text-center flex items-center justify-center gap-2">
                  <Layers className="h-5 w-5 text-cyan-400" />
                  Overall Proficiency
                </h5>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={skillsData.slice(0, 8)}>
                    <PolarGrid stroke="#475569" strokeOpacity={0.3} />
                    <PolarAngleAxis
                      dataKey="name"
                      tick={{ fill: "#94a3b8", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#64748b" }}
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="proficiency"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Bar Chart by Category */}
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-md rounded-2xl p-6 border border-slate-600/40 hover:border-cyan-400/50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10"
              >
                <h5 className="text-lg font-bold text-slate-200 mb-6 text-center flex items-center justify-center gap-2">
                  <Code className="h-5 w-5 text-emerald-400" />
                  Top Skills Comparison
                </h5>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={skillsData.slice(0, 8)}
                    margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fill: "#64748b" }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #475569",
                        borderRadius: "8px",
                        color: "#e2e8f0",
                      }}
                      cursor={{ fill: "#334155", opacity: 0.3 }}
                    />
                    <Bar dataKey="proficiency" radius={[8, 8, 0, 0]}>
                      {skillsData.slice(0, 8).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.proficiency >= 85
                              ? "#10b981"
                              : entry.proficiency >= 70
                              ? "#3b82f6"
                              : "#8b5cf6"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Skill Pills with Icons */}
            <motion.div
              variants={fadeInUp}
              custom={3}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {skillsData.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-xl p-4 border border-slate-600/40 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <skill.icon className="text-2xl text-cyan-300" />
                    <span className="text-emerald-400 font-bold text-sm">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="text-slate-200 font-semibold text-sm mb-1">
                    {skill.name}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {skill.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map(({ title, icon: Icon, description }, index) => (
            <motion.div
              key={title}
              variants={slideInRight}
              custom={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 via-slate-700/40 to-slate-800/60 backdrop-blur-md border border-slate-600/40 hover:border-cyan-400/60 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-cyan-500/15"
              whileHover={{
                scale: 1.08,
                y: -12,
                rotateY: 5,
                boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              >
                <Icon className="h-10 w-10 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-all duration-300" />
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
              <p className="text-slate-300 text-sm font-medium">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.button
            onClick={scrollToNext}
            className="group transition-all duration-300"
            aria-label="Scroll to next section"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex flex-col items-center space-y-2 text-slate-400 hover:text-cyan-300 transition-colors duration-300">
              <span className="text-sm font-medium">
                <ChevronDown size={40} />
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
