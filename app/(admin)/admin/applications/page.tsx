"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Eye, Calendar, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllApplications } from "@/lib/mock-data";
import { RegistrationApplication } from "@/types";

export default function AdminApplications() {
    const [applications, setApplications] = useState<RegistrationApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setApplications(getAllApplications());
        setLoading(false);
    }, []);

    if (loading) return <div className="p-12 text-[10px] font-black uppercase tracking-widest">LOADING APPLICATIONS...</div>;

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header>
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Membership Applications</h1>
                <p className="text-black/40 uppercase tracking-widest text-xs font-medium">Review and process new professional registration submissions.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {applications.map((app) => (
                    <div key={app.id} className="bg-white border border-black/5 p-8 flex flex-col md:flex-row justify-between gap-8 hover:border-black/20 transition-all">
                        <div className="space-y-6 flex-grow">
                            <div className="flex flex-wrap items-center gap-6">
                                <div>
                                    <h2 className="text-xl font-bold uppercase tracking-tight">{app.full_name}</h2>
                                    <p className="text-[10px] text-black/40 uppercase tracking-widest mt-1">{app.email}</p>
                                </div>
                                <div className="px-3 py-1 border border-black/20 text-[9px] font-bold uppercase tracking-widest text-black">
                                    {app.category_applied} Candidate
                                </div>
                                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-black/40">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Submitted: {new Date(app.submitted_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-black/5">
                                <div className="space-y-2">
                                    <div className="text-[9px] uppercase font-bold tracking-widest text-black/40">Status</div>
                                    <div className="text-xs font-bold uppercase truncate">{app.status}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[9px] uppercase font-bold tracking-widest text-black/40">Category</div>
                                    <div className="text-xs font-bold uppercase">{app.category_applied || "N/A"}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[9px] uppercase font-bold tracking-widest text-black/40">Reference</div>
                                    <div className="text-xs font-bold uppercase">{app.id}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:flex-col justify-end gap-3 min-w-[160px]">
                            <Button className="w-full bg-black text-white hover:bg-black/80 h-12 rounded-none text-[10px] uppercase font-black tracking-widest">
                                <CheckCircle2 className="mr-2 w-4 h-4" />
                                Approve
                            </Button>
                            <Button variant="ghost" className="w-full h-12 text-red-600 hover:bg-red-50 rounded-none text-[10px] uppercase font-black tracking-widest">
                                <XCircle className="mr-2 w-4 h-4" />
                                Reject
                            </Button>
                            <Button variant="ghost" className="w-full h-12 text-black/40 hover:text-black rounded-none text-[10px] uppercase font-black tracking-widest">
                                <Eye className="mr-2 w-4 h-4" />
                                Details
                            </Button>
                        </div>
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="py-20 text-center border border-dashed border-black/10">
                        <p className="text-black/40 uppercase tracking-widest text-xs">No pending applications.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
