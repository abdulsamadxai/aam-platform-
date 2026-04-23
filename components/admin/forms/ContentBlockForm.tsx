'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const schema = z.object({
    heading: z.string().min(1, 'Heading is required'),
    body: z.string().min(1, 'Body text is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: { heading: string; body: string }
    onSubmit: (data: FormData) => void
    onCancel: () => void
    label?: string
}

export function ContentBlockForm({ initialData, onSubmit, onCancel, label = 'Content Block' }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData || { heading: '', body: '' }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">{label} Heading</Label>
                <Input {...register('heading')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.heading && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.heading.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">{label} Body</Label>
                <Textarea {...register('body')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[150px] text-white" />
                {errors.body && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.body.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving...' : 'Save Block'}
                </button>
            </div>
        </form>
    )
}
