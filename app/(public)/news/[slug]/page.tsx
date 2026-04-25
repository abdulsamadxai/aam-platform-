"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Loader2 } from "lucide-react";
import { getNewsPostBySlug, saveNews } from "@/lib/api";
import { format } from "date-fns";
import { useState, useEffect, use } from "react";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { NewsPostForm } from "@/components/admin/forms/NewsPostForm";
import { useAdmin } from "@/lib/admin-context";
import { toast } from "react-hot-toast";
import { NewsPost } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { isEditMode } = useAdmin();
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const router = useRouter();
    const [post, setPost] = useState<NewsPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Modal states
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [slug]);

    async function fetchPost() {
        setIsLoading(true);
        try {
            const data = await getNewsPostBySlug(slug);
            setPost(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-white/20" />
        </div>
    );
    
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

                        {post.cover_image_url && (
                            <div className="aspect-[21/9] bg-aam-near-black border border-white/10 overflow-hidden mb-16">
                                <img 
                                    src={post.cover_image_url} 
                                    alt={post.title} 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-70 hover:opacity-100" 
                                />
                            </div>
                        )}

                        <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-p:text-aam-grey prose-p:leading-relaxed prose-headings:text-white prose-headings:uppercase prose-headings:tracking-widest whitespace-pre-wrap">
                            {post.body}
                        </div>
                    </article>
                </EditableBlock>
            </div>

            <EditModal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                title="Edit News Post"
            >
                <NewsPostForm
                    initialData={post}
                    onCancel={() => setIsEditing(false)}
                    onSubmit={async (data) => {
                        try {
                            await saveNews({ ...post, ...data });
                            setIsEditing(false);
                            toast.success("Article updated");
                            fetchPost();
                        } catch (error) {
                            toast.error("Failed to update article");
                        }
                    }}
                />
            </EditModal>

            <ConfirmDelete
                open={isDeleting}
                itemName={post.title}
                onClose={() => setIsDeleting(false)}
                onConfirm={async () => {
                    try {
                        const supabase = createClient();
                        await supabase.from('news_posts').update({ deleted_at: new Date().toISOString() }).eq('id', post.id);
                        setIsDeleting(false);
                        toast.success("Article deleted (redirecting...)");
                        setTimeout(() => router.push('/news'), 1500);
                    } catch (error) {
                        toast.error("Failed to delete article");
                    }
                }}
            />
        </main>
    );
}
