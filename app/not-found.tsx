import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Map } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container min-h-[70vh] flex flex-col items-center justify-center text-center space-y-8">
      <div className="space-y-4">
        <h1 className="font-display text-9xl font-black text-aam-teal-100 relative">
          404
          <span className="absolute inset-0 flex items-center justify-center text-aam-navy-900 text-4xl font-bold">
            Page Not Found
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The architectural plan for this page seems to be missing or relocated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button asChild className="bg-aam-navy-900 hover:bg-aam-navy-800 font-bold px-8 py-6 h-auto">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild className="border-aam-teal-200 text-aam-teal-700 hover:bg-aam-teal-50 font-bold px-8 py-6 h-auto">
          <Link href="/news">
            <Search className="mr-2 h-5 w-5" />
            Search News
          </Link>
        </Button>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="p-6 rounded-2xl bg-muted/30 border border-dashed flex flex-col items-center gap-2">
          <Map className="h-6 w-6 text-aam-teal-600" />
          <h3 className="font-bold text-sm">Site Map</h3>
          <p className="text-xs text-muted-foreground">Find your way around the platform</p>
        </div>
        <div className="p-6 rounded-2xl bg-muted/30 border border-dashed flex flex-col items-center gap-2">
          <Search className="h-6 w-6 text-aam-teal-600" />
          <h3 className="font-bold text-sm">Search Directory</h3>
          <p className="text-xs text-muted-foreground">Find members or firms</p>
        </div>
        <div className="p-6 rounded-2xl bg-muted/30 border border-dashed flex flex-col items-center gap-2">
          <Home className="h-6 w-6 text-aam-teal-600" />
          <h3 className="font-bold text-sm">Contact Support</h3>
          <p className="text-xs text-muted-foreground">If you believe this is an error</p>
        </div>
      </div>
    </div>
  );
}
