"use client";
import React from "react";
import { Flag, Sparkles, Target, Star, ChevronRight, Briefcase, GraduationCap, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumPage, PremiumPageHeader, PremiumPanel } from "@/components/ui/premium-page";

const roadmap = [
  {
    year: "Now",
    status: "Current",
    role: "Frontend Developer",
    company: "Baseline profile",
    icon: <Briefcase size={20} />,
    milestones: ["Strengthen measurable impact", "Ship a role-specific portfolio branch"],
    active: true,
  },
  {
    year: "12 mo",
    status: "Next",
    role: "Senior Frontend Engineer",
    company: "Product-led team",
    icon: <Target size={20} />,
    milestones: ["Own architecture decisions", "Add performance and accessibility case studies"],
    active: false,
  },
  {
    year: "24 mo",
    status: "Projected",
    role: "Staff Engineer",
    company: "Platform organization",
    icon: <Star size={20} />,
    milestones: ["Lead cross-team technical strategy", "Publish system design artifacts"],
    active: false,
  },
  {
    year: "36 mo",
    status: "Vision",
    role: "Engineering Lead",
    company: "High-growth company",
    icon: <Flag size={20} />,
    milestones: ["Mentor senior contributors", "Own hiring and operating cadence"],
    active: false,
  },
];

const CareerRoadmap = () => {
  return (
    <PremiumPage>
      <PremiumPageHeader
        eyebrow="Trajectory Planner"
        title="Career Roadmap"
        description="A practical path from today’s resume to the next level. Each milestone should become evidence in your resume, portfolio, and interview stories."
        icon={<Map size={13} />}
        action={
          <Button size="lg" className="h-11 gap-2 rounded-md bg-foreground px-5 font-bold text-background hover:bg-foreground/90">
            <Sparkles size={18} />
            Refine Trajectory
          </Button>
        }
      />

      <div className="relative">
        <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-px bg-border md:left-1/2" />
        <div className="space-y-6 md:space-y-8">
          {roadmap.map((node, i) => (
            <div key={node.role} className={`relative grid gap-4 md:grid-cols-2 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}>
              <div className="ml-10 md:ml-0">
                <PremiumPanel className={node.active ? "border-indigo-500/40 bg-indigo-500 text-white shadow-lg shadow-indigo-500/15" : "p-0"}>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-[0.18em] ${node.active ? "text-white/70" : "text-indigo-500"}`}>
                        {node.status} · {node.year}
                      </span>
                      <div className={`flex size-10 items-center justify-center rounded-md ${node.active ? "bg-white/15" : "bg-indigo-500/10 text-indigo-500"}`}>
                        {node.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">{node.role}</h3>
                    <p className={`mt-1 text-sm ${node.active ? "text-white/75" : "text-muted-foreground"}`}>{node.company}</p>

                    <div className="mt-6 space-y-3">
                      {node.milestones.map((m) => (
                        <div key={m} className="flex items-start gap-3">
                          <span className={`mt-1.5 size-1.5 rounded-full ${node.active ? "bg-white" : "bg-indigo-500"}`} />
                          <span className={`text-sm font-medium ${node.active ? "text-white/85" : "text-foreground"}`}>{m}</span>
                        </div>
                      ))}
                    </div>

                    {!node.active && (
                      <Button variant="ghost" className="mt-6 h-auto p-0 text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:bg-transparent">
                        View Requirements
                        <ChevronRight size={12} className="ml-2" />
                      </Button>
                    )}
                  </div>
                </PremiumPanel>
              </div>

              <div className="absolute left-4 top-8 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-indigo-500 md:left-1/2">
                <div className={`size-2 rounded-full bg-white ${node.active ? "animate-ping" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <PremiumPanel className="mt-12 overflow-hidden bg-foreground text-background">
        <div className="grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-background/60">
              <GraduationCap size={14} />
              Skill Accelerator
            </div>
            <h2 className="text-3xl font-black tracking-tight">Turn roadmap gaps into resume evidence.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-background/70">
              Pick one certification, one public project, and one measurable workplace initiative. The system becomes stronger when every milestone leaves proof.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="rounded-md bg-background text-foreground hover:bg-background/90">AWS Architecture</Button>
            <Button className="rounded-md bg-background text-foreground hover:bg-background/90">System Design</Button>
          </div>
        </div>
      </PremiumPanel>
    </PremiumPage>
  );
};

export default CareerRoadmap;
