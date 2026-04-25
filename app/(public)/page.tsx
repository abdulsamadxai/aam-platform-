"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPublishedNews, getUpcomingEvents, getSiteSettings } from "@/lib/api";
import { format } from "date-fns";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { HeroForm } from "@/components/admin/forms/HeroForm";
import { NewsPostForm } from "@/components/admin/forms/NewsPostForm";
import { EventForm } from "@/components/admin/forms/EventForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import type { NewsPost, Event } from "@/types";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { fetchPlatformStats } from "@/lib/actions/stats";

export default function HomePage() {
  const { isEditMode } = useAdmin();
  const [heroData, setHeroData] = useState({
    headline: "Advancing Architectural Excellence in the Maldives",
    subheadline: "The professional association representing registered architects and town planners across the Maldivian archipelago.",
    cta_primary_label: "Register as a Member",
    cta_primary_url: "/register",
    cta_secondary_label: "Explore News",
    cta_secondary_url: "/news",
  });

  const [news, setNews] = useState<NewsPost[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({ total: 0, professional: 0 });
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [deletingNews, setDeletingNews] = useState<NewsPost | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setLoading(true);
    try {
      const safeFetch = async <T,>(fn: () => Promise<T>, fallback: T): Promise<T> => {
        try {
          return await fn();
        } catch {
          return fallback;
        }
      };

      const [newsData, eventsData, settings, statsData] = await Promise.all([
        safeFetch(() => getPublishedNews(3), []),
        safeFetch(() => getUpcomingEvents(2), []),
        safeFetch(() => getSiteSettings(), {} as Record<string, unknown>),
        safeFetch(() => fetchPlatformStats(), { totalMembers: 0, professionalMembers: 0 })
      ]);

      setNews(newsData);
      setEvents(eventsData);
      setStats({ total: statsData.totalMembers, professional: statsData.professionalMembers });

      if (settings.hero_headline) {
        setHeroData({
          headline: String(settings.hero_headline),
          subheadline: String(settings.hero_subheadline ?? ""),
          cta_primary_label: String(settings.hero_cta_primary_label ?? ""),
          cta_primary_url: String(settings.hero_cta_primary_url ?? "/register"),
          cta_secondary_label: String(settings.hero_cta_secondary_label ?? ""),
          cta_secondary_url: String(settings.hero_cta_secondary_url ?? "/news"),
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const handleHeroSubmit = async (data: typeof heroData) => {
    try {
      const supabase = createClient();
      const updates = Object.entries(data).map(([key, value]) => ({
        key,
        value: String(value),
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) throw error;

      setHeroData(data);
      setIsHeroModalOpen(false);
      toast.success("Hero section updated");
    } catch {
      toast.error("Failed to update settings. You may not have permission.");
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0 grayscale contrast-125 opacity-40 blur-[2px]">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 hero-overlay" />

        <div className="container relative z-20 px-6 text-center max-w-5xl">
          <EditableBlock
            label="Hero Content"
            onEdit={() => setIsHeroModalOpen(true)}
          >
            <h1 className="text-[clamp(32px,8vw,72px)] font-bold leading-[1.1] tracking-tight mb-8">
              {heroData.headline.split(' ').slice(0, 3).join(' ')} <br /> {heroData.headline.split(' ').slice(3).join(' ')}
            </h1>
            <p className="text-aam-grey text-lg md:text-xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              {heroData.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button className="btn-primary w-full sm:w-auto" asChild>
                <Link href={heroData.cta_primary_url}>{heroData.cta_primary_label}</Link>
              </Button>
              <Button variant="outline" className="btn-outline w-full sm:w-auto" asChild>
                <Link href={heroData.cta_secondary_url}>{heroData.cta_secondary_label}</Link>
              </Button>
            </div>
          </EditableBlock>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-black border-y border-white/10">
        <div className="container mx-auto px-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center py-12">
            <div className="px-8 py-8 md:py-4">
              <div className="text-4xl font-bold mb-2">{stats.total}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-aam-grey font-medium">Registered Members</div>
            </div>
            <div className="px-8 py-8 md:py-4">
              <div className="text-4xl font-bold mb-2">{stats.professional}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-aam-grey font-medium">Professional Members</div>
            </div>
            <div className="px-8 py-8 md:py-4">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-aam-grey font-medium">Member Categories</div>
            </div>
            <div className="px-8 py-8 md:py-4">
              <div className="text-4xl font-bold mb-2">2008</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-aam-grey font-medium">Established</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Our Mission</h2>
              <p className="text-xl text-white font-light leading-relaxed">
                AAM exists to advance the profession of architecture in the Maldives — setting standards, providing continuing education, advocating for built environment policy, and connecting architects across the island nation.
              </p>
            </div>
            <div>
              <p className="text-aam-grey leading-relaxed pt-2">
                We advocate for a built environment that is sustainable, culturally responsive, and architecturally excellent. Our professional code of ethics ensures that every AAM member practices with integrity and technical mastery, contributing to the development of the Maldives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Upcoming Events */}
      <section className="py-32 bg-black border-t border-white/10 text-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-white/20" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
              {/* News */}
              <div className="space-y-12">
                <div className="flex justify-between items-end">
                  <h2 className="text-3xl font-bold">Latest News</h2>
                  <div className="flex items-center gap-6">
                    {isEditMode && (
                      <button
                        onClick={() => setIsAddingNews(true)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-3 py-1.5 hover:bg-aam-grey transition-all"
                      >
                        <Plus className="w-3 h-3" /> Add News
                      </button>
                    )}
                    <Link href="/news" className="text-sm font-bold uppercase tracking-widest hover:underline">View All</Link>
                  </div>
                </div>
                <div className="space-y-8">
                  {news.map((item) => (
                    <EditableBlock
                      key={item.id}
                      label="News Post"
                      onEdit={() => setEditingNews(item)}
                      onDelete={() => setDeletingNews(item)}
                    >
                      <div className="group border-b border-white/5 pb-8">
                        <div className="text-xs text-aam-grey mb-3 uppercase tracking-widest">
                          {item.published_at ? format(new Date(item.published_at), 'MMMM dd, yyyy') : 'Draft'}
                        </div>
                        <h3 className="text-xl font-bold group-hover:text-aam-grey transition-colors mb-4">
                          {item.title}
                        </h3>
                        <p className="text-aam-grey text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>
                        <Link href={`/news/${item.slug}`} className="text-xs font-bold uppercase tracking-widest underline underline-offset-4">Read More</Link>
                      </div>
                    </EditableBlock>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="space-y-12">
                <div className="flex justify-between items-end">
                  <h2 className="text-3xl font-bold">Upcoming Events</h2>
                  <div className="flex items-center gap-6">
                    {isEditMode && (
                      <button
                        onClick={() => setIsAddingEvent(true)}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-3 py-1.5 hover:bg-aam-grey transition-all"
                      >
                        <Plus className="w-3 h-3" /> Add Event
                      </button>
                    )}
                    <Link href="/events" className="text-sm font-bold uppercase tracking-widest hover:underline">View All</Link>
                  </div>
                </div>
                <div className="space-y-6">
                  {events.map((event) => (
                    <EditableBlock
                      key={event.id}
                      label="Event"
                      onEdit={() => setEditingEvent(event)}
                      onDelete={() => setDeletingEvent(event)}
                    >
                      <div className="p-8 bg-black border border-white/5 hover:border-white/20 transition-all">
                        <div className="text-xs text-aam-grey mb-3 uppercase tracking-widest">
                          {format(new Date(event.start_at), 'MMMM dd, yyyy')}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="text-sm text-aam-grey">{event.location}</div>
                      </div>
                    </EditableBlock>
                  ))}
                  {events.length === 0 && (
                    <p className="text-aam-grey italic">No upcoming events scheduled.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-32 bg-black border-t border-white/10 text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-5xl font-bold mb-8">Become a Member</h2>
          <p className="text-aam-grey text-lg mb-12 leading-relaxed">
            AAM membership opens doors to professional certification, peer networks, CPD resources, and the collective voice of Maldivian architecture.
          </p>
          <Button className="btn-primary h-auto py-5 px-12" asChild>
            <Link href="/register">Apply for Membership</Link>
          </Button>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        title="Edit Hero Content"
      >
        <HeroForm
          initialData={heroData}
          onCancel={() => setIsHeroModalOpen(false)}
          onSubmit={handleHeroSubmit}
        />
      </EditModal>

      <EditModal
        open={!!editingNews || isAddingNews}
        onClose={() => { setEditingNews(null); setIsAddingNews(false); }}
        title={isAddingNews ? "Add News Post" : "Edit News Post"}
      >
        <NewsPostForm
          initialData={editingNews || undefined}
          onCancel={() => { setEditingNews(null); setIsAddingNews(false); }}
          onSubmit={async (data) => {
            const { saveNews } = await import('@/lib/api');
            if (isAddingNews) {
              await saveNews({ ...data, published_at: new Date().toISOString() });
              toast.success("News post created");
            } else if (editingNews) {
              await saveNews({ ...editingNews, ...data });
              toast.success("News post updated");
            }
            setEditingNews(null);
            setIsAddingNews(false);
            init();
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingNews}
        itemName={deletingNews?.title || ""}
        onClose={() => setDeletingNews(null)}
        onConfirm={async () => {
          const supabase = createClient();
          await supabase.from('news_posts').update({ deleted_at: new Date().toISOString() }).eq('id', deletingNews?.id);
          setDeletingNews(null);
          toast.success("News post deleted");
          init();
        }}
      />

      <EditModal
        open={!!editingEvent || isAddingEvent}
        onClose={() => { setEditingEvent(null); setIsAddingEvent(false); }}
        title={isAddingEvent ? "Add Event" : "Edit Event"}
      >
        <EventForm
          initialData={editingEvent || undefined}
          onCancel={() => { setEditingEvent(null); setIsAddingEvent(false); }}
          onSubmit={async (data) => {
            const supabase = createClient();
            if (isAddingEvent) {
              await supabase.from('events').insert([{ ...data, is_published: true }]);
              toast.success("Event created");
            } else if (editingEvent) {
              await supabase.from('events').update(data).eq('id', editingEvent.id);
              toast.success("Event updated");
            }
            setEditingEvent(null);
            setIsAddingEvent(false);
            init();
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingEvent}
        itemName={deletingEvent?.title || ""}
        onClose={() => setDeletingEvent(null)}
        onConfirm={async () => {
          const supabase = createClient();
          await supabase.from('events').update({ deleted_at: new Date().toISOString() }).eq('id', deletingEvent?.id);
          setDeletingEvent(null);
          toast.success("Event deleted");
          init();
        }}
      />
    </main>
  );
}
