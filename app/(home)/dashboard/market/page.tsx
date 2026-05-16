"use client";
import React from "react";
import { Globe, TrendingUp, DollarSign, Briefcase, MapPin, ArrowUpRight, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PremiumPage, PremiumPageHeader, PremiumPanel, PremiumStatCard } from "@/components/ui/premium-page";

const stats = [
  { label: "Median Engineer Salary", value: "$142k", detail: "+12%", icon: <DollarSign size={18} />, tone: "emerald" as const },
  { label: "Active Tech Openings", value: "842k", detail: "+4%", icon: <Briefcase size={18} />, tone: "indigo" as const },
  { label: "Hiring Velocity", value: "8.4", detail: "Rising", icon: <TrendingUp size={18} />, tone: "amber" as const },
  { label: "Fastest Hub", value: "Austin", detail: "Hot", icon: <MapPin size={18} />, tone: "rose" as const },
];

const skills = [
  { skill: "React / Next.js", demand: 92, context: "Frontend platforms" },
  { skill: "AI Product Integration", demand: 88, context: "Applied AI workflows" },
  { skill: "Cloud Architecture", demand: 84, context: "Scale and reliability" },
  { skill: "Security Operations", demand: 76, context: "Risk and compliance" },
];

const roles = [
  { title: "Senior Frontend Engineer", company: "Stripe", location: "Remote", range: "$165k-$220k" },
  { title: "AI Product Engineer", company: "Ramp", location: "New York", range: "$150k-$205k" },
  { title: "Platform Architect", company: "Datadog", location: "Hybrid", range: "$180k-$245k" },
];

const MarketData = () => {
  return (
    <PremiumPage>
      <PremiumPageHeader
        eyebrow="Market Intelligence"
        title="Career Market Data"
        description="A clean read on salary ranges, skill demand, and live opportunity signals. Use this as the strategy layer before tailoring your resume."
        icon={<Globe size={13} />}
        action={
          <div className="flex items-center gap-1 rounded-lg border bg-card p-1 shadow-sm">
            {["Global", "USA", "EU"].map((region) => (
              <Button
                key={region}
                variant={region === "USA" ? "default" : "ghost"}
                size="sm"
                className="h-8 rounded-md px-4 text-xs font-bold"
              >
                {region}
              </Button>
            ))}
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <PremiumStatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <PremiumPanel className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black tracking-tight">Trending Skills</h2>
              <p className="text-sm text-muted-foreground">Demand index across target roles and job posts.</p>
            </div>
            <div className="rounded-md bg-indigo-500/10 p-2 text-indigo-500">
              <BarChart4 size={20} />
            </div>
          </div>
          <div className="space-y-5">
            {skills.map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold">{item.skill}</p>
                    <p className="text-xs text-muted-foreground">{item.context}</p>
                  </div>
                  <span className="text-xs font-black text-indigo-500">{item.demand}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.demand}%` }}
                    className="h-full rounded-full bg-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </PremiumPanel>

        <PremiumPanel className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-black tracking-tight">Live Opportunities</h2>
            <p className="text-sm text-muted-foreground">High-signal roles worth tailoring for.</p>
          </div>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role.title} className="group rounded-lg border border-border/70 bg-background p-4 transition-colors hover:border-indigo-500/40">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="rounded-md bg-muted p-2">
                    <Briefcase size={15} />
                  </div>
                  <ArrowUpRight size={15} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h4 className="text-sm font-bold">{role.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {role.company} · {role.location}
                </p>
                <p className="mt-3 text-xs font-black text-emerald-500">{role.range}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-5 h-10 w-full rounded-md text-xs font-black uppercase tracking-wider">
            View All Jobs
          </Button>
        </PremiumPanel>
      </div>
    </PremiumPage>
  );
};

export default MarketData;
