"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Loader2,
  Image as ImageIcon,
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  Plus
} from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/shared/FileUploader";
import { toast } from "react-hot-toast";

export default function NewGalleryAlbumPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    event_date: new Date().toISOString().split('T')[0],
    cover_image_url: ""
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mocking the creation process
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("VOLUME_CREATED: Visual archive volume has been initialized.");
      router.push("/admin/content/gallery");
    } catch (error) {
      toast.error("PROTOCOL_ERROR: Failed to initialize volume.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container py-24 max-w-5xl space-y-24">
      <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
        <Link href="/admin/content/gallery" className="flex items-center">
          <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
          RETURN TO VISUAL ARCHIVE
        </Link>
      </Button>

      <div className="space-y-4 border-l-8 border-black pl-8">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Archive <br /> Induction</h1>
        <p className="text-sm font-black uppercase tracking-[0.4em] text-neutral-400">Visual Documentation Repository Protocol</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <Card className="border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
            <CardHeader className="p-10 border-b-2 border-black bg-neutral-50">
              <CardTitle className="text-xs font-black uppercase tracking-[0.4em]">VOLUME PARAMETERS</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest">ALBUM TITLE / EVENT IDENTITY</Label>
                <Input
                  id="title"
                  placeholder="E.G. AAM DESIGN AWARDS 2025"
                  className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-sm focus-visible:ring-0"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="event_date" className="text-[10px] font-black uppercase tracking-widest">RECORDING DATE</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
                  <Input
                    id="event_date"
                    type="date"
                    className="pl-14 border-2 border-black rounded-none h-14 font-black uppercase tracking-widest text-[10px] focus-visible:ring-0"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest">COVER IMAGE PROTOCOL</Label>
                <FileUploader
                  bucket="gallery"
                  folder="covers"
                  onUploadComplete={(url) => setFormData({ ...formData, cover_image_url: url })}
                  label="Upload Cover Image"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-black text-white p-10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-white" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">ARCHIVAL INTEGRITY</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-neutral-400">VOLUME WILL BE INITIALIZED IN THE CLOUD REGISTRY.</p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading || !formData.title || !formData.event_date}
                className="h-16 px-10 bg-white text-black hover:bg-neutral-200 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-white transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "INITIALIZE VOLUME"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-12">
          <Card className="border-4 border-black rounded-none shadow-none bg-white">
            <CardHeader className="border-b-2 border-black p-8">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em]">ASSET QUEUE</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              <div className="aspect-square bg-neutral-100 border-2 border-black border-dashed flex flex-col items-center justify-center gap-4 text-center p-6">
                <Layers className="h-8 w-8 text-neutral-300" />
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400 leading-relaxed">
                  ASSET UPLOAD PROTOCOL REQUIRES INITIALIZED VOLUME.
                </p>
              </div>
              <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest leading-relaxed">
                ASSETS CAN BE APPENDED TO THE VOLUME ONCE THE REGISTRY ENTRY IS CREATED.
              </p>
            </CardContent>
          </Card>

          <div className="p-8 border-4 border-black border-dashed rounded-none space-y-6 text-center bg-neutral-50">
            <ImageIcon className="h-10 w-10 text-black mx-auto opacity-20" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">VISUAL POLICY</h4>
            <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-neutral-500">
              ENSURE ALL PHOTOGRAPHIC ASSETS ARE CLEARED FOR PUBLIC CONSUMPTION. COVER IMAGES SHOULD BE SEO-OPTIMIZED AND UNDER 2MB.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
