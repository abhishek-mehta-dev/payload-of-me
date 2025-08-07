"use client"

import type React from "react"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mehtaabhishek.dev@gmail.com",
      href: "mailto:mehtaabhishek.dev@gmail.com",
      color: "text-blue-500",
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8580615737",
      href: "tel:+918580615737",
      color: "text-green-500",
      gradient: "from-green-500 to-green-600",
      shadowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
      color: "text-purple-500",
      gradient: "from-purple-500 to-purple-600",
      shadowColor: "rgba(147, 51, 234, 0.3)",
    },
  ]

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
  ]

  // Animation variants
  const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  

  const slideInLeft:Variants = {
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
  }

  const slideInRight :Variants= {
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
  }

  const contactItemVariants :Variants= {
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
  }

  const socialVariants:Variants = {
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
  }

  const formVariants:Variants = {
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
  }

  const inputVariants :Variants= {
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
  }

  const titleVariants :Variants= {
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
  }

  const iconFloat:Variants = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const pulseAnimation :Variants= {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
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
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"
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

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <motion.span
                className="inline-block"
                whileHover={{
                  scale: 1.05,
                  color: "#3B82F6",
                  transition: { duration: 0.3 },
                }}
              >
                Let	&apos;s
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
              className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
            <motion.p
              className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Ready to bring your ideas to life? Let	&apos;s discuss your next project and create something amazing together.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-12"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Left Column - Contact Info */}
            <motion.div variants={slideInLeft}>
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900"
                whileHover={{
                  scale: 1.02,
                  color: "#059669",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.span className="inline-flex items-center">
                  <motion.div className="mr-3" variants={iconFloat} animate="animate">
                    <MessageCircle className="h-8 w-8 text-blue-500" />
                  </motion.div>
                  Get In Touch
                </motion.span>
              </motion.h3>

              <motion.p
                className="text-gray-700 mb-8 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.3 },
                }}
              >
                I	&apos;m eager to collaborate on impactful projects and contribute to teams that value growth, innovation,
                and technical excellence. Let	&apos;s connect and build transformative solutions together!
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
                      className="flex items-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/70 transition-all duration-300 shadow-sm hover:shadow-lg group"
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
                        <motion.p className="text-sm text-gray-500 font-medium">{item.label}</motion.p>
                        <motion.p
                          className="text-gray-800 font-semibold group-hover:text-blue-600 transition-colors duration-300"
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
                  className="text-lg font-semibold text-gray-800 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
                className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div className="flex items-center">
                  <motion.div variants={iconFloat} animate="animate">
                    <Clock className="h-5 w-5 text-green-600 mr-3" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Quick Response</p>
                    <p className="text-xs text-green-600">Usually responds within 24 hours</p>
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
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden relative">
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
                        className="text-gray-800 font-bold"
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
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={containerVariants}
                    >
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
                              className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
                              className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
                            className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
                            className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 bg-white/80"
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
                            className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 resize-none bg-white/80"
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
                                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
                                  transition={{ type: "spring", stiffness: 200 }}
                                >
                                  <CheckCircle className="h-5 w-5 mr-2" />
                                </motion.div>
                                Message Sent!
                              </>
                            ) : (
                              <>
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
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
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </motion.div>
              <span className="text-gray-700 font-semibold text-lg">Let	&apos;s Build Something Amazing Together</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Sparkles className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
