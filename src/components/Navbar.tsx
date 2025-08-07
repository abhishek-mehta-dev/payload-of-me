"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion"
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import clsx from "clsx"

const navLinks = [
  { label: "Home", href: "#", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("Home")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", "") || "home")
      const currentSection = sections.find((section) => {
        const element = section === "home" ? document.body : document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(
          currentSection === "home" ? "Home" : currentSection.charAt(0).toUpperCase() + currentSection.slice(1),
        )
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation variants
  const headerVariants:Variants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  const logoVariants:Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: -50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
    },
  }

  const navItemVariants:Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 150,
      },
    }),
  }

  const mobileMenuVariants:Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      height: "auto",
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const mobileItemVariants :Variants= {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      x: -30,
      scale: 0.9,
      transition: {
        duration: 0.2,
      },
    },
  }

  const buttonVariants :Variants= {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 200,
      },
    },
  }
  

  const iconRotateVariants:Variants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const backgroundVariants :Variants= {
    initial: {
      opacity: 0,
      backdropFilter: "blur(0px)",
    },
    scrolled: {
      opacity: 1,
      backdropFilter: "blur(20px)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  const activeIndicatorVariants :Variants= {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const glowVariants :Variants= {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 30px rgba(147, 51, 234, 0.4)",
        "0 0 20px rgba(59, 130, 246, 0.3)",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20" : "backdrop-blur-md bg-white/60",
      )}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        variants={backgroundVariants}
        initial="initial"
        animate={scrolled ? "scrolled" : "initial"}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div variants={logoVariants}>
            <Link href="/" className="relative group">
              <motion.span
                className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                AbhishekMehta.dev
              </motion.span>

              {/* Logo glow effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                variants={glowVariants}
                animate="animate"
              />

              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-4 w-4 text-purple-500 opacity-70" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, index) => {
              const isActive = activeSection.toLowerCase() === item.label.toLowerCase()
              return (
                <motion.div
                  key={item.href}
                  variants={navItemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={item.href}
                    className="relative group px-4 py-2 rounded-full text-gray-700 font-medium hover:text-white transition-all duration-300 flex items-center space-x-2"
                  >
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 360] : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                    </motion.div>

                    {/* Label */}
                    <span className="relative z-10">{item.label}</span>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          variants={activeIndicatorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layoutId="activeTab"
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"
                      whileHover={{ scale: 1.1 }}
                    />
                  </a>
                </motion.div>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            variants={buttonVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-6 h-6">
              <motion.div variants={iconRotateVariants} animate={isOpen ? "open" : "closed"}>
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="absolute inset-0 w-6 h-6 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="absolute inset-0 w-6 h-6 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="py-4 space-y-2 bg-white/90 backdrop-blur-xl rounded-2xl mx-4 mb-4 shadow-xl border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                {navLinks.map((item, index) => {
                  const isActive = activeSection.toLowerCase() === item.label.toLowerCase()
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 mx-4 px-4 py-3 rounded-xl text-gray-700 font-medium hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 relative group"
                      variants={mobileItemVariants}
                      custom={index}
                      whileHover={{
                        scale: 1.05,
                        x: 10,
                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Icon */}
                      <motion.div
                        animate={{
                          rotate: isActive ? [0, 360] : 0,
                          scale: isActive ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.div>

                      {/* Label */}
                      <span className="relative z-10">{item.label}</span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      )}

                      {/* Hover glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.02 }}
                      />
                    </motion.a>
                  )
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + Math.sin(i) * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.header>
  )
}
