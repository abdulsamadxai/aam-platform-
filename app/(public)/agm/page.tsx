"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { AGMRecordForm } from "@/components/admin/forms/AGMRecordForm";
import { useAdmin } from "@/lib/admin-context";
import { Download, FileText, ArrowRight, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AGMPage() {
    const { isEditMode } = useAdmin();

    const [agmRecords, setAgmRecords] = useState([
        { id: "1", year: 2025, date_held: "2025-01-11", title: "31ST ANNUAL GENERAL MEETING", resolutions: "5 statutory resolutions adopted regarding professional accreditation protocols and CPD requirements for the upcoming term." },
        { id: "2", year: 2024, date_held: "2024-01-14", title: "30TH ANNUAL GENERAL MEETING", resolutions: "3 constitutional amendments passed regarding the election process for the external oversight board." },
        { id: "3", year: 2023, date_held: "2023-01-08", title: "29TH ANNUAL GENERAL MEETING", resolutions: "4 resolutions passed regarding the formal establishment of the architectural standards registry." },
    ]);

    const [editingRecord, setEditingRecord] = useState<any>(null);
    const [deletingRecord, setDeletingRecord] = useState<any>(null);
    const [isAddingRecord, setIsAddingRecord] = useState(false);

    const handleUpdate = (data: any) => {
        if (isAddingRecord) {
            setAgmRecords(prev => [{ ...data, id: Date.now().toString(), title: `${data.year}${data.year > 2000 ? ['ST', 'ND', 'RD', 'TH'][(data.year - 1994) % 10 - 1] || 'TH' : ''} ANNUAL GENERAL MEETING` }, ...prev]);
            setIsAddingRecord(false);
            toast.success("AGM record added");
        } else {
            setAgmRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...data } : r));
            setEditingRecord(null);
            toast.success("AGM record updated");
        }
    };

    return (
        <main className="min-h-screen bg-black">
            <div className="relative">
                <PageHeader
                    title="Annual General Meetings"
                    subtitle="Records and minutes from AAM Annual General Meetings."
                />
                {isEditMode && (
                    <div className="absolute bottom-10 right-10 z-30">
                        <button
                            onClick={() => setIsAddingRecord(true)}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
                        >
                            <Plus className="w-4 h-4" /> Add Record
                        </button>
                    </div>
                )}
            </div>

            <section className="py-24 bg-black">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white uppercase text-[12px] tracking-[0.3em] font-bold text-white">
                                    <th className="py-6 px-4">Year</th>
                                    <th className="py-6 px-4">Date Held</th>
                                    <th className="py-6 px-4">Title</th>
                                    <th className="py-6 px-4 text-right">Minutes</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10 text-white">
                                {agmRecords.map((agm, i) => (
                                    <tr key={agm.id} className="hover:bg-white/5 transition-colors relative group">
                                        <td className="py-8 px-4 font-bold text-xl align-top">
                                            <EditableBlock
                                                label="AGM Record"
                                                onEdit={() => setEditingRecord(agm)}
                                                onDelete={() => setDeletingRecord(agm)}
                                            >
                                                {agm.year}
                                            </EditableBlock>
                                        </td>
                                        <td className="py-8 px-4 text-aam-grey tracking-widest align-top">
                                            {new Date(agm.date_held).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                        <td className="py-8 px-4 align-top max-w-sm">
                                            <p className="font-bold uppercase tracking-widest mb-2">{agm.title}</p>
                                            <p className="text-xs text-white/50 leading-relaxed font-light">{agm.resolutions}</p>
                                        </td>
                                        <td className="py-8 px-4 text-right align-top">
                                            <button className="text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-aam-grey transition-colors text-white">
                                                Download Minutes
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-24 p-12 bg-black border border-white/5 rounded-none text-white">
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-6">Notice of Next AGM</h3>
                        <p className="text-aam-grey leading-relaxed font-light">
                            Details regarding the next AGM will be announced to all members via email. Eligible members (Professional and General categories) are encouraged to attend and participate in the democratic governance of the association.
                        </p>
                    </div>
                </div>
            </section>

            {/* Modals */}
            <EditModal
                open={!!editingRecord || isAddingRecord}
                onClose={() => { setEditingRecord(null); setIsAddingRecord(false); }}
                title={isAddingRecord ? "Add AGM Record" : "Edit AGM Record"}
            >
                <AGMRecordForm
                    initialData={editingRecord || {}}
                    onCancel={() => { setEditingRecord(null); setIsAddingRecord(false); }}
                    onSubmit={handleUpdate}
                />
            </EditModal>

            <ConfirmDelete
                open={!!deletingRecord}
                itemName={`AGM Record ${deletingRecord?.year}`}
                onClose={() => setDeletingRecord(null)}
                onConfirm={() => {
                    setAgmRecords(prev => prev.filter(r => r.id !== deletingRecord.id));
                    setDeletingRecord(null);
                    toast.success("AGM record deleted");
                }}
            />
        </main>
    );
}
