"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewsForm } from "@/components/admin/content/NewsForm";
import { NewsPostInput } from "@/lib/validations";
import { toast } from "react-hot-toast";

export default function NewNewsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: NewsPostInput) => {
    setIsLoading(true);
    try {
      // Mocking the creation process
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("ENTRY_COMMITTED: Node synchronized with newsfeed.");
      router.push("/admin/content/news");
    } catch (error) {
      toast.error("PROTOCOL_ERROR: Failed to commit news post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-24 py-12">
      <AdminPageHeader
        title={"Commit\nEntry"}
        subtitle="New News Publication Parameters"
        backHref="/admin/content/news"
      />

      <div className="max-w-5xl">
        <NewsForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
