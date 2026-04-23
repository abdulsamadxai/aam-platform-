"use client";

import { EditModal } from "./EditModal";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    variant?: "destructive" | "default";
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "PROCEED_PROTOCOL",
    cancelLabel = "ABORT_ACTION",
    isLoading = false,
    variant = "default"
}: ConfirmDialogProps) {
    return (
        <EditModal open={isOpen} onClose={onClose} title={title} size="md">
            <div className="space-y-8">
                <div className="flex items-start gap-4 p-6 bg-black/5 border-l-4 border-black">
                    <AlertCircle className={cn(
                        "h-6 w-6 mt-1",
                        variant === 'destructive' ? "text-red-600" : "text-black"
                    )} />
                    <p className="text-xs font-black uppercase tracking-widest leading-relaxed text-black/70">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="h-14 flex-1 border-2 border-black text-black hover:bg-black hover:text-white transition-all font-black uppercase tracking-widest text-[9px]"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={cn(
                            "h-14 flex-1 transition-all font-black uppercase tracking-widest text-[9px] border-2 border-black",
                            variant === 'destructive'
                                ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
                                : "bg-black text-white hover:bg-white hover:text-black"
                        )}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : confirmLabel}
                    </button>
                </div>
            </div>
        </EditModal>
    );
}
