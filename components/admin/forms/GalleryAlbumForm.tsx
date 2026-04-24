'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GalleryAlbum } from '@/types/content'
import { useState } from 'react'
import { X, Image as ImageIcon, Plus } from 'lucide-react'
import Image from 'next/image'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    event_date: z.string().min(1, 'Event date is required'),
    photos: z.array(z.string()).optional().default([]),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<GalleryAlbum>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function GalleryAlbumForm({ initialData, onSubmit, onCancel }: Props) {
    // For a fully mock flow, we'll extract URLs if photos exist in initialData
    const initialPhotos = initialData?.photos?.map(p => p.url) || [];
    const [photos, setPhotos] = useState<string[]>(initialPhotos);

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            event_date: initialData?.event_date || '',
            photos: initialPhotos,
        }
    })

    // Mock Upload Logic
    const handleMockUpload = () => {
        const mockImages = [
            "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd11?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1541888057239-0d1767119e83?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
        ];
        const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
        const newPhotos = [...photos, randomImage];
        setPhotos(newPhotos);
        setValue('photos', newPhotos);
    }

    const removePhoto = (index: number) => {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
        setValue('photos', newPhotos);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Album Title</Label>
                <Input {...register('title')} className="bg-black border-white/10 rounded-none focus:border-white text-white h-12" />
                {errors.title && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Event Date</Label>
                <Input type="date" {...register('event_date')} className="bg-black border-white/10 rounded-none focus:border-white text-white h-12" />
                {errors.event_date && <p className="text-red-500 text-[10px] uppercase font-bold">{errors.event_date.message}</p>}
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Album Photos ({photos.length})</Label>
                    <button
                        type="button"
                        onClick={handleMockUpload}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 hover:bg-white hover:text-black px-4 py-2 transition-colors"
                    >
                        <Plus className="h-3 w-3" /> Add Image
                    </button>
                </div>

                {photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {photos.map((url, i) => (
                            <div key={i} className="relative aspect-square group bg-white/5 border border-white/10">
                                <Image src={url} alt="Album Photo" fill className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(i)}
                                    className="absolute top-2 right-2 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-white/20 p-8 flex flex-col items-center justify-center text-center space-y-2">
                        <ImageIcon className="h-8 w-8 text-white/20" />
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">No Images Uploaded</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-6 mt-6 border-t border-white/10">
                <button type="button" onClick={onCancel} className="flex-1 py-4 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-4 bg-white text-black text-[10px] uppercase tracking-widest hover:bg-white/80 disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Album...' : 'Save Album'}
                </button>
            </div>
        </form>
    )
}
