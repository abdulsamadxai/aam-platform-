"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TrainingForm } from "@/components/admin/content/TrainingForm";
import { TrainingInput } from "@/lib/validations";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getTrainingById } from "@/lib/mock-data";

export default function EditTrainingPage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const programme = getTrainingById(params.id);
        if (!programme) {
            toast.error("FETCH_ERROR: Module not found in registry.");
            router.push("/admin/content/training");
        } else {
            setInitialData(programme);
        }
        setLoading(false);
    }, [params.id, router]);

    const handleSubmit = async (data: TrainingInput) => {
        setIsSaving(true);
        try {
            // Mocking the update process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("MODULE_UPDATED: Changes synchronized successfully.");
            router.push("/admin/content/training");
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
                title={"Modify\nModule"}
                subtitle={`Updating Registry: ${initialData?.title}`}
                backHref="/admin/content/training"
            />

            <div className="max-w-5xl">
                <TrainingForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </div>
        </div>
    );
}
