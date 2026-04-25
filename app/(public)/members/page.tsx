"use client";

import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ArrowUpDown, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllMembers } from "@/lib/api";
import { useAdmin } from "@/lib/admin-context";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { MemberForm } from "@/components/admin/forms/MemberForm";
import { toast } from "react-hot-toast";
import { fetchActiveMembersAction } from "@/lib/actions/members";

import { Member } from "@/types";

export default function MemberDirectoryPage() {
  const { isEditMode } = useAdmin();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Architects");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Modal states
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    try {
      const data = await fetchActiveMembersAction();
      setMembers(data);
    } catch (error) {
      toast.error("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.full_name.toLowerCase().includes(search.toLowerCase()) || 
                           member.email.toLowerCase().includes(search.toLowerCase());
      
      if (activeTab === "Architects") return matchesSearch && member.category === "professional";
      if (activeTab === "Associates") return matchesSearch && member.category === "associate";
      if (activeTab === "Students") return matchesSearch && member.category === "general";
      return matchesSearch;
    });
  }, [members, search, activeTab]);

  const totalPages = Math.ceil(filteredMembers.length / entriesPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Reset to first page when search or tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTab]);

  const handleMemberSubmit = async (data: any) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      if (isAddingMember) {
        // Note: New members should ideally be created via Auth or Admin API
        // For now, we update the members table directly if it's an admin action
        const { error } = await supabase.from('members').insert([data]);
        if (error) throw error;
        toast.success("Member added");
      } else if (editingMember) {
        const { error } = await supabase.from('members').update(data).eq('id', editingMember.id);
        if (error) throw error;
        toast.success("Member updated");
      }
      
      setIsAddingMember(false);
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative">
        <PageHeader
          title="Active Members"
          subtitle="A comprehensive directory of professional architects and town planners registered with AAM."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingMember(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add New Member
            </button>
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="mb-12 border-b border-white/10">
          <div className="flex gap-8">
            {["Architects", "Associates", "Students"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative",
                  activeTab === tab
                    ? "text-white"
                    : "text-white/40 hover:text-white"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-white transition-all" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6 mb-8">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="bg-black border border-white/20 px-3 py-1.5 rounded-sm focus:border-white outline-none cursor-pointer"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span>entries</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black border border-white/20 px-4 py-1.5 focus:border-white outline-none transition-all w-64 rounded-none text-white text-[12px]"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto w-full border border-white/10">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-b border-white/10">
                  <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      Member Id
                      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                    </div>
                  </th>
                  <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      Name
                      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                    </div>
                  </th>
                  <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      Category
                      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                    </div>
                  </th>
                  <th className={cn("px-6 py-4 group cursor-pointer hover:bg-white/5 transition-colors", isEditMode && "border-r border-white/10")}>
                    <div className="flex justify-between items-center">
                      Status
                      <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent text-[13px] font-medium tracking-wide">
                {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-white/5 transition-colors text-sm group">
                      <td className="px-6 py-5 font-mono text-white/50 group-hover:text-white transition-colors border-r border-white/10">
                        {member.aam_id || "PENDING"}
                      </td>
                      <td className="px-6 py-5 font-medium border-r border-white/10 bg-white/5 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {isEditMode ? (
                            <div className="flex-1 flex items-center justify-between group/edit">
                              <span className="font-bold">{member.full_name}</span>
                              <div className="flex gap-1 opacity-0 group-hover/edit:opacity-100 transition-opacity">
                                <button onClick={() => setEditingMember(member)} className="p-1 hover:bg-white/10"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setDeletingMember(member)} className="p-1 hover:bg-red-500/20 text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </div>
                          ) : (
                            <span className="font-bold">{member.full_name}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 border-r border-white/10 text-white/70">
                        {member.category.toUpperCase()}
                      </td>
                      <td className="px-6 py-5 md:min-w-[120px]">
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-widest px-2 py-1 border",
                          member.status === "active" ? "text-white border-white/20" : "text-white/40 border-white/10"
                        )}>
                          {member.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}

                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-24 text-center text-white/20 uppercase tracking-[0.3em] font-bold text-[10px]">
                      No matching profiles found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Info */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
            <p>Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredMembers.length)} to {Math.min(currentPage * entriesPerPage, filteredMembers.length)} of {filteredMembers.length} entries</p>
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
      </div>

      {/* Modals */}
      <EditModal
        open={!!editingMember || isAddingMember}
        onClose={() => { setEditingMember(null); setIsAddingMember(false); }}
        title={isAddingMember ? "Add Member" : "Edit Member"}
      >
        <MemberForm
          initialData={editingMember || {}}
          onCancel={() => { setEditingMember(null); setIsAddingMember(false); }}
          onSubmit={handleMemberSubmit}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingMember}
        itemName={deletingMember?.full_name || ""}
        onClose={() => setDeletingMember(null)}
        onConfirm={async () => {
          try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            await supabase.from('members').delete().eq('id', deletingMember?.id);
            setDeletingMember(null);
            toast.success("Member removed");
            fetchMembers();
          } catch (error) {
            toast.error("Failed to remove member");
          }
        }}
      />
    </main>
  );
}
