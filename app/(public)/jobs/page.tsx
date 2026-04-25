"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getActiveJobs, saveJobApplication } from "@/lib/api";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { JobForm } from "@/components/admin/forms/JobForm";
import { useAdmin } from "@/lib/admin-context";
import { JobApplication, JobListing } from "@/types";
import { submitJobListingAction, deleteJobListingAction } from "@/lib/actions/jobs";
import { Plus, X, CheckCircle2, Briefcase, User, Mail, Phone, FileText, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function JobsPage() {
  const { isEditMode } = useAdmin();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Admin modal states
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [deletingJob, setDeletingJob] = useState<JobListing | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);

  // Apply Now modal state
  const [applyingToJob, setApplyingToJob] = useState<JobListing | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    nationality: "",
    years_experience: "",
    current_employer: "",
    cover_letter: "",
    portfolio_url: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    try {
      const data = await getActiveJobs();
      setJobs(data);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }

  function openApply(job: JobListing) {
    setApplyingToJob(job);
    setSubmitted(false);
    setForm({
      full_name: "",
      email: "",
      phone: "",
      nationality: "",
      years_experience: "",
      current_employer: "",
      cover_letter: "",
      portfolio_url: "",
    });
    setFormErrors({});
  }

  function closeApply() {
    setApplyingToJob(null);
    setSubmitted(false);
  }

  function validate() {
    const errors: Record<string, string> = {};
    if (!form.full_name.trim()) errors.full_name = "Full name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = "A valid email is required.";
    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    if (!form.nationality.trim()) errors.nationality = "Nationality is required.";
    if (!form.years_experience.trim()) errors.years_experience = "Years of experience is required.";
    if (!form.cover_letter.trim()) errors.cover_letter = "Cover letter is required.";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    if (!applyingToJob) return;
    
    setSubmitting(true);
    try {
      await saveJobApplication({
        job_id: applyingToJob.id,
        ...form,
        status: 'new'
      });
      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  }

  const handleJobSubmit = async (data: any) => {
    try {
      await submitJobListingAction(data, isAddingJob, editingJob?.id);
      
      if (isAddingJob) {
        toast.success("Job listing created");
      } else if (editingJob) {
        toast.success("Job listing updated");
      }
      
      setIsAddingJob(false);
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

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
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : (
            <div className="space-y-8">
              {jobs.map((job) => (
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
                      <Button
                        className="btn-primary w-full md:w-auto"
                        onClick={() => openApply(job)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </EditableBlock>
              ))}
              {jobs.length === 0 && (
                <p className="text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No job listings available.</p>
              )}
            </div>
          )}

          <div className="mt-20 p-12 border border-dashed border-white/10 text-center">
            <p className="text-aam-grey text-sm mb-6">Employers: Want to reach 350+ certified architects?</p>
            <Link href="/contact" className="text-xs font-bold uppercase tracking-widest underline underline-offset-8 hover:text-white transition-all">
              Post a Position →
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Modals */}
      <EditModal
        open={!!editingJob || isAddingJob}
        onClose={() => { setEditingJob(null); setIsAddingJob(false); }}
        title={isAddingJob ? "Add Job Listing" : "Edit Job Listing"}
      >
        <JobForm
          initialData={editingJob || {}}
          onCancel={() => { setEditingJob(null); setIsAddingJob(false); }}
          onSubmit={handleJobSubmit}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingJob}
        itemName={deletingJob?.title || ""}
        onClose={() => setDeletingJob(null)}
        onConfirm={async () => {
          try {
            if (deletingJob) {
              await deleteJobListingAction(deletingJob.id);
              toast.success("Job listing deleted");
            }
            setDeletingJob(null);
            fetchJobs();
          } catch (error) {
            toast.error("Failed to delete job");
          }
        }}
      />

      {/* Apply Now Modal */}
      {applyingToJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0d0d0d] border-b border-white/10 px-8 py-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Job Application</div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white leading-tight">{applyingToJob.title}</h2>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/50 mt-1">{applyingToJob.company_name}</p>
              </div>
              <button
                onClick={closeApply}
                className="shrink-0 w-9 h-9 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              /* Success state */
              <div className="px-8 py-16 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-white/20 mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">Application Submitted</h3>
                  <p className="text-white/50 text-sm max-w-sm mx-auto">
                    Thank you, <span className="text-white font-bold">{form.full_name}</span>. Your application for <span className="text-white font-bold">{applyingToJob.title}</span> has been received. The employer will be in touch.
                  </p>
                </div>
                <button
                  onClick={closeApply}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-8 py-3 hover:bg-white/90 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Application form */
              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
                  Deadline: {formatDate(applyingToJob.deadline)} · Fill out all required fields
                </p>

                {/* Section: Personal Details */}
                <div className="space-y-5">
                  <SectionLabel icon={<User className="w-3.5 h-3.5" />} label="Personal Details" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="full_name" label="Full Name *" type="text"
                      value={form.full_name} error={formErrors.full_name}
                      onChange={v => setForm(f => ({ ...f, full_name: v }))}
                    />
                    <Field
                      id="nationality" label="Nationality *" type="text"
                      value={form.nationality} error={formErrors.nationality}
                      onChange={v => setForm(f => ({ ...f, nationality: v }))}
                    />
                  </div>
                </div>

                {/* Section: Contact */}
                <div className="space-y-5">
                  <SectionLabel icon={<Mail className="w-3.5 h-3.5" />} label="Contact Information" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="email" label="Email Address *" type="email"
                      value={form.email} error={formErrors.email}
                      onChange={v => setForm(f => ({ ...f, email: v }))}
                    />
                    <Field
                      id="phone" label="Phone Number *" type="tel"
                      value={form.phone} error={formErrors.phone}
                      onChange={v => setForm(f => ({ ...f, phone: v }))}
                    />
                  </div>
                </div>

                {/* Section: Professional */}
                <div className="space-y-5">
                  <SectionLabel icon={<Briefcase className="w-3.5 h-3.5" />} label="Professional Background" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="years_experience" label="Years of Experience *" type="text"
                      placeholder="e.g. 5"
                      value={form.years_experience} error={formErrors.years_experience}
                      onChange={v => setForm(f => ({ ...f, years_experience: v }))}
                    />
                    <Field
                      id="current_employer" label="Current Employer" type="text"
                      placeholder="Optional"
                      value={form.current_employer}
                      onChange={v => setForm(f => ({ ...f, current_employer: v }))}
                    />
                  </div>
                  <Field
                    id="portfolio_url" label="Portfolio / LinkedIn URL" type="url"
                    placeholder="https://..."
                    value={form.portfolio_url}
                    onChange={v => setForm(f => ({ ...f, portfolio_url: v }))}
                  />
                </div>

                {/* Section: Cover Letter */}
                <div className="space-y-5">
                  <SectionLabel icon={<FileText className="w-3.5 h-3.5" />} label="Cover Letter" />
                  <div className="space-y-1">
                    <label htmlFor="cover_letter" className="block text-[9px] font-black uppercase tracking-[0.25em] text-white/50">
                      Cover Letter *
                    </label>
                    <textarea
                      id="cover_letter"
                      rows={5}
                      placeholder="Tell us why you are the ideal candidate for this role..."
                      value={form.cover_letter}
                      onChange={e => setForm(f => ({ ...f, cover_letter: e.target.value }))}
                      className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/50 placeholder:text-white/20 resize-none transition-colors"
                    />
                    {formErrors.cover_letter && (
                      <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{formErrors.cover_letter}</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={closeApply}
                    className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-8 py-3 hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-wait"
                  >
                    {submitting ? "Submitting…" : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────── */

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-white/60">
      {icon}
      <span className="text-[9px] font-black uppercase tracking-[0.3em]">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

function Field({
  id, label, type, value, onChange, error, placeholder,
}: {
  id: string;
  label: string;
  type: string;
  value: string | undefined;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-[9px] font-black uppercase tracking-[0.25em] text-white/50">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/50 placeholder:text-white/20 transition-colors"
      />
      {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>}
    </div>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
