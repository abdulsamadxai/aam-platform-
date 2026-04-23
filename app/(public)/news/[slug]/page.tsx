"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { getNewsPostBySlug } from "@/lib/mock-data";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { NewsPostForm } from "@/components/admin/forms/NewsPostForm";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "react-hot-toast";
import { NewsPost } from "@/types";

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
    const { isEditMode } = useAdmin();
    const { slug } = params;
    const [post, setPost] = useState<NewsPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const data = getNewsPostBySlug(slug);
        if (data) {
            setPost(data);
        }
        setIsLoading(false);
    }, [slug]);

    if (isLoading) return <div className="min-h-screen bg-black" />;
    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <Link href="/news" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                </Link>

                <EditableBlock
                    label="News Article"
                    onEdit={() => setIsEditing(true)}
                    onDelete={() => setIsDeleting(true)}
                >
                    <article className="max-w-4xl mx-auto text-white">
                        <header className="space-y-8 mb-16">
                            <div className="flex items-center gap-6">
                                <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-2 text-aam-grey text-[10px] uppercase font-medium tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'Draft'}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <div className="w-10 h-10 bg-aam-near-black border border-white/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-aam-dark-grey" />
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-aam-grey block font-normal">Author</span>
                                    <span>AAM Secretariat</span>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-p:text-aam-grey prose-p:leading-relaxed prose-headings:text-white prose-headings:uppercase prose-headings:tracking-widest whitespace-pre-wrap">
                            {post.body}
                        </div>
                    </article>
                </EditableBlock>
            </div>

            {/* Modals */}
            <EditModal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                title="Edit News Post"
            >
                <NewsPostForm
                    initialData={post}
                    onCancel={() => setIsEditing(false)}
                    onSubmit={(data) => {
                        setPost({ ...post, ...data } as NewsPost);
                        setIsEditing(false);
                        toast.success("Article updated");
                    }}
                />
            </EditModal>

            <ConfirmDelete
                open={isDeleting}
                itemName={post.title}
                onClose={() => setIsDeleting(false)}
                onConfirm={() => {
                    setIsDeleting(false);
                    toast.success("Article deleted (redirecting...)");
                    setTimeout(() => window.location.href = '/news', 1500);
                }}
            />
        </main>
    );
}
