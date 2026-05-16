"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ExternalLink, Briefcase, Kanban, Clock3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { PremiumPage, PremiumPageHeader, PremiumPanel, PremiumStatCard } from "@/components/ui/premium-page";

type Column = "Wishlist" | "Applied" | "Interviewing" | "Offer";
const COLUMNS: Column[] = ["Wishlist", "Applied", "Interviewing", "Offer"];

const columnMeta: Record<Column, { accent: string; hint: string }> = {
  Wishlist: { accent: "bg-slate-500", hint: "Roles to qualify" },
  Applied: { accent: "bg-blue-500", hint: "Submitted applications" },
  Interviewing: { accent: "bg-amber-500", hint: "Active conversations" },
  Offer: { accent: "bg-emerald-500", hint: "Final outcomes" },
};

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

  const stats = useMemo(() => {
    const active = jobs.filter((job) => job.column === "Applied" || job.column === "Interviewing").length;
    const offers = jobs.filter((job) => job.column === "Offer").length;
    return { active, offers };
  }, [jobs]);

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
    <PremiumPage>
      <PremiumPageHeader
        eyebrow="Opportunity Desk"
        title="Job Hunt Kanban"
        description="A focused board for scouting roles before they become formal applications. Keep this lightweight, then move qualified roles into the main application tracker."
        icon={<Kanban size={13} />}
        action={
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="h-11 gap-2 rounded-md bg-foreground px-5 font-bold text-background hover:bg-foreground/90">
                <Plus size={16} />
                Add Job
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg">
              <DialogHeader>
                <DialogTitle>Add New Opportunity</DialogTitle>
              </DialogHeader>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Company Name</label>
                  <Input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="e.g. Google" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Role / Title</label>
                  <Input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="e.g. Frontend Engineer" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Job Posting URL</label>
                  <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Stage</label>
                  <select
                    value={targetColumn}
                    onChange={(e) => setTargetColumn(e.target.value as Column)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  >
                    {COLUMNS.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
                <Button onClick={handleAddJob} className="mt-2 w-full rounded-md">Save Opportunity</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PremiumStatCard icon={<Briefcase size={18} />} label="Total Roles" value={jobs.length} detail="Local board" tone="indigo" />
        <PremiumStatCard icon={<Clock3 size={18} />} label="Active Pipeline" value={stats.active} detail="In motion" tone="amber" />
        <PremiumStatCard icon={<Kanban size={18} />} label="Offers" value={stats.offers} detail="Closed won" tone="emerald" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((j) => j.column === col);
          const meta = columnMeta[col];
          return (
            <PremiumPanel key={col} className="min-h-[520px] p-3">
              <div className="mb-4 flex items-start justify-between border-b border-border/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${meta.accent}`} />
                    <h3 className="text-sm font-black uppercase tracking-wider">{col}</h3>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{meta.hint}</p>
                </div>
                <span className="rounded-md bg-muted px-2 py-1 text-xs font-black">
                  {colJobs.length}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {colJobs.map((job) => (
                  <div key={job.id} className="group rounded-lg border border-border/70 bg-background p-3 shadow-sm transition-colors hover:border-indigo-500/40">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h4 className="line-clamp-2 text-sm font-bold leading-snug">{job.role}</h4>
                      <button onClick={() => handleDelete(job.id)} className="text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="mb-3 text-xs font-medium text-muted-foreground">{job.company}</p>
                    {job.url && (
                      <a href={job.url} target="_blank" rel="noreferrer" className="mb-3 flex items-center gap-1 text-xs font-bold text-indigo-500 hover:underline">
                        View Posting <ExternalLink size={10} />
                      </a>
                    )}
                    <select
                      value={job.column}
                      onChange={(e) => moveJob(job.id, e.target.value as Column)}
                      className="h-8 w-full rounded-md border bg-muted/30 px-2 text-xs font-medium"
                    >
                      {COLUMNS.map((c) => (
                        <option key={c} value={c}>Move to {c}</option>
                      ))}
                    </select>
                  </div>
                ))}
                {colJobs.length === 0 && (
                  <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-border/70 bg-muted/20 p-6 text-center text-xs font-medium text-muted-foreground">
                    No roles in this lane
                  </div>
                )}
              </div>
            </PremiumPanel>
          );
        })}
      </div>
    </PremiumPage>
  );
};

export default JobBoard;
