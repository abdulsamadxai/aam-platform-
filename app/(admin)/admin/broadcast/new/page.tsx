"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Send,
  Mail,
  Smartphone,
  Users,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  History
} from "lucide-react";
import Link from "next/link";

export default function NewBroadcastPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState<"email" | "sms">("email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("all");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated local dispatch
    await new Promise(resolve => setTimeout(resolve, 2000));
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
            <CardTitle className="text-4xl font-black uppercase tracking-tighter">DISPATCH CONFIRMED</CardTitle>
            <CardDescription className="text-sm font-black uppercase tracking-widest text-neutral-400">
              {type} BROADCAST HAS BEEN TRANSMITTED TO {audience} REGISTRY NODES.
            </CardDescription>
          </div>
          <Button asChild className="h-16 w-full bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest text-[10px] rounded-none border-2 border-white transition-all">
            <Link href="/admin">RETURN TO COMMAND CENTER</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-24 max-w-5xl space-y-24">
      <div className="flex justify-between items-center">
        <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
          <Link href="/admin" className="flex items-center">
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
            RETURN TO COMMAND CENTER
          </Link>
        </Button>
        <Button variant="outline" className="border-2 border-black text-black font-black uppercase tracking-widest text-[10px] rounded-none px-8 py-6 h-auto hover:bg-black hover:text-white transition-all group" asChild>
          <Link href="/admin/broadcast/history">
            <History className="mr-3 h-4 w-4" />
            VIEW DISPATCH ARCHIVE
            <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <div className="space-y-4 border-l-8 border-black pl-8">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Global <br /> Dispatch</h1>
        <p className="text-sm font-black uppercase tracking-[0.4em] text-neutral-400">Institutional Communication Systems</p>
      </div>

      <form onSubmit={handleSend}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <Card className="border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
              <CardHeader className="p-10 border-b-2 border-black bg-neutral-50">
                <CardTitle className="text-xs font-black uppercase tracking-[0.4em]">DISPATCH PARAMETERS</CardTitle>
                <CardDescription className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Configure institutional transmission protocol</CardDescription>
              </CardHeader>
              <CardContent className="p-10 space-y-12">
                <div className="flex p-2 bg-black rounded-none w-fit border-2 border-black">
                  <button
                    type="button"
                    onClick={() => setType("email")}
                    className={`flex items-center gap-3 px-8 py-3 rounded-none text-[10px] font-black uppercase tracking-widest transition-all ${type === "email" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-white"
                      }`}
                  >
                    <Mail className="h-4 w-4" />
                    EMAIL PROTOCOL
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("sms")}
                    className={`flex items-center gap-3 px-8 py-3 rounded-none text-[10px] font-black uppercase tracking-widest transition-all ${type === "sms" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-white"
                      }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    SMS PROTOCOL
                  </button>
                </div>

                {type === "email" && (
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest">TRANSMISSION SUBJECT</Label>
                    <Input
                      id="subject"
                      placeholder="E.G. OFFICIAL NOTICE: INSTITUTIONAL UPDATE..."
                      className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-neutral-300"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required={type === "email"}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-widest">{type === "email" ? "SUBSTANTIVE CONTENT" : "SMS TRANSMISSION"}</Label>
                  <Textarea
                    id="content"
                    placeholder={type === "email" ? "WRITE YOUR INSTITUTIONAL COMMUNICATION HERE..." : "TYPE YOUR SMS TRANSMISSION..."}
                    className={`border-2 border-black rounded-none p-8 font-bold uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-neutral-200 resize-none ${type === 'email' ? 'min-h-[400px]' : 'min-h-[160px]'}`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={type === "sms" ? 160 : undefined}
                    required
                  />
                  {type === "sms" && (
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mt-2">
                      <span>{content.length} / 160 CHARACTER UNITS</span>
                      {content.length > 150 && <span className="text-black">LIMIT IMMINENT</span>}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-neutral-50 border-t-2 border-black p-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-4 text-black p-4 border-2 border-black bg-white">
                  <ShieldAlert className="h-6 w-6 text-black shrink-0" />
                  <p className="text-[9px] font-black uppercase tracking-widest leading-tight">AUDIT CONTENT CAREFULLY. TRANSMISSION IS IRREVERSIBLE ONCE DISPATCHED.</p>
                </div>
                <Button
                  type="submit"
                  disabled={loading || !content}
                  className="h-16 px-10 bg-black text-white hover:bg-neutral-800 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-black transition-all group min-w-[240px]"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      INITIATE DISPATCH
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-12">
            <Card className="border-4 border-black rounded-none shadow-none bg-white">
              <CardHeader className="border-b-2 border-black">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                  <Users className="h-5 w-5 text-black" />
                  REGISTRY TARGETS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="aud-all"
                      name="audience"
                      checked={audience === "all"}
                      onChange={() => setAudience("all")}
                      className="h-5 w-5 text-black border-2 border-black rounded-none focus:ring-0 checked:bg-black"
                    />
                    <Label htmlFor="aud-all" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">ALL VERIFIED MEMBERS (239)</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="aud-voting"
                      name="audience"
                      checked={audience === "voting"}
                      onChange={() => setAudience("voting")}
                      className="h-5 w-5 text-black border-2 border-black rounded-none focus:ring-0 checked:bg-black"
                    />
                    <Label htmlFor="aud-voting" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">VOTING-ELIGIBLE NODES (142)</Label>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      id="aud-test"
                      name="audience"
                      checked={audience === "test"}
                      onChange={() => setAudience("test")}
                      className="h-5 w-5 text-black border-2 border-black rounded-none focus:ring-0 checked:bg-black"
                    />
                    <Label htmlFor="aud-test" className="text-[10px] font-black uppercase tracking-widest cursor-pointer">ADMIN TEST VECTOR (3)</Label>
                  </div>
                </div>

                <div className="p-8 bg-black text-white rounded-none text-center space-y-2 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-400">ESTIMATED IMPACT</p>
                  <p className="text-4xl font-black tracking-tighter">{audience === 'all' ? '239' : audience === 'voting' ? '142' : '3'} NODES</p>
                </div>
              </CardContent>
            </Card>

            <div className="p-8 border-4 border-black border-dashed rounded-none space-y-6 text-center bg-neutral-50">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">PROTOCOL ADVISORY</h4>
              <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-neutral-500">
                DISPATCHES ARE IMMEDIATE AND IRREVOCABLE. ENSURE ALIGNMENT WITH EXECUTIVE COMMITTEE MANDATES FOR INSTITUTIONAL COMMUNICATIONS.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

