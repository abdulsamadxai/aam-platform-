"use client";

import { notFound, useRouter, useParams } from "next/navigation";
import { ThreadView } from "@/components/discussion/ThreadView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Trash2, Pin } from "lucide-react";
import Link from "next/link";
import { getAllThreads, getAllReplies, updateForumThread, deleteForumThread } from "@/lib/api";
import { useState, useEffect, use } from "react";
import { toast } from "react-hot-toast";
import { ForumThread, ForumReply } from "@/types";

export default function AdminThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  
  const [thread, setThread] = useState<ForumThread | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const threads = await getAllThreads();
        const t = threads.find(item => item.id === id);
        if (t) {
          setThread(t);
          const replies = await getAllReplies();
          setReplies(replies.filter(r => r.thread_id === id));
        }
      } catch (error) {
        toast.error("Failed to fetch thread details");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black" />;
  if (!thread) {
    notFound();
    return null;
  }

  const adminUser = { id: 'admin', email: 'admin@aam.mv', user_metadata: { full_name: 'AAM Secretariat' } };

  const handleTogglePin = () => {
    const updated = !thread.is_pinned;
    updateForumThread(thread.id, { is_pinned: updated });
    setThread({ ...thread, is_pinned: updated });
    toast.success(updated ? "Thread pinned" : "Thread unpinned");
  };

  const handleToggleLock = () => {
    const updated = !thread.is_locked;
    updateForumThread(thread.id, { is_locked: updated });
    setThread({ ...thread, is_locked: updated });
    toast.success(updated ? "Thread locked" : "Thread unlocked");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this thread?")) {
      deleteForumThread(thread.id);
      toast.success("Thread deleted");
      router.push("/admin/forum");
    }
  };

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
            <Button 
              onClick={handleTogglePin}
              variant="outline" 
              className="border-2 border-white/20 bg-transparent rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-white hover:text-black transition-all text-white gap-2"
            >
                <Pin className="h-3.5 w-3.5" />
                {thread.is_pinned ? 'UNPIN THREAD' : 'PIN THREAD'}
            </Button>
            <Button 
              onClick={handleToggleLock}
              variant="outline" 
              className="border-2 border-white/20 bg-transparent rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 hover:bg-white hover:text-black transition-all text-white gap-2"
            >
                <Lock className="h-3.5 w-3.5" />
                {thread.is_locked ? 'UNLOCK THREAD' : 'LOCK THREAD'}
            </Button>
            <Button 
              onClick={handleDelete}
              variant="destructive" 
              className="rounded-none text-[10px] font-black uppercase tracking-widest h-10 px-6 bg-red-600 hover:bg-red-700 transition-all text-white gap-2 border-2 border-transparent"
            >
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
