"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Loader2,
    Pencil,
    Trash2,
    Eye,
    Search,
    FilterX
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
    key: string;
    label: string;
    render?: (row: T) => React.ReactNode;
}

interface ContentTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onView?: (row: T) => void;
    searchKey?: keyof T;
    placeholder?: string;
    emptyMessage?: string;
}

export function ContentTable<T extends Record<string, any>>({
    columns,
    data,
    isLoading = false,
    onEdit,
    onDelete,
    onView,
    searchKey,
    placeholder = "SEARCH REGISTRY...",
    emptyMessage = "DATABASE EMPTY. NO ENTRIES DETECTED."
}: ContentTableProps<T>) {
    const [search, setSearch] = useState("");

    const filteredData = searchKey && search
        ? data.filter(item =>
            String(item[searchKey]).toLowerCase().includes(search.toLowerCase())
        )
        : data;

    return (
        <div className="space-y-8">
            {searchKey && (
                <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <Input
                        placeholder={placeholder}
                        className="pl-16 border-4 border-black rounded-none h-16 font-black uppercase tracking-widest text-xs focus-visible:ring-0 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )}

            <div className="border-[4px] border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-black hover:bg-black border-none">
                            {columns.map((col, idx) => (
                                <TableHead
                                    key={col.key}
                                    className={cn(
                                        "text-white font-black uppercase tracking-widest text-[10px] h-16",
                                        idx === 0 && "pl-10",
                                        idx === columns.length - 1 && "text-right pr-10"
                                    )}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 text-right pr-10">
                                    ACTIONS
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-6">
                                        <Loader2 className="h-10 w-10 animate-spin text-black" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">SYNCHRONIZING ENTRIES...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-6">
                                        <FilterX className="h-10 w-10 text-neutral-200" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">{emptyMessage}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((row, rowIdx) => (
                                <TableRow key={row.id || row.slug || row.email || rowIdx} className="border-b-2 border-black/5 last:border-none hover:bg-neutral-50 transition-colors">
                                    {columns.map((col, colIdx) => (
                                        <TableCell
                                            key={col.key}
                                            className={cn(
                                                "py-8",
                                                colIdx === 0 && "pl-10",
                                                colIdx === columns.length - 1 && "text-right pr-10"
                                            )}
                                        >
                                            {col.render ? col.render(row) : (
                                                <span className="text-sm font-black uppercase tracking-tight">
                                                    {String(row[col.key] || '—')}
                                                </span>
                                            )}
                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete || onView) && (
                                        <TableCell className="text-right pr-10">
                                            <div className="flex justify-end gap-2">
                                                {onView && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 border-2 border-black rounded-none hover:bg-black hover:text-white"
                                                        onClick={() => onView(row)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {onEdit && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 border-2 border-black rounded-none hover:bg-black hover:text-white"
                                                        onClick={() => onEdit(row)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 border-2 border-black rounded-none hover:bg-black hover:text-white text-black"
                                                        onClick={() => onDelete(row)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
