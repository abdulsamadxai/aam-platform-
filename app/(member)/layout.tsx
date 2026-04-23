"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    User,
    MessageSquare,
    FileText,
    Award,
    LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        // Simulated logout
        router.push("/login");
    };

    const menuItems = [
        { name: "Dashboard", href: "/member/dashboard", icon: LayoutDashboard },
        { name: "Profile", href: "/member/profile", icon: User },
        { name: "Forum", href: "/member/forum", icon: MessageSquare },
        { name: "Documents", href: "/member/documents", icon: FileText },
        { name: "CPD Logger", href: "/member/cpd", icon: Award },
    ];

    return (
        <div className="flex min-h-screen bg-black pt-20">
            {/* Member Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:block">
                <nav className="p-6 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all group",
                                pathname === item.href
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
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
