"use client";
import React from "react";
import { Mic, Video, Sparkles, Trophy, MessageSquare, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const InterviewLab = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Interview Lab</h1>
          <p className="text-muted-foreground text-lg">Practice with real-time AI feedback and ace your next role.</p>
        </div>
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 gap-2 h-12 px-6 rounded-xl shadow-xl shadow-indigo-500/20">
          <Play size={18} fill="currentColor" />
          Start Mock Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="aspect-video bg-slate-900 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent)]" />
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Video size={32} className="text-indigo-400" />
            </div>
            <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Camera Inactive</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-2 mb-4">
                    <Mic size={18} className="text-indigo-400" />
                    <h3 className="font-bold text-sm">Speech Analysis</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-bold">--</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-0" />
                    </div>
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-4">
                    <Trophy size={18} className="text-emerald-400" />
                    <h3 className="font-bold text-sm">Content Score</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Sentiment</span>
                        <span className="font-bold">--</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-0" />
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-card border border-border/50 glass">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" />
                    AI Insights
                </h2>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                            "Start a session to get real-time coaching on your delivery and content."
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-950 border border-white/5">
                <h3 className="font-bold text-sm mb-4">Session History</h3>
                <div className="flex flex-col items-center justify-center py-10 opacity-30">
                    <MessageSquare size={32} className="mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">No previous sessions</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewLab;
