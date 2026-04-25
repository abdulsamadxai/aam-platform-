"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { getAllGalleryAlbums } from "@/lib/api";
import { GalleryAlbum } from "@/types";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { GalleryAlbumForm } from "@/components/admin/forms/GalleryAlbumForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function GalleryPage() {
  const { isEditMode } = useAdmin();
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [deletingAlbum, setDeletingAlbum] = useState<GalleryAlbum | null>(null);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function fetchAlbums() {
    setLoading(true);
    try {
      const data = await getAllGalleryAlbums();
      setAlbums(data);
    } catch (error) {
      toast.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  }

  const handleAlbumSubmit = async (data: any) => {
    try {
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      const albumData = {
        title: data.title,
        event_date: data.event_date,
        cover_image_url: data.photos?.[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        is_published: true
      };

      let albumId = editingAlbum?.id;

      if (isAddingAlbum) {
        const { data: newAlbum, error } = await supabase.from('gallery_albums').insert([albumData]).select().single();
        if (error) throw error;
        albumId = newAlbum.id;
      } else if (editingAlbum) {
        const { error } = await supabase.from('gallery_albums').update(albumData).eq('id', editingAlbum.id);
        if (error) throw error;
      }

      // Handle photos (this is a simplified version, ideally would handle deletes too)
      if (data.photos && albumId) {
        const photoRecords = data.photos.map((url: string) => ({
          album_id: albumId,
          image_url: url
        }));
        await supabase.from('gallery_photos').delete().eq('album_id', albumId);
        await supabase.from('gallery_photos').insert(photoRecords);
      }
      
      setIsAddingAlbum(false);
      setEditingAlbum(null);
      fetchAlbums();
      toast.success(isAddingAlbum ? "Gallery album created" : "Gallery album updated");
    } catch (error) {
      toast.error("Operation failed");
    }
  };

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
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {albums.map((album: GalleryAlbum) => (
                <EditableBlock
                  key={album.id}
                  label="Gallery Album"
                  onEdit={() => setEditingAlbum(album)}
                  onDelete={() => setDeletingAlbum(album)}
                >
                  <Link href={`/gallery/${album.id}`}>
                    <div className="group relative aspect-square overflow-hidden cursor-pointer border border-white/5 bg-aam-near-black">
                      <Image
                        src={album.cover_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070'}
                        alt={`Cover for ${album.title} gallery`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
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
          )}
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingAlbum || isAddingAlbum}
        onClose={() => { setEditingAlbum(null); setIsAddingAlbum(false); }}
        title={isAddingAlbum ? "Add Album" : "Edit Album"}
      >
        <GalleryAlbumForm
          initialData={editingAlbum || undefined}
          onCancel={() => { setEditingAlbum(null); setIsAddingAlbum(false); }}
          onSubmit={handleAlbumSubmit}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingAlbum}
        itemName={deletingAlbum?.title || ""}
        onClose={() => setDeletingAlbum(null)}
        onConfirm={async () => {
          try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            await supabase.from('gallery_albums').delete().eq('id', deletingAlbum?.id);
            setDeletingAlbum(null);
            toast.success("Gallery album deleted");
            fetchAlbums();
          } catch (error) {
            toast.error("Failed to delete gallery album");
          }
        }}
      />
    </main>
  );
}
