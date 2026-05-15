"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Bot,
  Palette,
  Share2,
  Shield,
  Zap,
  Sparkles,
  Trophy,
  Target,
  FileText,
  ListTodo,
} from "lucide-react";

export const BentoItem = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    };

    item.addEventListener("mousemove", handleMouseMove);

    return () => {
      item.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 p-8 glass group transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
};

export const CyberneticBentoGrid = () => {
  return (
    <div className="w-full max-w-6xl mx-auto z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border border-border mb-4 glass">
          <Zap size="14px" className="text-indigo-500" />
          The Complete Career Arsenal
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Get Hired
          </span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From AI-powered content generation to tracking your applications,
          CareerForge has all the tools to accelerate your career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {/* Large Feature Item - Resume AI */}
        <BentoItem className="md:col-span-2 md:row-span-2 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20">
              <Bot className="text-indigo-500" size="24px" />
            </div>
            <h2 className="text-3xl font-bold">AI Content Generation</h2>
            <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-xl">
              Writer&apos;s block? Let our advanced AI analyze your role and
              instantly generate professional, tailored summaries and
              impact-driven bullet points that grab recruiters&apos; attention.
            </p>
          </div>
          <div className="mt-8 h-56 w-full bg-gradient-to-t from-indigo-500/10 to-transparent rounded-xl border border-indigo-500/20 flex items-end justify-center overflow-hidden relative">
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="w-[80%] mx-auto h-[80%] bg-background rounded-t-xl border-x border-t border-indigo-500/20 shadow-2xl p-6 flex flex-col gap-4 animate-slide-in-right">
                <div className="h-5 w-1/3 bg-indigo-500/20 rounded-full" />
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-muted rounded-full" />
                  <div className="h-3 w-5/6 bg-muted rounded-full" />
                  <div className="h-3 w-4/6 bg-muted rounded-full" />
                </div>
                <div className="mt-auto flex justify-end">
                  <div className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] rounded-lg flex items-center gap-1 font-semibold">
                    <Sparkles size={12} /> AI Optimized
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BentoItem>

        {/* Job Tracker */}
        <BentoItem className="md:col-span-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
            <ListTodo className="text-blue-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">Kanban Job Tracker</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Manage your entire application pipeline visually. Move jobs from
            &apos;Applied&apos; to &apos;Interviewing&apos; to
            &apos;Offer&apos;.
          </p>
          <div className="mt-4 flex gap-2">
            <div className="h-2 flex-1 bg-blue-500/20 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-blue-500 rounded-full" />
            </div>
            <div className="h-2 flex-1 bg-orange-500/20 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-orange-500 rounded-full" />
            </div>
            <div className="h-2 flex-1 bg-green-500/20 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-green-500 rounded-full" />
            </div>
          </div>
        </BentoItem>

        {/* Cover Letters */}
        <BentoItem>
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 border border-orange-500/20">
            <FileText className="text-orange-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">Cover Letters</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Generate targeted cover letters perfectly aligned with your resume
            and the job description.
          </p>
        </BentoItem>

        {/* ATS Optimized */}
        <BentoItem>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
            <Shield className="text-cyan-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">ATS-Optimized</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Templates engineered to parse flawlessly through modern Applicant
            Tracking Systems.
          </p>
        </BentoItem>

        {/* Interview Coach */}
        <BentoItem className="md:col-span-2 md:row-span-2 flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-500/20">
            <Trophy className="text-rose-500" size="24px" />
          </div>
          <h2 className="text-3xl font-bold">AI Interview Coach</h2>
          <p className="mt-3 text-muted-foreground text-lg max-w-sm">
            Practice makes perfect. Simulate real interviews with our AI coach
            tailored to the specific role you&apos;re targeting. Get actionable
            feedback on your answers.
          </p>
          <div className="mt-8 flex-1 bg-gradient-to-t from-rose-500/10 to-transparent rounded-xl border border-rose-500/20 flex flex-col justify-end p-4 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Trophy size={120} className="text-rose-500" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="bg-background/80 backdrop-blur p-3 rounded-lg border border-border shadow-sm self-start max-w-[80%] text-xs border-rose-500/30">
                "Tell me about a time you had to optimize a complex system."
              </div>
              <div className="bg-rose-500 text-white p-3 rounded-lg shadow-sm self-end max-w-[80%] text-xs ml-auto">
                "In my last role, I refactored the database queries..."
              </div>
            </div>
          </div>
        </BentoItem>

        {/* Custom Themes */}
        <BentoItem>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
            <Palette className="text-purple-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">Custom Themes</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Personalize your resume with a curated palette of professional color
            themes that stand out.
          </p>
        </BentoItem>

        {/* Shareable Links */}
        <BentoItem>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
            <Share2 className="text-emerald-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">Live Sharing</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Create a unique web link for your resume. Perfect for portfolios and
            cold emails.
          </p>
        </BentoItem>

        {/* Skill Gap */}
        <BentoItem className="md:col-span-2">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 border border-yellow-500/20">
            <Target className="text-yellow-500" size="20px" />
          </div>
          <h2 className="text-xl font-bold">Skill Gap Analyzer</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Compare your current profile against a target job description to
            identify missing keywords and skills instantly.
          </p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="px-2 py-1 rounded-md bg-green-500/10 text-[10px] font-medium text-green-500 border border-green-500/20">
              React: Match
            </span>
            <span className="px-2 py-1 rounded-md bg-green-500/10 text-[10px] font-medium text-green-500 border border-green-500/20">
              TypeScript: Match
            </span>
            <span className="px-2 py-1 rounded-md bg-red-500/10 text-[10px] font-medium text-red-500 border border-red-500/20">
              GraphQL: Missing
            </span>
          </div>
        </BentoItem>
      </div>
    </div>
  );
};
