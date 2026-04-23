"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { CompetitionForm } from "@/components/admin/forms/CompetitionForm";
import { useAdmin } from "@/lib/admin-context";
import { getAllCompetitions } from "@/lib/mock-data";
import { Trophy, Calendar, Users, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CompetitionsPage() {
  const { isEditMode } = useAdmin();
  const [comps, setComps] = useState(() => getAllCompetitions());

  const [editingComp, setEditingComp] = useState<any>(null);
  const [isAddingComp, setIsAddingComp] = useState(false);

  const handleUpdate = (data: any) => {
    if (isAddingComp) {
      setComps(prev => [{ ...data, id: Date.now().toString() }, ...prev]);
      setIsAddingComp(false);
      toast.success("COMPETITION_NODE_INITIALIZED");
    } else {
      setComps(prev => prev.map(c => c.id === editingComp.id ? { ...c, ...data } : c));
      setEditingComp(null);
      toast.success("COMPETITION_NODE_SYNCHRONIZED");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <PageHeader
        title="DESIGN COMPETITIONS"
        description="Official AAM-sanctioned design competitions, rules, and procedures."
      />

      <div className="container py-24 space-y-16">
        <div className="flex justify-between items-end border-b-8 border-white pb-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">ACTIVE_PROTOCOLS</h2>
          {isEditMode && (
            <button
              onClick={() => setIsAddingComp(true)}
              className="flex items-center gap-3 bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all mb-2"
            >
              <Plus className="w-4 h-4" /> INITIATE COMPETITION
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {comps.map((comp) => (
            <EditableBlock
              key={comp.id}
              label="Competition"
              onEdit={() => setEditingComp(comp)}
              onDelete={() => setComps(prev => prev.filter(c => c.id !== comp.id))}
            >
              <div className="group border-4 border-white bg-white/5 p-10 space-y-8 relative overflow-hidden transition-all hover:bg-white/10">
                <div className="flex justify-between items-start relative z-10">
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 border-2 ${comp.status === 'open' ? 'border-white bg-white text-black' : 'border-white/20 text-white/40'}`}>
                    {comp.status}
                  </span>
                  <div className="flex items-center gap-2 text-white font-black text-sm">
                    <Trophy className="h-5 w-5" />
                    <span className="tracking-tighter">{comp.prize_pool}</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none group-hover:text-mono-200 transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-mono-400 font-medium leading-tight line-clamp-3">
                    {comp.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4 relative z-10">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-mono-500">DEADLINE</p>
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Calendar className="h-4 w-4" />
                      {new Date(comp.registration_deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-mono-500">ELIGIBILITY</p>
                    <div className="flex items-center gap-3 text-sm font-bold">
                      <Users className="h-4 w-4" />
                      ARCHITECTS_AAM
                    </div>
                  </div>
                </div>

                <Link
                  href={`/competitions/${comp.slug}`}
                  className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] group/link relative z-10 pt-4"
                >
                  VIEW_SPECIFICATIONS
                  <ArrowRight className="h-4 w-4 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </EditableBlock>
          ))}
        </div>

        {/* Static Content Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-32">
          <div className="lg:col-span-2 bg-white/5 border-4 border-white/10 p-16 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-white" />
            <h3 className="text-4xl font-black uppercase tracking-tighter">PROTOCOL_GUIDELINES</h3>
            <p className="text-xl text-mono-400 font-medium leading-tight">
              AAM ensures all sanctioned competitions follow international standards for fairness,
              anonymity, and jury selection. Download our standard procedures to learn more
              about organizing or participating in competitions.
            </p>
            <div className="flex flex-wrap gap-6 pt-8">
              <button className="bg-white text-black font-black uppercase tracking-widest text-[10px] py-4 px-8 border-2 border-white hover:bg-black hover:text-white transition-all">
                RULES_PROCEDURES_PDF
              </button>
              <button className="border-2 border-white/20 text-white font-black uppercase tracking-widest text-[10px] py-4 px-8 hover:border-white transition-all">
                COST_GUIDELINES_NODE
              </button>
            </div>
          </div>

          <div className="bg-white text-black p-16 flex flex-col justify-center gap-8 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:20px_20px]" />
            <h3 className="text-3xl font-black uppercase tracking-tighter relative z-10">PAST_ARCHIVES</h3>
            <p className="font-bold uppercase text-[10px] tracking-widest leading-relaxed relative z-10">
              Explore the archives of previous competition winners and their groundbreaking designs.
            </p>
            <button className="text-[10px] font-black uppercase tracking-[0.3em] underline underline-offset-8 decoration-4 hover:opacity-70 transition-all relative z-10 text-left">
              ACCESS_DATA_STREAM
            </button>
          </div>
        </div>
      </div>

      <EditModal
        open={!!editingComp || isAddingComp}
        onClose={() => { setEditingComp(null); setIsAddingComp(false); }}
        title={isAddingComp ? "Add Competition" : "Edit Competition"}
      >
        <CompetitionForm
          initialData={editingComp || {}}
          onCancel={() => { setEditingComp(null); setIsAddingComp(false); }}
          onSubmit={handleUpdate}
        />
      </EditModal>
    </main>
  );
}
