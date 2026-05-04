"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

type Column = "Wishlist" | "Applied" | "Interviewing" | "Offer";
const COLUMNS: Column[] = ["Wishlist", "Applied", "Interviewing", "Offer"];

interface JobItem {
  id: string;
  company: string;
  role: string;
  column: Column;
  url?: string;
  dateAdded: string;
}

const JobBoard = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [targetColumn, setTargetColumn] = useState<Column>("Wishlist");

  useEffect(() => {
    const saved = localStorage.getItem("resumify_jobs");
    if (saved) {
      try {
        setJobs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse jobs", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("resumify_jobs", JSON.stringify(jobs));
    }
  }, [jobs, isLoaded]);

  const handleAddJob = () => {
    if (!newCompany || !newRole) {
      toast({ title: "Error", description: "Company and Role are required", variant: "destructive" });
      return;
    }
    const newJob: JobItem = {
      id: crypto.randomUUID(),
      company: newCompany,
      role: newRole,
      url: newUrl,
      column: targetColumn,
      dateAdded: new Date().toISOString(),
    };
    setJobs([...jobs, newJob]);
    setNewCompany("");
    setNewRole("");
    setNewUrl("");
    setIsAddOpen(false);
    toast({ title: "Job Added", description: `${newRole} at ${newCompany} added to ${targetColumn}` });
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
  };

  const moveJob = (id: string, newCol: Column) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, column: newCol } : j)));
  };

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Job Hunt Kanban
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your applications and link them to your tailored resumes.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
              <Plus size={16} />
              Add Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Application</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Company Name</label>
                <Input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="e.g. Google" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Role / Title</label>
                <Input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Job Posting URL (Optional)</label>
                <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Stage</label>
                <select
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value as Column)}
                  className="w-full border rounded-md h-10 px-3 bg-background"
                >
                  {COLUMNS.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddJob} className="w-full mt-2">Save Application</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((j) => j.column === col);
          return (
            <div key={col} className="bg-muted/30 rounded-xl p-4 border border-border/50 min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">{col}</h3>
                <span className="bg-muted text-xs font-bold px-2 py-1 rounded-full">
                  {colJobs.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {colJobs.map((job) => (
                  <div key={job.id} className="bg-card border shadow-sm rounded-lg p-3 group">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{job.role}</h4>
                      <button onClick={() => handleDelete(job.id)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{job.company}</p>
                    
                    {job.url && (
                      <a href={job.url} target="_blank" rel="noreferrer" className="text-xs text-indigo-500 flex items-center gap-1 mb-3 hover:underline">
                        View Posting <ExternalLink size={10} />
                      </a>
                    )}

                    <div className="flex items-center gap-1">
                      <select
                        value={job.column}
                        onChange={(e) => moveJob(job.id, e.target.value as Column)}
                        className="text-xs border rounded px-1 py-0.5 bg-background w-full"
                      >
                        {COLUMNS.map((c) => (
                          <option key={c} value={c}>Move to {c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {colJobs.length === 0 && (
                  <div className="text-center p-6 border border-dashed rounded-lg text-muted-foreground text-sm">
                    No jobs here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobBoard;
