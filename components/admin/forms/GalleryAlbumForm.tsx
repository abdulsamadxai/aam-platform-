'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GalleryAlbum } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    event_date: z.string().min(1, 'Event date is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<GalleryAlbum>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function GalleryAlbumForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            event_date: initialData?.event_date || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Album Title</Label>
                <Input {...register('title')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Event Date</Label>
                <Input type="date" {...register('event_date')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.event_date && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.event_date.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Album...' : 'Save Album'}
                </button>
            </div>
        </form>
    )
}
