"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ContentBlockForm } from "@/components/admin/forms/ContentBlockForm";
import { useAdmin } from "@/lib/admin-context";
import { ShieldCheck, FileText, CheckCircle2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AccreditationPage() {
  const { isEditMode } = useAdmin();

  const [validation, setValidation] = useState({
    heading: "Validation of Programmes",
    body: "AAM works closely with the Maldives Qualification Authority (MQA) to ensure that architectural degrees and diplomas meet the rigorous standards required for professional practice."
  });

  const [institutions, setInstitutions] = useState([
    { id: "1", heading: "Maldives National University (MNU)", body: "Bachelor of Arts in Architecture. Validated until 2028." },
    { id: "2", heading: "Villa College", body: "Foundation in Architecture. Provisional Status." }
  ]);

  const [editingBlock, setEditingBlock] = useState<{ key: string; data: any } | null>(null);

  const handleUpdate = (data: any) => {
    if (!editingBlock) return;

    if (editingBlock.key === 'validation') setValidation(data);
    if (editingBlock.key.startsWith('inst-')) {
      const id = editingBlock.key.replace('inst-', '');
      setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, ...data } : inst));
    }
    if (editingBlock.key === 'new-inst') {
      setInstitutions(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }

    setEditingBlock(null);
    toast.success("DATA_NODE_SYNCHRONIZED");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHeader
        title="ACCREDITATION & VALIDATION"
        description="Guidelines and standards for architectural education and professional validation in the Maldives."
      />

      <div className="container py-24 space-y-32">
        {/* Validation Section */}
        <section className="max-w-4xl">
          <EditableBlock
            label="Validation Info"
            onEdit={() => setEditingBlock({ key: 'validation', data: validation })}
          >
            <div className="space-y-8">
              <h2 className="text-3xl font-black uppercase tracking-widest border-l-8 border-white pl-8">
                {validation.heading}
              </h2>
              <p className="text-xl text-neutral-400 font-medium leading-tight">
                {validation.body}
              </p>
            </div>
          </EditableBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
            <div className="flex gap-6 p-10 border-2 border-white/10 bg-white/5 hover:border-white/40 transition-all group">
              <ShieldCheck className="h-10 w-10 text-white shrink-0 group-hover:scale-110 transition-transform" />
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-widest text-sm">GLOBAL STANDARDS</h4>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed">
                  Aligning with UIA and CAA education protocols.
                </p>
              </div>
            </div>
            <div className="flex gap-6 p-10 border-2 border-white/10 bg-white/5 hover:border-white/40 transition-all group">
              <FileText className="h-10 w-10 text-white shrink-0 group-hover:scale-110 transition-transform" />
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-widest text-sm">FEE STRUCTURE</h4>
                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-relaxed">
                  Transparent protocols for institutional validation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Institutions Section */}
        <section className="space-y-16">
          <div className="flex justify-between items-end border-b-8 border-white pb-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">ACCREDITED INSTITUTIONS</h2>
            {isEditMode && (
              <button
                onClick={() => setEditingBlock({ key: 'new-inst', data: { heading: '', body: '' } })}
                className="flex items-center gap-3 bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all mb-2"
              >
                <Plus className="w-4 h-4" /> REGISTER INSTITUTION
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {institutions.map((inst) => (
              <EditableBlock
                key={inst.id}
                label="Institution"
                onEdit={() => setEditingBlock({ key: `inst-${inst.id}`, data: inst })}
                onDelete={() => setInstitutions(prev => prev.filter(i => i.id !== inst.id))}
              >
                <div className="p-12 border-4 border-white bg-white/5 space-y-6 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-black text-2xl uppercase tracking-tighter border-b-2 border-white/20 pb-4 inline-block">
                    {inst.heading}
                  </h3>
                  <p className="text-lg text-neutral-400 font-medium leading-tight">
                    {inst.body}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40">
                    <ShieldCheck className="h-4 w-4" />
                    <span>VALIDATED_FOR_PRACTICE</span>
                  </div>
                </div>
              </EditableBlock>
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      <EditModal
        open={!!editingBlock}
        onClose={() => setEditingBlock(null)}
        title={editingBlock?.key === 'new-inst' ? "Register Institution" : `Edit Content Block`}
      >
        {editingBlock && (
          <ContentBlockForm
            initialData={editingBlock.data}
            onCancel={() => setEditingBlock(null)}
            onSubmit={handleUpdate}
          />
        )}
      </EditModal>
    </main>
  );
}
