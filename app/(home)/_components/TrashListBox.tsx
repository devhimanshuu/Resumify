"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDocuments from "@/features/document/use-get-document";
import useRestoreDocument from "@/features/document/use-restore-document";
import { format } from "date-fns";
import {
  Dot,
  FileText,
  Undo,
  Loader,
  Search,
  Trash2,
  Archive,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TrashListBox = () => {
  const router = useRouter();
  const { data, isLoading } = useGetDocuments(true);
  const { mutateAsync, isPending } = useRestoreDocument();

  const resumes = data?.data ?? [];
  const [search, setSearch] = useState("");

  const filteredDocuments = resumes?.filter((doc) => {
    return doc.title?.toLowerCase()?.includes(search?.toLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/dashboard/document/${docId}/edit`);
  };

  const onRestore = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: string,
    status: string
  ) => {
    event.stopPropagation();
    mutateAsync(
      {
        documentId: docId,
        status: status,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Restore document successfully`,
          });
        },
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="gap-2 items-center rounded-lg bg-card/50 border border-border/40 hover:bg-card/80 hover:border-border/60 transition-all duration-300 shadow-sm px-4 backdrop-blur-sm text-muted-foreground hover:text-foreground h-9"
          variant="secondary"
        >
          <Trash2 size="14px" />
          <span className="text-xs font-medium">Trash</span>
          {resumes.length > 0 && (
            <span className="text-[10px] font-semibold bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded-md ml-0.5">
              {resumes.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-card/95 backdrop-blur-xl border-border/40 w-[22rem] !px-0 rounded-xl shadow-xl"
        align="end"
        alignOffset={0}
        forceMount
      >
        {isLoading ? (
          <div className="w-full flex flex-col gap-2 p-4">
            <Skeleton className="h-8 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
        ) : (
          <div className="text-sm">
            {/* Header */}
            <div className="px-4 pb-3 pt-1 border-b border-border/30">
              <div className="flex items-center gap-2 mb-3">
                <Archive size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">
                  Archived Documents
                </span>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-8 text-xs bg-muted/30 border-border/30 rounded-lg placeholder:text-muted-foreground/40"
                  placeholder="Search archived resumes..."
                />
              </div>
            </div>

            {/* List */}
            <div className="max-h-[280px] overflow-y-auto px-2 py-2">
              <p
                className="hidden last:block text-xs
                text-center text-muted-foreground py-6"
              >
                No archived documents
              </p>

              {filteredDocuments?.map((doc) => (
                <div
                  key={doc.id}
                  role="button"
                  onClick={() => onClick(doc.documentId)}
                  className="
                    text-sm rounded-lg w-full hover:bg-muted/40
                    flex items-center justify-between py-2.5 px-3
                    transition-colors duration-200 group cursor-pointer
                  "
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-muted/40 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText
                        size="13px"
                        className="text-muted-foreground/60"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h5 className="font-medium text-xs truncate block w-[180px] text-foreground">
                        {doc.title}
                      </h5>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                        <Calendar size={9} />
                        <span>
                          {doc.updatedAt &&
                            format(doc.updatedAt, "MMM dd, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      role="button"
                      onClick={(e) => onRestore(e, doc.documentId, doc.status)}
                      className="rounded-md hover:bg-indigo-500/10 w-7 h-7 flex items-center justify-center transition-colors"
                      title="Restore document"
                    >
                      {isPending ? (
                        <Loader className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                      ) : (
                        <Undo className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-indigo-500 transition-colors" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TrashListBox;
