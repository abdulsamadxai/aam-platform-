"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { submitContactForm } from "@/lib/actions/forms";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        await submitContactForm({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: "new",
        });
        setIsSuccess(true);
    } catch (error) {
        toast.error("Failed to send message. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-black pt-32">
        <div className="container mx-auto px-6 max-w-2xl text-center py-20">
          <div className="w-20 h-20 bg-black border border-white text-white flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-6">Message Sent</h1>
          <p className="text-aam-grey text-lg leading-relaxed mb-12">
            Thank you for reaching out. The AAM Secretariat has received your message and will get back to you shortly.
          </p>
          <Button className="btn-primary" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with the Architects Association Maldives Secretariat."
      />

      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Info */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold uppercase tracking-widest border-l-4 border-white pl-6">Get in Touch</h2>
                <p className="text-aam-grey text-lg font-light leading-relaxed">
                  For membership queries, professional practice standards, or general information regarding architecture in the Maldives, please contact our secretariat.
                </p>
              </div>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey mb-1">Email Correspondence</div>
                    <div className="text-xl font-bold tracking-tight">admin@aamaldives.org</div>
                    <div className="text-sm font-medium text-aam-grey mt-1">architectsassociation.maldives@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey mb-1">Office Line</div>
                    <div className="text-xl font-bold tracking-tight">+960 333 4455</div>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey mb-1">Physical Address</div>
                    <div className="text-xl font-bold tracking-tight uppercase leading-tight">
                      H. Mialani, 3rd Floor,<br />
                      Malé, Republic of Maldives
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-black p-12 border border-white/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Full Name</Label>
                  <Input name="name" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Email Address</Label>
                  <Input name="email" type="email" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Subject</Label>
                  <Input name="subject" required value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} className="bg-black border-white/10 rounded-none h-14" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">Message</Label>
                  <Textarea name="message" required value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className="bg-black border-white/10 rounded-none min-h-[160px] resize-none" />
                </div>
                <Button disabled={submitting} type="submit" className="btn-primary w-full h-16 text-sm uppercase tracking-[0.2em]">
                  {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending...
                      </>
                  ) : "Send Message"}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
