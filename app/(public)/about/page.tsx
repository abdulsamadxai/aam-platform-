"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ContentBlockForm } from "@/components/admin/forms/ContentBlockForm";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "react-hot-toast";

export default function AboutPage() {
  const { isEditMode } = useAdmin();

  const [history, setHistory] = useState({
    heading: "Our History",
    body: "The Architects Association Maldives (AAM) was founded to establish and uphold professional standards for architectural practice in the Maldives. Since its establishment, AAM has grown to represent 239 registered architects across three membership categories — Professional, General, and Associate — providing a unified platform for the architecture community to engage with government, industry, and the public.\n\nOver the years, the association has evolved from a small collective of pioneering architects into a robust institutional body that serves as the primary regulator and advocate for the profession. Today, AAM works closely with the Ministry of National Planning, Housing and Infrastructure to ensure that the built environment of the Maldives is developed with technical precision and architectural integrity."
  });

  const [mission, setMission] = useState({
    heading: "Mission",
    body: "To advance the professional practice of architecture in the Maldives by setting standards, promoting education, fostering ethics, and advocating for quality in the built environment."
  });

  const [vision, setVision] = useState({
    heading: "Vision",
    body: "A Maldives where architecture is practiced at the highest international standards, contributing to sustainable, culturally responsive, and exceptional built environments."
  });

  const [editingBlock, setEditingBlock] = useState<{ key: string; data: any } | null>(null);

  const handleUpdate = (data: any) => {
    if (!editingBlock) return;

    if (editingBlock.key === 'history') setHistory(data);
    if (editingBlock.key === 'mission') setMission(data);
    if (editingBlock.key === 'vision') setVision(data);

    setEditingBlock(null);
    toast.success("CONTENT_NODE_SYNCHRONIZED");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHeader
        title="About AAM"
        description="The statutory authority for professional architectural standards in the Republic of Maldives."
      />

      {/* History */}
      <section className="py-24 bg-black border-b border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <EditableBlock
            label="History Block"
            onEdit={() => setEditingBlock({ key: 'history', data: history })}
          >
            <h2 className="text-3xl font-black uppercase tracking-widest mb-10 border-l-8 border-white pl-8">
              {history.heading}
            </h2>
            <div className="space-y-8 text-xl text-mono-400 font-medium leading-tight whitespace-pre-line">
              {history.body}
            </div>
          </EditableBlock>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <EditableBlock
              label="Mission Block"
              onEdit={() => setEditingBlock({ key: 'mission', data: mission })}
            >
              <div className="bg-white/5 p-16 border-2 border-white/10 space-y-8 h-full">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white border-b-2 border-white/20 pb-4 inline-block">
                  {mission.heading}
                </h3>
                <p className="text-xl text-mono-300 font-medium leading-tight">
                  {mission.body}
                </p>
              </div>
            </EditableBlock>

            <EditableBlock
              label="Vision Block"
              onEdit={() => setEditingBlock({ key: 'vision', data: vision })}
            >
              <div className="bg-white/5 p-16 border-2 border-white/10 space-y-8 h-full">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white border-b-2 border-white/20 pb-4 inline-block">
                  {vision.heading}
                </h3>
                <p className="text-xl text-mono-300 font-medium leading-tight">
                  {vision.body}
                </p>
              </div>
            </EditableBlock>
          </div>
        </div>
      </section>

      {/* Modal */}
      <EditModal
        open={!!editingBlock}
        onClose={() => setEditingBlock(null)}
        title={`Edit ${editingBlock?.data.heading || 'Content Block'}`}
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
