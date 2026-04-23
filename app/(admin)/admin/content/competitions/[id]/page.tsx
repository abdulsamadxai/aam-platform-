"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CompetitionForm } from "@/components/admin/competitions/CompetitionForm";
import { CompetitionInput } from "@/lib/validations";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getCompetitionById } from "@/lib/mock-data";

export default function EditCompetitionPage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const comp = getCompetitionById(params.id);
        if (!comp) {
            toast.error("FETCH_ERROR: Node not found in registry.");
            router.push("/admin/content/competitions");
        } else {
            setInitialData(comp);
        }
        setLoading(false);
    }, [params.id, router]);

    const handleSubmit = async (data: CompetitionInput) => {
        setIsSaving(true);
        try {
            // Mocking the update process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("REGISTRY_UPDATED: Changes committed successfully.");
            router.push("/admin/content/competitions");
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
                title={"Modify\nCall"}
                subtitle={`Updating Registry: ${initialData?.title}`}
                backHref="/admin/content/competitions"
            />

            <div className="max-w-5xl">
                <CompetitionForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </div>
        </div>
    );
}
