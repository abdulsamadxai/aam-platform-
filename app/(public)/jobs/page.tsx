"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllJobs } from "@/lib/mock-data";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { JobForm } from "@/components/admin/forms/JobForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function JobsPage() {
  const { isEditMode } = useAdmin();
  const [jobs, setJobs] = useState(() => getAllJobs());

  // Modal states
  const [editingJob, setEditingJob] = useState<any>(null);
  const [deletingJob, setDeletingJob] = useState<any>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        <PageHeader
          title="Job Board"
          subtitle="Architecture and built environment career opportunities in the Maldives."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingJob(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </div>
        )}
      </div>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-5xl text-white">
          <div className="space-y-8">
            {jobs.map((job, i) => (
              <EditableBlock
                key={job.id}
                label="Job Listing"
                onEdit={() => setEditingJob(job)}
                onDelete={() => setDeletingJob(job)}
              >
                <div className="p-10 bg-black border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-white transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{job.title}</h3>
                      {job.is_active === false && (
                        <span className="px-2 py-0.5 border border-white/40 text-white/80 text-[10px] font-bold uppercase tracking-widest">Draft</span>
                      )}
                    </div>
                    <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">{job.company_name}</div>
                    <p className="text-aam-grey text-sm max-w-2xl">{job.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-4 shrink-0 w-full md:w-auto">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Deadline: {formatDate(job.deadline)}</div>
                    <Button className="btn-primary w-full md:w-auto">Apply Now</Button>
                  </div>
                </div>
              </EditableBlock>
            ))}
            {jobs.length === 0 && (
              <p className="text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No job listings available.</p>
            )}
          </div>

          <div className="mt-20 p-12 border border-dashed border-white/10 text-center">
            <p className="text-aam-grey text-sm mb-6">Employers: Want to reach 350+ certified architects?</p>
            <Link href="/contact" className="text-xs font-bold uppercase tracking-widest underline underline-offset-8 hover:text-white transition-all">
              Post a Position →
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingJob || isAddingJob}
        onClose={() => { setEditingJob(null); setIsAddingJob(false); }}
        title={isAddingJob ? "Add Job Listing" : "Edit Job Listing"}
      >
        <JobForm
          initialData={editingJob || {}}
          onCancel={() => { setEditingJob(null); setIsAddingJob(false); }}
          onSubmit={(data) => {
            if (isAddingJob) {
              setJobs(prev => [{ ...data, id: Date.now().toString(), is_published: true } as any, ...prev]);
              setIsAddingJob(false);
              toast.success("Job listing created");
            } else {
              setJobs(prev => prev.map(item => item.id === editingJob.id ? { ...item, ...data } : item));
              setEditingJob(null);
              toast.success("Job listing updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingJob}
        itemName={deletingJob?.title || ""}
        onClose={() => setDeletingJob(null)}
        onConfirm={() => {
          setJobs(prev => prev.filter(item => item.id !== deletingJob.id));
          setDeletingJob(null);
          toast.success("Job listing deleted");
        }}
      />
    </main>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
