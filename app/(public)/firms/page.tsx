"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllFirms } from "@/lib/api";
import { useAdmin } from "@/lib/admin-context";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { FirmForm } from "@/components/admin/forms/FirmForm";
import { toast } from "react-hot-toast";

import { RegisteredFirm as Firm } from "@/types";

export default function FirmsPage() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Architectural Firms");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const { isEditMode } = useAdmin();
  const [editingRecord, setEditingRecord] = useState<Firm | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<Firm | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  useEffect(() => {
    fetchFirms();
  }, []);

  async function fetchFirms() {
    setLoading(true);
    try {
      const data = await getAllFirms();
      setFirms(data);
    } catch (error) {
      toast.error("Failed to fetch firms");
    } finally {
      setLoading(false);
    }
  }

  const filteredFirms = firms.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    (f.email && f.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredFirms.length / entriesPerPage);
  const paginatedFirms = filteredFirms.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleFirmSubmit = async (data: any) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      if (isAddingRecord) {
        await supabase.from('registered_firms').insert([data]);
        toast.success("Firm added successfully");
      } else if (editingRecord) {
        await supabase.from('registered_firms').update(data).eq('id', editingRecord.id);
        toast.success("Firm updated successfully");
      }
      
      setIsAddingRecord(false);
      setEditingRecord(null);
      fetchFirms();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const tabs = [
    "Architectural Firms",
    "Town planning Firms",
    "AE / PE Firms",
    "Document /Forms"
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="relative">
        <PageHeader
          title="Registered Firms"
          subtitle="Architecture firms registered with AAM in the Republic of Maldives."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingRecord(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add Firm
            </button>
          </div>
        )}
      </div>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Tabs Section */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-wrap gap-8 md:gap-12 border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-lg md:text-xl font-medium transition-all relative whitespace-nowrap",
                    activeTab === tab
                      ? "text-white"
                      : "text-white/40 hover:text-white/60"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8">
            <div className="flex items-center gap-3 text-sm text-white/60">
              <span>Show</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-black border border-white/20 px-3 py-1.5 rounded-sm focus:border-white outline-none cursor-pointer"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                placeholder="Search..."
                className="w-full bg-transparent border border-white/20 pl-12 pr-4 py-2 text-sm focus:border-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-white/10">
            {loading ? (
                <div className="flex justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 text-[11px] uppercase tracking-widest font-bold">
                    <tr>
                    <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Member Id
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Firm Name
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Email
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Principal Architect
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Category
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    <th className="px-6 py-4 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex justify-between items-center">
                        Status
                        <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                        </div>
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {paginatedFirms.map((firm) => (
                        <tr
                        key={firm.id}
                        className="hover:bg-white/5 transition-colors text-sm group"
                        >
                        <td className="px-6 py-5 font-mono text-white/50 group-hover:text-white transition-colors border-r border-white/10">
                            {firm.registration_number || "-"}
                        </td>
                        <td className="px-6 py-5 font-medium border-r border-white/10 bg-white/5 min-w-[200px]">
                            <EditableBlock
                            label="Firm"
                            onEdit={() => setEditingRecord(firm)}
                            onDelete={() => setDeletingRecord(firm)}
                            >
                            {firm.name}
                            </EditableBlock>
                        </td>
                        <td className="px-6 py-5 border-r border-white/10 text-white/70">
                            {firm.email || "-"}
                        </td>
                        <td className="px-6 py-5 border-r border-white/10 text-white/70">
                            {firm.principal_architect || "-"}
                        </td>
                        <td className="px-6 py-5 border-r border-white/10">
                            {firm.category || "-"}
                        </td>
                        <td className="px-6 py-5 md:min-w-[120px]">
                            <span className={cn(
                            "text-[10px] uppercase font-bold tracking-widest px-2 py-1 border",
                            firm.status === "active" ? "text-white border-white/20" : "text-white/40 border-white/10"
                            )}>
                            {firm.status === "active" ? "REGISTERED" : firm.status?.toUpperCase() || "-"}
                            </span>
                        </td>
                        </tr>
                    ))}

                    {filteredFirms.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-white/30 uppercase tracking-[0.2em] text-xs">
                        No firms found matching your search criteria
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            )}
          </div>

          {/* Footer Info */}
          {!loading && (
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                <p>Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredFirms.length)} to {Math.min(currentPage * entriesPerPage, filteredFirms.length)} of {filteredFirms.length} entries</p>
                <div className="flex gap-2">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-4 py-1.5 border border-white/10 hover:border-white transition-all text-xs disabled:opacity-30" 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                        "px-4 py-1.5 text-xs font-bold transition-all",
                        currentPage === i + 1 ? "bg-white text-black" : "border border-white/10 text-white hover:border-white"
                        )}
                    >
                        {i + 1}
                    </button>
                    ))}
                </div>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-4 py-1.5 border border-white/10 hover:border-white transition-all text-xs disabled:opacity-30" 
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </button>
                </div>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingRecord || isAddingRecord}
        onClose={() => { setEditingRecord(null); setIsAddingRecord(false); }}
        title={isAddingRecord ? "Add Firm" : "Edit Firm"}
      >
        <FirmForm
          initialData={editingRecord || {}}
          onCancel={() => { setEditingRecord(null); setIsAddingRecord(false); }}
          onSubmit={handleFirmSubmit}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingRecord}
        itemName={`Firm: ${deletingRecord?.name}`}
        onClose={() => setDeletingRecord(null)}
        onConfirm={async () => {
          try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            await supabase.from('registered_firms').delete().eq('id', deletingRecord?.id);
            setDeletingRecord(null);
            toast.success("Firm deleted successfully");
            fetchFirms();
          } catch (error) {
            toast.error("Failed to delete firm");
          }
        }}
      />
    </main>
  );
}
