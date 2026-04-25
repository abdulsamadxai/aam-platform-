"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    User,
    MessageSquare,
    FileText,
    LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin-context";
import { Logo } from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isAdmin } = useAdmin();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const menuItems = [
        { name: "Dashboard", href: "/member/dashboard", icon: LayoutDashboard },
        { name: "Profile", href: "/member/profile", icon: User },
        { name: "Forum", href: "/member/forum", icon: MessageSquare },
        { name: "Documents", href: "/member/documents", icon: FileText },
    ];

    return (
        <div className="flex min-h-screen bg-black">
            {/* Mobile Header */}
            <div className={cn(
                "md:hidden fixed left-0 right-0 h-16 bg-black border-b border-white/10 z-40 flex items-center justify-between px-6",
                isAdmin ? "top-[44px]" : "top-0"
            )}>
                <Logo variant="light" size="sm" />
                <button className="text-white" aria-label="Open navigation menu">
                    <LayoutDashboard className="w-6 h-6" />
                </button>
            </div>

            {/* Member Sidebar */}
            <aside
                className={cn(
                    "w-72 border-r border-white/10 hidden md:flex flex-col sticky bg-black",
                    isAdmin ? "top-[44px] h-[calc(100vh-44px)]" : "top-0 h-screen"
                )}
            >
                <div className="p-8 border-b border-white/10">
                    <Logo variant="light" size="sm" />
                </div>
                <nav className="p-6 space-y-2 flex-grow overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group",
                                pathname === item.href || (item.href !== "/member/dashboard" && pathname.startsWith(item.href))
                                    ? "bg-white text-black"
                                    : "text-aam-grey hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-aam-error hover:bg-aam-error/10 w-full text-left mt-10 transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto pt-16">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
