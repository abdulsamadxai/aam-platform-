"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Smartphone, Send, History, CheckCircle2 } from "lucide-react";
import { getAllBroadcasts } from "@/lib/api";
import { Broadcast } from "@/types";

export default function AdminBroadcast() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [history, setHistory] = useState<Broadcast[]>([]);

    useEffect(() => {
        async function fetchHistory() {
            const data = await getAllBroadcasts();
            setHistory(data.slice(0, 5));
        }
        fetchHistory();
    }, []);

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }, 2000);
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header>
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Broadcast System</h1>
                <p className="text-black/40 uppercase tracking-widest text-xs font-medium">Transmit institutional intelligence to the global member network.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <form className="bg-white p-12 border border-black/5 space-y-10" onSubmit={handleBroadcast}>
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold uppercase tracking-widest border-b border-black/10 pb-4">Dispatch Parameters</h2>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Broadcast Channels</Label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded-none border-black/20 bg-white" defaultChecked />
                                        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-black transition-colors flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5" /> Email
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded-none border-black/20 bg-white" />
                                        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-black transition-colors flex items-center gap-2">
                                            <Smartphone className="w-3.5 h-3.5" /> SMS (Urgent)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Target Audience</Label>
                                <select className="w-full bg-white border border-black/10 rounded-none h-14 px-6 text-xs font-bold uppercase tracking-widest outline-none focus:border-black transition-all">
                                    <option>All Registered Members (Default)</option>
                                    <option>Fellows & Professional Members</option>
                                    <option>Student & Graduate Members</option>
                                    <option>Registered Firms Only</option>
                                    <option>Executive Committee</option>
                                </select>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Subject / Heading</Label>
                                <Input className="bg-white border-black/10 rounded-none h-14" placeholder="Institutional Announcement Regarding..." />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Communication Payload</Label>
                                <Textarea className="bg-white border-black/10 rounded-none min-h-[240px] resize-none" placeholder="Provide detailed institutional message..." />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-black/10 flex items-center justify-between">
                            {success ? (
                                <div className="flex items-center gap-3 text-black text-[10px] font-bold uppercase tracking-widest">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Broadcast Dispatched
                                </div>
                            ) : (
                                <p className="text-[9px] text-black/40 uppercase tracking-widest max-w-[200px]">
                                    Transmission is final. Verification nodes will log this dispatch.
                                </p>
                            )}
                            <Button disabled={submitting} type="submit" className="bg-black text-white hover:bg-black/80 min-w-[240px] h-16 rounded-none text-[10px] font-black uppercase tracking-widest">
                                {submitting ? "Transmitting..." : "Execute Broadcast"}
                                <Send className="ml-3 w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>

                <aside className="space-y-8">
                    <div className="bg-black text-white p-8 space-y-6">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                            <History className="w-5 h-5" />
                            <h3 className="text-xs font-bold uppercase tracking-widest">Recent Activity</h3>
                        </div>
                        <div className="space-y-6">
                            {history.map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-xs font-bold uppercase tracking-tight truncate">{item.subject || 'SMS Broadcast'}</div>
                                    <div className="flex justify-between text-[9px] uppercase font-bold text-white/40">
                                        <span>{new Date(item.sent_at || '').toLocaleDateString()}</span>
                                        <span>{item.sent_count} Agents</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 border border-dashed border-black/10">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4">Security Note</h3>
                        <p className="text-[10px] text-black/60 leading-relaxed">
                            SMS broadcasts incur institutional costs. Please restrict SMS usage to emergency regulatory updates or critical statutory notifications.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
