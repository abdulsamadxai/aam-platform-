"use client";

import { useState, useEffect } from "react";
import { getAllAGMRecords, saveAGMRecords } from "@/lib/mock-data";
import { AGMRecord } from "@/types";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { AGMRecordForm } from "@/components/admin/forms/AGMRecordForm";
import { toast } from "react-hot-toast";
import {
    Plus,
    Pencil,
    Trash2,
    Download,
    FileText,
    ArrowLeft,
    ExternalLink,
    Calendar,
} from "lucide-react";
import Link from "next/link";

function ordinalSuffix(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function AdminAGMPage() {
    const [records, setRecords] = useState<AGMRecord[]>([]);
    const [editingRecord, setEditingRecord] = useState<AGMRecord | null>(null);
    const [deletingRecord, setDeletingRecord] = useState<AGMRecord | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const data = getAllAGMRecords();
        setRecords([...data].sort((a, b) => b.year - a.year));
    }, []);

    const persist = (updated: AGMRecord[]) => {
        const sorted = [...updated].sort((a, b) => b.year - a.year);
        saveAGMRecords(sorted);
        setRecords(sorted);
    };

    const handleAdd = (data: any) => {
        const newRecord: AGMRecord = {
            ...data,
            id: `agm-${Date.now()}`,
        };
        persist([...records, newRecord]);
        setIsAdding(false);
        toast.success("AGM record added successfully.");
    };

    const handleUpdate = (data: any) => {
        if (!editingRecord) return;
        const updated = records.map((r) =>
            r.id === editingRecord.id ? { ...r, ...data } : r
        );
        persist(updated);
        setEditingRecord(null);
        toast.success("AGM record updated.");
    };

    const handleDelete = () => {
        if (!deletingRecord) return;
        const updated = records.filter((r) => r.id !== deletingRecord.id);
        persist(updated);
        setDeletingRecord(null);
        toast.success("AGM record deleted.");
    };

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#444_0%,transparent_65%)]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 max-w-6xl py-12">

                {/* Back nav */}
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors mb-10"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Admin Command Center
                </Link>

                {/* Header */}
                <div className="border-b border-white/10 pb-10 mb-10">
                    <div className="flex items-start justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-1.5 w-1.5 bg-white animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                                    AGM Management Protocol
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                                Annual General<br />Meetings
                            </h1>
                            <p className="text-white/40 text-sm font-light max-w-xl leading-relaxed">
                                Manage all AGM records globally. Add new meetings, update existing records,
                                upload minutes document links, and remove outdated entries. Changes are
                                reflected immediately on the public-facing AGM page.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAdding(true)}
                            className="flex-shrink-0 flex items-center gap-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.25em] px-6 py-4 hover:bg-white/90 transition-all shadow-2xl"
                        >
                            <Plus className="w-4 h-4" />
                            Add AGM Record
                        </button>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        { label: "Total Records", value: records.length },
                        {
                            label: "With Minutes",
                            value: records.filter(
                                (r) => r.minutes_file_url && r.minutes_file_url.trim() !== ""
                            ).length,
                        },
                        {
                            label: "Missing Minutes",
                            value: records.filter(
                                (r) => !r.minutes_file_url || r.minutes_file_url.trim() === ""
                            ).length,
                        },
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="bg-[#0a0a0a] border border-white/10 px-6 py-5"
                        >
                            <p className="text-3xl font-black tabular-nums mb-1">
                                {String(s.value).padStart(2, "0")}
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* AGM Records Table */}
                <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[80px_160px_1fr_160px_140px] gap-4 px-6 py-4 border-b border-white/10 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
                        <span>Year</span>
                        <span>Date Held</span>
                        <span>Meeting Title &amp; Resolutions</span>
                        <span>Minutes</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {records.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <FileText className="w-10 h-10 text-white/10 mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                No AGM Records Found
                            </p>
                            <p className="text-xs text-white/10 mt-2">
                                Click &ldquo;Add AGM Record&rdquo; to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {records.map((agm) => {
                                const hasMinutes =
                                    agm.minutes_file_url && agm.minutes_file_url.trim() !== "";
                                return (
                                    <div
                                        key={agm.id}
                                        className="grid grid-cols-[80px_160px_1fr_160px_140px] gap-4 px-6 py-6 items-center hover:bg-white/[0.02] transition-colors group"
                                    >
                                        {/* Year */}
                                        <div className="font-black text-2xl tabular-nums">
                                            {agm.year}
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-white/50 text-xs">
                                            <Calendar className="w-3 h-3 flex-shrink-0" />
                                            {new Date(agm.date_held).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>

                                        {/* Title & Resolutions */}
                                        <div className="min-w-0">
                                            <p className="font-bold uppercase tracking-widest text-xs mb-1.5 truncate">
                                                {agm.title}
                                            </p>
                                            <p className="text-[11px] text-white/35 leading-relaxed line-clamp-2">
                                                {agm.resolutions}
                                            </p>
                                        </div>

                                        {/* Minutes status */}
                                        <div>
                                            {hasMinutes ? (
                                                <a
                                                    href={agm.minutes_file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white hover:text-white/60 transition-colors"
                                                >
                                                    <Download className="w-3 h-3" />
                                                    Download
                                                    <ExternalLink className="w-2.5 h-2.5" />
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/20">
                                                    <Download className="w-3 h-3" />
                                                    Not Uploaded
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditingRecord(agm)}
                                                className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-black uppercase tracking-widest border border-white/20 text-white/60 hover:border-white hover:text-white transition-all"
                                                title="Edit record"
                                            >
                                                <Pencil className="w-3 h-3" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeletingRecord(agm)}
                                                className="flex items-center gap-1.5 px-3 py-2 text-[9px] font-black uppercase tracking-widest border border-white/10 text-white/30 hover:border-red-500/50 hover:text-red-400 transition-all"
                                                title="Delete record"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Info callout */}
                <div className="mt-8 border border-white/5 bg-[#0a0a0a] px-6 py-5 flex items-start gap-4">
                    <div className="h-1.5 w-1.5 bg-white/20 flex-shrink-0 mt-1.5" />
                    <p className="text-[11px] text-white/30 leading-relaxed">
                        <span className="text-white/50 font-bold">Minutes Upload: </span>
                        Paste a publicly accessible URL (Google Drive, Dropbox, SharePoint, etc.) in the
                        minutes field. The Download Minutes button on the public AGM page will link
                        directly to this URL. If left empty, the button will be greyed out for that record.
                    </p>
                </div>
            </div>

            {/* Add Modal */}
            <EditModal
                open={isAdding}
                onClose={() => setIsAdding(false)}
                title="Add AGM Record"
            >
                <AGMRecordForm
                    initialData={{}}
                    onCancel={() => setIsAdding(false)}
                    onSubmit={handleAdd}
                />
            </EditModal>

            {/* Edit Modal */}
            <EditModal
                open={!!editingRecord}
                onClose={() => setEditingRecord(null)}
                title="Edit AGM Record"
            >
                {editingRecord && (
                    <AGMRecordForm
                        initialData={editingRecord}
                        onCancel={() => setEditingRecord(null)}
                        onSubmit={handleUpdate}
                    />
                )}
            </EditModal>

            {/* Confirm Delete */}
            <ConfirmDelete
                open={!!deletingRecord}
                itemName={`${deletingRecord?.title || `AGM Record ${deletingRecord?.year}`}`}
                onClose={() => setDeletingRecord(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}
