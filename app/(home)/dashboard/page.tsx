"use client";

import React from "react";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";
import { Sparkles, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-muted/20 pb-12">
      <div className="w-full mx-auto max-w-7xl py-8 px-5">
        {/* Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 p-8 rounded-3xl bg-card border border-border/50 shadow-sm relative overflow-hidden gap-6"
        >
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                My Dashboard
              </h1>
              <Sparkles size={24} className="text-indigo-500 animate-pulse" />
            </div>
            <p className="text-muted-foreground text-lg max-w-xl">
              Create, edit, and manage your AI-powered resumes. Craft the perfect professional story to land your dream job.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4 relative z-10">
            <TrashListBox />
          </div>
        </motion.div>

        {/* Resume Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Your Resumes</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AddResume />
            <ResumeList />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
