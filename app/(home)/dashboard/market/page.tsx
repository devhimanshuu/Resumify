"use client";
import React from "react";
import { Globe, TrendingUp, DollarSign, Briefcase, MapPin, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MarketData = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Market Data</h1>
          <p className="text-muted-foreground text-lg">Real-time industry trends and salary benchmarks.</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-xl bg-muted/50 border border-border">
            <Button variant="ghost" size="sm" className="rounded-lg text-xs font-bold px-4">Global</Button>
            <Button size="sm" className="bg-background text-foreground hover:bg-background rounded-lg text-xs font-bold px-4 shadow-sm">USA</Button>
            <Button variant="ghost" size="sm" className="rounded-lg text-xs font-bold px-4">EU</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
            { label: "Avg. Software Engineer Salary", value: "$142,000", change: "+12%", icon: <DollarSign size={18} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Active Tech Job Openings", value: "842,000", change: "+4%", icon: <Briefcase size={18} />, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Hiring Velocity Index", value: "8.4", change: "+2%", icon: <TrendingUp size={18} />, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Top Hub", value: "Austin, TX", change: "Hot", icon: <MapPin size={18} />, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-card border border-border/50 glass">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                    {stat.icon}
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                    <h3 className="text-2xl font-black">{stat.value}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.color} bg-current/10`}>{stat.change}</span>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-8 rounded-3xl bg-slate-950 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <Globe size={120} className="text-indigo-500/10 rotate-12" />
            </div>
            <div className="relative z-10">
                <h2 className="text-xl font-bold mb-6">Trending Skills (Global)</h2>
                <div className="space-y-6">
                    {[
                        { skill: "React / Next.js", demand: 92, trend: "up" },
                        { skill: "AI / ML Integration", demand: 88, trend: "up" },
                        { skill: "Cybersecurity Ops", demand: 76, trend: "up" },
                        { skill: "Cloud Architecture", demand: 84, trend: "steady" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold">{item.skill}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Demand: {item.demand}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.demand}%` }}
                                    className="h-full bg-indigo-500"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="p-8 rounded-3xl bg-card border border-border/50 glass">
            <h2 className="text-xl font-bold mb-6">Live Opportunities</h2>
            <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                    <div key={j} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors group cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Briefcase size={14} />
                            </div>
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="font-bold text-sm">Senior Frontend Engineer</h4>
                        <p className="text-[10px] text-muted-foreground">Stripe • Remote</p>
                    </div>
                ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-xl border-border/50 text-xs font-bold uppercase tracking-widest h-10">
                View All Jobs
            </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
