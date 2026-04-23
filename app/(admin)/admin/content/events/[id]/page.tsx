"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "@/components/admin/content/EventForm";
import { EventInput } from "@/lib/validations";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getEventById } from "@/lib/mock-data";

export default function EditEventPage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const event = getEventById(params.id);
        if (!event) {
            toast.error("FETCH_ERROR: Node not found in registry.");
            router.push("/admin/content/events");
        } else {
            setInitialData(event);
        }
        setLoading(false);
    }, [params.id, router]);

    const handleSubmit = async (data: EventInput) => {
        setIsSaving(true);
        try {
            // Mocking the update process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("NODE_UPDATED: Changes synchronized successfully.");
            router.push("/admin/content/events");
        } catch (error) {
            toast.error("PROTOCOL_ERROR: Transaction failure.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-black" /></div>;

    return (
        <div className="space-y-24 py-12">
            <AdminPageHeader
                title={"Modify\nNode"}
                subtitle={`Updating Registry: ${initialData?.title}`}
                backHref="/admin/content/events"
            />

            <div className="max-w-5xl">
                <EventForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </div>
        </div>
    );
}
