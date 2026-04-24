import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Clock,
  Plus,
  Search,
  ChevronRight,
  ShieldAlert,
  Trash2,
  Lock,
  Pin
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getAllThreads } from "@/lib/mock-data";

export default function AdminForumPage() {
  const threads = getAllThreads();

  return (
    <div className="container py-24 space-y-24">
      {/* Full width PageHeader */}
      <div className="border-b-8 border-white/20 pb-12">
        <PageHeader
          title="DISCOURSE MODERATION"
          description="Administrative control center for monitoring, moderating, and participating in institutional dialogue."
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-80 space-y-12">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-mono-400">INDEX SEARCH</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input placeholder="KEYWORD QUERY..." className="pl-12 border-2 border-white/20 bg-transparent text-white rounded-none h-14 font-black uppercase tracking-widest text-[10px] focus-visible:ring-0 placeholder:text-mono-500" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] border-b-2 border-white/20 pb-4">MODERATION QUEUE</h3>
            <div className="space-y-2">
              <button className="w-full flex justify-between items-center px-6 py-4 rounded-none bg-white text-black font-black uppercase tracking-widest text-[10px] transition-all">
                <span>ALL DISCOURSES</span>
                <Badge className="bg-black text-white hover:bg-black rounded-none">{threads?.length || 0}</Badge>
              </button>
              <button className="w-full flex justify-between items-center px-6 py-4 rounded-none border-2 border-transparent hover:border-white font-black uppercase tracking-widest text-[10px] transition-all text-mono-400 hover:text-white">
                <span>FLAGGED REPLIES</span>
                <Badge variant="outline" className="rounded-none border-white text-white">3</Badge>
              </button>
            </div>
          </div>
          
          <div className="p-8 bg-black border-4 border-white/20 text-center space-y-6">
            <ShieldAlert className="h-12 w-12 text-white mx-auto" />
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-white">
              ADMINISTRATIVE PRIVILEGES ACTIVE. YOU CAN DELETE, PIN, OR LOCK THREADS.
            </p>
          </div>
        </div>

        <div className="flex-grow space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-2 border-white/20 pb-4">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
              {threads?.length || 0} ACTIVE THREADS
            </span>
            <Button className="h-12 px-8 bg-white text-black hover:bg-mono-200 rounded-none font-black uppercase tracking-widest text-[10px] transition-all" asChild>
              <Link href="/admin/forum/new">
                <Plus className="mr-3 h-4 w-4" />
                INITIATE OFFICIAL THREAD
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {threads?.map((thread) => (
              <Card key={thread.id} className="border-2 border-white/20 bg-transparent rounded-none shadow-none hover:bg-white/5 transition-all overflow-hidden group relative">
                {thread.is_pinned && (
                    <div className="absolute top-0 right-0 bg-white text-black px-3 py-1 flex items-center gap-2">
                        <Pin className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">PINNED</span>
                    </div>
                )}
                {thread.is_locked && (
                    <div className="absolute top-0 right-24 bg-red-900 text-white px-3 py-1 flex items-center gap-2 border-l border-b border-r border-red-900">
                        <Lock className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">LOCKED</span>
                    </div>
                )}
                <div className="p-8 flex flex-col md:flex-row gap-10">
                  <div className="flex-grow space-y-6">
                    <div className="flex items-center gap-6">
                      <Badge className="bg-white text-black rounded-none text-[9px] font-black uppercase tracking-widest border-none px-3 py-1">
                        {thread.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-mono-400">
                        <Clock className="h-3 w-3" />
                        <span>LOGGED: {new Date(thread.updated_at || thread.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight text-white group-hover:underline underline-offset-8 decoration-4 pr-12">
                      <Link href={`/admin/forum/${thread.id}`}>
                        {thread.title}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap items-center gap-10 pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-white text-black flex items-center justify-center text-[10px] font-black overflow-hidden">
                          {thread.author_id === 'admin' ? 'A' : 'M'}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">
                          {thread.author_id === 'admin' ? 'SYSTEM ADMIN' : 'MEMBER'}
                        </span>
                      </div>

                      <div className="flex items-center gap-8 md:border-l-2 border-white/20 md:pl-8">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                          <MessageSquare className="h-4 w-4" />
                          <span>{thread.reply_count} REPLIES</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 justify-center items-center shrink-0 border-l-2 border-white/20 pl-8">
                    <Link href={`/admin/forum/${thread.id}`} className="h-12 w-12 border-2 border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white">
                      <ChevronRight className="h-6 w-6" />
                    </Link>
                    <button className="h-12 w-12 border-2 border-white/20 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-white">
                        <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {(!threads || threads.length === 0) && (
              <div className="py-32 text-center border-4 border-white/20 border-dashed rounded-none bg-black space-y-6">
                <MessageSquare className="h-16 w-16 text-white mx-auto opacity-10" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mono-400">NO DISCOURSES DETECTED.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
