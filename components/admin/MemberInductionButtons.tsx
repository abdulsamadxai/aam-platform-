"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { approveApplication, rejectApplication } from "@/lib/actions/members";
import { Loader2 } from "lucide-react";

interface MemberInductionButtonsProps {
  applicationId: string;
}

/**
 * Member Induction Buttons
 * BUG-043 FIX: Implemented interactive approve/reject buttons for the admin registry.
 */
export function MemberInductionButtons({ applicationId }: MemberInductionButtonsProps) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = async () => {
    setLoading('approve');
    try {
      await approveApplication(applicationId);
      alert("MEMBER INDUCTED SUCCESSFULLY.");
    } catch (err: any) {
      alert("INDUCTION ERROR: " + err.message);
    }
    setLoading(null);
  };

  const handleReject = async () => {
    if (!confirm("CONFIRM REJECTION OF DOSSIER?")) return;
    setLoading('reject');
    try {
      await rejectApplication(applicationId);
      alert("DOSSIER REJECTED.");
    } catch (err: any) {
      alert("REJECTION ERROR: " + err.message);
    }
    setLoading(null);
  };

  return (
    <div className="flex w-full border-t-2 border-black">
      <Button 
        onClick={handleApprove}
        disabled={!!loading}
        className="flex-grow bg-black text-white hover:bg-neutral-800 rounded-none font-black uppercase tracking-widest text-[10px] h-16 border-r-2 border-black"
      >
        {loading === 'approve' ? <Loader2 className="h-5 w-5 animate-spin" /> : "APPROVE"}
      </Button>
      <Button 
        onClick={handleReject}
        disabled={!!loading}
        variant="outline" 
        className="flex-grow border-none text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] h-16"
      >
        {loading === 'reject' ? <Loader2 className="h-5 w-5 animate-spin" /> : "REJECT"}
      </Button>
    </div>
  );
}
