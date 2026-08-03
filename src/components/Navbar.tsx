"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import { ThemeToggle } from "./ThemeToggle";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToSection, lockPageScroll, unlockPageScroll } from "@/lib/lenis-store";

interface NavbarProps {
  hasBlogs?: boolean;
}

export default function Navbar({ hasBlogs = false }: NavbarProps) {
  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/#home" },
      { label: "About", href: "/#about" },
      { label: "Skills", href: "/#skills" },
      { label: "Experience", href: "/#experience" },
      { label: "Projects", href: "/#projects" },
      ...(hasBlogs ? [{ label: "Blogs", href: "/blogs" }] : []),
      { label: "Contact", href: "/#contact" },
    ],
    [hasBlogs],
  );

  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef<string | number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // Hide on scroll down, show on scroll up
  useGSAP(() => {
    if (!headerRef.current) return;

    const showAnim = gsap
      .from(headerRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.35,
        ease: "power2.out",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === -1) showAnim.play();
        else if (self.scroll() > 120) showAnim.reverse();
        setScrolled(self.scroll() > 20);
      },
    });
  });

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) {
        if (window.location.pathname === "/") {
          setActiveSection("Home");
        } else if (window.location.pathname.startsWith("/blogs")) {
          setActiveSection("Blogs");
        }
        return;
      }

      const threshold = 180;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        if (!link.href.includes("#")) continue;
        const id = link.href.split("#")[1];
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= threshold) {
          setActiveSection((prev) => (prev !== link.label ? link.label : prev));
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Animate mobile menu items in when it opens + lock scroll
  useEffect(() => {
    if (!isOpen) return;

    lockPageScroll();
    if (mobileMenuRef.current) {
      gsap.from(mobileMenuRef.current.querySelectorAll(".mobile-link"), {
        opacity: 0,
        y: 30,
        stagger: 0.06,
        duration: 0.4,
        ease: "power3.out",
      });
    }

    return () => {
      unlockPageScroll();
      // Navigate only after menu unlocks — otherwise Lenis is still stopped
      const target = pendingScrollRef.current;
      if (target === null) return;
      pendingScrollRef.current = null;
      window.setTimeout(() => {
        scrollToSection(target);
      }, 40);
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string, label: string) => {
    // External page links (e.g. /blogs) — close menu and allow default nav
    if (!href.includes("#")) {
      setIsOpen(false);
      return;
    }

    // On another route — close menu and let browser go to /#section
    if (window.location.pathname !== "/") {
      setIsOpen(false);
      return;
    }

    e.preventDefault();
    setActiveSection(label);

    const id = href.split("#")[1];
    const target: string | number = id === "home" ? 0 : `#${id}`;

    // Menu open: queue scroll for after unlock. Menu closed: scroll now.
    if (isOpen) {
      pendingScrollRef.current = target;
      setIsOpen(false);
      return;
    }

    scrollToSection(target);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={clsx(
          "fixed top-0 left-0 w-full max-w-[100%] z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-line"
            : "bg-transparent border-transparent",
        )}
      >
        <div className="container-responsive flex items-center justify-between h-[72px]">
          <Link href="/" aria-label="Home">
            <NavbarLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((item, index) => {
              const isActive = activeSection === item.label;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.label)}
                  className={clsx(
                    "group relative px-2.5 xl:px-3.5 py-2 font-mono text-sm transition-colors duration-300",
                    isActive
                      ? "text-brand"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="text-brand/60 text-xs mr-1.5 hidden xl:inline">
                    0{index + 1}
                  </span>
                  {item.label}
                  <span
                    className={clsx(
                      "absolute left-3.5 right-3.5 -bottom-px h-px bg-brand transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="lg:hidden p-2.5 rounded-md border border-line bg-card hover:border-brand transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={`${isOpen ? "Close" : "Open"} Menu`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[60] lg:hidden bg-background/97 backdrop-blur-xl flex flex-col justify-center px-6 sm:px-8 overflow-y-auto overscroll-contain pt-24 pb-10"
        >
          {navLinks.map((item, index) => {
            const isActive = activeSection === item.label;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.label)}
                className={clsx(
                  "mobile-link flex min-h-14 items-baseline gap-4 py-3.5 border-b border-line font-display text-2xl sm:text-3xl font-semibold transition-colors",
                  isActive ? "text-brand" : "text-foreground hover:text-brand",
                )}
              >
                <span className="font-mono text-sm text-brand/70">
                  0{index + 1}
                </span>
                {item.label}
              </a>
            );
          })}
          <p className="mobile-link mt-8 font-mono text-[11px] sm:text-xs text-muted-foreground break-all">
            $ contact --now → mehtaabhishek.dev@gmail.com
          </p>
        </div>
      )}
    </>
  );
}
