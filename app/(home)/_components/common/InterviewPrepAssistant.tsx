"use client";
import React, { useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { AIChatSession } from "@/lib/groq-model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InterviewPrepAssistant = () => {
  const { resumeInfo } = useResumeContext();
  const [open, setOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [prepMaterial, setPrepMaterial] = useState("");

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `
        You are an expert technical interviewer and career coach.
        Review the candidate's Resume Data and the Target Job Description.
        
        Generate a highly targeted interview preparation guide. Include:
        1. Top 5 challenging interview questions they will likely face based on their specific experience and the job description.
        2. Brief bullet points on how to answer each question effectively (what to highlight).
        3. Potential weak points or gaps in their resume compared to the job description, and how they should address them.
        
        Output only clear, readable markdown text.

        Resume Data:
        ${JSON.stringify(resumeInfo)}

        Job Description:
        ${jobDescription}
      `;

      const aiResponse = await AIChatSession.sendMessage(prompt);
      const responseText = aiResponse.response.text();
      
      setPrepMaterial(responseText.trim());
      
    } catch (error) {
      console.error(error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate interview prep. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-purple-500 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30">
          <Mic size={16} />
          <span className="hidden lg:flex">Prep Assistant</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-purple-500" />
            AI Interview Prep Assistant
          </DialogTitle>
          <DialogDescription>
            Get personalized interview questions and strategies tailored to your resume and the job role.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Job Description
              </label>
              <Textarea
                placeholder="Paste the target job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[250px] resize-none"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={loading || !jobDescription.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Fit...
                </>
              ) : (
                "Generate Interview Prep"
              )}
            </Button>
          </div>

          <div className="bg-muted/30 rounded-xl p-5 border border-border/50 relative h-[360px] md:h-auto overflow-hidden flex flex-col">
            {!prepMaterial && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-center">
                <Mic className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm">Provide a job description to get tailored interview strategies.</p>
              </div>
            )}
            
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <Loader2 className="w-10 h-10 mb-4 animate-spin text-purple-500" />
                <p className="text-sm animate-pulse">Generating tough interview questions...</p>
              </div>
            )}

            {prepMaterial && !loading && (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="prose prose-sm dark:prose-invert whitespace-pre-wrap">
                  {prepMaterial}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewPrepAssistant;
