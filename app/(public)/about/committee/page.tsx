"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { CommitteeMemberForm } from "@/components/admin/forms/CommitteeMemberForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CommitteePage() {
  const { isEditMode } = useAdmin();

  const [committee, setCommittee] = useState([
    { id: "1", name: "Ahmed Ibrahim", role: "President", photo_url: "", term_start: "2025-01-01" },
    { id: "2", name: "Mariyam Zeena", role: "Vice President", photo_url: "", term_start: "2025-01-01" },
    { id: "3", name: "Mohamed Rishwan", role: "General Secretary", photo_url: "", term_start: "2025-01-01" },
    { id: "4", name: "Aishath Hana", role: "Treasurer", photo_url: "", term_start: "2025-01-01" },
  ]);

  const [editingMember, setEditingMember] = useState<any>(null);
  const [deletingMember, setDeletingMember] = useState<any>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleUpdate = (data: any) => {
    if (isAddingMember) {
      setCommittee(prev => [...prev, { ...data, id: Date.now().toString() }]);
      setIsAddingMember(false);
      toast.success("MEMBER_NODE_INITIALIZED");
    } else {
      setCommittee(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...data } : m));
      setEditingMember(null);
      toast.success("MEMBER_NODE_SYNCHRONIZED");
    }
  };

  return (
    <div className="container py-24 space-y-24 text-black">
      <PageHeader
        title="EXECUTIVE COMMITTEE"
        description="The institutional leadership team governing the Architects Association Maldives."
      />

      <section className="space-y-12">
        <div className="flex justify-between items-end border-b-8 border-black pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Incumbent Committee (2025-2026)
          </h2>
          {isEditMode && (
            <button
              onClick={() => setIsAddingMember(true)}
              className="flex items-center gap-3 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-black/90 transition-all mb-2"
            >
              <Plus className="w-4 h-4" /> RECRUIT NEW ENTITY
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {committee.map((member) => (
            <EditableBlock
              key={member.id}
              label="Committee Member"
              onEdit={() => setEditingMember(member)}
              onDelete={() => setDeletingMember(member)}
            >
              <Card className="border-2 border-black rounded-none shadow-none group bg-white hover:bg-black/5 transition-all overflow-hidden h-full">
                <div className="aspect-[4/5] bg-black relative overflow-hidden border-b-2 border-black">
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name} className="object-cover h-full w-full grayscale group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white bg-black">
                      <span className="text-6xl font-black">{member.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-8 text-center space-y-2">
                  <h3 className="font-black text-xl uppercase tracking-tighter leading-tight">{member.name}</h3>
                  <p className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em]">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </EditableBlock>
          ))}
        </div>
      </section>

      <section className="bg-black text-white p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_10px,transparent_10px,transparent_20px)]" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Institutional <br /> Archive</h2>
          <p className="text-xl text-white/40 font-medium leading-tight">
            Consult the historical records of the dedicated professionals who have steered the association across previous terms.
          </p>
          <button className="text-xs font-black uppercase tracking-[0.4em] border-b-2 border-white pb-2 hover:text-white/70 transition-colors">
            ACCESS COMMITTEE RECORDS
          </button>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingMember || isAddingMember}
        onClose={() => { setEditingMember(null); setIsAddingMember(false); }}
        title={isAddingMember ? "Add Committee Member" : "Edit Committee Member"}
      >
        <CommitteeMemberForm
          initialData={editingMember || {}}
          onCancel={() => { setEditingMember(null); setIsAddingMember(false); }}
          onSubmit={handleUpdate}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingMember}
        itemName={deletingMember?.name || ""}
        onClose={() => setDeletingMember(null)}
        onConfirm={() => {
          setCommittee(prev => prev.filter(m => m.id !== deletingMember.id));
          setDeletingMember(null);
          toast.success("MEMBER_NODE_DE-SYNCHRONIZED");
        }}
      />
    </div>
  );
}

