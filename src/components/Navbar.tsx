"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import NavbarLogo from "./NavbarLogo";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { scrollY } = useScroll();

  const [isScrolling, setIsScrolling] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const threshold = 180;
      const sections = navLinks.map((link) => ({
        id: link.href.replace("#", ""),
        label: link.label,
      }));

      // Special case: very top of page
      if (window.scrollY < 20) {
        setActiveSection((prev) => prev !== "Home" ? "Home" : prev);
        return;
      }

      // Check sections from bottom to top to find the first one that has passed the threshold
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.id) continue;

        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            setActiveSection((prev) => (prev !== section.label ? section.label : prev));
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  // Fixed smooth scroll function with proper offset calculation
  const handleSmoothScroll = (
    e: React.MouseEvent,
    href: string,
    closeMenu = false
  ) => {
    e.preventDefault();

    if (closeMenu) {
      setIsOpen(false);
    }

    setTimeout(() => {
      setIsScrolling(true);

      // Handle home link scroll to top
      if (href === "#home" || href === "#" || href === "") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setTimeout(() => setIsScrolling(false), 1000);
        return;
      }

      // Clean the href to get the section ID
      const sectionId = href.startsWith("#") ? href.substring(1) : href;
      const target = document.getElementById(sectionId);

      if (target) {
        // Calculate exact offset
        const rect = target.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // Get actual navbar height
        const navbar = document.querySelector("header");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        // Calculate final scroll position with some buffer
        const targetPosition = rect.top + scrollTop - navbarHeight - 10;

        window.scrollTo({
          top: Math.max(0, targetPosition), // Ensure we don't scroll to negative values
          behavior: "smooth",
        });
      }

      setTimeout(() => setIsScrolling(false), 1000);
    }, closeMenu ? 300 : 0);
  };

  // Animation variants
  const headerVariants: Variants = {
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
  };

  const logoVariants: Variants = {
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
  };

  const navItemVariants: Variants = {
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
  };

  const mobileMenuVariants: Variants = {
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
  };

  const mobileItemVariants: Variants = {
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
  };

  const buttonVariants: Variants = {
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
  };

  const iconRotateVariants: Variants = {
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
  };

  const backgroundVariants: Variants = {
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
  };

  const activeIndicatorVariants: Variants = {
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
  };

  return (
    <motion.header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 block",
        scrolled
          ? "backdrop-blur-xl bg-background/80 dark:bg-[#0B1120]/90 shadow-lg border-b border-border/40"
          : "backdrop-blur-md bg-background/50 dark:bg-[#0B1120]/80"
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
              <NavbarLogo />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, index) => {
              const isActive =
                activeSection.toLowerCase() === item.label.toLowerCase();
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
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="relative group px-4 py-2 rounded-full text-muted-foreground font-medium hover:text-foreground transition-all duration-300 flex items-center space-x-2"
                  >
                    {/* Icon */}
                    <motion.div
                      className="relative z-10"
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
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <motion.button
              className="md:hidden relative p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              variants={buttonVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  variants={iconRotateVariants}
                  animate={isOpen ? "open" : "closed"}
                >
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="absolute inset-0 w-6 h-6 text-foreground" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="absolute inset-0 w-6 h-6 text-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.button>
          </div>
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
                className="py-4 space-y-2 bg-background/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl mx-4 mb-4 shadow-xl border border-border/10"
                whileHover={{ scale: 1.02 }}
              >
                {navLinks.map((item, index) => {
                  const isActive =
                    activeSection.toLowerCase() === item.label.toLowerCase();
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href, true)}
                      className="flex items-center space-x-3 mx-4 px-4 py-3 rounded-xl text-muted-foreground font-medium hover:text-foreground hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 relative group"
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
                        className="relative z-10"
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
                  );
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
  );
}
