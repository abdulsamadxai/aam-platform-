import { notFound } from "next/navigation";
import { ThreadView } from "@/components/discussion/ThreadView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Trash2, Pin } from "lucide-react";
import Link from "next/link";
import { getAllThreads, getAllReplies } from "@/lib/mock-data";

export default async function AdminThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock admin user
  const adminUser = { id: 'admin', email: 'admin@aam.mv', user_metadata: { full_name: 'AAM Secretariat' } };

  const thread = getAllThreads().find(t => t.id === id);

  if (!thread) {
    notFound();
  }

  const replies = getAllReplies().filter(r => r.thread_id === id);

  return (
    <div className="container py-12 max-w-5xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-white/20 pb-8">
        <Button variant="ghost" className="text-white font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent hover:text-white/80 group" asChild>
          <Link href="/admin/forum" className="flex items-center">
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
            RETURN TO MODERATION INDEX
          </Link>
        </Button>

        <div className="flex items-center gap-4">
            <Button variant="outline" className="border-2 border-white/20 bg-transparent rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-white hover:text-black transition-all text-white gap-2">
                <Pin className="h-3.5 w-3.5" />
                {thread.is_pinned ? 'UNPIN THREAD' : 'PIN THREAD'}
            </Button>
            <Button variant="outline" className="border-2 border-white/20 bg-transparent rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-white hover:text-black transition-all text-white gap-2">
                <Lock className="h-3.5 w-3.5" />
                {thread.is_locked ? 'UNLOCK THREAD' : 'LOCK THREAD'}
            </Button>
            <Button variant="destructive" className="rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 bg-red-600 hover:bg-red-700 transition-all text-white gap-2 border-2 border-transparent">
                <Trash2 className="h-3.5 w-3.5" />
                DELETE
            </Button>
        </div>
      </div>

      <ThreadView
        initialThread={thread as any}
        initialReplies={replies}
        currentUser={adminUser as any}
      />
    </div>
  );
}
