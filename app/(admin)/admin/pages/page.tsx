"use client";

import { useEffect, useState } from "react";
import { MOCK_SITE_PAGES } from "@/lib/mock-data";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ContentTable } from "@/components/admin/ContentTable";
import { FileText, Clock, ExternalLink } from "lucide-react";

interface SitePage {
    slug: string;
    title: string;
    updated_at: string;
}

export default function PagesManagerPage() {
    const [pages, setPages] = useState<SitePage[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setPages(Object.values(MOCK_SITE_PAGES).map(p => ({
            slug: p.slug,
            title: p.title,
            updated_at: new Date().toISOString()
        })));
        setLoading(false);
    }, []);

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
                        <p className="text-[9px] font-bold text-mono-400 uppercase tracking-widest">/{row.slug}</p>
                    </div>
                </div>
            )
        },
        {
            key: "updated_at",
            label: "LAST MODIFICATION",
            render: (row: SitePage) => (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-mono-600">
                    <Clock className="h-4 w-4" />
                    {new Date(row.updated_at).toLocaleDateString('en-GB')} AT {new Date(row.updated_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </div>
            )
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
                        onEdit={(row) => window.location.href = `/admin/pages/${row.slug}`}
                        onView={(row) => window.open(`/${row.slug}`, '_blank')}
                    />
                </div>

                <div className="space-y-12">
                    <div className="p-10 border-4 border-black bg-white space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-4">
                            ARCHIVAL METRICS
                        </h3>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-mono-400 uppercase tracking-widest">MANAGED NODES</p>
                            <p className="text-6xl font-black tracking-tighter">{pages.length}</p>
                        </div>
                        <div className="pt-6">
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border-2 border-black p-4">
                                <ExternalLink className="h-4 w-4" />
                                SYSTEM_LIVE
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-4 border-black border-dashed bg-mono-50">
                        <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-mono-500">
                            INSTITUTIONAL PAGES DEFINE THE LEGAL AND PHILOSOPHICAL FRAMEWORK OF AAM. EDIT WITH EXTREME PRECISION.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
