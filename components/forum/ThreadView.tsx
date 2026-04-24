"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User, Clock, MessageSquare, Send } from "lucide-react";
import Image from "next/image";

import { ForumThread, ForumReply } from "@/types/forum";
import { Member } from "@/types";

interface ThreadViewProps {
    thread: ForumThread;
    replies: ForumReply[];
    user: Member | null;
}

export function ThreadView({ thread, replies: initialReplies, user }: ThreadViewProps) {
    const [replies, setReplies] = useState(initialReplies);
    const [newReply, setNewReply] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const supabase = createClient();

    const handlePostReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        setSubmitting(true);
        try {
            const { data, error } = await supabase
                .from("forum_replies")
                .insert([{
                    thread_id: thread.id,
                    author_id: user?.id || "",
                    body: newReply,
                }])
                .select("*, author:members(full_name, avatar_url)")
                .single();

            if (error) throw error;

            const posted = (data ?? {
                id: `local-${Date.now()}`,
                thread_id: thread.id,
                author_id: user?.id,
                body: newReply,
                upvotes: 0,
                is_flagged: false,
                author: { full_name: user?.full_name ?? "You", profile_photo_url: undefined },
                created_at: new Date().toISOString(),
            }) as unknown as ForumReply;
            setReplies([...replies, posted]);
            setNewReply("");

            // Update thread last_reply_at
            await supabase
                .from("forum_threads")
                .update({ last_reply_at: new Date().toISOString() })
                .eq("id", thread.id);

        } catch (err) {
            console.error(err);
            alert("Failed to post reply.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Main Post */}
            <article className="bg-aam-near-black border border-white/10 p-10 space-y-8">
                <header className="space-y-4">
                    <div className="flex items-center gap-6">
                        <span className="px-3 py-1 bg-white text-black text-[9px] font-bold uppercase tracking-widest">
                            {thread.category}
                        </span>
                        <span className="text-[9px] uppercase font-medium tracking-widest text-aam-grey">
                            {new Date(thread.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
                        {thread.title}
                    </h1>
                </header>

                <div className="text-aam-grey text-lg font-light leading-relaxed whitespace-pre-wrap">
                    {thread.body}
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center">
                        {thread.author?.profile_photo_url ? (
                            <Image src={thread.author.profile_photo_url} width={40} height={40} className="w-full h-full object-cover" alt="" />
                        ) : (
                            <User className="w-5 h-5 text-aam-dark-grey" />
                        )}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-widest">
                        <span className="text-aam-grey block font-normal">Posted by</span>
                        <span>{thread.author?.full_name}</span>
                    </div>
                </div>
            </article>

            {/* Replies */}
            <div className="space-y-8 pl-0 md:pl-12">
                <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-4">
                    Replies
                    <span className="text-xs bg-white/5 px-2 py-0.5 text-aam-grey">{replies.length}</span>
                </h2>

                <div className="space-y-6">
                    {replies.map((reply) => (
                        <div key={reply.id} className="bg-black border border-white/5 p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-aam-near-black border border-white/10 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                                        {reply.author?.profile_photo_url ? (
                                            <Image src={reply.author.profile_photo_url} width={24} height={24} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <User className="w-3.5 h-3.5" />
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{reply.author?.full_name}</span>
                                </div>
                                <span className="text-[9px] uppercase tracking-widest text-aam-dark-grey">{new Date(reply.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="text-aam-grey leading-relaxed whitespace-pre-wrap text-sm">
                                {reply.body}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply Box */}
                <div className="pt-12">
                    <form onSubmit={handlePostReply} className="space-y-6 bg-aam-near-black p-8 border border-white/10">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Post Professional Response</h3>
                        <Textarea
                            value={newReply}
                            onChange={e => setNewReply(e.target.value)}
                            placeholder="Contribute to this discussion..."
                            className="bg-black border-white/5 min-h-[160px] rounded-none focus:border-white transition-all resize-none"
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-[9px] text-aam-dark-grey uppercase tracking-widest italic max-w-xs">
                                Ensure your reply adheres to AAM Professional Standards and remains technical in nature.
                            </p>
                            <Button disabled={submitting || !newReply.trim()} type="submit" className="btn-primary">
                                {submitting ? "Posting..." : "Post Reply"}
                                <Send className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
