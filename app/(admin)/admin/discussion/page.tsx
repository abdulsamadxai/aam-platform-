import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  ShieldAlert, 
  Trash2, 
  Flag, 
  CheckCircle2, 
  Pin,
  Lock,
  Unlock,
  MessageSquare,
  User,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ForumReplyWithContext {
  id: string;
  body: string;
  author?: { full_name: string } | null;
  thread?: { title: string } | null;
  is_flagged: boolean;
  created_at: string;
}

interface ForumThreadWithAuthor {
  id: string;
  title: string;
  author?: { full_name: string } | null;
  is_pinned: boolean;
  is_locked: boolean;
  created_at: string;
}

/**
 * Forum Moderation Page (Admin)
 * BUG-041 equivalent: Added server-side role check.
 * BUG-030 FIX: Converted to Server Component for security and efficiency.
 */
export default async function ForumModerationPage() {
  const supabase = await createClient();

  // 1. Verify Admin Authority
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.app_metadata?.role !== 'admin') {
    redirect("/dashboard");
  }

  // 2. Fetch Flagged Replies and Threads in Parallel
  const [repliesRes, threadsRes] = await Promise.all([
    supabase
      .from("forum_replies")
      .select("*, author:members(full_name), thread:forum_threads(title)")
      .eq("is_flagged", true)
      .is("deleted_at", null),
    supabase
      .from("forum_threads")
      .select("*, author:members(full_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
  ]);

  const flaggedReplies = repliesRes.data || [];
  const threads = threadsRes.data || [];

  return (
    <div className="container py-24 max-w-7xl space-y-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b-8 border-black pb-12">
        <div className="space-y-4 border-l-8 border-black pl-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Discourse <br /> Moderator</h1>
          <p className="text-sm font-black uppercase tracking-[0.4em] text-mono-400">Institutional Governance & Policy Enforcement</p>
        </div>
        <Button variant="outline" asChild className="h-16 px-10 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] transition-all">
          <Link href="/admin">COMMAND CENTER</Link>
        </Button>
      </div>

      <Tabs defaultValue="flagged" className="w-full space-y-12">
        <TabsList className="bg-black p-2 rounded-none h-auto w-full md:w-fit border-2 border-black">
          <TabsTrigger value="flagged" className="px-8 py-4 rounded-none text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black text-mono-500 hover:text-white transition-all">
            <ShieldAlert className="mr-3 h-4 w-4" />
            FLAGGED CONTENT ({flaggedReplies.length})
          </TabsTrigger>
          <TabsTrigger value="threads" className="px-8 py-4 rounded-none text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-black text-mono-500 hover:text-white transition-all">
            <MessageSquare className="mr-3 h-4 w-4" />
            THREAD REGISTRY ({threads.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flagged" className="space-y-12 mt-0">
          <div className="border-[4px] border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black border-none">
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 pl-10">Author / Source</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Violation Context</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 text-right pr-10">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flaggedReplies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-64 text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mono-400">ALL DISCOURSES COMPLIANT. NO FLAGS DETECTED.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  flaggedReplies.map((reply: ForumReplyWithContext) => (
                    <TableRow key={reply.id} className="border-b-2 border-black/5 last:border-none hover:bg-mono-50 transition-colors">
                      <TableCell className="pl-10 py-10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                            <User className="h-3 w-3" />
                            {reply.author?.full_name}
                          </div>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-mono-400 uppercase tracking-widest">
                            <ExternalLink className="h-3 w-3" />
                            IN: {reply.thread?.title}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xl p-6 bg-mono-50 border-2 border-black/5 rounded-none">
                          <p className="text-xs font-bold leading-relaxed">{reply.body}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <div className="flex justify-end gap-4">
                          {/* Note: Actions below require client-side handling or Server Actions */}
                          <Button className="h-12 px-6 bg-black text-white rounded-none font-black uppercase tracking-widest text-[9px] border-2 border-black hover:bg-mono-800">
                            DISMISS
                          </Button>
                          <Button variant="outline" className="h-12 px-6 border-2 border-black rounded-none font-black uppercase tracking-widest text-[9px] hover:bg-black hover:text-white">
                            PURGE
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="threads" className="space-y-12 mt-0">
          <div className="border-[4px] border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black border-none">
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 pl-10">Thread Identity</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Engagement</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 text-right pr-10">Protocols</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {threads.map((thread: ForumThreadWithAuthor) => (
                  <TableRow key={thread.id} className="border-b-2 border-black/5 last:border-none hover:bg-mono-50 transition-colors">
                    <TableCell className="pl-10 py-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          {thread.is_pinned && <Pin className="h-3 w-3 text-black fill-black" />}
                          {thread.is_locked && <Lock className="h-3 w-3 text-black" />}
                          <p className="text-sm font-black uppercase tracking-tight truncate">{thread.title}</p>
                        </div>
                        <p className="text-[9px] font-bold text-mono-400 uppercase tracking-widest">BY: {thread.author?.full_name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-[10px] font-black uppercase tracking-widest">
                        {new Date(thread.created_at).toLocaleDateString('en-GB')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className={`h-12 w-12 border-2 border-black rounded-none ${thread.is_pinned ? 'bg-black text-white' : ''}`}>
                          <Pin className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className={`h-12 w-12 border-2 border-black rounded-none ${thread.is_locked ? 'bg-black text-white' : ''}`}>
                          {thread.is_locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-12 w-12 border-2 border-black rounded-none text-black">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="p-8 border-4 border-black bg-black text-white rounded-none flex flex-col justify-center space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">MODERATION MANDATE</h4>
          <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-mono-400">
            ADMINS ARE TASKED WITH MAINTAINING PROFESSIONAL ETIQUETTE. FLAG DISMISSALS ARE LOGGED TO THE EXECUTIVE COMMITTEE AUDIT TRAIL.
          </p>
        </div>
        <div className="p-8 border-4 border-black border-dashed rounded-none flex flex-col justify-center space-y-4 bg-mono-50 col-span-2">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">SOFT DELETE POLICY</h4>
          <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-mono-500">
            PURGED CONTENT IS RETAINED IN THE RECOVERY BUFFER FOR 30 DAYS BEFORE PERMANENT ERASURE FROM DATABASE NODES.
          </p>
        </div>
      </div>
    </div>
  );
}
