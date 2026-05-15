"use client";

import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Dot,
  EllipsisVertical,
  FileText,
  Globe,
  Lock,
  Calendar,
  ArrowUpRight,
  GitBranch,
  Trash2,
  Loader,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ResumeBranchDialog from "./ResumeBranchDialog";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
  parentId?: string | null;
  branchName?: string | null;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
  parentId,
  branchName,
}) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateDocument();

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(updatedAt, "MMM dd, yyyy");
    return formattedDate;
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  const onMoveToTrash = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await mutateAsync({ status: "archived" });
      toast({
        title: "Success",
        description: "Moved to trash successfully",
      });
    } catch (error) {
      // toast handled in hook
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      className="
        group cursor-pointer w-full
        rounded-xl transition-all duration-300
        border border-border/40
        hover:border-border/80
        hover:shadow-xl hover:shadow-black/[0.04]
        dark:hover:shadow-black/[0.15]
        overflow-hidden
        bg-card/60 hover:bg-card
        backdrop-blur-sm
      "
      onClick={gotoDoc}
    >
      {/* Thumbnail */}
      <div className="w-full h-[170px] relative overflow-hidden bg-muted/20">
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-muted/40 flex items-center justify-center group-hover:bg-muted/60 transition-colors">
                <FileText
                  size="22px"
                  className="text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Branch indicator */}
        {parentId && (
          <div className="absolute top-3 left-3 z-[2]">
            <div className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 backdrop-blur-md uppercase tracking-tight">
              <GitBranch size="10px" />
              {branchName || "Branch"}
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-[2]">
          <div
            className={`
              flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase
              backdrop-blur-md
              ${
                status === "public"
                  ? "bg-emerald-500/90 text-white shadow-sm shadow-emerald-500/30"
                  : "bg-background/70 text-muted-foreground border border-border/40"
              }
            `}
          >
            {status === "public" ? (
              <>
                <Globe size="10px" />
                Public
              </>
            ) : (
              <>
                <Lock size="10px" />
                Private
              </>
            )}
          </div>
        </div>

        {/* Hover action indicator */}
        <div className="absolute bottom-3 right-3 z-[2] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        {themeColor && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 z-[2]"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 -4px 16px ${themeColor}50`,
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-4 pt-3.5">
        <div className="flex items-center justify-between gap-2">
          <h5 className="font-semibold text-sm truncate block flex-1 text-foreground group-hover:text-foreground/90 transition-colors">
            {title}
          </h5>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <button className="text-muted-foreground/40 hover:text-foreground transition-colors shrink-0 p-1 rounded-md hover:bg-muted/80">
                <EllipsisVertical size="16px" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              <ResumeBranchDialog documentId={documentId} title={title}>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="gap-2 cursor-pointer py-2"
                >
                  <GitBranch size={14} className="text-indigo-500" />
                  <span className="font-medium">Branch Resume</span>
                </DropdownMenuItem>
              </ResumeBranchDialog>

              <DropdownMenuItem
                onClick={onMoveToTrash}
                className="gap-2 cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                <Trash2 size={14} />
                <span className="font-medium">Move to Trash</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <Calendar size={10} className="text-muted-foreground/50" />
          <p className="text-[11px] text-muted-foreground/70 font-medium">
            {docDate}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeItem;
