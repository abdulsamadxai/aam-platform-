"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { CompetitionForm } from "@/components/admin/competitions/CompetitionForm";
import { CompetitionInput } from "@/lib/validations";
import { toast } from "react-hot-toast";

export default function NewCompetitionPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (data: CompetitionInput) => {
        setIsLoading(true);
        try {
            // Mocking the creation process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("CALL_INITIATED: Entry committed to registry.");
            router.push("/admin/content/competitions");
        } catch (error) {
            toast.error("PROTOCOL_ERROR: Failed to commit entry.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-24 py-12">
            <AdminPageHeader
                title={"Initiate\nCall"}
                subtitle="New Competition Parameters"
                backHref="/admin/content/competitions"
            />

            <div className="max-w-5xl">
                <CompetitionForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </div>
    );
}
