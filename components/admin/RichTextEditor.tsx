"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Label } from "@/components/ui/label";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    height?: number;
}

export function RichTextEditor({
    value,
    onChange,
    label = "SUBSTANTIVE BODY (MARKDOWN)",
    height = 400
}: RichTextEditorProps) {
    return (
        <div className="space-y-3" data-color-mode="light">
            <Label className="text-[10px] font-black uppercase tracking-widest">{label}</Label>
            <div className="border-4 border-black rounded-none overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <MDEditor
                    value={value}
                    onChange={(v) => onChange(v || "")}
                    preview="edit"
                    height={height}
                    visibleDragbar={false}
                    style={{ borderRadius: 0 }}
                />
            </div>
            <p className="text-[9px] font-bold text-aam-grey uppercase tracking-widest">
                USE MARKDOWN PROTOCOL FOR INSTITUTIONAL FORMATTING.
            </p>
        </div>
    );
}
