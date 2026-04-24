"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getAllAGMRecords } from "@/lib/mock-data";
import { AGMRecord } from "@/types";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AGMPage() {
    const [agmRecords, setAgmRecords] = useState<AGMRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    async function fetchRecords() {
        setLoading(true);
        try {
            const data = await getAllAGMRecords();
            setAgmRecords(data);
        } catch (error) {
            toast.error("Failed to fetch records");
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = (agm: AGMRecord) => {
        if (agm.minutes_file_url && agm.minutes_file_url.trim() !== "") {
            window.open(agm.minutes_file_url, "_blank", "noopener,noreferrer");
        } else {
            toast.error("Minutes document not yet available for this meeting.");
        }
    };

    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                title="Annual General Meetings"
                subtitle="Official records and minutes from AAM Annual General Meetings. Download minutes for each session below."
            />

            <section className="py-24 bg-black">
                <div className="container mx-auto px-6 max-w-5xl">

                    {/* Table */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center py-24">
                                <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white uppercase text-[11px] tracking-[0.3em] font-bold text-white">
                                        <th className="py-6 px-4 w-24">Year</th>
                                        <th className="py-6 px-4 w-44">Date Held</th>
                                        <th className="py-6 px-4">Title</th>
                                        <th className="py-6 px-4 text-right w-48">Minutes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-white">
                                    {agmRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-16 px-4 text-center text-white/30 text-sm uppercase tracking-widest">
                                                No AGM records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        agmRecords.map((agm) => (
                                            <tr key={agm.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="py-8 px-4 font-black text-2xl align-top tabular-nums">
                                                    {agm.year}
                                                </td>
                                                <td className="py-8 px-4 text-white/50 tracking-widest align-top text-sm">
                                                    {new Date(agm.date_held).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td className="py-8 px-4 align-top max-w-sm">
                                                    <p className="font-bold uppercase tracking-widest mb-2 text-sm">
                                                        {agm.title}
                                                    </p>
                                                    <p className="text-xs text-white/40 leading-relaxed font-light">
                                                        {agm.resolutions}
                                                    </p>
                                                </td>
                                                <td className="py-8 px-4 text-right align-top">
                                                    <button
                                                        onClick={() => handleDownload(agm)}
                                                        className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                                                            agm.minutes_file_url && agm.minutes_file_url.trim() !== ""
                                                                ? "text-white underline underline-offset-4 hover:text-white/60"
                                                                : "text-white/25 cursor-not-allowed"
                                                        }`}
                                                        title={
                                                            agm.minutes_file_url && agm.minutes_file_url.trim() !== ""
                                                                ? "Download minutes document"
                                                                : "Minutes not yet available"
                                                        }
                                                    >
                                                        <Download className="w-3.5 h-3.5 flex-shrink-0" />
                                                        Download Minutes
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Notice panel */}
                    <div className="mt-24 p-12 bg-black border border-white/10 text-white">
                        <div className="flex items-start gap-4">
                            <FileText className="w-5 h-5 text-white/40 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">Notice of Next AGM</h3>
                                <p className="text-white/40 leading-relaxed font-light text-sm">
                                    Details regarding the next AGM will be announced to all members via email. Eligible members
                                    (Professional and General categories) are encouraged to attend and participate in the democratic
                                    governance of the association.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
