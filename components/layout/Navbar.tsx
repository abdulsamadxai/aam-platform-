"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/lib/admin-context";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Active Members", href: "/members" },
  { name: "Firms", href: "/firms" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Jobs", href: "/jobs" },
  { name: "Training", href: "/training" },
  { name: "AGM", href: "/agm" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAdmin } = useAdmin();

  const isDashboard = pathname?.startsWith('/member') || pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        isAdmin ? "top-[44px]" : "top-0",
        scrolled ? "bg-black/95 backdrop-blur-md py-4 border-b border-white/10" : "bg-black/80 py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo variant="light" size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[11px] font-bold uppercase tracking-widest transition-all duration-300 relative py-1 whitespace-nowrap",
                pathname === link.href
                  ? "text-white"
                  : "text-aam-grey hover:text-white"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
              )}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden xl:block ml-4">
          <Button
            variant="outline"
            className="rounded-none border-white text-white hover:bg-white hover:text-black font-bold text-[10px] tracking-widest px-6 py-3 h-auto"
            asChild
          >
            <Link href="/login">MEMBER LOGIN</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] bg-black z-40 transition-transform duration-500 xl:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-2xl font-bold tracking-widest uppercase",
                pathname === link.href ? "text-white" : "text-aam-grey"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button
            variant="outline"
            className="rounded-none border-white text-white hover:bg-white hover:text-black font-bold text-sm tracking-widest px-12 py-6 h-auto mt-8"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <Link href="/login">MEMBER LOGIN</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
