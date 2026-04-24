import { Award, Shield, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MOCK_MEMBERS } from "@/lib/mock-data";

export default async function MemberDashboard() {
  const member = MOCK_MEMBERS[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Welcome back, {member.full_name.split(' ')[0]}</h1>
        <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Access your professional console and records.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Verification Status", value: member.status, icon: Shield, detail: "Standard Registry" },
          { label: "AAM ID", value: member.aam_id || "PENDING", icon: null, detail: "Core Identifier" },
          { label: "CPD Points", value: "14 / 20", icon: Award, detail: "2026 Cycle" },
          { label: "Renewal Due", value: "Jan 2027", icon: null, detail: "Annual Requirement" },
        ].map((stat, i) => (
          <div key={i} className="bg-aam-near-black p-8 border border-white/5 space-y-6 group hover:border-white/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] -mr-8 -mt-8 rotate-45 group-hover:bg-white/[0.04] transition-all" />
            <div className="space-y-1">
              <div className="text-[9px] uppercase font-bold tracking-[0.25em] text-aam-grey/60">{stat.label}</div>
              <div className="text-2xl font-bold uppercase flex items-center gap-3">
                {stat.value}
                {stat.icon && <stat.icon className="w-4 h-4 text-white/40" />}
              </div>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-aam-grey/40">{stat.detail}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        {/* Activity & Forum */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Latest Professional Discourse</h2>
            <div className="space-y-4">
              {[
                { title: "Standardising Contract Formats for Island Resorts", author: "Ahmed Nazim", date: "2h ago" },
                { title: "Feedback on Draft Building Height Regulations", author: "Aminath Ali", date: "1d ago" },
              ].map((thread, i) => (
                <Link key={i} href="/member/forum" className="group block p-6 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all">
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:underline underline-offset-4">{thread.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-aam-grey">
                    <span>{thread.author}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span>{thread.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Notifications</h2>
            <div className="bg-aam-near-black p-6 border border-white/5 text-sm text-aam-grey space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-white rounded-full mt-1.5 shrink-0" />
                <p>Your CPD submission for &quot;BIM Fundamentals&quot; has been approved (5 Points).</p>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-white/20 rounded-full mt-1.5 shrink-0" />
                <p>Annual General Meeting statutory documents for 2026 are now available in the vault.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <div className="bg-aam-elevated border border-white/10 p-8 space-y-8 transition-all hover:border-white/20">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-4 text-aam-grey">
              Consolidated Operations
            </h3>
            <div className="space-y-6">
              <Link href="/member/documents" className="flex items-center justify-between group py-2">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Membership Cert</span>
                <div className="p-2 bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <FileText className="w-4 h-4" />
                </div>
              </Link>
              <Link href="/member/profile" className="flex items-center justify-between group py-2">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Update Dossier</span>
                <div className="p-2 bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
              <button className="flex items-center justify-between w-full group py-2">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform text-left">Renew Status</span>
                <div className="p-2 bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>

          <div className="p-8 border border-white/5 bg-white/[0.02] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-aam-grey/20 group-hover:bg-white transition-colors" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-aam-grey mb-4 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Institutional Note
            </h3>
            <p className="text-[11px] text-aam-grey/80 leading-relaxed font-mono">
              All member activities are logged for professional audit. Please ensure your contact details remain synchronized with the core registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
