"use client";

import type React from "react";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  User,
  AtSign,
  FileText,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

import { profile } from "@/config";

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
    {
      icon: Mail,
      label: "Email",
      value: profile.email.address,
      href: emailLink,
      color: "text-blue-500",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.phone.number,
      href: phoneLink,
      color: "text-green-500",
      gradient: "from-green-500 to-green-600",
      shadowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location.name,
      href: mapLink,
      color: "text-purple-500",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "rgba(147, 51, 234, 0.3)",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/abhishek-mehta-dev",
      label: "GitHub",
      color: "hover:text-gray-900",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abhishek-mehta-0724ab256/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: Mail,
      href: "mailto:mehtaabhishek.dev@gmail.com",
      label: "Email",
      color: "hover:text-red-500",
      gradient: "from-red-500 to-red-600",
    },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const contactItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
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

  const formVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const inputVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 120,
      },
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

  const pulseAnimation: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

      // Prepare template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submitted_on: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        to_email: "mehtaabhishek.dev@gmail.com",
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitted(true);

      // Reset form after 3 seconds
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
      setIsSubmitting(false);
    } finally {
      if (!error) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-900/10 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#3B82F6",
                  transition: { duration: 0.3 },
                }}
              >
                Let&apos;s
              </motion.span>{" "}
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                Connect
              </motion.span>
            </motion.h2>
            <motion.div
              className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "5rem" } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
            <motion.p
              className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Ready to bring your ideas to life? Let&apos;s discuss your next
              project and create something amazing together.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Left Column - Contact Info */}
            <motion.div variants={slideInLeft}>
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
                whileHover={{
                  scale: 1.02,
                  color: "#059669",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span className="inline-flex items-center">
                  <motion.div
                    className="mr-3"
                    variants={iconFloat}
                    animate="animate"
                  >
                    <MessageCircle className="h-8 w-8 text-blue-500" />
                  </motion.div>
                  Get In Touch
                </motion.span>
              </motion.h3>

              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.3 },
                }}
              >
                I&apos;m eager to collaborate on impactful projects and
                contribute to teams that value growth, innovation, and technical
                excellence. Let&apos;s connect and build transformative
                solutions together!
              </motion.p>

              {/* Contact Information */}
              <motion.div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={contactItemVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.05,
                      x: 10,
                      boxShadow: `0 10px 30px ${item.shadowColor}`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.a
                      href={item.href}
                      target={item.label === "Location" ? "_blank" : undefined}
                      rel={
                        item.label === "Location"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 hover:border-gray-300/70 dark:hover:border-slate-600/70 transition-all duration-300 shadow-sm hover:shadow-lg group"
                    >
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient} mr-4 shadow-md`}
                        variants={iconFloat}
                        animate="animate"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.6 },
                        }}
                      >
                        <item.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <motion.p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {item.label}
                        </motion.p>
                        <motion.p
                          className="text-gray-800 dark:text-gray-200 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          {item.value}
                        </motion.p>
                      </div>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.h4
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Follow Me
                </motion.h4>
                <motion.div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                      variants={socialVariants}
                      custom={index}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className={`p-3 rounded-full bg-gradient-to-r ${social.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                        variants={pulseAnimation}
                        animate="animate"
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.div>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Response Time Indicator */}
              <motion.div
                className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-800/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div className="flex items-center">
                  <motion.div variants={iconFloat} animate="animate">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Quick Response
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Usually responds within 24 hours
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div variants={slideInRight}>
              <motion.div
                variants={formVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm overflow-hidden relative">
                  {/* Card glow effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative">
                    <CardTitle className="flex items-center text-2xl">
                      <motion.div
                        className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 mr-3 shadow-md"
                        variants={iconFloat}
                        animate="animate"
                        whileHover={{
                          scale: 1.1,
                          rotate: 360,
                          transition: { duration: 0.6 },
                        }}
                      >
                        <Send className="h-6 w-6 text-white" />
                      </motion.div>
                      <motion.span
                        className="text-gray-800 dark:text-white font-bold"
                        whileHover={{
                          color: "#3B82F6",
                          transition: { duration: 0.3 },
                        }}
                      >
                        Send a Message
                      </motion.span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative">
                    <motion.form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start"
                        >
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-700 dark:text-red-400">
                            {error}
                          </p>
                        </motion.div>
                      )}
                      {/* Name Fields */}
                      <motion.div className="grid grid-cols-2 gap-4">
                        <motion.div
                          variants={inputVariants}
                          custom={0}
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              name="firstName"
                              placeholder="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="pl-10 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white placeholder:!text-gray-400 dark:placeholder:!text-gray-400"
                              required
                            />
                          </div>
                        </motion.div>
                        <motion.div
                          variants={inputVariants}
                          custom={1}
                          whileHover={{ scale: 1.02 }}
                          whileFocus={{ scale: 1.02 }}
                        >
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              name="lastName"
                              placeholder="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="pl-10 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white placeholder:!text-gray-400 dark:placeholder:!text-gray-400"
                              required
                            />
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        variants={inputVariants}
                        custom={2}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <div className="relative">
                          <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white placeholder:!text-gray-400 dark:placeholder:!text-gray-400"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Subject Field */}
                      <motion.div
                        variants={inputVariants}
                        custom={3}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="pl-10 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white placeholder:!text-gray-400 dark:placeholder:!text-gray-400"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Message Field */}
                      <motion.div
                        variants={inputVariants}
                        custom={4}
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <div className="relative">
                          <MessageCircle className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                          <Textarea
                            name="message"
                            placeholder="Your Message"
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="pl-10 border-2 border-gray-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 resize-none !bg-white dark:!bg-slate-700 !text-gray-900 dark:!text-white placeholder:!text-gray-400 dark:placeholder:!text-gray-400"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        variants={inputVariants}
                        custom={5}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting || isSubmitted}
                          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 relative overflow-hidden"
                        >
                          <motion.div className="flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "linear",
                                  }}
                                >
                                  <Sparkles className="h-5 w-5 mr-2" />
                                </motion.div>
                                Sending...
                              </>
                            ) : isSubmitted ? (
                              <>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 200,
                                  }}
                                >
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                </motion.div>
                                Message Sent!
                              </>
                            ) : (
                              <>
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                >
                                  <Send className="h-5 w-5 mr-2" />
                                </motion.div>
                                Send Message
                              </>
                            )}
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.form>
                  </CardContent>

                  {/* Decorative corner element */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-bl-full"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  />
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full border border-blue-200/50 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.2)",
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 15,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
                Let&apos;s Build Something Amazing Together
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
