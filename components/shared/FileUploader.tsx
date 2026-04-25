"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import {
    Upload,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

interface FileUploaderProps {
    bucket: "avatars" | "content" | "gallery";
    folder?: string;
    onUploadComplete: (url: string) => void;
    label?: string;
    className?: string;
}

export function FileUploader({
    bucket,
    folder = "uploads",
    onUploadComplete,
    label = "Integrate Asset",
    className
}: FileUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Only JPEG, PNG, WEBP, and GIF images are allowed.");
            return;
        }

        if (file.size > MAX_SIZE_BYTES) {
            setError("File must be smaller than 5MB.");
            return;
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        if (!fileExt || !["jpg", "jpeg", "png", "webp", "gif"].includes(fileExt)) {
            setError("File must have a valid image extension.");
            return;
        }

        setIsUploading(true);

        try {
            const supabase = createClient();
            const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`;
            const filePath = folder ? `${folder}/${fileName}` : fileName;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, { contentType: file.type });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            setPreview(publicUrl);
            onUploadComplete(publicUrl);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
        }
    };

    const clear = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div
                className={cn(
                    "relative border-4 border-black border-dashed p-8 text-center transition-all bg-white",
                    isUploading && "opacity-50 cursor-wait",
                    error && "border-red-500 bg-red-50"
                )}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]);
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                />

                {preview ? (
                    <div className="space-y-6">
                        <div className="relative aspect-video max-h-48 mx-auto border-2 border-black overflow-hidden bg-neutral-100">
                            <Image src={preview} alt="Upload preview" fill className="object-cover grayscale" />
                            <button
                                type="button"
                                onClick={clear}
                                className="absolute top-2 right-2 bg-black text-white p-1 hover:bg-neutral-800"
                                aria-label="Remove uploaded file"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Asset Integrated Successfully
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="h-16 w-16 bg-black text-white flex items-center justify-center mx-auto rounded-none">
                            {isUploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <Upload className="h-8 w-8" />}
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-black uppercase tracking-[0.2em]">
                                {isUploading ? "TRANSMITTING DATA..." : "DRAG & DROP ASSET"}
                            </p>
                            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                                JPEG · PNG · WEBP · GIF — MAX 5MB
                            </p>
                        </div>
                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="bg-black text-white hover:bg-neutral-800 rounded-none h-12 px-8 font-black uppercase tracking-widest text-[10px]"
                        >
                            {label}
                        </Button>
                    </div>
                )}

                {error && (
                    <div className="mt-4 flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-widest text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
