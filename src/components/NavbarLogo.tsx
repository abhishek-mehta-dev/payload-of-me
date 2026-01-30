"use client";

import { motion } from "framer-motion";

const NavbarLogo = () => {
  return (
    <motion.div
      className="flex items-center gap-4 cursor-pointer group select-none"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Circle Background */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-black rounded-full border border-slate-700/50 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-cyan-500/30 transition-colors duration-300">
          {/* Inner sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Code Symbol */}
          <span className="font-mono text-cyan-400 font-bold text-lg tracking-tighter group-hover:text-cyan-300 transition-colors">
            {">_"}
          </span>
        </div>
      </div>

      {/* Text Container */}
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-serif text-gray-900 dark:text-white tracking-wide font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-50 transition-colors duration-300 leading-none drop-shadow-md">
          Abhishek Mehta
        </h1>
        <span className="text-[10px] md:text-xs text-gray-600 dark:text-slate-300 font-light tracking-wider uppercase mt-1 group-hover:text-cyan-600/80 dark:group-hover:text-cyan-400/80 transition-colors duration-300">
          Full-stack developer • Turning Ideas into Clean Software
        </span>
      </div>
    </motion.div>
  );
};

export default NavbarLogo;
