import { notFound } from "next/navigation";
import { ThreadView } from "@/components/discussion/ThreadView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllThreads, getAllReplies } from "@/lib/api";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock user
  const user = { id: 'mock-user-1', email: 'member@test.am', user_metadata: { full_name: 'Mock Member' } };

  const threads = await getAllThreads();
  const thread = threads.find(t => t.id === id);

  if (!thread) {
    notFound();
  }

  const allReplies = await getAllReplies();
  const replies = allReplies.filter(r => r.thread_id === id);

  return (
    <div className="container py-12 max-w-5xl space-y-8">
      <div className="border-b-2 border-white/20 pb-8">
        <Button variant="ghost" className="text-white font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent hover:text-white/80 group" asChild>
          <Link href="/member/discussion">
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
            RETURN TO DISCOURSES
          </Link>
        </Button>
      </div>

      <ThreadView
        initialThread={thread as any}
        initialReplies={replies}
        currentUser={user as any}
      />
    </div>
  );
}
