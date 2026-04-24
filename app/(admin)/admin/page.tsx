"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Newspaper,
  Calendar,
  Briefcase,
  Users,
  ShieldCheck,
  Building2,
  FileText,
  Image as ImageIcon,
  Activity,
  ClipboardList,
  MessageSquare,
  Loader2
} from "lucide-react";
import Link from "next/link";
import {
  getAllNews,
  getAllEvents,
  getAllMembers,
  getAllJobs,
  getAllTraining,
  getAllGalleryAlbums,
  getAllFirms,
  getAllTrainingRegistrations,
  getAllThreads,
  getAllAGMRecords,
  getAllJobApplications,
} from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    members: 0,
    firms: 0,
    news: 0,
    events: 0,
    jobs: 0,
    training: 0,
    trainingApps: 0,
    gallery: 0,
    agm: 0,
    threads: 0,
    jobApps: [] as any[],
    trainingRegs: [] as any[],
    contactSubs: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      const supabase = createClient();
      
      const safeFetch = async (fn: () => Promise<any>, fallback: any = []) => {
        try {
          return await fn();
        } catch (e) {
          console.error(`Fetch failed:`, e);
          return fallback;
        }
      };

      const [
        news, events, members, jobs, training, 
        gallery, firms, trainingRegs, threads, 
        agm, jobApps, contactSubsResult
      ] = await Promise.all([
        safeFetch(getAllNews),
        safeFetch(getAllEvents),
        safeFetch(getAllMembers),
        safeFetch(getAllJobs),
        safeFetch(getAllTraining),
        safeFetch(getAllGalleryAlbums),
        safeFetch(getAllFirms),
        safeFetch(getAllTrainingRegistrations),
        safeFetch(getAllThreads),
        safeFetch(getAllAGMRecords),
        safeFetch(getAllJobApplications),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(10)
      ]);

      setStats({
        news: news.length,
        events: events.length,
        members: members.length,
        jobs: jobs.length,
        training: training.length,
        gallery: gallery.length,
        firms: firms.length,
        trainingApps: trainingRegs.length,
        threads: threads.length,
        agm: agm.length,
        jobApps,
        trainingRegs,
        contactSubs: contactSubsResult.data || []
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to synchronize dashboard telemetry");
    } finally {
        setLoading(false);
    }
  }

  const recentActivity = useMemo(() => {
    const activities = [
      ...stats.jobApps.map(a => ({ 
        action: `Job App: ${a.full_name} (${a.job_title})`, 
        time: a.applied_at 
      })),
      ...stats.trainingRegs.map(r => ({ 
        action: `Training Reg: ${r.full_name}`, 
        time: r.applied_at 
      })),
      ...stats.contactSubs.map(c => ({ 
        action: `Contact: ${c.full_name || 'Inquiry'} - ${c.subject}`, 
        time: c.created_at 
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

    return activities.length > 0 ? activities : [
      { action: "Admin Session Initiated", time: new Date().toISOString() },
      { action: "Registry Synchronization Active", time: new Date().toISOString() }
    ];
  }, [stats]);

  const modules = [
    { name: "Global Newsfeed", icon: Newspaper, count: stats.news, href: "/news" },
    { name: "Events Calendar", icon: Calendar, count: stats.events, href: "/events" },
    { name: "Job Vacancies", icon: Briefcase, count: stats.jobs, href: "/jobs" },
    { name: "Job Applications", icon: ClipboardList, count: stats.jobApps.length, href: "/admin/applications" },
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
        <div className="border-b border-white/10 pb-12 pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
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
          {loading && (
            <div className="flex items-center gap-3 text-white/20 animate-pulse">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest">Syncing Telemetry...</span>
            </div>
          )}
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
                {recentActivity.map((log, i) => (
                  <div key={i} className="flex gap-4 items-start border-l border-white/20 pl-4 relative">
                    <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-white/20 border-2 border-black" />
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-tight text-white">{log.action}</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
                        {formatDistanceToNow(new Date(log.time), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}
                {!loading && recentActivity.length === 0 && (
                    <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold">No recent external activity logs.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
