"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getAllGalleryAlbums, saveGalleryAlbums } from "@/lib/mock-data";
import { GalleryAlbum } from "@/types";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { GalleryAlbumForm } from "@/components/admin/forms/GalleryAlbumForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function GalleryPage() {
  const { isEditMode } = useAdmin();
  const [albums, setAlbums] = useState(() => getAllGalleryAlbums());

  // Modal states
  const [editingAlbum, setEditingAlbum] = useState<any>(null);
  const [deletingAlbum, setDeletingAlbum] = useState<any>(null);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        <PageHeader
          title="Gallery"
          subtitle="Visual records of AAM events, workshops, and architecture visits."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingAlbum(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add New Album
            </button>
          </div>
        )}
      </div>

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {albums.map((album: GalleryAlbum) => (
              <EditableBlock
                key={album.id}
                label="Gallery Album"
                onEdit={() => setEditingAlbum(album)}
                onDelete={() => setDeletingAlbum(album)}
              >
                <Link href={`/gallery/${album.id}`}>
                  <div className="group relative aspect-square overflow-hidden cursor-pointer border border-white/5">
                    <div
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      style={{ backgroundImage: `url('${album.cover_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070'}')` }}
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-aam-grey mb-2">{album.event_date}</span>
                      <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-white">{album.title}</h3>
                      <div className="text-[10px] uppercase font-medium text-white/50">{album.photos?.length || 0} Photos</div>
                    </div>
                  </div>
                </Link>
              </EditableBlock>
            ))}
            {albums.length === 0 && (
              <p className="col-span-full text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No gallery albums available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingAlbum || isAddingAlbum}
        onClose={() => { setEditingAlbum(null); setIsAddingAlbum(false); }}
        title={isAddingAlbum ? "Add Album" : "Edit Album"}
      >
        <GalleryAlbumForm
          initialData={editingAlbum || {}}
          onCancel={() => { setEditingAlbum(null); setIsAddingAlbum(false); }}
          onSubmit={(data) => {
            if (isAddingAlbum) {
              const newAlbum = {
                ...data,
                id: Date.now().toString(),
                is_published: true,
                cover_image_url: data.photos?.[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
                photos: data.photos?.map((url: string, i: number) => ({ id: `p-${Date.now()}-${i}`, url })) || [],
                created_at: new Date().toISOString()
              };
              const updatedAlbums = [newAlbum as any, ...albums];
              setAlbums(updatedAlbums);
              saveGalleryAlbums(updatedAlbums);
              setIsAddingAlbum(false);
              toast.success("Gallery album created");
            } else {
              const updatedPhotos = data.photos?.map((url: string, i: number) => ({ id: `p-${Date.now()}-${i}`, url })) || [];
              const updatedAlbums = albums.map(item => item.id === editingAlbum.id ? { ...item, ...data, photos: updatedPhotos } : item);
              setAlbums(updatedAlbums);
              saveGalleryAlbums(updatedAlbums);
              setEditingAlbum(null);
              toast.success("Gallery album updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingAlbum}
        itemName={deletingAlbum?.title || ""}
        onClose={() => setDeletingAlbum(null)}
        onConfirm={() => {
          const updatedAlbums = albums.filter(item => item.id !== deletingAlbum.id);
          setAlbums(updatedAlbums);
          saveGalleryAlbums(updatedAlbums);
          setDeletingAlbum(null);
          toast.success("Gallery album deleted");
        }}
      />
    </main>
  );
}
