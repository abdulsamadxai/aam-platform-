"use client";

import toast from "react-hot-toast";

interface ToastOptions {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
}

export function useToast() {
    return {
        toast: ({ title, description, variant }: ToastOptions) => {
            const message = [title, description].filter(Boolean).join(" — ");
            if (variant === "destructive") {
                toast.error(message);
            } else {
                toast.success(message);
            }
        },
    };
}
