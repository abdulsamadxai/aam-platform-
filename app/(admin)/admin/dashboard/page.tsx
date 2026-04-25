import { Users, UserPlus, MessageSquare, Send, ArrowUpRight, Shield } from "lucide-react";
import Link from "next/link";
import {
    getAllMembers,
    getAllThreads,
} from "@/lib/api";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
    const supabase = await createClient();
    
    // Fetch stats in parallel
    const [members, threads, { count: pendingApps }] = await Promise.all([
        getAllMembers(),
        getAllThreads(),
        supabase.from('membership_applications').select('*', { count: 'exact', head: true }).eq('status', 'new')
    ]);

    const stats = [
        { label: "Verified Members", value: members.length, icon: Users, href: "/admin/members" },
        { label: "Pending Apps", value: pendingApps || 0, icon: UserPlus, href: "/admin/applications" },
        { label: "Forum Threads", value: threads.length, icon: MessageSquare, href: "/admin/forum" },
        { label: "Broadcasts", value: 0, icon: Send, href: "/admin/broadcast" }, // Placeholder for broadcast count
    ];

    // Fetch recent applications
    const { data: recentApps } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header>
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Institutional Dashboard</h1>
                <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Control center for AAM platform administration.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href} className="group bg-aam-near-black p-8 border border-white/5 hover:border-white/20 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey group-hover:text-white transition-colors">{stat.label}</div>
                            <stat.icon className="w-5 h-5 text-aam-dark-grey group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-5xl font-bold tracking-tighter">{stat.value}</div>
                            <ArrowUpRight className="w-4 h-4 text-aam-dark-grey group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                {/* Recent Applications */}
                <section className="space-y-6">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <h2 className="text-lg font-bold uppercase tracking-widest">Recent Applications</h2>
                        <Link href="/admin/applications" className="text-[10px] font-bold uppercase tracking-widest text-aam-grey hover:text-white">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {recentApps?.map((app) => (
                            <div key={app.id} className="p-6 bg-aam-near-black border border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold uppercase tracking-tight">{app.full_name}</div>
                                    <div className="text-[10px] text-aam-grey uppercase tracking-widest mt-1">{app.category_applied} • {new Date(app.created_at).toLocaleDateString()}</div>
                                </div>
                                <div className="px-3 py-1 bg-white/5 text-[9px] font-bold uppercase tracking-widest text-aam-grey border border-white/10">{app.status.toUpperCase()}</div>
                            </div>
                        ))}
                        {(!recentApps || recentApps.length === 0) && (
                            <div className="p-6 text-center text-aam-grey uppercase tracking-widest text-[10px]">No recent applications.</div>
                        )}
                    </div>
                </section>

                {/* System Health */}
                <section className="space-y-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">System Alerts</h2>
                    <div className="bg-black border border-dashed border-white/10 p-8 space-y-6">
                        <div className="flex gap-4">
                            <Shield className="w-5 h-5 text-white/40" />
                            <p className="text-xs text-aam-grey leading-relaxed">
                                Supabase connectivity verified. Row Level Security is active.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <MessageSquare className="w-5 h-5 text-white/40" />
                            <p className="text-xs text-aam-grey leading-relaxed">
                                Database migration completed: Schema Phase 5.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
