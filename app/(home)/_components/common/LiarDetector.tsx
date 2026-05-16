"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertTriangle, Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const LiarDetector = () => {
  const { resumeInfo } = useResumeContext();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runAudit = async () => {
    if (!resumeInfo) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/fact-check", {
        method: "POST",
        body: JSON.stringify({ resumeData: resumeInfo }),
      });
      const data = await res.json();
      setResults(data);
      toast({
        title: "Audit Complete",
        description: `Trust Score: ${data.veracityScore}%`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Audit Failed",
        description: "The AI auditor encountered an error.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      <Button
        onClick={runAudit}
        disabled={loading}
        variant="ghost"
        size="icon"
        className={`w-8 h-8 rounded-lg transition-all ${
          results ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:text-white"
        }`}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <ShieldCheck size={16} />
        )}
      </Button>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-12 right-0 w-80 p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-2xl z-50 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ShieldCheck size={80} />
            </div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-indigo-400" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Truth Audit</h3>
                    </div>
                    <button onClick={() => setResults(null)} className="text-slate-500 hover:text-white">
                        <XCircle size={14} />
                    </button>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-white/10"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={125.6}
                                strokeDashoffset={125.6 - (125.6 * results.veracityScore) / 100}
                                className={results.veracityScore > 80 ? "text-emerald-500" : "text-amber-500"}
                            />
                        </svg>
                        <span className="absolute text-[10px] font-black">{results.veracityScore}%</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Veracity Score</p>
                        <p className="text-xs font-black text-white">{results.trustLevel} Trust Level</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Critical Findings</p>
                    <div className="space-y-1 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
                        {results.findings.map((f: any, i: number) => (
                            <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex gap-2">
                                {f.severity === "Critical" ? (
                                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                                ) : (
                                    <CheckCircle2 size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                )}
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-bold text-white leading-tight">{f.type}</p>
                                    <p className="text-[9px] text-slate-500 leading-tight">{f.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                    <p className="text-[9px] text-indigo-300 italic leading-relaxed text-center">
                        "{results.verdict}"
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiarDetector;
