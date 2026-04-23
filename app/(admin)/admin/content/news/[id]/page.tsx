"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewsForm } from "@/components/admin/content/NewsForm";
import { NewsPostInput } from "@/lib/validations";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getNewsPostById } from "@/lib/mock-data";

export default function EditNewsPage({ params }: { params: { id: string } }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const post = getNewsPostById(params.id);
        if (!post) {
            toast.error("FETCH_ERROR: Entry not found in registry.");
            router.push("/admin/content/news");
        } else {
            setInitialData({
                ...post,
                is_published: !!post.published_at
            });
        }
        setLoading(false);
    }, [params.id, router]);

    const handleSubmit = async (data: NewsPostInput) => {
        setIsSaving(true);
        try {
            // Mocking the update process
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("ENTRY_UPDATED: Changes synchronized successfully.");
            router.push("/admin/content/news");
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
                title={"Modify\nEntry"}
                subtitle={`Updating Registry: ${initialData?.title}`}
                backHref="/admin/content/news"
            />

            <div className="max-w-5xl">
                <NewsForm initialData={initialData} onSubmit={handleSubmit} isLoading={isSaving} />
            </div>
        </div>
    );
}
