'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CommitteeMember } from '@/types'

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    term_start: z.string().min(1, 'Term start date is required'),
    term_end: z.string().optional(),
    photo_url: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<CommitteeMember>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function CommitteeMemberForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: initialData?.name || '',
            role: initialData?.role || '',
            term_start: initialData?.term_start || '',
            term_end: initialData?.term_end || '',
            photo_url: initialData?.photo_url || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Full Name</Label>
                <Input {...register('name')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.name && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Role</Label>
                <Input {...register('role')} className="bg-black border-aam-border rounded-none focus:border-white text-white" placeholder="e.g. President, Treasurer" />
                {errors.role && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.role.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Term Start</Label>
                    <Input type="date" {...register('term_start')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Term End (Optional)</Label>
                    <Input type="date" {...register('term_end')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Photo URL</Label>
                <Input {...register('photo_url')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Member...' : 'Save Committee Member'}
                </button>
            </div>
        </form>
    )
}
