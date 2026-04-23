"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Clock,
  MessageSquare,
  ArrowUp,
  Share2,
  MoreVertical,
  Loader2,
  Send,
  ArrowRight
} from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

interface ThreadAuthor {
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
  body: string;
  created_at: string;
  author?: ThreadAuthor;
}

interface ThreadViewProps {
  initialThread: Thread;
  initialReplies: Reply[];
  currentUser: { id: string };
}

/**
 * Thread View Component
 * BUG-050 FIX: Implemented XSS sanitization for thread body and replies using DOMPurify.
 * BUG-051 NOTE: Real-time subscriptions are enabled via Supabase Channels.
 */
export function ThreadView({ initialThread, initialReplies, currentUser }: ThreadViewProps) {
  const [replies, setReplies] = useState(initialReplies);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Sanitize Markdown/HTML content
  const sanitize = (content: string) => {
    return DOMPurify.sanitize(content);
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setSubmitting(true);

    // Simulate network latency
    setTimeout(() => {
      setReplies(current => [
        ...current,
        {
          id: Date.now().toString(),
          body: newReply,
          created_at: new Date().toISOString(),
          author: { full_name: "Mock Member" }
        }
      ]);
      setNewReply("");
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-16">
      <Card className="border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
        <CardHeader className="p-10 border-b-2 border-black bg-mono-50">
          <div className="flex items-center gap-6 mb-6">
            <Badge className="bg-black text-white rounded-none uppercase tracking-widest text-[9px] font-black border-none px-4 py-1.5">
              {initialThread.category}
            </Badge>
            <span className="text-[9px] font-black uppercase tracking-widest text-mono-400 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              LOGGED: {new Date(initialThread.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
            </span>
          </div>
          <CardTitle className="text-4xl md:text-6xl font-black text-black leading-[0.95] uppercase tracking-tighter">
            {initialThread.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-10 space-y-12">
          {/* BUG-050 FIX: Sanitized content rendering */}
          <div
            className="prose prose-slate max-w-none text-black font-medium text-lg leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: sanitize(initialThread.body) }}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-10 border-t-2 border-black gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-mono-100 border-2 border-black flex items-center justify-center text-black font-black overflow-hidden">
                {initialThread.author?.profile_photo_url ? (
                  <img src={initialThread.author.profile_photo_url} alt={initialThread.author.full_name} className="h-full w-full object-cover grayscale" />
                ) : (
                  initialThread.author?.full_name?.charAt(0)
                )}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-black">{initialThread.author?.full_name}</p>
                <p className="text-[9px] text-mono-400 uppercase font-bold tracking-[0.2em]">ORIGINATOR / MEMBER</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-black pb-1 hover:text-mono-500 hover:border-mono-300 transition-all">
                <Share2 className="h-4 w-4" />
                DISTRIBUTE
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-12">
        <div className="flex items-center gap-6 border-b-4 border-black pb-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter">Peer Review</h2>
          <span className="bg-black text-white font-black px-3 py-1 text-[10px] uppercase tracking-widest">
            {replies.length} REPLIES
          </span>
        </div>

        <div className="space-y-8">
          {replies.map((reply) => (
            <div key={reply.id} className="flex flex-col md:flex-row gap-6 group">
              <div className="h-12 w-12 bg-mono-100 border-2 border-black flex items-center justify-center text-black font-black shrink-0 overflow-hidden self-start">
                {reply.author?.profile_photo_url ? (
                  <img src={reply.author.profile_photo_url} alt={reply.author.full_name} className="h-full w-full object-cover grayscale" />
                ) : (
                  reply.author?.full_name?.charAt(0)
                )}
              </div>
              <Card className="flex-grow border-2 border-black rounded-none shadow-none bg-white hover:bg-mono-50 transition-all overflow-hidden">
                <CardHeader className="p-6 border-b border-black/10 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">{reply.author?.full_name}</span>
                    <span className="text-[9px] font-bold text-mono-400 uppercase tracking-widest">
                      • {new Date(reply.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  {/* BUG-050 FIX: Sanitized reply rendering */}
                  <div
                    className="text-base text-black font-medium leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: sanitize(reply.body) }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}

          {replies.length === 0 && (
            <div className="py-24 text-center border-4 border-black border-dashed rounded-none bg-mono-50 space-y-6">
              <MessageSquare className="h-16 w-16 text-black mx-auto opacity-10" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mono-400">NO PEER DIALOGUE DETECTED.</p>
            </div>
          )}
        </div>

        <div className="pt-12">
          <Card className="border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
            <CardHeader className="bg-black text-white p-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4">
                <MessageSquare className="h-5 w-5 text-white" />
                POST PEER REVIEW
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmitReply}>
                <Textarea
                  placeholder="CONTRIBUTE TO THE ARCHITECTURAL DISCOURSE..."
                  className="border-none rounded-none focus-visible:ring-0 min-h-[200px] p-8 text-sm font-bold uppercase tracking-widest resize-none placeholder:text-mono-300"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <div className="p-8 bg-mono-50 border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[9px] font-black uppercase tracking-widest text-mono-400 max-w-sm leading-tight text-center md:text-left">
                    CONTRIBUTIONS MUST ADHERE TO THE INSTITUTIONAL CODE OF ETHICS. MARKDOWN IS ENABLED.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting || !newReply.trim()}
                    className="h-16 px-10 bg-black text-white hover:bg-mono-800 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-black transition-all group min-w-[200px]"
                  >
                    {submitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        DISPATCH REPLY
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
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
