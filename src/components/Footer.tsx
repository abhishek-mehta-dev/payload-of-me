"use client";

import { useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code,
  Coffee,
  Star,
  Send,
  MapPin,
  Phone,
  Globe,
  Sparkles,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { scrollToSection } from "@/lib/lenis-store";
import { profile } from "@/config";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
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
  { icon: Mail, href: "mailto:mehtaabhishek.dev@gmail.com", label: "Email" },
];

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      text: profile.email.address,
      href: `mailto:${profile.email.address}`,
    },
    {
      icon: Phone,
      text: profile.phone.number,
      href: `tel:${profile.phone.number}`,
    },
    {
      icon: MapPin,
      text: profile.location.name,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        profile.location.name,
      )}`,
    },
  ];

  useGSAP(
    () => {
      // Giant watermark name drifts slightly with scroll
      gsap.fromTo(
        ".footer-watermark",
        { yPercent: 30 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.8,
          },
        },
      );

      gsap.from(".footer-col", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-grid", start: "top 88%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden border-t border-line bg-surface/40 noise-overlay"
    >
      {/* Giant outlined watermark */}
      <div
        aria-hidden
        className="footer-watermark pointer-events-none select-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-full text-center font-display font-bold text-stroke whitespace-nowrap text-[14vw] leading-none opacity-40"
      >
        ABHISHEK MEHTA
      </div>

      <div className="container-responsive relative py-14 sm:py-20">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="footer-col">
            <h3 className="font-display text-2xl font-bold mb-4">
              Abhishek<span className="text-brand">.</span>Mehta
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Passionate Full Stack Developer crafting digital experiences with
              modern technologies and creative solutions.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6 font-mono">
              <Code className="h-4 w-4" />
              <span>Built with</span>
              <Heart className="h-4 w-4 text-brand" />
              <span>and</span>
              <Coffee className="h-4 w-4" />
            </div>
            <div className="space-y-2.5">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-brand transition-colors duration-300"
                >
                  <Icon className="h-4 w-4" />
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
              {"// Quick Links"}
            </h4>
            <nav className="space-y-3">
              {quickLinks.map(({ name, href }, i) => (
                <button
                  key={name}
                  onClick={() => scrollToSection(href)}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors duration-300"
                >
                  <span className="font-mono text-xs text-brand/70">
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {name}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="footer-col md:text-right">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5 flex md:justify-end items-center gap-2">
              Let&apos;s Connect <Globe className="h-4 w-4 text-brand" />
            </h4>
            <p className="text-muted-foreground mb-6">
              Ready to bring your ideas to life? Let&apos;s build something
              amazing together.
            </p>
            <a
              href="mailto:mehtaabhishek.dev@gmail.com"
              className="btn-brand !text-sm"
            >
              <Send className="h-4 w-4" />
              Get In Touch
            </a>
          </div>
        </div>

        <div className="h-px bg-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Abhishek Mehta. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
              Full Stack Developer | Backend Specialist
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group p-3 rounded-full border border-line bg-card hover:border-brand transition-colors duration-300"
              >
                <Icon className="h-4.5 w-4.5 text-muted-foreground group-hover:text-brand transition-colors duration-300" />
              </a>
            ))}
            <button
              onClick={() => scrollToSection(0)}
              aria-label="Scroll to top"
              className="group p-3 rounded-full border border-brand/40 bg-brand/10 hover:bg-brand hover:text-brand-foreground transition-colors duration-300"
            >
              <ArrowUp className="h-4.5 w-4.5 text-brand group-hover:text-brand-foreground transition-colors duration-300" />
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-line bg-card font-mono text-xs sm:text-sm">
            <Star className="h-4 w-4 text-brand" />
            <span className="text-muted-foreground">
              Thank you for visiting!
            </span>
            <Sparkles className="h-4 w-4 text-brand" />
          </div>
        </div>
      </div>
    </footer>
  );
}
