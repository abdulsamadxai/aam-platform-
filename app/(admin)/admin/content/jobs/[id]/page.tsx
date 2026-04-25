"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { JobForm } from "@/components/admin/content/JobForm";
import { JobInput } from "@/lib/validations";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getJobById } from "@/lib/api";

export default function EditJobPage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const job = getJobById(params.id);
        if (!job) {
            toast.error("FETCH_ERROR: Node not found in registry.");
            router.push("/admin/content/jobs");
        } else {
            setInitialData(job);
        }
        setLoading(false);
    }, [params.id, router]);

    const handleSubmit = async (data: JobInput) => {
        setIsSaving(true);
        try {
            // Mocking the update process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("VACANCY_UPDATED: Changes committed successfully.");
            router.push("/admin/content/jobs");
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
                title={"Modify\nVacancy"}
                subtitle={`Updating Registry: ${initialData?.title}`}
                backHref="/admin/content/jobs"
            />

            <div className="max-w-5xl">
                <JobForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </div>
        </div>
    );
}
