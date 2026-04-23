"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface PublishToggleProps {
    isPublished: boolean;
    onToggle: (value: boolean) => void;
    label?: string;
    className?: string;
}

export function PublishToggle({
    isPublished,
    onToggle,
    label = "DISTRIBUTION STATUS",
    className
}: PublishToggleProps) {
    return (
        <div className={cn("p-8 border-4 border-black bg-white flex items-center justify-between gap-12", className)}>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest">{label}</Label>
                <p className={cn(
                    "text-xs font-black uppercase tracking-[0.2em]",
                    isPublished ? "text-green-600" : "text-mono-400"
                )}>
                    {isPublished ? "LIVE / VISIBLE TO EXTERNAL NODES" : "OFFLINE / INTERNAL PROTOCOL ONLY"}
                </p>
            </div>
            <Switch
                checked={isPublished}
                onCheckedChange={onToggle}
                className="scale-150 data-[state=checked]:bg-black data-[state=unchecked]:bg-mono-200 border-2 border-black"
            />
        </div>
    );
}
