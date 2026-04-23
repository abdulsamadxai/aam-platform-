"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllFirms } from "@/lib/mock-data";
import { useAdmin } from "@/lib/admin-context";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { FirmForm } from "@/components/admin/forms/FirmForm";
import { toast } from "react-hot-toast";

type Firm = {
  id: string;
  name: string;
  registration_number: string;
  email: string;
  principal_architect?: string;
  category?: string;
  status: string;
  address?: string;
  registered_date?: string;
};

export default function FirmsPage() {
  const [firms, setFirms] = useState<Firm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Architectural Firms");

  const { isEditMode } = useAdmin();
  const [editingRecord, setEditingRecord] = useState<Firm | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<Firm | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  useEffect(() => {
    const results = getAllFirms().filter(f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase())
    );
    setFirms(results as any);
    setLoading(false);
  }, [search]);

  const handleUpdate = (data: any) => {
    if (isAddingRecord) {
      setFirms(prev => [{ ...data, id: Date.now().toString(), status: 'active', registration_number: 'PENDING' }, ...prev]);
      setIsAddingRecord(false);
      toast.success("Firm added successfully");
    } else {
      setFirms(prev => prev.map(r => r.id === editingRecord?.id ? { ...r, ...data } : r));
      setEditingRecord(null);
      toast.success("Firm updated successfully");
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
              <select className="bg-transparent border border-white/20 px-3 py-1.5 rounded-sm focus:border-white outline-none">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>entries</span>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent border border-white/20 pl-12 pr-4 py-2 text-sm focus:border-white outline-none transition-all"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-white/10">
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
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-4 h-16 bg-white/5"></td>
                    </tr>
                  ))
                ) : (
                  firms.map((firm) => (
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
                  ))
                )}

                {!loading && firms.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/30 uppercase tracking-[0.2em] text-xs">
                      No firms found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>Showing 1 to {firms.length} of {firms.length} entries</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-white/10 hover:border-white transition-all text-xs disabled:opacity-30" disabled>Previous</button>
              <button className="px-4 py-1.5 bg-white text-black text-xs font-bold">1</button>
              <button className="px-4 py-1.5 border border-white/10 hover:border-white transition-all text-xs disabled:opacity-30" disabled>Next</button>
            </div>
          </div>
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
          onSubmit={handleUpdate}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingRecord}
        itemName={`Firm: ${deletingRecord?.name}`}
        onClose={() => setDeletingRecord(null)}
        onConfirm={() => {
          setFirms(prev => prev.filter(r => r.id !== deletingRecord?.id));
          setDeletingRecord(null);
          toast.success("Firm deleted successfully");
        }}
      />
    </main>
  );
}
