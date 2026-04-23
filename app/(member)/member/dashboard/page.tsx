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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-aam-near-black p-8 border border-white/5 space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Status</div>
          <div className="text-2xl font-bold uppercase flex items-center gap-2">
            {member.status}
            <Shield className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="bg-aam-near-black p-8 border border-white/5 space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">AAM ID</div>
          <div className="text-2xl font-mono font-bold">{member.aam_id || "PENDING"}</div>
        </div>
        <div className="bg-aam-near-black p-8 border border-white/5 space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">CPD Points (2026)</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            14 / 20
            <Award className="w-5 h-5 text-aam-grey" />
          </div>
        </div>
        <div className="bg-aam-near-black p-8 border border-white/5 space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Renewal Due</div>
          <div className="text-2xl font-bold uppercase tracking-tighter">Jan 2027</div>
        </div>
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
          <div className="bg-white text-black p-8 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black/10 pb-4">Quick Actions</h3>
            <div className="space-y-4">
              <Link href="/member/documents" className="flex items-center justify-between group">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:underline">Membership Cert</span>
                <FileText className="w-4 h-4" />
              </Link>
              <Link href="/member/profile" className="flex items-center justify-between group">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:underline">Update Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="flex items-center justify-between w-full group">
                <span className="text-[11px] font-bold uppercase tracking-widest group-hover:underline">Renew Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-8 border border-dashed border-white/10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-aam-grey mb-4">Institutional Note</h3>
            <p className="text-[11px] text-aam-grey leading-relaxed italic">
              All member activities are logged for professional audit. Please ensure your contact details remain synchronized with the core registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
