'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Competition } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    deadline: z.string().min(1, 'Deadline is required'),
    prize_details: z.string().optional(),
    brief_file_url: z.string().optional(),
    submission_url: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<Competition>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function CompetitionForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            deadline: initialData?.deadline || '',
            prize_details: initialData?.prize_details || '',
            brief_file_url: initialData?.brief_file_url || '',
            submission_url: initialData?.submission_url || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Title</Label>
                <Input {...register('title')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Description</Label>
                <Textarea {...register('description')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[100px] text-white" />
                {errors.description && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Deadline</Label>
                    <Input type="date" {...register('deadline')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Submission URL</Label>
                    <Input {...register('submission_url')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Prize Details</Label>
                <Textarea {...register('prize_details')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[80px] text-white" />
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Brief File URL (PDF)</Label>
                <Input {...register('brief_file_url')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Competition...' : 'Save Competition'}
                </button>
            </div>
        </form>
    )
}
