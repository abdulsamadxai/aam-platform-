'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { NewsPost } from '@/types'

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    category: z.string().min(1, 'Category is required'),
    excerpt: z.string().min(1, 'Excerpt is required').max(200, 'Excerpt too long'),
    body: z.string().min(1, 'Body content is required'),
    cover_image_url: z.string().optional(),
    published_at: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
    initialData?: Partial<NewsPost>
    onSubmit: (data: FormData) => void
    onCancel: () => void
}

export function NewsPostForm({ initialData, onSubmit, onCancel }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            category: initialData?.category || 'Announcements',
            excerpt: initialData?.excerpt || '',
            body: initialData?.body || '',
            cover_image_url: initialData?.cover_image_url || '',
            published_at: initialData?.published_at ? new Date(initialData.published_at).toISOString().slice(0, 16) : '',
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Title</Label>
                <Input
                    {...register('title')}
                    className="bg-black border-aam-border rounded-none focus:border-white text-white"
                />
                {errors.title && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Slug</Label>
                    <Input
                        {...register('slug')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white font-mono text-[11px]"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Category</Label>
                    <select
                        {...register('category')}
                        className="w-full bg-black border border-aam-border px-3 py-2 text-[12px] text-white focus:border-white outline-none"
                    >
                        <option value="Announcements">Announcements</option>
                        <option value="Industry News">Industry News</option>
                        <option value="Members">Members</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Excerpt (Max 200 chars)</Label>
                <Textarea
                    {...register('excerpt')}
                    className="bg-black border-aam-border rounded-none focus:border-white min-h-[80px] text-white"
                />
                {errors.excerpt && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.excerpt.message}</p>}
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Body Content</Label>
                <Textarea
                    {...register('body')}
                    className="bg-black border-aam-border rounded-none focus:border-white min-h-[250px] text-white font-serif"
                />
                {errors.body && <p className="text-aam-error text-[10px] uppercase font-bold">{errors.body.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Cover Image URL</Label>
                    <Input
                        {...register('cover_image_url')}
                        className="bg-black border-aam-border rounded-none focus:border-white text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest font-bold text-aam-grey">Publish Date/Time</Label>
                    <Input
                        type="datetime-local"
                        {...register('published_at')}
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
                    {isSubmitting ? 'Saving Post...' : 'Save Post'}
                </button>
            </div>
        </form>
    )
}
