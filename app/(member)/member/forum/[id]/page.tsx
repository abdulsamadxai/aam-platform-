import { notFound } from "next/navigation";
import { ThreadView } from "@/components/forum/ThreadView";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllThreads } from "@/lib/api";

export default async function ForumThreadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Mock user
    const user = { id: 'mock-user-1', email: 'member@test.am', user_metadata: { full_name: 'Mock Member' } };

    const threads = await getAllThreads();
    const thread = threads.find(t => t.id === id);

    if (!thread) {
        notFound();
    }

    const replies: any[] = [];

    return (
        <div className="space-y-12">
            <Link href="/member/forum" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" />
                Back to Forum
            </Link>

            <ThreadView thread={thread as any} replies={replies} user={user as any} />
        </div>
    );
}
