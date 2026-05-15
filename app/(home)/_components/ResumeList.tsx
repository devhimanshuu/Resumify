"use client";
import useGetDocuments from "@/features/document/use-get-document";
import { Loader, RotateCw, FileText, AlertCircle } from "lucide-react";
import React, { Fragment } from "react";
import ResumeItem from "./common/ResumeItem";

const ResumeList = () => {
  const { data, isLoading, isError, refetch } = useGetDocuments();
  const resumes = data?.data ?? [];
  return (
    <Fragment>
      {isLoading ? (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-full rounded-xl border border-border/30 bg-card/30 overflow-hidden animate-pulse"
            >
              <div className="w-full h-[170px] bg-muted/20" />
              <div className="p-4 pt-3.5 space-y-2.5">
                <div className="h-4 bg-muted/30 rounded-md w-3/4" />
                <div className="h-3 bg-muted/20 rounded-md w-1/2" />
              </div>
            </div>
          ))}
        </>
      ) : isError ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle size={24} className="text-destructive" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">
              Failed to load resumes
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Something went wrong. Please try again.
            </p>
            <button
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-muted/50 hover:bg-muted text-foreground transition-colors"
              onClick={() => refetch()}
            >
              <RotateCw size={12} />
              Retry
            </button>
          </div>
        </div>
      ) : resumes.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-14 h-14 rounded-xl bg-muted/30 flex items-center justify-center">
            <FileText size={24} className="text-muted-foreground/40" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-1">
              No resumes yet
            </p>
            <p className="text-xs text-muted-foreground">
              Create your first AI-powered resume to get started.
            </p>
          </div>
        </div>
      ) : (
        <>
          {resumes?.map((resume) => (
            <ResumeItem
              key={resume.documentId}
              documentId={resume.documentId}
              title={resume.title}
              status={resume.status}
              updatedAt={resume.updatedAt}
              themeColor={resume.themeColor}
              thumbnail={resume.thumbnail}
            />
          ))}
        </>
      )}
    </Fragment>
  );
};

export default ResumeList;
