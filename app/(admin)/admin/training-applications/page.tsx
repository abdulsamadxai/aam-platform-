"use client";

import { useEffect, useState } from "react";
import {
  getAllTrainingRegistrations,
  updateTrainingRegistrationStatus,
} from "@/lib/mock-data";
import { TrainingRegistration } from "@/types";
import {
  ShieldCheck, Calendar, ChevronDown, Eye, Filter,
  Mail, Phone, Building2, User, X, Clock,
  CheckCircle2, Circle, CircleOff, Star, FileText
} from "lucide-react";

const STATUS_CONFIG: Record<TrainingRegistration["status"], { label: string; color: string; bg: string; icon: React.ElementType }> = {
  new:        { label: "New",        color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",   icon: Circle },
  reviewed:   { label: "Reviewed",   color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", icon: Eye },
  approved:   { label: "Approved",   color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/30",icon: CheckCircle2 },
  rejected:   { label: "Rejected",   color: "text-red-400",    bg: "bg-red-500/10 border-red-500/30",     icon: CircleOff },
};

export default function AdminTrainingApplications() {
  const [applications, setApplications] = useState<TrainingRegistration[]>([]);
  const [filter, setFilter] = useState<"all" | TrainingRegistration["status"]>("all");
  const [progFilter, setProgFilter] = useState<string>("all");
  const [selected, setSelected] = useState<TrainingRegistration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setApplications(getAllTrainingRegistrations());
    setLoading(false);
  }, []);

  const uniqueProgs = Array.from(new Set(applications.map(a => a.training_title)));

  const filtered = applications.filter(a => {
    const statusMatch = filter === "all" || a.status === filter;
    const progMatch = progFilter === "all" || a.training_title === progFilter;
    return statusMatch && progMatch;
  });

  function changeStatus(id: string, status: TrainingRegistration["status"]) {
    updateTrainingRegistrationStatus(id, status);
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  }

  const counts = {
    all: applications.length,
    new: applications.filter(a => a.status === "new").length,
    reviewed: applications.filter(a => a.status === "reviewed").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <header className="border-b border-white/10 pb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-1.5 w-1.5 bg-white animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Training Registry</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-3">
          Training Interests
        </h1>
        <p className="text-white/40 text-sm font-medium">
          Manage member and public interest for upcoming training programmes and CPD courses.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["all", "new", "reviewed", "approved", "rejected"] as const).map(s => {
          const conf = s === "all" ? null : STATUS_CONFIG[s];
          const isActive = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`p-4 border text-left transition-all ${isActive ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}
            >
              <div className={`text-2xl font-black mb-1 ${isActive ? "text-black" : (conf?.color || "text-white")}`}>
                {counts[s]}
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest">
                {s === "all" ? "Total" : conf?.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Program filter */}
      {uniqueProgs.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter by Programme:
          </span>
          {["all", ...uniqueProgs].map(p => (
            <button
              key={p}
              onClick={() => setProgFilter(p)}
              className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border transition-all ${progFilter === p ? "bg-white text-black border-white" : "border-white/15 text-white/40 hover:border-white/40 hover:text-white/70"}`}
            >
              {p === "all" ? "All Programmes" : p}
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="py-24 border border-dashed border-white/10 text-center space-y-4">
          <ShieldCheck className="w-10 h-10 text-white/20 mx-auto" />
          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">
            {applications.length === 0
              ? "No registrations received yet."
              : "No registrations match the current filter."}
          </p>
        </div>
      )}

      {/* Applications List */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((app) => {
            const conf = STATUS_CONFIG[app.status];
            const Icon = conf.icon;
            return (
              <div
                key={app.id}
                className="bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all"
              >
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-base font-black uppercase tracking-tight text-white">{app.full_name}</h2>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[9px] font-black uppercase tracking-widest ${conf.bg} ${conf.color}`}>
                        <Icon className="w-3 h-3" />
                        {conf.label}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                      <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                        <ShieldCheck className="w-3 h-3" /> {app.training_title}
                      </span>
                      {app.company && (
                        <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                          <Building2 className="w-3 h-3" /> {app.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                        <Mail className="w-3 h-3" /> {app.email}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                        <Calendar className="w-3 h-3" /> {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="relative group">
                      <button className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2 border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-all">
                        Status <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-40 bg-[#111] border border-white/15 shadow-2xl z-20 hidden group-hover:block">
                        {(Object.entries(STATUS_CONFIG) as [TrainingRegistration["status"], typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([s, c]) => (
                          <button
                            key={s}
                            onClick={() => changeStatus(app.id, s)}
                            className={`w-full text-left px-4 py-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-colors ${c.color}`}
                          >
                            <c.icon className="w-3 h-3" /> {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelected(app)}
                      className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-2 border border-white/15 text-white/50 hover:bg-white hover:text-black hover:border-white transition-all"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-[#0d0d0d] border-l border-white/10 w-full max-w-xl h-full overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0d0d0d] border-b border-white/10 px-8 py-6 flex items-center justify-between z-10">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Registration Details</div>
                <h2 className="text-lg font-black uppercase tracking-tight text-white">{selected.full_name}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-8 py-8 space-y-10">
              {(() => {
                const conf = STATUS_CONFIG[selected.status];
                return (
                  <div className={`inline-flex items-center gap-2 px-3 py-2 border text-[10px] font-black uppercase tracking-widest ${conf.bg} ${conf.color}`}>
                    <conf.icon className="w-3.5 h-3.5" />
                    {conf.label}
                  </div>
                );
              })()}

              <Section label="Programme Info">
                <DetailRow icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Training Title" value={selected.training_title} />
                <DetailRow icon={<Clock className="w-3.5 h-3.5" />} label="Registered On" value={new Date(selected.applied_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
              </Section>

              <Section label="Personal Information">
                <DetailRow icon={<User className="w-3.5 h-3.5" />} label="Full Name" value={selected.full_name} />
                <DetailRow icon={<Building2 className="w-3.5 h-3.5" />} label="Company" value={selected.company || "N/A"} />
              </Section>

              <Section label="Contact Details">
                <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={selected.email} />
                <DetailRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={selected.phone} />
              </Section>

              {selected.notes && (
                <Section label="Additional Notes">
                  <div className="bg-black border border-white/10 p-5 text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.notes}
                  </div>
                </Section>
              )}

              <Section label="Update Status">
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(STATUS_CONFIG) as [TrainingRegistration["status"], typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG]][]).map(([s, c]) => (
                    <button
                      key={s}
                      onClick={() => changeStatus(selected.id, s)}
                      className={`flex items-center gap-2 px-4 py-3 border text-[9px] font-black uppercase tracking-widest transition-all ${selected.status === s ? `${c.bg} ${c.color} border-current` : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"}`}
                    >
                      <c.icon className="w-3.5 h-3.5" /> {c.label}
                    </button>
                  ))}
                </div>
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{label}</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-white/30 mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-0.5">{label}</div>
        <div className="text-sm text-white font-medium">{value}</div>
      </div>
    </div>
  );
}
