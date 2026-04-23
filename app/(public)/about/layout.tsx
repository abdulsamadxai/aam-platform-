"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const aboutLinks = [
  { name: "History & Background", href: "/about/history" },
  { name: "Vision, Mission & Objectives", href: "/about/vision" },
  { name: "Governing Council", href: "/about/council" },
  { name: "Secretariat", href: "/about/secretariat" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="pt-24 min-h-screen bg-aam-sand">
      {/* Page Header Band */}
      <section className="bg-aam-navy py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container relative z-10">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-aam-gold/70">
              <Link href="/" className="hover:text-aam-teal transition-colors">Home</Link>
              <span>›</span>
              <span className="text-aam-sand">About AAM</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-aam-sand tracking-tight">
              Institutional <span className="italic text-aam-gold">Overview.</span>
            </h1>
          </div>
        </div>
      </section>

      <div className="container py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-2">
              <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-aam-navy/40 mb-8 px-6">Navigation</h4>
              <div className="space-y-1 border-l border-aam-navy/5">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "block pl-6 py-4 text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 relative group",
                      pathname === link.href 
                        ? "text-aam-navy font-bold" 
                        : "text-aam-navy/40 hover:text-aam-teal hover:pl-8"
                    )}
                  >
                    {pathname === link.href && (
                      <div className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-aam-teal" />
                    )}
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-9 max-w-[800px] animate-in fade-in slide-in-from-right-8 duration-700">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
