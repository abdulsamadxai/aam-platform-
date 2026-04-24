import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Column 1: AAM */}
          <div className="space-y-8 lg:col-span-2">
            <Logo variant="light" size="sm" />
            <p className="text-aam-grey text-sm font-light leading-relaxed max-w-sm">
              Architects Association Maldives (AAM) is the institutional body representing the architectural profession in the Republic of Maldives. Our mandate includes regulatory oversight, professional standardisation, and advocacy for sustainable urban development.
            </p>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Platform</h4>
            <ul className="space-y-4">
              {[
                { name: "Member Directory", href: "/members" },
                { name: "Registered Firms", href: "/firms" },
                { name: "News & Bulletins", href: "/news" },
                { name: "Events & AGM", href: "/agm" },
                { name: "Job Board", href: "/jobs" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-aam-grey hover:text-white text-xs font-medium uppercase tracking-widest transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secretariat */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">Secretariat</h4>
            <ul className="space-y-4 text-aam-grey text-xs font-medium uppercase tracking-widest leading-relaxed">
              <li>H. Mialani, 3rd Floor,<br />Malé, Maldives</li>
              <li>
                <a href="mailto:info@aamaldives.mv" className="hover:text-white transition-colors">
                  info@aamaldives.mv
                </a>
              </li>
              <li className="text-white">+960 333 4455</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-aam-dark-grey">
            © {new Date().getFullYear()} Architects Association Maldives. Institutional Publication.
          </p>
          <div className="flex gap-8">
            <span className="text-[9px] font-bold uppercase tracking-widest text-aam-dark-grey/50 cursor-not-allowed select-none">Privacy Declaration</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-aam-dark-grey/50 cursor-not-allowed select-none">Institutional Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
