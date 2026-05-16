"use client";
import React from "react";
import { Mic, Video, Sparkles, Trophy, MessageSquare, Play, Gauge, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumPage, PremiumPageHeader, PremiumPanel, PremiumStatCard } from "@/components/ui/premium-page";

const InterviewLab = () => {
  return (
    <PremiumPage>
      <PremiumPageHeader
        eyebrow="Practice Studio"
        title="Interview Lab"
        description="A focused rehearsal space for delivery, content quality, and role-specific preparation. Start a session when you are ready to capture real signals."
        icon={<Mic size={13} />}
        action={
          <Button size="lg" className="h-11 gap-2 rounded-md bg-foreground px-5 font-bold text-background hover:bg-foreground/90">
            <Play size={18} fill="currentColor" />
            Start Mock Session
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PremiumStatCard icon={<Gauge size={18} />} label="Delivery Score" value="--" detail="Awaiting session" tone="indigo" />
        <PremiumStatCard icon={<Trophy size={18} />} label="Content Score" value="--" detail="Not measured" tone="emerald" />
        <PremiumStatCard icon={<ClipboardCheck size={18} />} label="Action Items" value="0" detail="Clean slate" tone="amber" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <PremiumPanel className="lg:col-span-2">
          <div className="aspect-video border-b border-border/70 bg-slate-950">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Video size={30} className="text-indigo-300" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">Camera Inactive</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
            {[
              { title: "Speech Analysis", icon: <Mic size={18} />, label: "Confidence" },
              { title: "Answer Quality", icon: <Trophy size={18} />, label: "Structure" },
            ].map((panel) => (
              <div key={panel.title} className="rounded-lg border border-border/70 bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-indigo-500">{panel.icon}</span>
                  <h3 className="text-sm font-bold">{panel.title}</h3>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{panel.label}</span>
                  <span className="font-bold">--</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-0 bg-indigo-500" />
                </div>
              </div>
            ))}
          </div>
        </PremiumPanel>

        <div className="space-y-5">
          <PremiumPanel className="p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black">
              <Sparkles size={18} className="text-amber-500" />
              AI Insights
            </h2>
            <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
              <p className="text-sm leading-6 text-muted-foreground">
                &quot;Start a session to get real-time coaching on your delivery, specificity, and STAR structure.&quot;
              </p>
            </div>
          </PremiumPanel>

          <PremiumPanel className="p-5">
            <h3 className="mb-4 text-sm font-black uppercase tracking-wider">Session History</h3>
            <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-border/70 text-muted-foreground">
              <MessageSquare size={30} className="mb-2 opacity-50" />
              <p className="text-[10px] font-black uppercase tracking-widest">No previous sessions</p>
            </div>
          </PremiumPanel>
        </div>
      </div>
    </PremiumPage>
  );
};

export default InterviewLab;
