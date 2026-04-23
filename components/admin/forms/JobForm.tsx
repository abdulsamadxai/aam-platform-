'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { JobListing } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Job title is required'),
    company_name: z.string().min(1, 'Company name is required'),
    description: z.string().min(1, 'Description is required'),
    deadline: z.string().min(1, 'Deadline is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<JobListing>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function JobForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            company_name: initialData?.company_name || '',
            description: initialData?.description || '',
            deadline: initialData?.deadline || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Job Title</Label>
                <Input {...register('title')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Company Name</Label>
                <Input {...register('company_name')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.company_name && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.company_name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Description</Label>
                <Textarea {...register('description')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[120px] text-white" />
                {errors.description && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Deadline</Label>
                <Input type="date" {...register('deadline')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.deadline && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.deadline.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Job...' : 'Save Job'}
                </button>
            </div>
        </form>
    )
}
