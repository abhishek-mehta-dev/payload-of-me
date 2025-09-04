"use client";

import {
  motion,
  TargetAndTransition,
  useInView,
  Variants,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code,
  Coffee,
  Sparkles,
  Star,
  Zap,
  Globe,
  Send,
  MapPin,
  Phone,
} from "lucide-react";

interface Particle {
  id: number;
  left: string;
  top: string;
  y: number[];
  opacity: number[];
  scale: number[];
  duration: number;
  delay: number;
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      y: [0, -Math.random() * 50 - 20, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.5, 1],
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "About", href: "#about", icon: Star },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Globe },
    { name: "Contact", href: "#contact", icon: Send },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/abhishek-mehta-dev",
      label: "GitHub",
      color: "hover:text-gray-900",
      gradient: "from-gray-700 to-gray-900",
      shadowColor: "rgba(75, 85, 99, 0.3)",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abhishek-mehta-0724ab256/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
      gradient: "from-blue-500 to-blue-700",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Mail,
      href: "mailto:mehtaabhishek.dev@gmail.com",
      label: "Email",
      color: "hover:text-red-500",
      gradient: "from-red-500 to-red-600",
      shadowColor: "rgba(239, 68, 68, 0.3)",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "mehtaabhishek.dev@gmail.com",
      href: "mailto:mehtaabhishek.dev@gmail.com",
    },
    { icon: Phone, text: "+91 8580615737", href: "tel:+918580615737" },
    { icon: MapPin, text: "India", href: "#" },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const slideInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -100,
      rotate: -2,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const slideInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
      rotate: 2,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const linkVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const socialVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
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
        stiffness: 200,
      },
    }),
  };

  const floatingAnimation: TargetAndTransition = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const pulseAnimation: TargetAndTransition = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  const iconFloat: Variants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const heartBeat: Variants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="relative mt-20 overflow-hidden" ref={ref}>
      {/* Animated Background Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:20px_20px]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2.5, delay: 1 }}
      />

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
        animate={floatingAnimation}
        style={{ animationDelay: "0s" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          transition: {
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          },
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-500/8 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          transition: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          },
        }}
      />

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: particle.y,
            opacity: particle.opacity,
            scale: particle.scale,
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative">
        {/* Decorative top border */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* Main footer content */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Brand section */}
            <motion.div
              className="text-center md:text-left"
              variants={slideInLeft}
            >
              <motion.h3
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span className="inline-flex items-center">
                  AbhishekMehta.dev
                  <motion.div
                    className="ml-2"
                    variants={iconFloat}
                    animate="animate"
                  >
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </motion.div>
                </motion.span>
              </motion.h3>

              <motion.p
                className="text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                Passionate MERN Stack Developer crafting digital experiences
                with modern technologies and creative solutions.
              </motion.p>

              {/* Built with love section */}
              <motion.div
                className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <motion.div variants={iconFloat} animate="animate">
                  <Code className="h-4 w-4" />
                </motion.div>
                <span className="text-sm">Built with</span>
                <motion.div variants={heartBeat} animate="animate">
                  <Heart className="h-4 w-4 text-red-400" />
                </motion.div>
                <span className="text-sm">and</span>
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    transition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <Coffee className="h-4 w-4" />
                </motion.div>
              </motion.div>

              {/* Contact info */}
              <motion.div className="space-y-2">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center justify-center md:justify-start space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    <motion.div variants={iconFloat} animate="animate">
                      <item.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors duration-300" />
                    </motion.div>
                    <span className="text-sm">{item.text}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick links */}
            <motion.div className="text-center" variants={fadeInUp}>
              <motion.h4
                className="text-lg font-semibold text-white mb-4"
                whileHover={{
                  scale: 1.05,
                  color: "#60A5FA",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span className="inline-flex items-center">
                  <motion.div
                    className="mr-2"
                    variants={iconFloat}
                    animate="animate"
                  >
                    <Zap className="h-5 w-5 text-blue-400" />
                  </motion.div>
                  Quick Links
                </motion.span>
              </motion.h4>
              <motion.div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-center space-x-2 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
                    variants={linkVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.1,
                      x: 10,
                      boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        transition: {
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                      }}
                    >
                      <link.icon className="h-4 w-4 group-hover:text-blue-400 transition-colors duration-300" />
                    </motion.div>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="text-center md:text-right"
              variants={slideInRight}
            >
              <motion.h4
                className="text-lg font-semibold text-white mb-4"
                whileHover={{
                  scale: 1.05,
                  color: "#A78BFA",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span className="inline-flex items-center">
                  Let&apos;s Connect
                  <motion.div
                    className="ml-2"
                    variants={iconFloat}
                    animate="animate"
                  >
                    <Globe className="h-5 w-5 text-purple-400" />
                  </motion.div>
                </motion.span>
              </motion.h4>
              <motion.p
                className="text-gray-300 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                Ready to bring your ideas to life? Let&apos;s build something
                amazing together.
              </motion.p>
              <motion.a
                href="mailto:mehtaabhishek.dev@gmail.com"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Mail className="h-4 w-4" />
                </motion.div>
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          />

          {/* Bottom section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Copyright */}
            <motion.div
              className="text-center md:text-left"
              variants={fadeInUp}
            >
              <motion.p
                className="text-gray-400"
                whileHover={{
                  scale: 1.02,
                  color: "#9CA3AF",
                  transition: { duration: 0.3 },
                }}
              >
                © {new Date().getFullYear()} Abhishek Mehta. All rights
                reserved.
              </motion.p>
              <motion.p
                className="text-sm text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  color: "#6B7280",
                  transition: { duration: 0.3 },
                }}
              >
                MERN Stack Developer | Backend Specialist
              </motion.p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center space-x-4"
              variants={fadeInUp}
            >
              {socialLinks.map(
                ({ icon: Icon, href, label, gradient, shadowColor }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative p-3 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                    variants={socialVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      boxShadow: `0 10px 30px ${shadowColor}`,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                      animate={pulseAnimation}
                    />
                  </motion.a>
                )
              )}
            </motion.div>

            {/* Scroll to top button */}
            <motion.button
              onClick={scrollToTop}
              className="group p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Scroll to top"
              variants={fadeInUp}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ArrowUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Additional decorative elements */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-400/20 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Star className="h-4 w-4 text-blue-400" />
              </motion.div>
              <span className="text-gray-400 text-sm font-medium">
                Thank you for visiting!
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4 text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
