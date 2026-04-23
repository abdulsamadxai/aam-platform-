"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPublishedNews, getUpcomingEvents, getMemberStats, MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { format } from "date-fns";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { HeroForm } from "@/components/admin/forms/HeroForm";
import { NewsPostForm } from "@/components/admin/forms/NewsPostForm";
import { EventForm } from "@/components/admin/forms/EventForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function HomePage() {
  const { isEditMode } = useAdmin();
  const [heroData, setHeroData] = useState({
    headline: MOCK_SITE_SETTINGS.hero_headline,
    subheadline: MOCK_SITE_SETTINGS.hero_subheadline,
    cta_primary_label: MOCK_SITE_SETTINGS.hero_cta_primary_label,
    cta_primary_url: MOCK_SITE_SETTINGS.hero_cta_primary_url,
    cta_secondary_label: MOCK_SITE_SETTINGS.hero_cta_secondary_label,
    cta_secondary_url: MOCK_SITE_SETTINGS.hero_cta_secondary_url,
  });

  const [news, setNews] = useState(() => getPublishedNews(3));
  const [events, setEvents] = useState(() => getUpcomingEvents(2));
  const stats = getMemberStats();

  // Modal states
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [deletingNews, setDeletingNews] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [deletingEvent, setDeletingEvent] = useState<any>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale contrast-125 opacity-40 blur-[2px]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 z-10 hero-overlay" />

        <div className="container relative z-20 px-6 text-center max-w-5xl">
          <EditableBlock
            label="Hero Content"
            onEdit={() => setIsHeroModalOpen(true)}
          >
            <h1 className="text-[clamp(48px,8vw,72px)] font-bold leading-[1.1] tracking-tight mb-8">
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
          onSubmit={(data) => {
            setHeroData(data);
            setIsHeroModalOpen(false);
            toast.success("Hero section updated");
          }}
        />
      </EditModal>

      <EditModal
        open={!!editingNews || isAddingNews}
        onClose={() => { setEditingNews(null); setIsAddingNews(false); }}
        title={isAddingNews ? "Add News Post" : "Edit News Post"}
      >
        <NewsPostForm
          initialData={editingNews || {}}
          onCancel={() => { setEditingNews(null); setIsAddingNews(false); }}
          onSubmit={(data) => {
            if (isAddingNews) {
              setNews(prev => [{ ...data, id: Date.now().toString() } as any, ...prev]);
              setIsAddingNews(false);
              toast.success("News post created");
            } else {
              setNews(prev => prev.map(item => item.id === editingNews.id ? { ...item, ...data } : item));
              setEditingNews(null);
              toast.success("News post updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingNews}
        itemName={deletingNews?.title || ""}
        onClose={() => setDeletingNews(null)}
        onConfirm={() => {
          setNews(prev => prev.filter(item => item.id !== deletingNews.id));
          setDeletingNews(null);
          toast.success("News post deleted");
        }}
      />

      <EditModal
        open={!!editingEvent || isAddingEvent}
        onClose={() => { setEditingEvent(null); setIsAddingEvent(false); }}
        title={isAddingEvent ? "Add Event" : "Edit Event"}
      >
        <EventForm
          initialData={editingEvent || {}}
          onCancel={() => { setEditingEvent(null); setIsAddingEvent(false); }}
          onSubmit={(data) => {
            if (isAddingEvent) {
              setEvents(prev => [{ ...data, id: Date.now().toString() } as any, ...prev]);
              setIsAddingEvent(false);
              toast.success("Event created");
            } else {
              setEvents(prev => prev.map(item => item.id === editingEvent.id ? { ...item, ...data } : item));
              setEditingEvent(null);
              toast.success("Event updated");
            }
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingEvent}
        itemName={deletingEvent?.title || ""}
        onClose={() => setDeletingEvent(null)}
        onConfirm={() => {
          setEvents(prev => prev.filter(item => item.id !== deletingEvent.id));
          setDeletingEvent(null);
          toast.success("Event deleted");
        }}
      />
    </main>
  );
}
