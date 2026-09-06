"use client"

import { motion } from "framer-motion"

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,194,229,0.08)_0%,transparent_70%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(8,194,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(8,194,229,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orb 1 - top right */}
      <motion.div
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(8,194,229,0.12) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 2 - bottom left */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(8,194,229,0.1) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.97, 1.03, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 3 - top left small */}
      <motion.div
        className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(8,194,229,0.07) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, -10, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 4 - center right */}
      <motion.div
        className="absolute top-[50%] right-[5%] h-[250px] w-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -15, 25, 0],
          y: [0, 20, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glowing line accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Small floating dots */}
      {[
        { top: "15%", left: "20%", delay: 0, duration: 6 },
        { top: "30%", right: "15%", delay: 1, duration: 7 },
        { top: "60%", left: "8%", delay: 2, duration: 5 },
        { top: "75%", right: "25%", delay: 0.5, duration: 8 },
        { top: "45%", left: "35%", delay: 1.5, duration: 6 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
          style={{ top: dot.top, left: dot.left, right: dot.right }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  )
}
