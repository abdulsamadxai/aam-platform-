"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  MessageSquare,
  Share2,
  Loader2,
  ArrowRight
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { saveForumReply } from "@/lib/mock-data";

interface ThreadAuthor {
  id?: string;
  full_name: string;
  profile_photo_url?: string;
}

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  created_at: string;
  author?: ThreadAuthor;
}

interface Reply {
  id: string;
  thread_id?: string;
  body: string;
  created_at: string;
  author_id?: string;
  author?: ThreadAuthor;
}

interface ThreadViewProps {
  initialThread: Thread;
  initialReplies: Reply[];
  currentUser: { id: string; user_metadata?: { full_name: string } };
}

export function ThreadView({ initialThread, initialReplies, currentUser }: ThreadViewProps) {
  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sanitize = (content: string) => {
    return DOMPurify.sanitize(content);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setSubmitting(true);

    const reply = {
      id: `rep-${Date.now()}`,
      thread_id: initialThread.id,
      body: newReply,
      author_id: currentUser.id,
      created_at: new Date().toISOString(),
    } as any;

    saveForumReply(reply);

    const uiReply = {
      ...reply,
      author: { full_name: currentUser?.user_metadata?.full_name || "Member" }
    };

    setReplies(current => [...current, uiReply]);
    setNewReply("");
    setSubmitting(false);
  };

  return (
    <div className="space-y-12">
      <Card className="border-2 border-white/20 rounded-none shadow-none overflow-hidden bg-transparent">
        <CardHeader className="p-8 md:p-10 border-b border-white/20 bg-white/5">
          <div className="flex items-center gap-6 mb-4">
            <Badge className="bg-white text-black rounded-none uppercase tracking-widest text-[9px] font-bold border-none px-3 py-1">
              {initialThread.category}
            </Badge>
            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              Posted: {new Date(initialThread.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <CardTitle className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
            {initialThread.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 md:p-10 space-y-10">
          <div
            className="prose prose-invert max-w-none text-white font-medium text-lg leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: sanitize(initialThread.body) }}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-white/20 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-white text-black flex items-center justify-center font-bold overflow-hidden rounded-none">
                {initialThread.author?.full_name?.charAt(0) || "M"}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white">{initialThread.author?.full_name || "Member"}</p>
                <p className="text-[9px] text-neutral-400 uppercase font-medium tracking-widest">AAM Member</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-white hover:text-white hover:bg-white/10 rounded-none">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <div className="flex items-center gap-4 border-b-2 border-white/20 pb-2">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Replies</h2>
          <span className="bg-white text-black font-bold px-2 py-0.5 text-[10px] uppercase tracking-widest">
            {replies.length}
          </span>
        </div>

        <div className="space-y-6">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-4 group">
              <div className="h-10 w-10 bg-white border border-white/20 flex items-center justify-center text-black font-bold shrink-0 self-start">
                {reply.author?.full_name?.charAt(0) || "M"}
              </div>
              <Card className="flex-grow border border-white/20 rounded-none shadow-none bg-transparent hover:border-white/40 transition-all overflow-hidden">
                <CardHeader className="p-4 border-b border-white/20 flex flex-row items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{reply.author?.full_name || "Member"}</span>
                    <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest">
                      • {new Date(reply.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className="text-sm md:text-base text-white font-medium leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: sanitize(reply.body) }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}

          {replies.length === 0 && (
            <div className="py-16 text-center border-2 border-white/20 border-dashed rounded-none bg-transparent space-y-4">
              <MessageSquare className="h-12 w-12 text-white/20 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">No replies yet. Be the first to join the discussion.</p>
            </div>
          )}
        </div>

        <div className="pt-8">
          <Card className="border-2 border-white/20 rounded-none shadow-none overflow-hidden bg-transparent">
            <CardHeader className="bg-white/5 text-white p-4 border-b border-white/20">
              <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-white" />
                Post a Reply
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmitReply}>
                <Textarea
                  placeholder="Share your professional insights..."
                  className="border-none rounded-none focus-visible:ring-0 min-h-[150px] p-6 text-sm font-medium resize-none bg-transparent text-white placeholder:text-neutral-500"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <div className="p-6 bg-white/5 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[9px] font-medium uppercase tracking-widest text-neutral-400 max-w-sm leading-relaxed text-center md:text-left">
                    Please ensure your contribution is professional and constructive.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting || !newReply.trim()}
                    className="h-12 px-8 bg-white text-black hover:bg-neutral-200 rounded-none font-bold uppercase tracking-widest text-[10px] transition-all group min-w-[160px]"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                    ) : (
                      <>
                        Post Reply
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
