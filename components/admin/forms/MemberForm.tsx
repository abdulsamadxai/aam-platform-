'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Member } from '@/types'

const schema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    category: z.enum(['professional', 'general', 'associate']),
    status: z.enum(['active', 'pending', 'suspended']),
    aam_id: z.string().min(1, 'AAM ID is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<Member>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function MemberForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            full_name: initialData?.full_name || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            category: initialData?.category || 'professional',
            status: initialData?.status || 'active',
            aam_id: initialData?.aam_id || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Full Name</Label>
                <Input {...register('full_name')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.full_name && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.full_name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">AAM ID</Label>
                    <Input {...register('aam_id')} className="bg-black border-aam-border rounded-none focus:border-white text-white font-mono" />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Category</Label>
                    <select
                        {...register('category')}
                        className="w-full bg-black border border-aam-border px-3 py-2 text-[12px] text-white focus:border-white outline-none"
                    >
                        <option value="professional">Professional</option>
                        <option value="general">General</option>
                        <option value="associate">Associate</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Email</Label>
                    <Input type="email" {...register('email')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                    {errors.email && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Phone</Label>
                    <Input {...register('phone')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Status</Label>
                <select
                    {...register('status')}
                    className="w-full bg-black border border-aam-border px-3 py-2 text-[12px] text-white focus:border-white outline-none"
                >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Member...' : 'Save Member'}
                </button>
            </div>
        </form>
    )
}
