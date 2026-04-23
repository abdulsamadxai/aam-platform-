import { getEventById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventPageProps) {
    const { id } = await params;
    const event = getEventById(id);

    if (!event) {
        notFound();
    }

    const startDate = new Date(event.start_at);

    return (
        <main className="min-h-screen bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <Link href="/events" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <header className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-aam-grey">Institutional Event</span>
                                <span className="text-[10px] uppercase tracking-widest text-aam-dark-grey">{startDate.getFullYear()} Archive</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none">{event.title}</h1>
                            <p className="text-xl text-aam-grey font-light leading-relaxed max-w-2xl">
                                {event.description?.split('\n')[0]}
                            </p>
                        </header>

                        {event.cover_image_url && (
                            <div className="aspect-[21/9] bg-aam-near-black border border-white/10 overflow-hidden">
                                <img src={event.cover_image_url} alt="" className="w-full h-full object-cover grayscale opacity-60" />
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-p:text-aam-grey prose-p:leading-relaxed whitespace-pre-wrap pt-8">
                            {event.description}
                        </div>
                    </div>

                    <aside className="space-y-12">
                        <div className="bg-white text-black p-10 space-y-10">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black/10 pb-4">Schedule & Venue</h3>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                        <Calendar className="w-4 h-4" /> Date
                                    </div>
                                    <div className="text-lg font-bold uppercase tracking-tight">
                                        {startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                        <Clock className="w-4 h-4" /> Time
                                    </div>
                                    <div className="text-lg font-bold uppercase tracking-tight">
                                        {startDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-40">
                                        <MapPin className="w-4 h-4" /> Venue
                                    </div>
                                    <div className="text-lg font-bold uppercase tracking-tight">
                                        {event.location || "TO BE ANNOUNCED"}
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full bg-black text-white hover:bg-aam-near-black h-14 rounded-none text-[10px] font-bold uppercase tracking-widest">
                                Register Interest
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className="flex justify-between items-center px-6 py-4 border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-aam-grey hover:text-white">
                                Share Event <Share2 className="w-4 h-4" />
                            </button>
                            <button className="flex justify-between items-center px-6 py-4 border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-aam-grey hover:text-white">
                                Print Program <Printer className="w-4 h-4" />
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
