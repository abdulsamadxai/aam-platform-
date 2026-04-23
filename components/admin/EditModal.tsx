'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Props {
    open: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function EditModal({ open, onClose, title, children, size = 'md' }: Props) {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (open) {
            document.addEventListener('keydown', handler)
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handler)
            document.body.style.overflow = 'unset'
        }
    }, [open, onClose])

    if (!open) return null

    const widths = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={cn(
                "relative bg-aam-near-black border border-aam-border shadow-2xl w-full",
                widths[size],
                "max-h-[90vh] flex flex-col"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-aam-border">
                    <h2 className="font-bold text-[14px] uppercase tracking-widest text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-aam-grey hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-y-auto px-6 py-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
