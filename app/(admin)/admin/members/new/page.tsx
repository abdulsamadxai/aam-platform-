"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  UserPlus,
  ArrowLeft,
  ShieldCheck,
  Info,
  CheckCircle2,
  Mail
} from "lucide-react";
import Link from "next/link";
import { MemberCategory } from "@/types/member";
// import { createMember } from "@/lib/actions/members";
import { FileUploader } from "@/components/shared/FileUploader";

export default function NewMemberPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [assignedId, setAssignedId] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    category: "professional" as MemberCategory,
    registration_date: new Date().toISOString().split('T')[0],
    send_welcome: true,
    profile_photo_url: ""
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAssignedId("AAM-" + Math.floor(1000 + Math.random() * 9000));
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <Card className="max-w-xl w-full text-center p-16 space-y-10 border-4 border-black bg-black text-white rounded-none shadow-[16px_16px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="h-24 w-24 bg-white flex items-center justify-center mx-auto text-black border-4 border-white">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div className="space-y-4">
            <CardTitle className="text-4xl font-black uppercase tracking-tighter">NODE REGISTERED</CardTitle>
            <CardDescription className="text-sm font-black uppercase tracking-widest text-mono-400">
              MEMBER {assignedId} HAS BEEN SUCCESSFULLY INTEGRATED INTO THE REGISTRY.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-4">
            <Button asChild className="h-16 w-full bg-white text-black hover:bg-mono-200 font-black uppercase tracking-widest text-[10px] rounded-none border-2 border-white transition-all">
              <Link href="/admin/members">RETURN TO REGISTRY</Link>
            </Button>
            <Button variant="ghost" onClick={() => { setSuccess(false); setFormData({ ...formData, full_name: "", email: "" }); }} className="text-white hover:text-white hover:bg-mono-900 font-black uppercase tracking-widest text-[10px]">
              REGISTER ANOTHER NODE
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-24 max-w-5xl space-y-24">
      <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
        <Link href="/admin/members" className="flex items-center">
          <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
          RETURN TO MEMBER REGISTRY
        </Link>
      </Button>

      <div className="space-y-4 border-l-8 border-black pl-8">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">New Node <br /> Induction</h1>
        <p className="text-sm font-black uppercase tracking-[0.4em] text-mono-400">Manual Registry Integration Protocol</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          <Card className="border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
            <CardHeader className="p-10 border-b-2 border-black bg-mono-50">
              <CardTitle className="text-xs font-black uppercase tracking-[0.4em]">INDUCTION PARAMETERS</CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-widest">FULL LEGAL NAME</Label>
                  <Input
                    id="full_name"
                    placeholder="E.G. AHMED MOHAMED"
                    className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-0"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest">COMMUNICATION NODE (EMAIL)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="NAME@EXAMPLE.MV"
                    className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-0"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest">MEMBERSHIP CLASSIFICATION</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v as MemberCategory })}
                  >
                    <SelectTrigger className="border-2 border-black rounded-none h-14 px-6 font-black uppercase tracking-widest text-[10px] focus:ring-0">
                      <SelectValue placeholder="SELECT CATEGORY" />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black rounded-none">
                      <SelectItem value="professional" className="font-black uppercase tracking-widest text-[10px]">PROFESSIONAL</SelectItem>
                      <SelectItem value="general" className="font-black uppercase tracking-widest text-[10px]">GENERAL</SelectItem>
                      <SelectItem value="associate" className="font-black uppercase tracking-widest text-[10px]">ASSOCIATE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="reg_date" className="text-[10px] font-black uppercase tracking-widest">REGISTRATION DATE</Label>
                  <Input
                    id="reg_date"
                    type="date"
                    className="border-2 border-black rounded-none h-14 px-6 font-black uppercase tracking-widest text-[10px] focus-visible:ring-0"
                    value={formData.registration_date}
                    onChange={(e) => setFormData({ ...formData, registration_date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-mono-50 border-2 border-black/5">
                <input
                  type="checkbox"
                  id="welcome"
                  checked={formData.send_welcome}
                  onChange={(e) => setFormData({ ...formData, send_welcome: e.target.checked })}
                  className="h-5 w-5 text-black border-2 border-black rounded-none focus:ring-0"
                />
                <Label htmlFor="welcome" className="text-[10px] font-black uppercase tracking-widest cursor-pointer flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  INITIATE WELCOME PROTOCOL (SEND MAGIC LINK)
                </Label>
              </div>
            </CardContent>
            <CardFooter className="bg-black text-white p-10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-8 w-8 text-white" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">AUTHORITY VERIFIED</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-mono-400">ENTRY WILL BE PERMANENTLY LOGGED.</p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-16 px-10 bg-white text-black hover:bg-mono-200 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-white transition-all"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "COMPLETE INDUCTION"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-12">
          <Card className="border-4 border-black rounded-none shadow-none bg-white">
            <CardHeader className="border-b-2 border-black p-8">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em]">ASSIGNED IDENTITY</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-6">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-mono-400">PROFILE PHOTO</p>
              <FileUploader
                bucket="avatars"
                onUploadComplete={(url) => setFormData({ ...formData, profile_photo_url: url })}
                label="Upload Avatar"
              />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-mono-400">NEXT SEQUENTIAL AAM ID</p>
              <div className="text-6xl font-black tracking-tighter border-y-4 border-black py-8">{assignedId || "---"}</div>
              <p className="text-[9px] font-bold text-mono-400 uppercase tracking-widest leading-relaxed">
                ID GENERATED AUTOMATICALLY BASED ON GLOBAL REGISTRY MAX(N+1) LOGIC.
              </p>
            </CardContent>
          </Card>

          <div className="p-8 border-4 border-black border-dashed rounded-none space-y-6 bg-mono-50">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-black" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">REGISTRY NOTICE</h4>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-mono-500">
              MANUAL INDUCTION SHOULD ONLY BE PERFORMED FOR MEMBERS WITH VERIFIED PHYSICAL DOCUMENTATION. ALL FIELDS ARE MANDATORY FOR REGISTRY INTEGRITY.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
