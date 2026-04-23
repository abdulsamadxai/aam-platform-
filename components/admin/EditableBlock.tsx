'use client'

import { useAdmin } from '@/lib/admin-context'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
    children: React.ReactNode
    onEdit?: () => void
    onDelete?: () => void
    onAddAfter?: () => void
    label?: string
    className?: string
}

export function EditableBlock({ children, onEdit, onDelete, onAddAfter, label, className }: Props) {
    const { isAdmin, isEditMode } = useAdmin()

    if (!isAdmin || !isEditMode) {
        return <>{children}</>
    }

    return (
        <div className={cn("relative group", className)}>
            {children}

            {/* Hover Overlay */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-150 pointer-events-none z-40" />

            {/* Action Buttons */}
            <div className="absolute top-0 right-0 hidden group-hover:flex items-center gap-1 bg-white p-1 z-50">
                {label && (
                    <span className="text-[9px] text-black font-bold uppercase tracking-widest px-2 py-1 bg-aam-grey">
                        {label}
                    </span>
                )}

                {onEdit && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onEdit()
                        }}
                        className="p-1.5 text-black hover:bg-aam-grey transition-colors"
                        title={`Edit ${label || 'item'}`}
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                )}

                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onDelete()
                        }}
                        className="p-1.5 text-aam-error hover:bg-aam-error hover:text-white transition-colors"
                        title={`Delete ${label || 'item'}`}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                )}

                {onAddAfter && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onAddAfter()
                        }}
                        className="p-1.5 text-aam-success hover:bg-aam-success hover:text-white transition-colors"
                        title={`Add ${label || 'item'} After`}
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </div>
    )
}
