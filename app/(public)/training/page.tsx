"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { EditableBlock } from "@/components/admin/EditableBlock";
import { EditModal } from "@/components/admin/EditModal";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { TrainingForm } from "@/components/admin/forms/TrainingForm";
import { ContentBlockForm } from "@/components/admin/forms/ContentBlockForm";
import { useAdmin } from "@/lib/admin-context";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { TrainingProgramme, TrainingRegistration } from "@/types";
import { getAllTraining, saveTrainingRegistration } from "@/lib/mock-data";
import { X, CheckCircle2, User, Mail, Phone, Building2, FileText } from "lucide-react";

export default function TrainingPage() {
  const { isEditMode } = useAdmin();
  const [programmes, setProgrammes] = useState<TrainingProgramme[]>(() => getAllTraining());
  const [cpdSection, setCpdSection] = useState({
    title: "CPD Framework",
    body: "AAM requires all Professional Members to complete a minimum of 20 CPD hours per calendar year. CPD activities ensure that our members maintain the technical expertise and ethical standards required for modern architectural practice."
  });

  // Modal states
  const [editingProg, setEditingProg] = useState<any>(null);
  const [deletingProg, setDeletingProg] = useState<any>(null);
  const [isAddingProg, setIsAddingProg] = useState(false);
  const [editingCpd, setEditingCpd] = useState(false);

  // Registration modal states
  const [registeringForProg, setRegisteringForProg] = useState<TrainingProgramme | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [regForm, setRegForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [submittingReg, setSubmittingReg] = useState(false);

  function openRegister(prog: TrainingProgramme) {
    setRegisteringForProg(prog);
    setSubmitted(false);
    setRegForm({
      full_name: "",
      email: "",
      phone: "",
      company: "",
      notes: "",
    });
    setRegErrors({});
  }

  function closeRegister() {
    setRegisteringForProg(null);
    setSubmitted(false);
  }

  function validateReg() {
    const errors: Record<string, string> = {};
    if (!regForm.full_name.trim()) errors.full_name = "Full name is required.";
    if (!regForm.email.trim() || !/\S+@\S+\.\S+/.test(regForm.email)) errors.email = "Valid email is required.";
    if (!regForm.phone.trim()) errors.phone = "Phone number is required.";
    return errors;
  }

  function handleRegSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateReg();
    if (Object.keys(errors).length > 0) {
      setRegErrors(errors);
      return;
    }
    setSubmittingReg(true);
    setTimeout(() => {
      const registration: TrainingRegistration = {
        id: `tr-${Date.now()}`,
        training_id: registeringForProg!.id,
        training_title: registeringForProg!.title,
        ...regForm,
        status: "new",
        applied_at: new Date().toISOString(),
      };
      saveTrainingRegistration(registration);
      setSubmittingReg(false);
      setSubmitted(true);
      toast.success("Interest registered successfully");
    }, 800);
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        <PageHeader
          title="Training & CPD"
          subtitle="Continuing Professional Development programmes for AAM members."
        />
        {isEditMode && (
          <div className="absolute bottom-10 right-10 z-30">
            <button
              onClick={() => setIsAddingProg(true)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black px-6 py-3 hover:bg-aam-grey transition-all shadow-xl"
            >
              <Plus className="w-4 h-4" /> Add Programme
            </button>
          </div>
        )}
      </div>

      {/* CPD Framework */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl text-white">
          <EditableBlock label="Content Block" onEdit={() => setEditingCpd(true)}>
            <h2 className="text-3xl font-bold mb-10 uppercase tracking-[0.2em]">{cpdSection.title}</h2>
            <div className="bg-black p-12 border border-white/5 space-y-8">
              <p className="text-lg text-aam-grey leading-relaxed font-light">
                {cpdSection.body}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { cat: "Category A", desc: "AAM-organised workshops and seminars." },
                  { cat: "Category B", desc: "External recognized courses and conferences." },
                  { cat: "Category C", desc: "Self-directed learning and technical reading." },
                  { cat: "Category D", desc: "Mentoring and professional contributions." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white">{item.cat}</h4>
                    <p className="text-xs text-aam-grey">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest italic pt-6">
                Members must submit CPD records annually through the Member Area.
              </p>
            </div>
          </EditableBlock>
        </div>
      </section>

      {/* Upcoming Programmes */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="container mx-auto px-6 text-white">
          <h2 className="text-3xl font-bold mb-16 uppercase tracking-[0.2em]">Upcoming Programmes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {programmes.map((prog: TrainingProgramme) => (
              <EditableBlock
                key={prog.id}
                label="Programme"
                onEdit={() => setEditingProg(prog)}
                onDelete={() => setDeletingProg(prog)}
              >
                <div className="p-12 bg-black border border-white/5 h-full space-y-6 flex flex-col justify-between hover:border-white transition-all">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Program</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/20 px-3 py-1">{prog.is_published ? 'Published' : 'Draft'}</span>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight">{prog.title}</h3>
                    <p className="text-sm text-aam-grey leading-relaxed font-light">{prog.description}</p>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey mt-4">Schedule: {prog.schedule_text}</div>
                  </div>
                  <Button 
                    className="btn-primary w-full mt-8"
                    onClick={() => openRegister(prog)}
                  >
                    Register Interest
                  </Button>
                </div>
              </EditableBlock>
            ))}
            {programmes.length === 0 && (
              <p className="col-span-full text-aam-grey italic py-10 border-y border-white/5 uppercase tracking-widest text-center">No upcoming programmes.</p>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditModal
        open={!!editingProg || isAddingProg}
        onClose={() => { setEditingProg(null); setIsAddingProg(false); }}
        title={isAddingProg ? "Add Training Programme" : "Edit Training Programme"}
      >
        <TrainingForm
          initialData={editingProg || {}}
          onCancel={() => { setEditingProg(null); setIsAddingProg(false); }}
          onSubmit={(data) => {
            if (isAddingProg) {
              setProgrammes((prev: TrainingProgramme[]) => [{ ...data, id: Date.now().toString(), is_published: true, created_at: new Date().toISOString() } as TrainingProgramme, ...prev]);
              setIsAddingProg(false);
              toast.success("Programme created");
            } else {
              setProgrammes((prev: TrainingProgramme[]) => prev.map((item: TrainingProgramme) => item.id === editingProg.id ? { ...item, ...data } : item));
              setEditingProg(null);
              toast.success("Programme updated");
            }
          }}
        />
      </EditModal>

      <EditModal
        open={editingCpd}
        onClose={() => setEditingCpd(false)}
        title="Edit Content"
      >
        <ContentBlockForm
          initialData={{ heading: cpdSection.title, body: cpdSection.body }}
          onCancel={() => setEditingCpd(false)}
          onSubmit={(data) => {
            setCpdSection({ title: data.heading, body: data.body });
            setEditingCpd(false);
            toast.success("Content updated");
          }}
        />
      </EditModal>

      <ConfirmDelete
        open={!!deletingProg}
        itemName={deletingProg?.title || ""}
        onClose={() => setDeletingProg(null)}
        onConfirm={() => {
          setProgrammes((prev: TrainingProgramme[]) => prev.filter((item: TrainingProgramme) => item.id !== deletingProg.id));
          setDeletingProg(null);
          toast.success("Programme deleted");
        }}
      />

      {/* Register Interest Modal */}
      {registeringForProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="sticky top-0 z-10 bg-[#0d0d0d] border-b border-white/10 px-8 py-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Registration</div>
                <h2 className="text-xl font-black uppercase tracking-tight text-white leading-tight">{registeringForProg.title}</h2>
              </div>
              <button onClick={closeRegister} className="shrink-0 w-9 h-9 flex items-center justify-center border border-white/20 text-white/50 hover:text-white hover:border-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="px-8 py-16 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-white/20 mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white">Interest Registered</h3>
                  <p className="text-white/50 text-sm max-w-sm mx-auto">
                    Thank you, <span className="text-white font-bold">{regForm.full_name}</span>. We have recorded your interest for <span className="text-white font-bold">{registeringForProg.title}</span>.
                  </p>
                </div>
                <button onClick={closeRegister} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-8 py-3 hover:bg-white/90 transition-all">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="px-8 py-8 space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RegField 
                      id="full_name" label="Full Name *" type="text"
                      value={regForm.full_name} error={regErrors.full_name}
                      onChange={v => setRegForm(f => ({ ...f, full_name: v }))}
                    />
                    <RegField 
                      id="email" label="Email Address *" type="email"
                      value={regForm.email} error={regErrors.email}
                      onChange={v => setRegForm(f => ({ ...f, email: v }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RegField 
                      id="phone" label="Phone Number *" type="tel"
                      value={regForm.phone} error={regErrors.phone}
                      onChange={v => setRegForm(f => ({ ...f, phone: v }))}
                    />
                    <RegField 
                      id="company" label="Company / Organization" type="text"
                      value={regForm.company}
                      onChange={v => setRegForm(f => ({ ...f, company: v }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="notes" className="block text-[9px] font-black uppercase tracking-[0.25em] text-white/50">Additional Notes</label>
                    <textarea 
                      id="notes" rows={4}
                      value={regForm.notes}
                      onChange={e => setRegForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/50 placeholder:text-white/20 resize-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                  <button type="button" onClick={closeRegister} className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors px-4 py-3">Cancel</button>
                  <button type="submit" disabled={submittingReg} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-black px-8 py-3 hover:bg-white/90 transition-all disabled:opacity-50">
                    {submittingReg ? "Registering…" : "Register Interest"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

interface RegFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function RegField({ id, label, type, value, onChange, error }: RegFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-[9px] font-black uppercase tracking-[0.25em] text-white/50">{label}</label>
      <input 
        id={id} type={type} value={value} 
        onChange={e => onChange(e.target.value)}
        className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/50 transition-colors"
      />
      {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>}
    </div>
  )
}
