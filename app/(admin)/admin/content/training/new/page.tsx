"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TrainingForm } from "@/components/admin/content/TrainingForm";
import { TrainingInput } from "@/lib/validations";
import { toast } from "react-hot-toast";

export default function NewTrainingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: TrainingInput) => {
    setIsLoading(true);
    try {
      // Mocking the creation process
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("MODULE_COMMITTED: Node synchronized with registry.");
      router.push("/admin/content/training");
    } catch (error) {
      toast.error("PROTOCOL_ERROR: Failed to commit training module.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-24 py-12">
      <AdminPageHeader
        title={"Commit\nModule"}
        subtitle="New Training Programme Parameters"
        backHref="/admin/content/training"
      />

      <div className="max-w-5xl">
        <TrainingForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
