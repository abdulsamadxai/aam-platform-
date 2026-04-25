"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { AGMRecordForm } from "@/components/admin/forms/AGMRecordForm";
import { getAllAGMRecords } from "@/lib/api";
import { toast } from "react-hot-toast";
import type { AGMRecord } from "@/types";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Download, FileText, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AGMPage() {
  const { isEditMode } = useAdmin();
  const router = useRouter();

  const [agmRecords, setAgmRecords] = useState<AGMRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingRecord, setEditingRecord] = useState<AGMRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<AGMRecord | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);

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

  const handleUpdate = async (data: any) => {
    try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        
        if (isAddingRecord) {
            await supabase.from('agm_records').insert([data]);
            toast.success("AGM record added");
        } else if (editingRecord) {
            await supabase.from('agm_records').update(data).eq('id', editingRecord.id);
            toast.success("AGM record updated");
        }
        
        setIsAddingRecord(false);
        setEditingRecord(null);
        fetchRecords();
    } catch (error) {
        toast.error("Operation failed");
    }
  };

  return (
    <div className="container py-24 space-y-24 text-black bg-white min-h-screen">
      <PageHeader
        title="AGM RECORDS"
        description="Institutional archives containing official minutes and statutory resolutions from the AAM Annual General Meetings."
      />

      <div className="space-y-8">
        <div className="flex justify-between items-end border-b-8 border-black pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Archival Registry
          </h2>
          {isEditMode && (
            <button
              onClick={() => setIsAddingRecord(true)}
              className="flex items-center gap-3 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black/90 transition-all mb-2"
            >
              <Plus className="w-4 h-4" /> DEPOSIT NEW RECORD
            </button>
          )}
        </div>

        <div className="border-4 border-black rounded-none overflow-hidden bg-white">
          {loading ? (
              <div className="flex justify-center py-24">
                  <Loader2 className="w-8 h-8 animate-spin text-black/20" />
              </div>
          ) : (
            <Table>
                <TableHeader className="bg-black hover:bg-black">
                <TableRow className="hover:bg-black border-b-4 border-black">
                    <TableHead className="w-[120px] text-white font-black uppercase tracking-widest text-[10px] h-16 px-8">Year</TableHead>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Proceedings Title</TableHead>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Calendar Date</TableHead>
                    <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Statutory Status</TableHead>
                    <TableHead className="text-right text-white font-black uppercase tracking-widest text-[10px] h-16 px-8">Dossier</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {agmRecords.map((record) => (
                    <TableRow key={record.id} className="border-b-2 border-black/10 hover:bg-black/5 transition-colors group">
                    <TableCell className="font-black text-black px-8 py-10 text-3xl tracking-tighter align-top">
                        {record.year}
                    </TableCell>
                    <TableCell className="font-black uppercase tracking-tight text-sm align-top pt-11 max-w-md">
                        <EditableBlock
                        label="AGM Record"
                        onEdit={() => setEditingRecord(record)}
                        onDelete={() => setDeletingRecord(record)}
                        >
                        <div className="space-y-4">
                            <p>{record.title || `${record.year} ANNUAL GENERAL MEETING`}</p>
                            <p className="text-[10px] font-bold text-black/40 normal-case tracking-normal leading-relaxed">
                            {record.resolutions}
                            </p>
                        </div>
                        </EditableBlock>
                    </TableCell>
                    <TableCell className="text-[10px] font-black uppercase tracking-widest text-black/40 align-top pt-12">
                        {new Date(record.date_held).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="align-top pt-11">
                        <span className="bg-black text-white font-black px-3 py-1 text-[9px] uppercase tracking-widest">
                        Official Record
                        </span>
                    </TableCell>
                    <TableCell className="text-right px-8 align-top pt-11">
                        <button 
                        onClick={() => {
                            if (record.minutes_file_url) {
                                window.open(record.minutes_file_url, '_blank');
                            } else {
                                toast.error("Minutes not available");
                            }
                        }}
                        className={`inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:text-black/60 transition-colors group ${!record.minutes_file_url ? 'opacity-25 cursor-not-allowed' : ''}`}
                        >
                        <Download className="h-4 w-4" />
                        DOWNLOAD_PROTOCOL
                        </button>
                    </TableCell>
                    </TableRow>
                ))}
                {agmRecords.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="py-24 text-center text-black/20 uppercase tracking-[0.3em] font-black">
                            No Archival Records Found
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center bg-black p-12 md:p-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="h-24 w-24 bg-white flex items-center justify-center shrink-0 relative z-10">
          <FileText className="h-10 w-10 text-black" />
        </div>
        <div className="space-y-4 relative z-10 flex-grow">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">AAM <br /> Constitution</h3>
          <p className="text-white/40 text-lg font-medium leading-tight max-w-xl">
            For historical records prior to 2023 or specific queries regarding past
            general meetings, please contact the AAM Secretariat.
          </p>
        </div>
        <button onClick={() => router.push('/contact')} className="bg-white text-black font-black uppercase tracking-widest text-xs py-6 px-12 border-2 border-white hover:bg-black hover:text-white transition-all relative z-10 group">
          REQUEST ARCHIVES <ArrowRight className="inline-block ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Modals */}
      <EditModal
        open={!!editingRecord || isAddingRecord}
        onClose={() => { setEditingRecord(null); setIsAddingRecord(false); }}
        title={isAddingRecord ? "Add AGM Record" : "Edit AGM Record"}
      >
        <AGMRecordForm
          initialData={editingRecord || undefined}
          onCancel={() => { setEditingRecord(null); setIsAddingRecord(false); }}
          onSubmit={handleUpdate}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingRecord}
        itemName={`AGM Record ${deletingRecord?.year}`}
        onClose={() => setDeletingRecord(null)}
        onConfirm={async () => {
          try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            await supabase.from('agm_records').delete().eq('id', deletingRecord?.id);
            setDeletingRecord(null);
            toast.success("AGM record removed");
            fetchRecords();
          } catch (error) {
            toast.error("Failed to delete record");
          }
        }}
      />
    </div>
  );
}
