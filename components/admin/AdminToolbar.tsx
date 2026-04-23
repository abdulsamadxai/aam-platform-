'use client'

import { useAdmin } from '@/lib/admin-context'
import Link from 'next/link'
import { Plus, Eye, Edit3, X, LayoutDashboard, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminToolbar() {
    const { isAdmin, isEditMode, toggleEdit, currentPath, logout } = useAdmin()

    if (!isAdmin) return null

    // Get current page name from path
    const getPageName = (path: string) => {
        if (path === '/') return 'Home Page'
        const parts = path.split('/').filter(Boolean)
        if (parts.length === 0) return 'Home Page'
        return parts[parts.length - 1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    return (
        <div className="fixed top-0 left-0 right-0 h-[44px] bg-aam-black border-b border-aam-border z-[100] flex items-center justify-between px-4 text-white">
            {/* Left: Brand & Page Context */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white text-black flex items-center justify-center text-[10px] font-bold">
                        A
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest hidden sm:inline">AAM Admin</span>
                </div>

                <div className="hidden md:flex items-center gap-2 text-aam-grey">
                    <span className="text-[10px] uppercase tracking-widest">Editing:</span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">{getPageName(currentPath)}</span>
                </div>
            </div>

            {/* Center: Main Toggles */}
            <div className="flex items-center gap-1 bg-aam-elevated p-1 border border-aam-border">
                <button
                    onClick={toggleEdit}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all",
                        isEditMode ? "bg-white text-black" : "text-aam-grey hover:text-white"
                    )}
                >
                    <Edit3 className="w-3 h-3" />
                    Edit Mode {isEditMode ? 'ON' : 'OFF'}
                </button>
            </div>

            {/* Right: Actions & Nav */}
            <div className="flex items-center gap-3">
                <Link
                    href="/admin"
                    className="p-1 px-2 text-[10px] font-bold uppercase tracking-widest text-aam-grey hover:text-white transition-all flex items-center gap-2"
                    title="Go to Dashboard"
                >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden lg:inline">Dashboard</span>
                </Link>

                <button
                    className="p-1 px-2 text-[10px] font-bold uppercase tracking-widest text-aam-grey hover:text-aam-error transition-all flex items-center gap-2"
                    title="Exit Admin Mode"
                    onClick={logout}
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                </button>
            </div>
        </div>
    )
}
