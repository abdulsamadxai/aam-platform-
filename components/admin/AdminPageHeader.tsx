"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
    title: string;
    subtitle: string;
    backHref?: string;
    backLabel?: string;
    actionHref?: string;
    actionLabel?: string;
    actionIcon?: React.ReactNode;
    className?: string;
}

export function AdminPageHeader({
    title,
    subtitle,
    backHref,
    backLabel,
    actionHref,
    actionLabel,
    actionIcon = <Plus className="h-4 w-4" />,
    className
}: AdminPageHeaderProps) {
    return (
        <div className={cn("space-y-12", className)}>
            {backHref && (
                <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
                    <Link href={backHref} className="flex items-center">
                        <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
                        {backLabel || "RETURN"}
                    </Link>
                </Button>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b-8 border-black pb-12">
                <div className="space-y-4 border-l-8 border-black pl-8">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none whitespace-pre-line">
                        {title}
                    </h1>
                    <p className="text-sm font-black uppercase tracking-[0.4em] text-mono-400">
                        {subtitle}
                    </p>
                </div>

                <div className="flex gap-4">
                    {actionHref && (
                        <Button asChild className="h-16 px-10 bg-black text-white hover:bg-mono-800 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-black transition-all">
                            <Link href={actionHref} className="flex items-center gap-3">
                                {actionIcon}
                                {actionLabel}
                            </Link>
                        </Button>
                    )}
                    <Button variant="outline" asChild className="h-16 px-10 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] transition-all">
                        <Link href="/admin">COMMAND CENTER</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
