'use client'

import { EditModal } from './EditModal'
import { AlertTriangle } from 'lucide-react'

interface Props {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    itemName: string
    loading?: boolean
}

export function ConfirmDelete({ open, onClose, onConfirm, itemName, loading }: Props) {
    return (
        <EditModal open={open} onClose={onClose} title="Confirm Delete" size="sm">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-12 h-12 bg-aam-error/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-aam-error" />
                </div>

                <div>
                    <p className="text-aam-grey text-xs uppercase tracking-widest mb-1">Warning</p>
                    <p className="text-sm font-medium text-white px-2">
                        Are you sure you want to delete <span className="text-aam-error font-bold">"{itemName}"</span>?
                    </p>
                    <p className="text-[10px] text-aam-dark-grey uppercase tracking-wider mt-4">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="flex gap-4 w-full pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-aam-border text-[10px] font-bold uppercase tracking-widest hover:bg-aam-elevated transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 py-3 bg-aam-error text-white text-[10px] font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all"
                    >
                        {loading ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                </div>
            </div>
        </EditModal>
    )
}
