'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { TrainingProgramme } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    schedule_text: z.string().min(1, 'Schedule is required'),
    registration_url: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<TrainingProgramme>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function TrainingForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            schedule_text: initialData?.schedule_text || '',
            registration_url: initialData?.registration_url || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Programme Title</Label>
                <Input {...register('title')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Description</Label>
                <Textarea {...register('description')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[120px] text-white" />
                {errors.description && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Schedule Text</Label>
                <Input {...register('schedule_text')} className="bg-black border-aam-border rounded-none focus:border-white text-white" placeholder="e.g. Saturdays 10am - 4pm" />
                {errors.schedule_text && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.schedule_text.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Registration URL</Label>
                <Input {...register('registration_url')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Programme...' : 'Save Programme'}
                </button>
            </div>
        </form>
    )
}
