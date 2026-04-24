"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ContentBlockForm } from "@/components/admin/forms/ContentBlockForm";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "react-hot-toast";
import { getAllPages, updateSitePage } from "@/lib/mock-data";
import { Loader2 } from "lucide-react";

export default function AboutPage() {
  const { isEditMode } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

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

  useEffect(() => {
    fetchPage();
  }, []);

  async function fetchPage() {
    setLoading(true);
    try {
      const pages = await getAllPages();
      const aboutPage = pages.find(p => p.slug === 'about');
      if (aboutPage && aboutPage.content) {
        setPageData(aboutPage);
        const content = aboutPage.content as any;
        if (content.history) setHistory(content.history);
        if (content.mission) setMission(content.mission);
        if (content.vision) setVision(content.vision);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdate = async (data: any) => {
    if (!editingBlock) return;

    const newContent = {
        history: editingBlock.key === 'history' ? data : history,
        mission: editingBlock.key === 'mission' ? data : mission,
        vision: editingBlock.key === 'vision' ? data : vision,
    };

    try {
        await updateSitePage('about', newContent);
        if (editingBlock.key === 'history') setHistory(data);
        if (editingBlock.key === 'mission') setMission(data);
        if (editingBlock.key === 'vision') setVision(data);
        setEditingBlock(null);
        toast.success("Content updated successfully");
    } catch (error) {
        toast.error("Failed to update content");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
    </div>
  );

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
            <div className="space-y-8 text-xl text-aam-grey font-medium leading-tight whitespace-pre-line">
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
                <p className="text-xl text-aam-grey font-medium leading-tight">
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
                <p className="text-xl text-aam-grey font-medium leading-tight">
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
