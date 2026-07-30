"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { gsap, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/config";

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

const inputClasses =
  "w-full bg-surface border border-line rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors duration-300";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(
    profile.location.name,
  )}`;
  const phoneLink = `tel:${profile.phone.number.replace(/\s+/g, "")}`;
  const emailLink = `mailto:${profile.email.address}`;

  const contactInfo = [
    { icon: Mail, label: "Email", value: profile.email.address, href: emailLink },
    { icon: Phone, label: "Phone", value: profile.phone.number, href: phoneLink },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location.name,
      href: mapLink,
    },
  ];

  useGSAP(
    () => {
      gsap.from(".contact-left > *", {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-left", start: "top 80%", once: true },
      });

      gsap.from(".contact-form-panel", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-panel",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".contact-pill", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-pill", start: "top 92%", once: true },
      });
    },
    { scope: rootRef },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submitted_on: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        to_email: "mehtaabhishek.dev@gmail.com",
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={rootRef}
      className="section-responsive relative overflow-hidden"
    >
      <div className="container-responsive">
        <SectionHeading
          index="05"
          label="Contact"
          title="Let's"
          accent="Connect"
          subtitle="Ready to bring your ideas to life? Let's discuss your next project and create something amazing together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: contact info */}
          <div className="contact-left">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-3">
              <MessageCircle className="h-7 w-7 text-brand" />
              Get In Touch
            </h3>

            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
              I&apos;m eager to collaborate on impactful projects and contribute
              to teams that value growth, innovation, and technical excellence.
              Let&apos;s connect and build transformative solutions together!
            </p>

            <div className="space-y-3 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel={label === "Location" ? "noopener noreferrer" : undefined}
                  className="panel panel-hover flex items-center gap-4 p-4 group"
                >
                  <span className="p-2.5 rounded-md bg-brand/10 border border-brand/25">
                    <Icon className="h-5 w-5 text-brand" />
                  </span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {label}
                    </span>
                    <span className="block font-medium group-hover:text-brand transition-colors duration-300">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
                Follow Me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group p-3.5 rounded-full border border-line bg-card hover:border-brand transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-brand transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="panel p-4 flex items-center gap-3 border-brand/30 bg-brand/5">
              <Clock className="h-5 w-5 text-brand shrink-0" />
              <div>
                <p className="text-sm font-medium">Quick Response</p>
                <p className="text-xs text-muted-foreground">
                  Usually responds within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-panel panel p-6 sm:p-8">
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-md bg-brand/10 border border-brand/25">
                <Send className="h-5 w-5 text-brand" />
              </span>
              Send a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-md border border-destructive/40 bg-destructive/10 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputClasses}
                  required
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={inputClasses}
                  required
                />
              </div>

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClasses}
                required
              />

              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={inputClasses}
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`${inputClasses} resize-none`}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="btn-brand w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />$ send --message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="contact-pill inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-line bg-card font-mono text-sm">
            <MessageCircle className="h-5 w-5 text-brand" />
            <span className="text-muted-foreground">
              Let&apos;s Build Something Amazing Together
            </span>
            <Sparkles className="h-5 w-5 text-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
