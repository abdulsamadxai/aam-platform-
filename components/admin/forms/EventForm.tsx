'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Event } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    start_at: z.string().min(1, 'Start date/time is required'),
    end_at: z.string().optional(),
    cover_image_url: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<Event>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function EventForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            location: initialData?.location || '',
            start_at: initialData?.start_at ? new Date(initialData.start_at).toISOString().slice(0, 16) : '',
            end_at: initialData?.end_at ? new Date(initialData.end_at).toISOString().slice(0, 16) : '',
            cover_image_url: initialData?.cover_image_url || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Event Title</Label>
                <Input {...register('title')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Description</Label>
                <Textarea {...register('description')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[120px] text-white" />
                {errors.description && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Location</Label>
                <Input {...register('location')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.location && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.location.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Start Date/Time</Label>
                    <Input type="datetime-local" {...register('start_at')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">End Date/Time (Optional)</Label>
                    <Input type="datetime-local" {...register('end_at')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Cover Image URL</Label>
                <Input {...register('cover_image_url')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Event...' : 'Save Event'}
                </button>
            </div>
        </form>
    )
}
