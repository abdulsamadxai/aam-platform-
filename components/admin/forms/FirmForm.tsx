'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RegisteredFirm } from '@/types'

const schema = z.object({
    name: z.string().min(1, 'Firm name is required'),
    address: z.string().min(1, 'Address is required'),
    email: z.string().email('Invalid email address'),
    registered_date: z.string().min(1, 'Registration date is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<RegisteredFirm>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function FirmForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: initialData?.name || '',
            address: initialData?.address || '',
            email: initialData?.email || '',
            registered_date: initialData?.registered_date || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Firm Name</Label>
                <Input {...register('name')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.name && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Address</Label>
                <Input {...register('address')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.address && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Email</Label>
                <Input type="email" {...register('email')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.email && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Registration Date</Label>
                <Input type="date" {...register('registered_date')} className="bg-black border-aam-border rounded-none focus:border-white text-white" />
                {errors.registered_date && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.registered_date.message}</p>}
            </div>

            <div className="flex gap-4 pt-6">
                <button type="button" onClick={onCancel} className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold">
                    {isSubmitting ? 'Saving Firm...' : 'Save Firm'}
                </button>
            </div>
        </form>
    )
}
