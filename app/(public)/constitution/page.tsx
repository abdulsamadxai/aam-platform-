"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ContentBlockForm } from "@/components/admin/forms/ContentBlockForm";
import { useAdmin } from "@/lib/admin-context";
import { Download, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ConstitutionPage() {
    const { isEditMode } = useAdmin();

    const [articles, setArticles] = useState([
        {
            id: "1",
            heading: "Article 1 — Name and Establishment",
            body: "This association shall be known as the Architects Association Maldives (AAM), hereinafter referred to as 'the Association'. The Association is established as a professional body under the laws of the Republic of Maldives."
        },
        {
            id: "2",
            heading: "Article 2 — Objectives",
            body: "The objectives of the Association are: (a) To advance the profession of architecture in the Maldives; (b) To establish and maintain standards of professional conduct and practice; (c) To promote the education, training, and development of architects; (d) To represent the interests of the architectural profession to government, industry, and the public; (e) To foster fellowship and cooperation among architects in the Maldives."
        },
        {
            id: "3",
            heading: "Article 3 — Membership",
            body: "Membership of the Association shall be open to qualified architects and those engaged in architectural practice. There are three categories of membership: Professional Membership, General Membership, and Associate Membership. Eligibility criteria for each category shall be determined by the Executive Committee."
        }
    ]);

    const [editingArticle, setEditingArticle] = useState<any>(null);
    const [isAddingArticle, setIsAddingArticle] = useState(false);

    const handleUpdate = (data: any) => {
        if (isAddingArticle) {
            setArticles(prev => [...prev, { ...data, id: Date.now().toString() }]);
            setIsAddingArticle(false);
            toast.success("CONSTITUTION_NODE_INITIALIZED");
        } else {
            setArticles(prev => prev.map(a => a.id === editingArticle.id ? { ...a, ...data } : a));
            setEditingArticle(null);
            toast.success("CONSTITUTION_NODE_SYNCHRONIZED");
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <PageHeader
                title="AAM CONSTITUTION"
                description="The founding legal document that governs the association's structure and principles."
            />

            <section className="py-24 bg-black">
                <div className="container mx-auto px-6 max-w-4xl space-y-16">
                    <div className="flex justify-between items-end border-b-8 border-white pb-6">
                        <h2 className="text-3xl font-black uppercase tracking-tighter">STATUTORY ARTICLES</h2>
                        {isEditMode && (
                            <button
                                onClick={() => setIsAddingArticle(true)}
                                className="flex items-center gap-3 bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all mb-2"
                            >
                                <Plus className="w-4 h-4" /> APPEND ARTICLE
                            </button>
                        )}
                    </div>

                    <div className="space-y-24">
                        {articles.map((article) => (
                            <EditableBlock
                                key={article.id}
                                label="Constitution Article"
                                onEdit={() => setEditingArticle(article)}
                                onDelete={() => setArticles(prev => prev.filter(a => a.id !== article.id))}
                            >
                                <div className="space-y-8 group">
                                    <h3 className="text-2xl font-black uppercase tracking-widest border-b-2 border-white/10 pb-4 inline-block group-hover:border-white/40 transition-colors">
                                        {article.heading}
                                    </h3>
                                    <p className="text-xl text-neutral-400 font-medium leading-tight whitespace-pre-line group-hover:text-neutral-300 transition-colors">
                                        {article.body}
                                    </p>
                                </div>
                            </EditableBlock>
                        ))}
                    </div>

                    <div className="mt-32 p-16 bg-white/5 border-2 border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_10px,transparent_10px,transparent_20px)]" />
                        <div className="space-y-4 text-center md:text-left relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter">OFFICIAL DOSSIER</h3>
                            <p className="text-neutral-500 font-bold uppercase text-[10px] tracking-[0.3em]">Latest Version Ratified March 2025</p>
                        </div>
                        <button className="bg-white text-black font-black uppercase tracking-widest text-xs py-6 px-12 border-2 border-white hover:bg-black hover:text-white transition-all relative z-10 flex items-center gap-4">
                            <Download className="w-5 h-5" />
                            DOWNLOAD_PDF_PROTOCOL
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal */}
            <EditModal
                open={!!editingArticle || isAddingArticle}
                onClose={() => { setEditingArticle(null); setIsAddingArticle(false); }}
                title={isAddingArticle ? "Add Constitution Article" : "Edit Constitution Article"}
            >
                <ContentBlockForm
                    initialData={editingArticle || { heading: '', body: '' }}
                    onCancel={() => { setEditingArticle(null); setIsAddingArticle(false); }}
                    onSubmit={handleUpdate}
                    label="Article"
                />
            </EditModal>
        </main>
    );
}
