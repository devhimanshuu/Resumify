"use client";

import React, { useState } from "react";
import { BookOpen, Search, Loader2, Sparkles, Building2, Newspaper, Target, MessageSquare, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const InterviewCheatSheet = () => {
  const { resumeInfo } = useResumeContext();
  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [cheatSheet, setCheatSheet] = useState<any>(null);

  const generateSheet = async () => {
    if (!resumeInfo || !companyName) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-cheat-sheet", {
        method: "POST",
        body: JSON.stringify({ resumeData: resumeInfo, companyName }),
      });
      const data = await res.json();
      setCheatSheet(data);
      toast({
        title: "Cheat Sheet Generated!",
        description: `Your custom dossier for ${companyName} is ready.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Intelligence Gathering Failed",
        description: "Could not retrieve company data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <Button
        onClick={() => setCheatSheet(null)}
        variant="ghost"
        size="icon"
        className={`w-8 h-8 rounded-lg transition-all ${
          cheatSheet ? "bg-purple-500/10 text-purple-400" : "text-slate-400 hover:text-white"
        }`}
      >
        <BookOpen size={16} />
      </Button>

      <AnimatePresence>
        {!cheatSheet && (
           <div className="hidden group-hover:block absolute top-12 right-0 w-64 p-4 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl z-50">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Target Company</span>
                    </div>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="e.g. Google, Stripe..." 
                            className="h-9 text-xs bg-white/5 border-white/10"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <Button 
                            onClick={generateSheet}
                            disabled={loading || !companyName}
                            className="h-9 px-3 bg-purple-600 hover:bg-purple-500"
                        >
                            {loading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
                        </Button>
                    </div>
                </div>
           </div>
        )}

        {cheatSheet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl max-h-[80vh] bg-slate-900 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-8 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white italic tracking-tight">{companyName} Dossier</h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">AI Interview Cheat Sheet</p>
                        </div>
                    </div>
                    <button onClick={() => setCheatSheet(null)} className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {/* Culture & Focus */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <Target size={14} />
                                Company Culture
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                                "{cheatSheet.companyCulture}"
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <Zap size={14} />
                                Technical Focus
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                                "{cheatSheet.technicalFocus}"
                            </p>
                        </div>
                    </div>

                    {/* Recent News */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <Newspaper size={14} />
                            Recent Intelligence
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {cheatSheet.recentNews.map((news: string, i: number) => (
                                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 flex items-center gap-3">
                                    <div className="w-1 h-1 rounded-full bg-purple-500" />
                                    {news}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Predicted Questions */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <MessageSquare size={14} />
                            Predicted Interview Questions
                        </div>
                        <div className="space-y-3">
                            {cheatSheet.predictedQuestions.map((q: any, i: number) => (
                                <div key={i} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-2">
                                    <h4 className="text-sm font-bold text-white">Q: {q.question}</h4>
                                    <p className="text-xs text-purple-300/80 leading-relaxed font-medium">
                                        <span className="text-[10px] font-black uppercase tracking-widest mr-2">Strategy:</span>
                                        {q.advice}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-white/[0.02] border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                        <Sparkles size={16} className="text-indigo-400 shrink-0" />
                        <p className="text-[9px] text-indigo-300 italic leading-relaxed">
                            "Focus on your {resumeInfo?.skills?.[0]?.name || "core technical"} experience. They value scale and architectural foresight."
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewCheatSheet;
