"use client";

import { getAlbumById } from "@/lib/api";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Expand, ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { GalleryAlbum } from "@/types";
import Image from "next/image";

export default function GalleryAlbumPage() {
    const params = useParams();
    const id = params.id as string;
    const [album, setAlbum] = useState<GalleryAlbum | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlbum();
    }, [id]);

    async function fetchAlbum() {
        setLoading(true);
        try {
            const data = await getAlbumById(id);
            setAlbum(data);
        } catch {
            // album stays null — not-found state is rendered
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-black pt-32 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </main>
        );
    }

    if (!album) {
        notFound();
        return null;
    }

    const photos = album.photos || [];

    return (
        <main className="min-h-screen bg-black pt-32 pb-24">
            <div className="container mx-auto px-6 space-y-16">
                <Link href="/gallery" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Gallery
                </Link>

                <header className="space-y-6 max-w-4xl border-l border-white/20 pl-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-aam-grey uppercase tracking-widest">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {album.event_date ? new Date(album.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date TBD"}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-none text-white">{album.title}</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-aam-grey leading-relaxed max-w-2xl font-medium">
                            Archives of the Architects Association Maldives. Institutional Record № {album.id.slice(0, 8).toUpperCase()}.
                        </p>
                        <span className="h-px flex-1 bg-white/10 hidden md:block" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{photos.length} Assets</span>
                    </div>
                </header>

                {photos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                        {photos.map((photo, index) => (
                            <div key={photo.id} className="group relative aspect-square bg-white/5 border border-white/5 overflow-hidden cursor-pointer">
                                <Image
                                    src={photo.url}
                                    alt={photo.caption || ""}
                                    fill
                                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Reference {String(index + 1).padStart(2, '0')}</p>
                                            <Expand className="w-4 h-4 text-white/40" />
                                        </div>
                                        <p className="text-sm font-bold uppercase tracking-tight leading-relaxed text-white">
                                            {photo.caption || "AAM Documented Reference"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 flex flex-col items-center justify-center border border-dashed border-white/10 space-y-6">
                        <ImageIcon className="w-12 h-12 text-white/10" />
                        <div className="text-center space-y-2">
                            <p className="text-aam-grey uppercase tracking-widest text-xs font-bold">No assets found in this album</p>
                            <p className="text-white/20 text-[10px] uppercase tracking-widest">Administrator has not added any images to this archive yet.</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
