import React, { FC, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Dot, EllipsisVertical, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";

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
    <div
      role="button"
      className="
        cursor-pointer w-full
        rounded-2xl transition-all duration-300
        border border-border/50
        hover:border-indigo-500/40
        hover:shadow-xl hover:shadow-indigo-500/10
        premium-card overflow-hidden
        bg-card/50
      "
      onClick={gotoDoc}
    >
      {/* Thumbnail */}
      <div className="w-full h-[160px] bg-muted/30 relative overflow-hidden">
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <FileText size="32px" className="text-muted-foreground/40" />
          </div>
        )}
        {/* Status badge overlay */}
        <div className="absolute top-2 right-2">
          <div
            className={`
              flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold
              ${status === "public"
                ? "bg-green-500/90 text-white"
                : "bg-background/80 backdrop-blur-sm text-muted-foreground border border-border/50"
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
        {/* Theme color accent */}
        {themeColor && (
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: themeColor }}
          />
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-sm truncate block w-full pr-2">
            {title}
          </h5>
          <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <EllipsisVertical size="16px" />
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          {docDate}
        </p>
      </div>
    </div>
  );
};

export default ResumeItem;
