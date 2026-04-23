'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AGMRecord } from '@/types'

const schema = z.object({
    year: z.number().min(2000).max(2100),
    date_held: z.string().min(1, 'Date is required'),
    resolutions: z.string().min(1, 'Resolutions are required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<AGMRecord>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function AGMRecordForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            year: initialData?.year || new Date().getFullYear(),
            date_held: initialData?.date_held || '',
            resolutions: initialData?.resolutions || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Year</Label>
                    <Input
                        type="number"
                        {...register('year', { valueAsNumber: true })}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Date Held</Label>
                    <Input type="date" {...register('date_held')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Resolutions</Label>
                <Textarea {...register('resolutions')} className="bg-black border-aam-border rounded-none focus:border-white min-h-[150px] text-white" />
                {errors.resolutions && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.resolutions.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Record...' : 'Save AGM Record'}
                </button>
            </div>
        </form>
    )
}
