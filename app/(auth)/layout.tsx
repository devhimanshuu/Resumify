"use client";

import { AuthIllustration } from "@/components/ui/auth-illustration";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { motion } from "framer-motion";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-70">
        <FallingPattern
          className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
          color="hsl(var(--primary))"
        />
      </div>
      <div className="absolute inset-x-0 top-0 z-0 h-72 bg-gradient-to-b from-indigo-500/10 to-transparent" />
      
      {/* Background Blobs */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] z-0 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[80px] z-0 pointer-events-none" />

      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 sm:px-16 lg:px-24 py-12 lg:grid-cols-2 h-full max-h-screen overflow-hidden">
        <div className="hidden flex-col justify-center text-center lg:flex lg:text-left lg:items-start w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 shadow-sm"
          >
            CareerForge AI Suite
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl xl:text-6xl font-black tracking-tight font-display leading-[1.1]"
          >
            Build the career <br /> 
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">system</span> behind <br />
            the offer.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base xl:text-lg leading-relaxed text-muted-foreground max-w-lg font-medium"
          >
            Sign in to manage resume versions, applications, portfolio analytics, and AI-powered preparation from one polished workspace.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 mb-12 w-full flex items-center justify-center"
          >
            <AuthIllustration />
          </motion.div>
        </div>
        <div className="mx-auto w-full max-w-md rounded-lg border bg-card/85 p-4 shadow-2xl shadow-black/[0.06] backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
