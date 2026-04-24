"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface SlugInputProps {
    baseValue: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    readOnly?: boolean;
}

export function SlugInput({
    baseValue,
    value,
    onChange,
    label = "URI SLUG (AUTO-GENERATED)",
    placeholder = "slug-name-...",
    readOnly = false
}: SlugInputProps) {

    useEffect(() => {
        if (baseValue && !value) {
            const generated = baseValue
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
            onChange(generated);
        }
    }, [baseValue, value, onChange]);

    return (
        <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest">{label}</Label>
            <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-300 font-bold text-xs uppercase tracking-widest">
                    /
                </span>
                <Input
                    placeholder={placeholder}
                    className="pl-12 border-2 border-black rounded-none h-14 font-bold text-xs focus-visible:ring-0 bg-neutral-50"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}
