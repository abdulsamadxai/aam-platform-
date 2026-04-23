import { Button } from "@/components/ui/button";
import { MessageSquare, User, Clock, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getAllThreads } from "@/lib/mock-data";

export default function ForumPage() {
    const threads = getAllThreads();

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-white/10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold uppercase tracking-tight">Member Forum</h1>
                    <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Professional exchange and technical discourse.</p>
                </div>
                <Button className="btn-primary" asChild>
                    <Link href="/member/forum/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Start Discussion
                    </Link>
                </Button>
            </header>

            <div className="flex flex-col lg:flex-row gap-12">
                <aside className="lg:w-64 space-y-10">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Search Forum</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-aam-grey" />
                            <Input placeholder="Keywords..." className="pl-10 bg-aam-near-black border-white/10 rounded-none h-12 text-xs uppercase tracking-widest" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-aam-grey uppercase tracking-widest">Categories</h3>
                        <div className="space-y-1">
                            <button className="w-full text-left px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest">
                                All Discussions
                            </button>
                            {['Technical', 'Regulatory', 'General', 'CPD', 'Events'].map((cat) => (
                                <button key={cat} className="w-full text-left px-4 py-2 hover:bg-white/5 text-aam-grey text-[10px] font-bold uppercase tracking-widest transition-all">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="flex-grow space-y-6">
                    {threads?.map((thread) => (
                        <Link key={thread.id} href={`/member/forum/${thread.id}`} className="block group bg-aam-near-black border border-white/5 p-8 hover:border-white/20 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <span className="px-2 py-0.5 border border-white/20 text-[9px] uppercase font-bold tracking-widest text-aam-grey">
                                        {thread.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-aam-dark-grey">
                                        <Clock className="h-3 w-3" />
                                        <span>{new Date(thread.updated_at || thread.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-aam-grey">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                    <span>{thread.reply_count || 0} Replies</span>
                                </div>
                            </div>

                            <h2 className="text-xl font-bold uppercase tracking-tight mb-6 group-hover:underline underline-offset-8">
                                {thread.title}
                            </h2>

                            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                <div className="w-6 h-6 bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                                    <User className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">MEMBER</span>
                            </div>
                        </Link>
                    ))}

                    {(!threads || threads.length === 0) && (
                        <div className="py-20 text-center border border-dashed border-white/10">
                            <p className="text-aam-grey uppercase tracking-widest text-xs">No discussions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={className}>{children}</span>
);
