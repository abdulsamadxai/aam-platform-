'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const schema = z.object({
    headline: z.string().min(1, 'Headline is required'),
    subheadline: z.string().min(1, 'Subheadline is required'),
    cta_primary_label: z.string().min(1, 'Label is required'),
    cta_primary_url: z.string().min(1, 'URL is required'),
    cta_secondary_label: z.string().min(1, 'Label is required'),
    cta_secondary_url: z.string().min(1, 'URL is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData: FormData
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function HeroForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Headline</Label>
                <Textarea
                    {...register('headline')}
                    className="bg-black border-aam-border rounded-none focus:border-white min-h-[100px] text-white"
                />
                {errors.headline && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.headline.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Subheadline</Label>
                <Textarea
                    {...register('subheadline')}
                    className="bg-black border-aam-border rounded-none focus:border-white min-h-[120px] text-white"
                />
                {errors.subheadline && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.subheadline.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Primary CTA Label</Label>
                    <Input
                        {...register('cta_primary_label')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Primary CTA URL</Label>
                    <Input
                        {...register('cta_primary_url')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Secondary CTA Label</Label>
                    <Input
                        {...register('cta_secondary_label')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Secondary CTA URL</Label>
                    <Input
                        {...register('cta_secondary_url')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-aam-grey disabled:opacity-50 transition-all font-bold"
                >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}
