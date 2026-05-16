"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Bot, 
  BarChart3, 
  Target, 
  Sparkles,
  Zap
} from "lucide-react";

export const AuthIllustration = () => {
  // 5 nodes perfectly distributed to form a 5-pointed star
  const nodes = [
    { icon: <FileText size={20} />, color: "text-indigo-400", label: "ATS Optimizer", x: 0, y: -130, delay: 0 },
    { icon: <Zap size={20} />, color: "text-yellow-400", label: "Auto Apply", x: 124, y: -40, delay: 0.3 },
    { icon: <Bot size={20} />, color: "text-purple-400", label: "Interview AI", x: 76, y: 105, delay: 0.6 },
    { icon: <BarChart3 size={20} />, color: "text-pink-400", label: "Portfolio Analytics", x: -76, y: 105, delay: 0.9 },
    { icon: <Target size={20} />, color: "text-emerald-400", label: "Smart Tracker", x: -124, y: -40, delay: 1.2 },
  ];

  return (
    <div className="relative h-[480px] w-full flex items-center justify-center pointer-events-none scale-[0.85] xl:scale-100">
      {/* Central Pulsing Star Core */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl z-0"
      />

      {/* SVG Constellation Layer */}
      <svg className="absolute inset-0 h-full w-[480px] overflow-visible z-0 mx-auto">
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 5-Pointed Star Connections (0->2->4->1->3->0) */}
        <motion.path
          d={`M ${240 + nodes[0].x} ${240 + nodes[0].y} ` +
             `L ${240 + nodes[2].x} ${240 + nodes[2].y} ` +
             `L ${240 + nodes[4].x} ${240 + nodes[4].y} ` +
             `L ${240 + nodes[1].x} ${240 + nodes[1].y} ` +
             `L ${240 + nodes[3].x} ${240 + nodes[3].y} Z`}
          stroke="url(#neonGradient)"
          strokeWidth="3"
          fill="none"
          filter="url(#neonGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
        />

        {/* Outer Pentagon Perimeter */}
        <motion.path
          d={`M ${240 + nodes[0].x} ${240 + nodes[0].y} ` +
             `L ${240 + nodes[1].x} ${240 + nodes[1].y} ` +
             `L ${240 + nodes[2].x} ${240 + nodes[2].y} ` +
             `L ${240 + nodes[3].x} ${240 + nodes[3].y} ` +
             `L ${240 + nodes[4].x} ${240 + nodes[4].y} Z`}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 2.5, ease: "linear" }}
        />
      </svg>

      {/* Feature Cards Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: node.x,
              y: node.y 
            }}
            transition={{ 
              delay: node.delay,
              type: "spring",
              stiffness: 90,
              damping: 15
            }}
            className="absolute flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-3"
            >
              {/* Icon Orb */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/60 shadow-2xl backdrop-blur-2xl">
                  <div className={`${node.color} drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]`}>
                    {node.icon}
                  </div>
                  
                  {/* Corner Sparkle */}
                  <motion.div
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="absolute -top-1 -right-1 text-indigo-500"
                  >
                    <Sparkles size={12} className="fill-indigo-500" />
                  </motion.div>
                </div>
              </div>
              
              {/* Feature Label */}
              <div className="whitespace-nowrap px-4 py-1.5 rounded-full border border-indigo-500/10 bg-background/80 backdrop-blur-md shadow-lg">
                <span className="text-[11px] font-bold tracking-wide text-foreground/90">
                  {node.label}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Ambient Shooting Stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={{
            opacity: [0, 1, 0],
            x: [Math.random() * 600 - 300, Math.random() * 600 - 300 + 200],
            y: [Math.random() * 600 - 300, Math.random() * 600 - 300 + 100],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "easeOut"
          }}
          className="absolute h-px w-20 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent rotate-45"
        />
      ))}
      
      {/* Floating Star Dust */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          className="absolute h-0.5 w-0.5 rounded-full bg-indigo-500/30"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
    </div>
  );
};
