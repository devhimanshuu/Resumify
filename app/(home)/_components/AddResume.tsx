"use client";
import useCreateDocument from "@/features/document/use-create-document";
import { FileText, Loader, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { motion } from "framer-motion";

const AddResume = () => {
  const router = useRouter();
  const { isPending, mutate } = useCreateDocument();
  const onCreate = useCallback(() => {
    mutate(
      {
        title: "Untitled Resume",
      },
      {
        onSuccess: (response) => {
          const documentId = response.data.documentId;
          router.push(`/dashboard/document/${documentId}/edit`);
        },
      }
    );
  }, [mutate, router]);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        role="button"
        className="w-full cursor-pointer group"
        onClick={onCreate}
      >
        <div
          className="
            relative overflow-hidden
            h-[220px] flex flex-col
            rounded-3xl gap-4 w-full
            items-center justify-center
            border-2 border-dashed border-muted-foreground/30
            bg-card hover:bg-card/80
            hover:border-indigo-500/60
            transition-all duration-300
            shadow-sm hover:shadow-xl hover:shadow-indigo-500/10
          "
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-300 group-hover:scale-110">
            <Plus size="28px" className="text-indigo-500" />
          </div>
          <div className="text-center relative z-10">
            <p className="text-base font-bold text-foreground">
              Create New Resume
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Start from scratch
            </p>
          </div>
        </div>
      </motion.div>
      {isPending && (
        <div
          className="fixed inset-0 z-[9999]
            flex flex-col gap-3
            items-center justify-center
            backdrop-blur-sm bg-background/60
          "
        >
          <div className="flex flex-col items-center gap-3 p-8 rounded-2xl glass border border-border/50">
            <Loader size="28px" className="animate-spin text-indigo-500" />
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles size="14px" className="text-indigo-500" />
              Creating your resume...
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddResume;
