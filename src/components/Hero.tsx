"use client";

import { useState, useEffect, useMemo } from "react";
import {
  motion,
  TargetAndTransition,
  useScroll,
  useTransform,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
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
} from "react-icons/si";

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

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { scrollY } = useScroll();
  const [particles, setParticles] = useState<Particle[]>([]);

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

  const letters = titles[currentTitle].split("");

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        className="relative z-10 container mx-auto px-4 py-16"
        style={{ y: textY }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.div className="mb-6" variants={fadeInUp} custom={0}>
              <motion.span
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-teal-500/20 text-cyan-200 rounded-full text-sm font-medium backdrop-blur-md border border-cyan-400/30 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                👋 Hello, I&apos;m Abhishek Mehta
              </motion.span>
            </motion.div>

            {/* Animated Title */}

            <div
              className="relative flex items-center justify-center overflow-hidden 
                    h-16 sm:h-20 md:h-24 lg:h-28"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTitle}
                  className="flex gap-1 whitespace-nowrap 
                     text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 
                     font-bold leading-tight text-center"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {letters.map((char, i) => (
                    <motion.span
                      key={i + char}
                      initial={{ y: -120, opacity: 0, rotate: -20 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.08,
                        type: "spring",
                        stiffness: 80,
                        damping: 15,
                      }}
                      className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 
                         bg-clip-text text-transparent inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    className="text-cyan-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    |
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-slate-200"
              variants={fadeInUp}
              custom={2}
            >
              Crafting Digital Experiences with{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400"
                whileHover={{ scale: 1.1 }}
                style={{ display: "inline-block" }}
              >
                Passion
              </motion.span>{" "}
              &{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400"
                whileHover={{ scale: 1.1 }}
                style={{ display: "inline-block" }}
              >
                Precision
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
              custom={3}
            >
              I&apos;m a passionate full-stack developer specializing in the
              MERN stack, with a keen eye for creating scalable, user‑centric
              applications. From concept to deployment, I bring ideas to life
              with clean code and innovative solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              variants={fadeInUp}
              custom={4}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-cyan-400/20"
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                  </motion.div>
                  Let&apos;s Work Together
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/assets/images/abhishek.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border-2 border-slate-400/50 text-slate-200 hover:bg-gradient-to-r hover:from-slate-800/80 hover:to-slate-700/80 hover:text-white px-8 py-4 text-lg font-semibold rounded-full bg-slate-800/30 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.5,
                      }}
                    >
                      <Download className="mr-2 h-5 w-5" />
                    </motion.div>
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center space-x-6 mb-16"
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
                  className="group p-4 rounded-full bg-slate-800/40 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 backdrop-blur-md border border-slate-600/30 hover:border-cyan-400/50 shadow-lg"
                  aria-label={label}
                  variants={scaleIn}
                  custom={index}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-6 w-6 text-slate-300 group-hover:text-cyan-200 transition-colors duration-300" />
                </motion.a>
              ))}
            </motion.div>
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
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md border border-slate-600/30 hover:border-cyan-400/40 hover:bg-gradient-to-br hover:from-slate-700/50 hover:to-slate-800/70 transition-all duration-300 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
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
                <div className="text-sm text-slate-300">{label}</div>
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
              className="text-2xl font-semibold text-white mb-8"
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
                  className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-full border border-slate-600/40 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-slate-700/60 hover:to-slate-600/60 transition-all duration-300 shadow-lg"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)",
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
                  <span className="text-slate-200 font-medium">{name}</span>
                </motion.div>
              ))}
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
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/50 backdrop-blur-md border border-slate-600/30 hover:border-cyan-400/40 transition-all duration-300 group shadow-lg hover:shadow-xl"
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
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
                <h4 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h4>
                <p className="text-slate-300 text-sm">{description}</p>
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
        </div>
      </motion.div>
    </section>
  );
}
