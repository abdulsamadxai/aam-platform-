"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Search, ChevronRight, ArrowUpDown, MoreHorizontal, Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_MEMBERS } from "@/lib/mock-data";
import { PublicMember } from "@/types";
import { useAdmin } from "@/lib/admin-context";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { MemberForm } from "@/components/admin/forms/MemberForm";
import { toast } from "react-hot-toast";

import { Member } from "@/types";

export default function MemberDirectoryPage() {
  const { isEditMode } = useAdmin();
  const [members, setMembers] = useState<Member[]>(() => MOCK_MEMBERS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Architects");

  // Modal states
  const [editingMember, setEditingMember] = useState<any>(null);
  const [deletingMember, setDeletingMember] = useState<any>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const categoryMatch = activeTab === "Architects"
        ? member.category === "professional"
        : member.category !== "professional";

      const searchMatch = member.full_name.toLowerCase().includes(search.toLowerCase()) ||
        member.aam_id.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [members, search, activeTab]);

  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return { firstName: parts[0], lastName: "-" };
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "-";
    return { firstName, lastName };
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
            {["Architects", "Town planners"].map((tab) => (
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
            <select className="bg-black border border-white/20 px-3 py-1.5 focus:border-white outline-none text-white rounded-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:8px_8px] bg-[position:right_10px_center] pr-8 min-w-[70px]">
              <option value="ALL" className="bg-black text-white">ALL</option>
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
                    First Name
                    <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                  </div>
                </th>
                <th className="px-6 py-4 border-r border-white/10 group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-center">
                    Last Name
                    <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                  </div>
                </th>
                <th className={cn("px-6 py-4 group cursor-pointer hover:bg-white/5 transition-colors", isEditMode && "border-r border-white/10")}>
                  <div className="flex justify-between items-center">
                    Status
                    <ArrowUpDown className="h-3 w-3 opacity-30 group-hover:opacity-100" />
                  </div>
                </th>
                {isEditMode && (
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 w-32">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-transparent text-[13px] font-medium tracking-wide">
              {filteredMembers.map((member, index) => {
                const { firstName, lastName } = splitName(member.full_name);
                return (
                  <tr
                    key={member.id}
                    className={cn(
                      "hover:bg-white/5 transition-colors border-b border-white/5",
                      index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                    )}
                  >
                    <td className="px-6 py-4 border-r border-white/5 text-white/50">
                      {member.aam_id}
                    </td>
                    <td className="px-6 py-4 border-r border-white/5">
                      {firstName}
                    </td>
                    <td className="px-6 py-4 border-r border-white/5">
                      {lastName}
                    </td>
                    <td className={cn("px-6 py-4", isEditMode && "border-r border-white/5")}>
                      <span className={cn(
                        "text-[9px] uppercase font-bold tracking-widest px-2 py-1",
                        member.status === "active" ? "bg-white text-black" : "border border-white/20 text-white/40"
                      )}>
                        {member.status === "active" ? "Life Member" : member.status}
                      </span>
                    </td>
                    {isEditMode && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditingMember(member)}
                            className="p-1.5 hover:bg-white hover:text-black transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingMember(member)}
                            className="p-1.5 hover:bg-red-500 hover:text-white transition-all text-red-500"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={isEditMode ? 5 : 4} className="px-6 py-24 text-center text-white/20 uppercase tracking-[0.3em] font-bold text-[10px]">
                    No matching profiles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
          <p>Showing 1 to {filteredMembers.length} of {filteredMembers.length} entries</p>
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
          onSubmit={(data) => {
            if (isAddingMember) {
              setMembers((prev: Member[]) => [...prev, { ...data, id: Date.now().toString() } as Member]);
              setIsAddingMember(false);
              toast.success("Member added");
            } else {
              setMembers((prev: Member[]) => prev.map((item: Member) => item.id === editingMember.id ? { ...item, ...data } : item));
              setEditingMember(null);
              toast.success("Member updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingMember}
        itemName={deletingMember?.full_name || ""}
        onClose={() => setDeletingMember(null)}
        onConfirm={() => {
          setMembers(prev => prev.filter(item => item.id !== deletingMember.id));
          setDeletingMember(null);
          toast.success("Member removed");
        }}
      />
    </main>
  );
}
