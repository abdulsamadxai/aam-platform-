"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/api";
import { format } from "date-fns";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { EventForm } from "@/components/admin/forms/EventForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import type { Event } from "@/types";

export default function EventsPage() {
    const { isEditMode } = useAdmin();
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
    const [isAddingEvent, setIsAddingEvent] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        try {
            const data = await getAllEvents();
            const now = new Date();
            setUpcomingEvents(data.filter(e => new Date(e.start_at) >= now));
            setPastEvents(data.filter(e => new Date(e.start_at) < now).sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime()));
        } catch (error) {
            toast.error("Failed to fetch events");
        } finally {
            setLoading(false);
        }
    }

    const handleEventSubmit = async (data: any) => {
        try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();
            
            if (isAddingEvent) {
                await supabase.from('events').insert([{ ...data, is_published: true }]);
                toast.success("Event created");
            } else if (editingEvent) {
                await supabase.from('events').update(data).eq('id', editingEvent.id);
                toast.success("Event updated");
            }
            
            setIsAddingEvent(false);
            setEditingEvent(null);
            fetchEvents();
        } catch (error) {
            toast.error("Operation failed");
        }
    };

    return (
        <main className="min-h-screen bg-black">
            <div className="relative">
                <PageHeader
                    title="Events & CPD"
                    subtitle="Professional development events, seminars, and architecture community gatherings."
                />
                {isEditMode && (
                    <div className="absolute bottom-10 right-10 z-30">
                        <button
                            onClick={() => setIsAddingEvent(true)}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
                        >
                            <Plus className="w-4 h-4" /> Add New Event
                        </button>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center py-48">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                </div>
            ) : (
                <>
                    {/* Upcoming */}
                    <section className="py-24 bg-black">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-16 uppercase tracking-[0.2em] text-white">Upcoming Events</h2>
                            <div className="space-y-8">
                                {upcomingEvents.map((event) => (
                                    <EditableBlock
                                        key={event.id}
                                        label="Event"
                                        onEdit={() => setEditingEvent(event)}
                                        onDelete={() => setDeletingEvent(event)}
                                    >
                                        <div className="flex flex-col md:flex-row gap-12 p-10 bg-aam-near-black border border-white/5 hover:border-white/20 transition-all text-white">
                                            <div className="flex flex-col items-center justify-center p-6 bg-black border border-white/10 text-white min-w-[120px] h-32">
                                                <span className="text-sm font-bold tracking-widest uppercase">{format(new Date(event.start_at), 'MMM')}</span>
                                                <span className="text-4xl font-black">{format(new Date(event.start_at), 'dd')}</span>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Date: {format(new Date(event.start_at), 'MMMM dd, yyyy')}</div>
                                                <h3 className="text-2xl font-bold uppercase tracking-tight">{event.title}</h3>
                                                <div className="text-sm text-aam-grey font-medium uppercase tracking-widest">{event.location}</div>
                                                <p className="text-aam-grey font-light max-w-2xl leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <Link href={`/events/${event.id}`}>
                                                    <Button className="btn-primary w-full md:w-auto">Details</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </EditableBlock>
                                ))}
                                {upcomingEvents.length === 0 && (
                                    <p className="text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No upcoming events at this time.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Past */}
                    <section className="py-24 bg-black border-t border-white/10">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl font-bold mb-16 uppercase tracking-[0.2em] text-aam-dark-grey">Past Events</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pastEvents.map((event) => (
                                    <EditableBlock
                                        key={event.id}
                                        label="Past Event"
                                        onEdit={() => setEditingEvent(event)}
                                        onDelete={() => setDeletingEvent(event)}
                                    >
                                        <Link href={`/events/${event.id}`}>
                                            <div className="p-8 border border-white/5 bg-black opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all text-white h-full">
                                                <div className="text-[10px] text-aam-dark-grey font-bold uppercase tracking-widest mb-3">Past Event</div>
                                                <h4 className="text-lg font-bold mb-2 uppercase tracking-wide">{event.title}</h4>
                                                <div className="text-xs text-aam-grey mb-4">{format(new Date(event.start_at), 'MMM dd, yyyy')} | {event.location}</div>
                                            </div>
                                        </Link>
                                    </EditableBlock>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Modals */}
            <EditModal
                open={!!editingEvent || isAddingEvent}
                onClose={() => { setEditingEvent(null); setIsAddingEvent(false); }}
                title={isAddingEvent ? "Add Event" : "Edit Event"}
            >
                <EventForm
                    initialData={editingEvent || undefined}
                    onCancel={() => { setEditingEvent(null); setIsAddingEvent(false); }}
                    onSubmit={handleEventSubmit}
                />
            </EditModal>

            <ConfirmDelete
                open={!!deletingEvent}
                itemName={deletingEvent?.title || ""}
                onClose={() => setDeletingEvent(null)}
                onConfirm={async () => {
                    try {
                        const { createClient } = await import('@/lib/supabase/client');
                        const supabase = createClient();
                        await supabase.from('events').update({ deleted_at: new Date().toISOString() }).eq('id', deletingEvent?.id);
                        setDeletingEvent(null);
                        toast.success("Event deleted");
                        fetchEvents();
                    } catch (error) {
                        toast.error("Failed to delete event");
                    }
                }}
            />
        </main>
    );
}
