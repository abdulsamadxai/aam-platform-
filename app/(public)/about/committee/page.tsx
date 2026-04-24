"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { CommitteeMemberForm } from "@/components/admin/forms/CommitteeMemberForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import type { CommitteeMember } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAllCommitteeMembers } from "@/lib/mock-data";

export default function CommitteePage() {
  const { isEditMode } = useAdmin();
  const router = useRouter();

  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<CommitteeMember | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    fetchCommittee();
  }, []);

  async function fetchCommittee() {
    setLoading(true);
    try {
      const data = await getAllCommitteeMembers();
      setCommittee(data);
    } catch (error) {
      toast.error("Failed to fetch committee");
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (data: any) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      if (isAddingMember) {
        await supabase.from('committee_members').insert([data]);
        toast.success("Committee member added");
      } else if (editingMember) {
        await supabase.from('committee_members').update(data).eq('id', editingMember.id);
        toast.success("Committee member updated");
      }
      
      setIsAddingMember(false);
      setEditingMember(null);
      fetchCommittee();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="container py-24 space-y-24 text-white bg-black min-h-screen">
      <PageHeader
        title="EXECUTIVE COMMITTEE"
        description="The institutional leadership team governing the Architects Association Maldives."
      />

      <section className="space-y-12">
        <div className="flex justify-between items-end border-b-8 border-white pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Incumbent Committee (2025-2026)
          </h2>
          {isEditMode && (
            <button
              onClick={() => setIsAddingMember(true)}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all mb-2"
            >
              <Plus className="w-4 h-4" /> RECRUIT NEW ENTITY
            </button>
          )}
        </div>

        {loading ? (
            <div className="flex justify-center py-24">
                <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {committee.map((member) => (
                <EditableBlock
                key={member.id}
                label="Committee Member"
                onEdit={() => setEditingMember(member)}
                onDelete={() => setDeletingMember(member)}
                >
                <Card className="border-2 border-white/10 rounded-none shadow-none group bg-black hover:bg-white/5 transition-all overflow-hidden h-full">
                    <div className="aspect-[4/5] bg-black relative overflow-hidden border-b-2 border-white/10">
                    {member.photo_url ? (
                        <Image 
                        src={member.photo_url} 
                        alt={member.name} 
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition-transform duration-700" 
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-white bg-black">
                        <span className="text-6xl font-black">{member.name.charAt(0)}</span>
                        </div>
                    )}
                    </div>
                    <CardContent className="p-8 text-center space-y-2">
                    <h3 className="font-black text-xl uppercase tracking-tighter leading-tight">{member.name}</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
                        {member.role}
                    </p>
                    </CardContent>
                </Card>
                </EditableBlock>
            ))}
            {committee.length === 0 && (
                <p className="col-span-full text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No committee records available.</p>
            )}
            </div>
        )}
      </section>

      <section className="bg-black text-white p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_10px,transparent_10px,transparent_20px)]" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Institutional <br /> Archive</h2>
          <p className="text-xl text-white/40 font-medium leading-tight">
            Consult the historical records of the dedicated professionals who have steered the association across previous terms.
          </p>
          <button onClick={() => router.push('/contact')} className="text-xs font-black uppercase tracking-[0.4em] border-b-2 border-white pb-2 hover:text-white/70 transition-colors">
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
          initialData={editingMember || undefined}
          onCancel={() => { setEditingMember(null); setIsAddingMember(false); }}
          onSubmit={handleUpdate}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingMember}
        itemName={deletingMember?.name || ""}
        onClose={() => setDeletingMember(null)}
        onConfirm={async () => {
          try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            await supabase.from('committee_members').delete().eq('id', deletingMember?.id);
            setDeletingMember(null);
            toast.success("Committee member removed");
            fetchCommittee();
          } catch (error) {
            toast.error("Failed to remove member");
          }
        }}
      />
    </div>
  );
}
