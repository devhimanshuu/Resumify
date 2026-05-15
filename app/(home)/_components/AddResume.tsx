"use client";
import useCreateDocument from "@/features/document/use-create-document";
import { Loader, Plus, Sparkles, Wand2 } from "lucide-react";
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
      },
    );
  }, [mutate, router]);
  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        role="button"
        className="w-full cursor-pointer group"
        onClick={onCreate}
      >
        <div
          className="
            relative overflow-hidden
            h-[232px] flex flex-col
            rounded-xl gap-3 w-full
            items-center justify-center
            border border-dashed border-border/60
            bg-card/30 hover:bg-card/60
            hover:border-indigo-500/40
            transition-all duration-300
            backdrop-blur-sm
            hover:shadow-xl hover:shadow-indigo-500/[0.06]
          "
        >
          {/* Animated gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-violet-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-border/40 group-hover:border-indigo-500/40 transition-colors duration-300 rounded-tl" />
          <div className="absolute top-4 right-4 w-3 h-3 border-r border-t border-border/40 group-hover:border-indigo-500/40 transition-colors duration-300 rounded-tr" />
          <div className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-border/40 group-hover:border-indigo-500/40 transition-colors duration-300 rounded-bl" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-border/40 group-hover:border-indigo-500/40 transition-colors duration-300 rounded-br" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center group-hover:from-indigo-500/15 group-hover:to-violet-500/15 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Plus
                size="24px"
                className="text-indigo-500 group-hover:text-indigo-400 transition-colors"
              />
            </div>
          </div>
          <div className="text-center relative z-10">
            <p className="text-sm font-semibold text-foreground">
              Create New Resume
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1 flex items-center justify-center gap-1">
              <Wand2 size={10} />
              AI-powered from scratch
            </p>
          </div>
        </div>
      </motion.div>
      {isPending && (
        <div
          className="fixed inset-0 z-[9999]
            flex flex-col gap-3
            items-center justify-center
            backdrop-blur-md bg-background/70
          "
        >
          <div className="flex flex-col items-center gap-4 p-10 rounded-2xl bg-card/90 border border-border/30 shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Loader size="22px" className="animate-spin text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-card animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">
                Creating your resume
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-center">
                <Sparkles size="12px" className="text-indigo-500" />
                Setting up AI workspace...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddResume;
