"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import {
    Loader2,
    ArrowLeft,
    Plus,
    Trash2,
    Image as ImageIcon,
    ExternalLink,
    Save
} from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/shared/FileUploader";
import { toast } from "react-hot-toast";
import { getAlbumById } from "@/lib/mock-data";

export default function ManageGalleryAlbum() {
    const { id } = useParams() as { id: string };
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [album, setAlbum] = useState<any>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [newPhoto, setNewPhoto] = useState({ storage_url: "", caption: "" });

    const router = useRouter();

    useEffect(() => {
        const albumData = getAlbumById(id);
        if (albumData) {
            setAlbum(albumData);
            setPhotos(albumData.photos || []);
        }
        setLoading(false);
    }, [id]);

    const addPhoto = async () => {
        if (!newPhoto.storage_url) return;
        setSaving(true);

        // Mocking the injection process
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockNewAsset = {
            id: Math.random().toString(36).substr(2, 9),
            album_id: id,
            storage_url: newPhoto.storage_url,
            caption: newPhoto.caption,
            sort_order: photos.length
        };

        setPhotos([...photos, mockNewAsset]);
        setNewPhoto({ storage_url: "", caption: "" });
        toast.success("ASSET_INTEGRATED: Node synchronized successfully.");
        setSaving(false);
    };

    const deletePhoto = async (photoId: string) => {
        // In a real scenario, use ConfirmDialog, but for now we'll mock the deletion
        setPhotos(photos.filter(p => p.id !== photoId));
        toast.success("ASSET_REMOVED: Node de-synchronized successfully.");
    };

    if (loading) {
        return (
            <div className="container py-24 flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-black" />
            </div>
        );
    }

    if (!album) {
        return (
            <div className="container py-24 text-center space-y-8">
                <h1 className="text-4xl font-black uppercase tracking-tighter">ALBUM NOT FOUND</h1>
                <Button asChild className="bg-black text-white hover:bg-mono-800 rounded-none">
                    <Link href="/admin/content/gallery">RETURN TO GALLERY</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container py-24 max-w-6xl space-y-24">
            <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
                <Link href="/admin/content/gallery" className="flex items-center">
                    <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
                    RETURN TO GALLERY REGISTRY
                </Link>
            </Button>

            <div className="space-y-4 border-l-8 border-black pl-8">
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">{album.title}</h1>
                <p className="text-sm font-black uppercase tracking-[0.4em] text-mono-400">Asset Management Protocol — Album ID: {album.id.slice(0, 8)}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Sidebar: Add Asset */}
                <div className="space-y-12">
                    <Card className="border-4 border-black rounded-none shadow-none bg-white sticky top-32">
                        <CardHeader className="border-b-2 border-black bg-mono-50 p-8">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em]">INJECT NEW ASSET</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest">ASSET TRANSMISSION</Label>
                                <FileUploader
                                    bucket="gallery"
                                    folder={`album-${id}`}
                                    onUploadComplete={(url) => setNewPhoto({ ...newPhoto, storage_url: url })}
                                    label="Upload Asset"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase tracking-widest">ASSET CAPTION</Label>
                                <Input
                                    placeholder="DESCRIPTION..."
                                    className="border-2 border-black rounded-none h-12 px-4 font-bold text-xs focus-visible:ring-0"
                                    value={newPhoto.caption}
                                    onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                                />
                            </div>
                            <Button
                                onClick={addPhoto}
                                disabled={saving}
                                className="w-full h-14 bg-black text-white hover:bg-mono-800 rounded-none font-black uppercase tracking-widest text-[10px] transition-all"
                            >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="mr-2 h-4 w-4" /> INTEGRATE ASSET</>}
                            </Button>
                        </CardContent>
                        <CardFooter className="bg-mono-50 p-6 border-t-2 border-black">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-mono-400 text-center leading-relaxed">
                                * MANUAL URL INTEGRATION IS TEMPORARY. STORAGE BUCKET PROTOCOLS UNDER DEVELOPMENT.
                            </p>
                        </CardFooter>
                    </Card>
                </div>

                {/* Main Feed: Album Photos */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {photos.map((photo) => (
                            <Card key={photo.id} className="border-4 border-black rounded-none shadow-none overflow-hidden group bg-white">
                                <div className="aspect-square relative bg-mono-100 border-b-4 border-black overflow-hidden">
                                    <img
                                        src={photo.storage_url}
                                        alt={photo.caption}
                                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => deletePhoto(photo.id)}
                                            className="h-10 w-10 border-2 border-black rounded-none shadow-none"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest line-clamp-2">{photo.caption || "NO CAPTION"}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-black/5">
                                        <span className="text-[8px] font-mono text-mono-400">ID: {photo.id.slice(0, 8)}</span>
                                        <a href={photo.storage_url} target="_blank" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest hover:text-mcatp-gold transition-colors">
                                            SOURCE <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {photos.length === 0 && (
                            <div className="col-span-full py-32 text-center border-4 border-black border-dashed bg-mono-50 space-y-6">
                                <ImageIcon className="h-16 w-16 text-black mx-auto opacity-10" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mono-400">ALBUM IS CURRENTLY DEPLETED.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
