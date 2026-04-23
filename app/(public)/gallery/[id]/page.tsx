import { getAlbumById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, Expand } from "lucide-react";

interface AlbumPageProps {
    params: Promise<{ id: string }>;
}

export default async function GalleryAlbumPage({ params }: AlbumPageProps) {
    const { id } = await params;
    
    const album = getAlbumById(id);

    if (!album) {
        notFound();
    }

    const photos = Array.from({ length: 6 }).map((_, i) => ({
        id: `mock-photo-${i}`,
        storage_url: album.cover_image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        caption: `Exhibition Archive Detail ${i + 1}`,
        sort_order: i
    }));

    return (
        <main className="min-h-screen bg-black pt-32">
            <div className="container mx-auto px-6 py-12 space-y-16">
                <Link href="/gallery" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Gallery
                </Link>

                <header className="space-y-6 max-w-4xl border-l border-white/20 pl-8">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-aam-grey uppercase tracking-widest">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {album.event_date ? new Date(album.event_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date TBD"}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-none">{album.title}</h1>
                    <p className="text-xs uppercase tracking-[0.2em] text-aam-grey leading-relaxed max-w-2xl font-medium">
                        Archives of the Architects Association Maldives. Institutional Record № {album.id.slice(0, 8).toUpperCase()}.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                    {photos?.map((photo, index) => (
                        <div key={photo.id} className="group relative aspect-square bg-aam-near-black border border-white/5 overflow-hidden">
                            <img
                                src={photo.storage_url}
                                alt={photo.caption || ""}
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Asset {index + 1}</p>
                                    <p className="text-sm font-bold uppercase tracking-tight leading-relaxed">{photo.caption || "AAM Documented Reference"}</p>
                                    <Expand className="w-4 h-4 text-white ml-auto" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!photos || photos.length === 0) && (
                        <div className="col-span-full py-32 text-center border border-dashed border-white/10">
                            <p className="text-aam-grey uppercase tracking-widest text-xs">No assets found in this album.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
