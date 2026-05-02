import React from "react";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";
import { Sparkles } from "lucide-react";

const Page = () => {
  return (
    <div className="w-full min-h-[calc(100vh-56px)]">
      <div className="w-full mx-auto max-w-7xl py-8 px-5">
        {/* Dashboard Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-black tracking-tight">
                My Resumes
              </h1>
              <Sparkles size="20px" className="text-indigo-500" />
            </div>
            <p className="text-muted-foreground text-sm">
              Create, edit, and manage your AI-powered resumes
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <TrashListBox />
          </div>
        </div>

        {/* Resume Grid */}
        <div className="w-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-2">
              All Resumes
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
