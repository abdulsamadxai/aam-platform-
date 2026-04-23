"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "@/components/admin/content/EventForm";
import { EventInput } from "@/lib/validations";
import { toast } from "react-hot-toast";

export default function NewEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: EventInput) => {
    setIsLoading(true);
    try {
      // Mocking the creation process
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success("EVENT_SCHEDULED: Node synchronized with registry.");
      router.push("/admin/content/events");
    } catch (error) {
      toast.error("PROTOCOL_ERROR: Failed to schedule event.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-24 py-12">
      <AdminPageHeader
        title={"Schedule\nNode"}
        subtitle="New Institutional Event Parameters"
        backHref="/admin/content/events"
      />

      <div className="max-w-5xl">
        <EventForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
