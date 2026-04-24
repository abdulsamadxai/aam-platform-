import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  User,
  Clock,
  Plus,
  ArrowUp,
  Search,
  Filter,
  ChevronRight,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getAllThreads } from "@/lib/mock-data";

export default async function ForumPage() {
  const threads = await getAllThreads();

  return (
    <div className="container py-24 space-y-24">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 border-b-8 border-black pb-12">
        <PageHeader
          title="MEMBER DISCOURSE"
          description="Institutional repository for technical dialogue, regulatory audits, and professional peer review."
        />
        <Button className="h-16 px-10 bg-black text-white hover:bg-neutral-800 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-black transition-all" asChild>
          <Link href="/discussion/new">
            <Plus className="mr-3 h-5 w-5" />
            INITIATE THREAD
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-80 space-y-12">
          <div className="space-y-4">
            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">INDEX SEARCH</Label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
              <Input placeholder="KEYWORD QUERY..." className="pl-12 border-2 border-black rounded-none h-14 font-black uppercase tracking-widest text-[10px] focus-visible:ring-0 placeholder:text-neutral-300" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-black uppercase tracking-[0.4em] border-b-2 border-black pb-4">TAXONOMY</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-6 py-4 rounded-none bg-black text-white font-black uppercase tracking-widest text-[10px] transition-all">
                ALL DISCOURSES
              </button>
              {['GENERAL', 'PROJECTS & WORK', 'REGULATIONS', 'CPE / CPD', 'ANNOUNCEMENTS'].map((cat) => (
                <button key={cat} className="w-full text-left px-6 py-4 rounded-none border-2 border-transparent hover:border-black font-black uppercase tracking-widest text-[10px] transition-all text-neutral-500 hover:text-black">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 bg-black text-white rounded-none border-4 border-black text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff_1px,transparent_1px,transparent_10px)]" />
            <div className="h-12 w-12 bg-white flex items-center justify-center mx-auto relative z-10">
              <ArrowUp className="h-6 w-6 text-black" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed relative z-10">
              SURFACE PEER REVIEW BY UPVOTING TECHNICAL CONTRIBUTIONS.
            </p>
          </div>
        </div>

        <div className="flex-grow space-y-10">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <span className="text-[10px] font-black text-black uppercase tracking-[0.3em]">
              {threads?.length || 0} ACTIVE THREADS
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">SEQUENCE:</span>
              <select className="text-[10px] font-black bg-transparent border-none focus:ring-0 cursor-pointer uppercase tracking-widest">
                <option>RECENT ACTIVITY</option>
                <option>NEWEST THREADS</option>
                <option>PEER-RECOGNIZED</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {threads?.map((thread) => (
              <Card key={thread.id} className="border-2 border-black rounded-none shadow-none hover:bg-black hover:text-white transition-all overflow-hidden group">
                <div className="p-8 flex flex-col md:flex-row gap-10">
                  <div className="flex-grow space-y-6">
                    <div className="flex items-center gap-6">
                      <Badge className="bg-black text-white group-hover:bg-white group-hover:text-black rounded-none text-[9px] font-black uppercase tracking-widest border-none px-3 py-1 transition-colors">
                        {thread.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white/60">
                        <Clock className="h-3 w-3" />
                        <span>LOGGED: {new Date(thread.updated_at || thread.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight group-hover:underline underline-offset-8 decoration-4">
                      <Link href={`/discussion/${thread.id}`}>
                        {thread.title}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap items-center gap-10 pt-6 border-t border-black/10 group-hover:border-white/20">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-neutral-100 border-2 border-black flex items-center justify-center text-[10px] font-black overflow-hidden group-hover:bg-white group-hover:text-black transition-colors">
                          M
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">MEMBER</span>
                      </div>

                      <div className="flex items-center gap-8 md:border-l-2 border-black group-hover:border-white/20 md:pl-8">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                          <MessageSquare className="h-4 w-4" />
                          <span>{thread.reply_count} REPLIES</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                          <MessageSquare className="h-4 w-4" />
                          <span>{thread.reply_count} REPLIES</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center shrink-0 border-l-2 border-black group-hover:border-white/20 pl-10">
                    <Link href={`/discussion/${thread.id}`} className="h-14 w-14 border-2 border-black group-hover:border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ChevronRight className="h-8 w-8" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}

            {(!threads || threads.length === 0) && (
              <div className="py-32 text-center border-4 border-black border-dashed rounded-none bg-neutral-50 space-y-6">
                <MessageSquare className="h-16 w-16 text-black mx-auto opacity-10" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">NO ACTIVE DISCOURSES DETECTED.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={className}>{children}</span>
);
