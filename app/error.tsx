"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Global Error Boundary caught:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black">
      <div className="max-w-md w-full border border-white/10 bg-black p-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">
          System Error
        </h1>
        <p className="text-aam-grey mb-8 leading-relaxed">
          The application encountered an unexpected fault. Our technical team has been notified.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            onClick={() => reset()}
            className="flex-1 bg-white text-black hover:bg-aam-grey font-bold uppercase tracking-widest rounded-none h-12"
          >
            Attempt Recovery
          </Button>
          <Button
            variant="outline"
            asChild
            className="flex-1 border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-widest rounded-none h-12"
          >
            <Link href="/">Return to Core</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
