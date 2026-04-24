import Link from "next/link";
import { Home, Search, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-black flex flex-col items-center justify-center text-center space-y-8 px-6">
      <div className="space-y-4">
        <h1 className="font-sans text-9xl font-black text-white relative">
          404
        </h1>
        <p className="text-2xl font-bold uppercase tracking-[0.2em] text-white">Page Not Found</p>
        <p className="text-sm text-aam-grey max-w-md mx-auto">
          The architectural plan for this page seems to be missing or relocated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-8 py-4 hover:bg-aam-grey transition-all"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/news"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-white/20 text-white px-8 py-4 hover:border-white transition-all"
        >
          <Search className="h-4 w-4" />
          Search News
        </Link>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 border border-white/10 flex flex-col items-center gap-3">
          <Map className="h-6 w-6 text-aam-grey" />
          <h3 className="font-bold text-sm uppercase tracking-widest text-white">Site Map</h3>
          <p className="text-xs text-aam-grey">Find your way around the platform</p>
        </div>
        <div className="p-6 border border-white/10 flex flex-col items-center gap-3">
          <Search className="h-6 w-6 text-aam-grey" />
          <h3 className="font-bold text-sm uppercase tracking-widest text-white">Search Directory</h3>
          <p className="text-xs text-aam-grey">Find members or firms</p>
        </div>
        <div className="p-6 border border-white/10 flex flex-col items-center gap-3">
          <Home className="h-6 w-6 text-aam-grey" />
          <h3 className="font-bold text-sm uppercase tracking-widest text-white">Contact Support</h3>
          <p className="text-xs text-aam-grey">If you believe this is an error</p>
        </div>
      </div>
    </div>
  );
}
