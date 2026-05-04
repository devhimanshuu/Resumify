"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";

export const LinkedInImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync } = useUpdateDocument();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Please upload a LinkedIn PDF", variant: "destructive" });
      return;
    }

    setLoading(true);
    toast({ title: "Analyzing LinkedIn profile..." });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/import-linkedin", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Import failed");

      const { data } = await response.json();
      
      if (!resumeInfo?.documentId) throw new Error("No active document");
      
      await mutateAsync({
        personalInfo: data.personalInfo,
        summary: data.summary,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
      });

      // Update Context locally so the form instantly reflects changes
      onUpdate({
        ...resumeInfo,
        personalInfo: data.personalInfo || resumeInfo.personalInfo,
        summary: data.summary || resumeInfo.summary,
        experiences: data.experience || resumeInfo.experiences,
        educations: data.education || resumeInfo.educations,
        skills: data.skills || resumeInfo.skills,
      });

      toast({ title: "LinkedIn imported successfully! 🎉" });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to import LinkedIn profile", variant: "destructive" });
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        variant="outline"
        size="sm"
        className="h-7 text-xs gap-1.5 border-blue-500/30 text-blue-600 hover:bg-blue-500/10 hover:text-blue-700 font-semibold"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading || resumeInfo?.status === "archived"}
      >
        {loading ? (
          <Loader size="12px" className="animate-spin" />
        ) : (
          <Linkedin size="12px" />
        )}
        Import LinkedIn PDF
      </Button>
    </>
  );
};
