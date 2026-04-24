"use client";

import { useMemo } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  Newspaper,
  Calendar,
  Briefcase,
  Trophy,
  Users,
  ShieldCheck,
  Building2,
  FileText,
  Image as ImageIcon,
  Activity,
  ClipboardList,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import {
  getAllNews,
  getAllEvents,
  getAllMembers,
  getAllJobs,
  getAllTraining,
  getAllAlbums,
  getAllFirms,
  getAllTrainingRegistrations,
  getAllThreads,
  getAllAGMRecords
} from "@/lib/mock-data";

export default function AdminDashboard() {
  const stats = useMemo(() => ({
    members: getAllMembers().length,
    firms: getAllFirms().length,
    news: getAllNews().length,
    events: getAllEvents().length,
    jobs: getAllJobs().length,
    training: getAllTraining().length,
    trainingApps: getAllTrainingRegistrations().length,
    gallery: getAllAlbums().length,
    agm: getAllAGMRecords().length,
    threads: getAllThreads().length
  }), []);

  const modules = [
    { name: "Global Newsfeed", icon: Newspaper, count: stats.news, href: "/news" },
    { name: "Events Calendar", icon: Calendar, count: stats.events, href: "/events" },
    { name: "Job Vacancies", icon: Briefcase, count: stats.jobs, href: "/jobs" },
    { name: "Job Applications", icon: ClipboardList, count: "→", href: "/admin/applications" },
    { name: "Member Directory", icon: Users, count: stats.members, href: "/members" },
    { name: "Registered Firms", icon: Building2, count: stats.firms, href: "/firms" },
    { name: "Training Academy", icon: ShieldCheck, count: stats.training, href: "/training" },
    { name: "Training Interest", icon: ClipboardList, count: stats.trainingApps, href: "/admin/training-applications" },
    { name: "Media Gallery", icon: ImageIcon, count: stats.gallery, href: "/gallery" },
    { name: "AGM Records", icon: FileText, count: stats.agm, href: "/admin/agm" },
    { name: "Discourse Moderation", icon: MessageSquare, count: stats.threads, href: "/admin/forum" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-24">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#333_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 space-y-24 py-12 container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="border-b border-white/10 pb-12 pt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-2 w-2 bg-white animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Admin Protocol_Active</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Command <br className="hidden md:block" /> Center
          </h1>
          <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Institutional Management Protocol. Oversee global architecture platforms, manage registered entities, and synchronize external content directly via in-situ editing.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-16">
          <div className="col-span-1 xl:col-span-2">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">Platform Modules</h2>
              <p className="text-xs text-white/40">Select a module to enter in-situ edit mode.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {modules.map((m) => (
                <Link
                  key={m.name}
                  href={m.href}
                  className="group relative bg-[#0a0a0a] border border-white/10 p-8 flex flex-col justify-between aspect-square hover:bg-[#151515] hover:border-white/30 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.05)_0%,transparent_50%)] group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start relative z-10">
                    <div className="h-12 w-12 rounded-full border border-white/20 text-white group-hover:border-white/60 group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <p className="text-4xl font-black tracking-tighter text-white/20 group-hover:text-white/40 transition-colors">
                      {String(m.count).padStart(2, '0')}
                    </p>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <div className="h-[2px] w-8 bg-white/20 group-hover:bg-white/60 group-hover:w-16 transition-all duration-500 mb-4" />
                    <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-white transition-colors leading-tight">
                      {m.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-2 mb-8 xl:mb-12">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">System Logs</h2>
              <p className="text-xs text-white/40">Real-time architecture telemetry.</p>
            </div>

            {/* Security Node */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <ShieldCheck className="h-5 w-5 text-white" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Security Metrics</h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">ACCESS_LEVEL</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">ADMIN_ROOT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">ENCRYPTION</span>
                  <span className="text-[10px] font-mono tracking-widest text-white">AES-256-GCM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">SESSION_STATUS</span>
                  <div className="flex items-center gap-2 px-2 py-1 bg-emerald-500/10 rounded">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-[#0a0a0a] border border-white/10 p-8 space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <Activity className="h-5 w-5 text-white" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">External Activity</h3>
              </div>

              <div className="space-y-6">
                {[
                  { action: "Admin Session Initiated", time: "2 mins ago" },
                  { action: "Member Registry Sync", time: "3 hours ago" },
                  { action: "System Backup Completed", time: "12 hours ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-l border-white/20 pl-4 relative">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-white/20 border-2 border-black" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-tight text-white">{log.action}</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
