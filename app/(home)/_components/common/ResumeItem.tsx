import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Dot, EllipsisVertical, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
}) => {
  const router = useRouter();

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    const formattedDate = format(updatedAt, "MMM dd, yyyy");
    return formattedDate;
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      role="button"
      className="
        cursor-pointer w-full
        rounded-3xl transition-all duration-300
        border border-border/50
        hover:border-indigo-500/40
        hover:shadow-xl hover:shadow-indigo-500/10
        overflow-hidden
        bg-card hover:bg-card/80
      "
      onClick={gotoDoc}
    >
      {/* Thumbnail */}
      <div className="w-full h-[160px] bg-muted/30 relative overflow-hidden group">
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5 group-hover:scale-105 transition-transform duration-500">
            <FileText size="32px" className="text-muted-foreground/40 group-hover:text-indigo-500/40 transition-colors" />
          </div>
        )}
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
          <div
            className={`
              flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide
              ${status === "public"
                ? "bg-green-500/90 text-white shadow-sm shadow-green-500/20"
                : "bg-background/80 backdrop-blur-sm text-muted-foreground border border-border/50"
              }
            `}
          >
            {status === "public" ? (
              <>
                <Globe size="12px" />
                Public
              </>
            ) : (
              <>
                <Lock size="12px" />
                Private
              </>
            )}
          </div>
        </div>
        {/* Theme color accent */}
        {themeColor && (
          <div
            className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: themeColor, boxShadow: `0 -4px 12px ${themeColor}40` }}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-sm truncate block w-full pr-2 text-foreground">
            {title}
          </h5>
          <button className="text-muted-foreground hover:text-indigo-500 transition-colors shrink-0">
            <EllipsisVertical size="18px" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 font-medium">
          {docDate}
        </p>
      </div>
    </motion.div>
  );
};

export default ResumeItem;
