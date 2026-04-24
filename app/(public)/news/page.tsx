"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";
import { getAllNews, saveNews } from "@/lib/mock-data";
import { format } from "date-fns";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { NewsPostForm } from "@/components/admin/forms/NewsPostForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function NewsPage() {
  const { isEditMode } = useAdmin();
  const [news, setNews] = useState(() => getAllNews());

  // Modal states
  const [editingNews, setEditingNews] = useState<any>(null);
  const [deletingNews, setDeletingNews] = useState<any>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="relative">
        <PageHeader
          title="News & Announcements"
          subtitle="The latest updates from the Architects Association Maldives."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingNews(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add News Article
            </button>
          </div>
        )}
      </div>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {news.map((post) => (
              <EditableBlock
                key={post.id}
                label="News Article"
                onEdit={() => setEditingNews(post)}
                onDelete={() => setDeletingNews(post)}
              >
                <div className="bg-aam-near-black border border-white/5 h-full flex flex-col hover:border-white transition-all overflow-hidden group">
                  {post.cover_image_url && (
                    <div className="aspect-video w-full overflow-hidden border-b border-white/5">
                      <img 
                        src={post.cover_image_url} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                      />
                    </div>
                  )}
                  <div className="p-10 flex flex-col justify-between flex-grow">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-aam-grey">
                          {post.category}
                        </span>
                        <span className="text-[10px] uppercase font-medium text-aam-dark-grey">
                          {post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'Draft'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight uppercase tracking-tight group-hover:text-white transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-aam-grey leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/news/${post.slug}`}
                      className="mt-8 text-xs font-bold uppercase tracking-widest underline underline-offset-8 hover:text-aam-grey transition-all inline-block"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </EditableBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingNews || isAddingNews}
        onClose={() => { setEditingNews(null); setIsAddingNews(false); }}
        title={isAddingNews ? "Add News Post" : "Edit News Post"}
      >
        <NewsPostForm
          initialData={editingNews || {}}
          onCancel={() => { setEditingNews(null); setIsAddingNews(false); }}
          onSubmit={(data) => {
            if (isAddingNews) {
              const newPost = { 
                ...data, 
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              const updatedNews = [newPost as any, ...news];
              setNews(updatedNews);
              saveNews(updatedNews);
              setIsAddingNews(false);
              toast.success("News post created");
            } else {
              const updatedNews = news.map(item => item.id === editingNews.id ? { ...item, ...data, updated_at: new Date().toISOString() } : item);
              setNews(updatedNews);
              saveNews(updatedNews);
              setEditingNews(null);
              toast.success("News post updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingNews}
        itemName={deletingNews?.title || ""}
        onClose={() => setDeletingNews(null)}
        onConfirm={() => {
          const updatedNews = news.filter(item => item.id !== deletingNews.id);
          setNews(updatedNews);
          saveNews(updatedNews);
          setDeletingNews(null);
          toast.success("News post deleted");
        }}
      />
    </main>
  );
}
