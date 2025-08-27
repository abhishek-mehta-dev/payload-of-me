"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const NavbarLogo = () => {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer group relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 -z-10"
        initial={{ scale: 0.8 }}
        whileHover={{
          scale: 1.1,
          opacity: 0.6,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Icon container with enhanced effects */}
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-xl shadow-lg"
        whileHover={{
          rotate: [0, -5, 5, 0],
          scale: 1.1,
        }}
        transition={{
          rotate: { duration: 0.6, ease: "easeInOut" },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {/* Animated code icon */}
        <motion.div
          whileHover={{
            scale: [1, 1.2, 1],
            rotateY: 360,
          }}
          transition={{
            scale: { duration: 0.4, ease: "easeInOut" },
            rotateY: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <Code2 className="h-5 w-5 text-white drop-shadow-sm" />
        </motion.div>

        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-lg"
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Outer shadow glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-40 blur-md -z-10"
          whileHover={{
            scale: 1.3,
            opacity: 0.4,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Subtle shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "200%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />
      </motion.div>

      {/* Enhanced text logo */}
      <motion.div className="relative overflow-hidden">
        <motion.span
          className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-cyan-500 transition-all duration-500 ease-out tracking-tight"
          whileHover={{
            scale: 1.02,
            textShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          AbhishekMehta.dev
        </motion.span>

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{
            width: "100%",
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />

        {/* Text glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/10 to-cyan-500/0 blur-sm opacity-0 group-hover:opacity-100 -z-10"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Floating particles effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60"
          style={{
            top: `${20 + i * 15}%`,
            right: `${-10 + i * 5}%`,
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default NavbarLogo;
