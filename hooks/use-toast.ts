"use client";

export function useToast() {
    return {
        toast: ({ title, description, variant }: { title?: string, description?: string, variant?: string }) => {
            console.log(`[Toast] ${title}: ${description} (${variant || 'default'})`);
            // Standard browser alert as fallback for now
            // alert(`${title}\n${description}`);
        }
    };
}
