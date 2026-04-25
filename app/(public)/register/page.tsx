"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { submitRegistrationForm } from "@/lib/actions/forms";

const categories = [
  { id: "professional", title: "Professional Member", desc: "Fully qualified architects with recognised degrees and min. 2 years experience." },
  { id: "general", title: "General Member", desc: "Graduate architects working toward full professional status." },
  { id: "associate", title: "Associate Member", desc: "Architecture students and allied built environment professionals." },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: "",
    email: "",
    phone: "",
    category_applied: "professional",
    university: "",
    graduation_year: "",
    experience_years: "0-2",
    documents_url: "",
    agreed_to_terms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed_to_terms) return;
    
    try {
      await submitRegistrationForm({
        full_name: formData.applicant_name,
        email: formData.email,
        phone: formData.phone,
        category_applied: formData.category_applied as any,
        university: formData.university,
        graduation_year: formData.graduation_year,
        experience_years: formData.experience_years as any,
        documents_url: formData.documents_url,
      });
      
      setSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-black pt-32">
        <div className="container mx-auto px-6 max-w-2xl text-center py-20">
          <div className="w-20 h-20 bg-black border border-white text-white flex items-center justify-center mx-auto mb-10">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-6">Application Received</h1>
          <p className="text-aam-grey text-lg leading-relaxed mb-12">
            Your application has been received. AAM will review your credentials and contact you at <strong>{formData.email}</strong> within 5 working days.
          </p>
          <Button className="btn-primary" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        title="Join AAM"
        subtitle="Apply for membership in the Architects Association Maldives."
      />

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          {step === 1 ? (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold uppercase tracking-widest border-l-4 border-white pl-6">Step 1: Choose Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, category_applied: cat.id }));
                      setStep(2);
                    }}
                    className={cn(
                      "p-10 border transition-all flex flex-col justify-between cursor-pointer",
                      formData.category_applied === cat.id
                        ? "bg-black text-white border-white border-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                        : "bg-[#0a0a0a] text-white border-white/10 hover:bg-[#111] hover:border-white/30"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold uppercase tracking-tight leading-tight">{cat.title}</h3>
                        <div className={cn(
                          "h-3 w-3 rounded-full border border-white transition-all",
                          formData.category_applied === cat.id ? "bg-white" : "bg-transparent"
                        )} />
                      </div>
                      <p className={cn("text-xs leading-relaxed", formData.category_applied === cat.id ? "text-white/80" : "text-aam-grey")}>
                        {cat.desc}
                      </p>
                    </div>
                    <div className={cn("mt-8 text-[10px] font-bold uppercase tracking-widest", formData.category_applied === cat.id ? "text-white" : "text-aam-grey")}>
                      {formData.category_applied === cat.id ? "Selected Category" : "Select Category →"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="text-3xl font-bold uppercase tracking-widest border-l-4 border-white pl-6">Step 2: Application Details</h2>
                <button onClick={() => setStep(1)} className="text-xs uppercase font-bold tracking-widest text-aam-grey hover:text-white transition-colors">← Back</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Full Name</Label>
                    <Input required value={formData.applicant_name} onChange={e => setFormData(p => ({ ...p, applicant_name: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Email Address</Label>
                    <Input type="email" required value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Phone Number</Label>
                    <Input required value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Category</Label>
                    <Input value={formData.category_applied} disabled className="bg-black border-white/10 rounded-none h-14 uppercase" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">University / Qualification</Label>
                    <Input required value={formData.university} onChange={e => setFormData(p => ({ ...p, university: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Year of Graduation</Label>
                    <Input required value={formData.graduation_year} onChange={e => setFormData(p => ({ ...p, graduation_year: e.target.value }))} placeholder="e.g. 2020" className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Years of Post-Qualification Experience</Label>
                    <select value={formData.experience_years} onChange={e => setFormData(p => ({ ...p, experience_years: e.target.value }))} className="w-full bg-black border border-white/10 text-white rounded-none h-14 px-4 font-sans focus:outline-none focus:border-white">
                      <option value="0-2">0-2 years</option>
                      <option value="2-5">2-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Supporting Docs URL (Drive/Dropbox)</Label>
                    <Input required value={formData.documents_url} onChange={e => setFormData(p => ({ ...p, documents_url: e.target.value }))} placeholder="https://..." className="bg-black border-white/10 rounded-none h-14" />
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4">
                  <input
                    type="checkbox"
                    id="agreed"
                    checked={formData.agreed_to_terms}
                    onChange={(e) => setFormData(p => ({ ...p, agreed_to_terms: e.target.checked }))}
                    className="w-5 h-5 mt-1 border-white/20 bg-black checked:bg-white checked:border-white transition-all cursor-pointer accent-white"
                  />
                  <Label htmlFor="agreed" className="text-sm text-aam-grey leading-relaxed cursor-pointer">
                    I agree to abide by the AAM Code of Conduct and represent the architectural profession with integrity in the Maldives.
                  </Label>
                </div>

                <Button disabled={submitting || !formData.agreed_to_terms} type="submit" className="btn-primary w-full h-16 text-sm">
                  {submitting ? "Submitting Application..." : "Submit Application"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
