'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AGMRecord } from '@/types'
import { Calendar, FileText, Link as LinkIcon, Hash } from 'lucide-react'

const schema = z.object({
    year: z.number().min(1990).max(2100),
    date_held: z.string().min(1, 'Date held is required'),
    title: z.string().min(1, 'Meeting title is required'),
    resolutions: z.string().min(1, 'Resolutions summary is required'),
    minutes_file_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
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
            title: initialData?.title || '',
            resolutions: initialData?.resolutions || '',
            minutes_file_url: initialData?.minutes_file_url || '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            {/* Section: Meeting Identity */}
            <div className="border-b border-white/10 pb-6 mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-5">Meeting Identity</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60">
                            <Hash className="w-3 h-3" /> Year
                        </Label>
                        <Input
                            type="number"
                            {...register('year', { valueAsNumber: true })}
                            className="bg-black border-white/20 rounded-none focus:border-white text-white h-11 font-mono text-lg"
                            placeholder="2025"
                        />
                        {errors.year && <p className="text-red-400 text-[10px] uppercase font-bold">{errors.year.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60">
                            <Calendar className="w-3 h-3" /> Date Held
                        </Label>
                        <Input
                            type="date"
                            {...register('date_held')}
                            className="bg-black border-white/20 rounded-none focus:border-white text-white h-11"
                        />
                        {errors.date_held && <p className="text-red-400 text-[10px] uppercase font-bold">{errors.date_held.message}</p>}
                    </div>
                </div>
            </div>

            {/* Section: Meeting Title */}
            <div className="border-b border-white/10 pb-6 mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-5">Meeting Title</p>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60">
                        <FileText className="w-3 h-3" /> Official Title
                    </Label>
                    <Input
                        {...register('title')}
                        className="bg-black border-white/20 rounded-none focus:border-white text-white h-11 uppercase tracking-widest font-bold"
                        placeholder="E.G. 31ST ANNUAL GENERAL MEETING"
                    />
                    {errors.title && <p className="text-red-400 text-[10px] uppercase font-bold">{errors.title.message}</p>}
                </div>
            </div>

            {/* Section: Resolutions */}
            <div className="border-b border-white/10 pb-6 mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-5">Resolutions Summary</p>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-white/60">Key Resolutions Adopted</Label>
                    <Textarea
                        {...register('resolutions')}
                        className="bg-black border-white/20 rounded-none focus:border-white min-h-[130px] text-white text-sm leading-relaxed resize-none"
                        placeholder="List the key resolutions adopted at this meeting..."
                    />
                    {errors.resolutions && <p className="text-red-400 text-[10px] uppercase font-bold">{errors.resolutions.message}</p>}
                </div>
            </div>

            {/* Section: Minutes Document */}
            <div className="pb-6 mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-5">Minutes Document</p>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/60">
                        <LinkIcon className="w-3 h-3" /> Minutes File URL
                    </Label>
                    <Input
                        type="url"
                        {...register('minutes_file_url')}
                        className="bg-black border-white/20 rounded-none focus:border-white text-white h-11 font-mono text-xs"
                        placeholder="https://... (PDF or document link)"
                    />
                    {errors.minutes_file_url && <p className="text-red-400 text-[10px] uppercase font-bold">{errors.minutes_file_url.message}</p>}
                    <p className="text-[10px] text-white/30 leading-relaxed pt-1">
                        Paste a direct link to the minutes PDF hosted on Google Drive, Dropbox, or any file server.
                        Members will use this link to download the minutes from the public AGM page.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3.5 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/90 disabled:opacity-50 transition-all"
                >
                    {isSubmitting ? 'Saving...' : 'Save AGM Record'}
                </button>
            </div>
        </form>
    )
}
