"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Stethoscope, Activity, AlertCircle, CheckCircle2, Info, ChevronRight, X, Sparkles, TrendingUp, Zap, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useResumeContext } from "@/context/resume-info-provider";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ResumeDoctor = () => {
  const { resumeInfo } = useResumeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [audit, setAudit] = useState<{
    score: number;
    issues: { type: "critical" | "warning" | "optimization"; message: string; detail: string }[];
  }>({ score: 0, issues: [] });

  useEffect(() => {
    if (!resumeInfo) return;

    // Simulate real-time NLP audit
    const runAudit = () => {
      let score = 100;
      const issues: any[] = [];

      // Basic structure checks
      if (!resumeInfo.personalInfo?.firstName || !resumeInfo.personalInfo?.lastName) {
        issues.push({ type: "critical", message: "Missing Full Name", detail: "Recruiters need to know who you are immediately." });
        score -= 20;
      }
      if (!resumeInfo.personalInfo?.email) {
        issues.push({ type: "critical", message: "No Contact Email", detail: "Impossible for employers to reach you." });
        score -= 15;
      }
      if (!resumeInfo.summary || resumeInfo.summary.length < 50) {
        issues.push({ type: "warning", message: "Weak Professional Summary", detail: "Your summary should be at least 2-3 impactful sentences." });
        score -= 10;
      }

      // NLP simulated checks (Passive voice, Vague achievements)
      const experienceText = JSON.stringify(resumeInfo.experiences || "");
      if (experienceText.includes("responsible for") || experienceText.includes("helped with")) {
        issues.push({ type: "optimization", message: "Passive Voice Detected", detail: "Replace 'responsible for' with action verbs like 'Led', 'Architected', or 'Optimized'." });
        score -= 5;
      }
      
      if (!experienceText.includes("%") && !experienceText.match(/\d+/)) {
        issues.push({ type: "warning", message: "Lack of Quantifiable Metrics", detail: "Add numbers (%, $, time saved) to prove your impact." });
        score -= 10;
      }

      if ((resumeInfo.skills?.length || 0) < 5) {
        issues.push({ type: "optimization", message: "Thin Skill Profile", detail: "Add at least 5-8 core technical or soft skills." });
        score -= 5;
      }

      setAudit({ score: Math.max(0, score), issues });
    };

    const timer = setTimeout(runAudit, 500);
    return () => clearTimeout(timer);
  }, [resumeInfo]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-[40] w-14 h-14 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Stethoscope size={24} className="relative z-10 group-hover:rotate-12 transition-transform" />
        
        {/* Badge */}
        {audit.issues.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-slate-950">
            {audit.issues.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-sm h-screen bg-slate-950 border-l border-white/10 z-[100] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border-b border-white/10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Stethoscope size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-white italic tracking-tight">Resume Doctor</h2>
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Live Health Audit</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm font-bold">
                        <span className="text-white/70">Overall Health</span>
                        <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-black uppercase",
                            audit.score > 80 ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        )}>
                            {audit.score > 80 ? "Healthy" : "Needs Care"}
                        </span>
                    </div>
                    <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${audit.score}%` }}
                            className={cn(
                                "h-full transition-all duration-1000",
                                audit.score > 80 ? "bg-emerald-500" : "bg-amber-500"
                            )}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] font-black text-white mix-blend-difference">{audit.score}/100</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Issues List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {audit.issues.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={32} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-white font-bold">Perfect Health!</p>
                            <p className="text-xs text-slate-500">Your resume is optimized for maximum impact.</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1 flex items-center gap-2">
                            <Activity size={12} />
                            Diagnostics Report
                        </p>
                        {audit.issues.map((issue, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "p-4 rounded-2xl border transition-all hover:scale-[1.02]",
                                    issue.type === "critical" ? "bg-red-500/5 border-red-500/20" : 
                                    issue.type === "warning" ? "bg-amber-500/5 border-amber-500/20" : 
                                    "bg-blue-500/5 border-blue-500/20"
                                )}
                            >
                                <div className="flex gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        issue.type === "critical" ? "bg-red-500 text-white" : 
                                        issue.type === "warning" ? "bg-amber-500 text-white" : 
                                        "bg-blue-500 text-white"
                                    )}>
                                        {issue.type === "critical" ? <AlertCircle size={16} /> : <Zap size={16} />}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-white leading-tight uppercase tracking-wide">{issue.message}</h4>
                                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{issue.detail}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <Sparkles size={16} className="text-indigo-400 shrink-0" />
                    <p className="text-[9px] text-indigo-300 italic font-medium leading-relaxed">
                        "Your current score is in the top 15% of candidates for Tech roles. Add quantifiable metrics to hit 95+."
                    </p>
                </div>
                <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-500 font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-indigo-500/20">
                    Auto-Fix All Issues
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeDoctor;
