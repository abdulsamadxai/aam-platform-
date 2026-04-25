"use client";

import { useEffect, useState } from "react";
import { getAllPages } from "@/lib/api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContentTable } from "@/components/admin/ContentTable";
import { FileText, Clock, ExternalLink } from "lucide-react";
import { SitePage } from "@/types";

export default function PagesManagerPage() {
    const [pages, setPages] = useState<SitePage[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchPages();
    }, []);

    async function fetchPages() {
        setLoading(true);
        try {
            const data = await getAllPages();
            setPages(data);
        } catch {
            // fail silently — empty state is shown
        } finally {
            setLoading(false);
        }
    }

    const columns = [
        {
            key: "title",
            label: "PAGE IDENTIFIER",
            render: (row: SitePage) => (
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-black text-white flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-black uppercase tracking-tight">{row.title}</p>
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">/{row.slug}</p>
                    </div>
                </div>
            )
        },
        {
            key: "updated_at",
            label: "LAST MODIFICATION",
            render: (row: SitePage) => {
                const dateString = (row as any).updated_at || (row as any).created_at || new Date().toISOString();
                return (
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                        <Clock className="h-4 w-4" />
                        {new Date(dateString).toLocaleDateString('en-GB')} AT {new Date(dateString).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )
            }
        }
    ];

    return (
        <div className="space-y-24 py-12">
            <AdminPageHeader
                title={"Institutional\nNodes"}
                subtitle="Static Content & Legal Framework"
                actionHref="/admin/pages/new"
                actionLabel="DEPLOY NEW NODE"
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3">
                    <ContentTable
                        columns={columns}
                        data={pages}
                        isLoading={loading}
                        searchKey="title"
                        onEdit={(row: SitePage) => window.location.href = `/admin/pages/${row.slug}`}
                        onView={(row: SitePage) => window.open(`/${row.slug}`, '_blank')}
                    />
                </div>

                <div className="space-y-12">
                    <div className="p-10 border-4 border-black bg-white space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-4">
                            ARCHIVAL METRICS
                        </h3>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">MANAGED NODES</p>
                            <p className="text-6xl font-black tracking-tighter">{pages.length}</p>
                        </div>
                        <div className="pt-6">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border-2 border-black p-4">
                                <ExternalLink className="h-4 w-4" />
                                SYSTEM_LIVE
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-4 border-black border-dashed bg-neutral-50">
                        <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-neutral-500">
                            INSTITUTIONAL PAGES DEFINE THE LEGAL AND PHILOSOPHICAL FRAMEWORK OF AAM. EDIT WITH EXTREME PRECISION.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
