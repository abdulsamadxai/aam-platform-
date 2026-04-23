"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { JobForm } from "@/components/admin/content/JobForm";
import { JobListingInput as JobInput } from "@/lib/validations";
import { toast } from "react-hot-toast";

export default function NewJobPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: JobInput) => {
    setIsLoading(true);
    try {
      // Mocking the creation process
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("VACANCY_COMMITTED: Node synchronized with registry.");
      router.push("/admin/content/jobs");
    } catch (error) {
      toast.error("PROTOCOL_ERROR: Failed to post vacancy.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-24 py-12">
      <AdminPageHeader
        title={"Commit\nVacancy"}
        subtitle="New Opportunity Parameters"
        backHref="/admin/content/jobs"
      />

      <div className="max-w-5xl">
        <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
