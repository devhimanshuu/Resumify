"use client";
import React from "react";
import { Map, Flag, Sparkles, Target, Star, ChevronRight, Briefcase, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CareerRoadmap = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Career Roadmap</h1>
          <p className="text-muted-foreground text-lg">Your personalized path from where you are to where you want to be.</p>
        </div>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 gap-2 h-12 px-6 rounded-xl shadow-xl shadow-indigo-500/20">
          <Sparkles size={18} />
          Refine Trajectory
        </Button>
      </div>

      <div className="relative">
        {/* Timeline Path */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-24">
            {[
                { 
                    year: "2024", 
                    status: "Current", 
                    role: "Frontend Developer", 
                    company: "Current Employer",
                    icon: <Briefcase size={20} />,
                    milestones: ["Master Next.js 14", "Lead UI Component Migration"],
                    active: true 
                },
                { 
                    year: "2026", 
                    status: "Projected", 
                    role: "Senior Frontend Architect", 
                    company: "Top-Tier Tech",
                    icon: <Target size={20} />,
                    milestones: ["System Design Expertise", "AI Integration Specialist"],
                    active: false 
                },
                { 
                    year: "2028", 
                    status: "Projected", 
                    role: "Staff Engineer", 
                    company: "Unicorn Startup",
                    icon: <Star size={20} />,
                    milestones: ["Technical Leadership", "Cross-Platform Strategy"],
                    active: false 
                },
                { 
                    year: "2030", 
                    status: "Visionary", 
                    role: "VP of Engineering / CTO", 
                    company: "Your Own Venture",
                    icon: <Flag size={20} />,
                    milestones: ["Entrepreneurship", "Org Scaling"],
                    active: false 
                },
            ].map((node, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="w-full md:w-5/12 pl-20 md:pl-0">
                        <div className={`p-8 rounded-[2rem] border transition-all duration-500 group ${node.active ? "bg-indigo-600 text-white border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105" : "bg-card border-border/50 glass hover:bg-white/5"}`}>
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${node.active ? "text-white/60" : "text-indigo-400"}`}>
                                    {node.status} • {node.year}
                                </span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${node.active ? "bg-white/10" : "bg-indigo-500/10 text-indigo-400"}`}>
                                    {node.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black mb-1">{node.role}</h3>
                            <p className={`text-sm mb-6 ${node.active ? "text-white/70" : "text-muted-foreground"}`}>{node.company}</p>
                            
                            <div className="space-y-3">
                                {node.milestones.map((m, mi) => (
                                    <div key={mi} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${node.active ? "bg-white" : "bg-indigo-500"}`} />
                                        <span className={`text-xs font-bold ${node.active ? "text-white/80" : "text-foreground"}`}>{m}</span>
                                    </div>
                                ))}
                            </div>

                            {!node.active && (
                                <Button variant="ghost" className="mt-8 p-0 h-auto text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 hover:bg-transparent flex items-center gap-2 group/btn">
                                    View Requirements
                                    <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="absolute left-[39px] md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-background bg-indigo-500 z-10 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full bg-white ${node.active ? "animate-ping" : ""}`} />
                    </div>

                    <div className="hidden md:block w-5/12" />
                </div>
            ))}
        </div>
      </div>

      <div className="mt-32 p-12 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
            <GraduationCap size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-black mb-4 italic tracking-tighter">Skill Accelerator</h2>
            <p className="text-white/80 text-lg mb-8">
                Based on your roadmap to **Senior Architect**, we recommend these critical certifications to shorten your path by 14 months.
            </p>
            <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-indigo-600 hover:bg-white/90 font-bold rounded-xl px-6">AWS Solutions Architect</Button>
                <Button className="bg-white text-indigo-600 hover:bg-white/90 font-bold rounded-xl px-6">Advanced System Design</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;
