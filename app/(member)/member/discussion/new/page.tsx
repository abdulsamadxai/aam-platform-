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
import { Loader2, Send, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewThreadPage() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [body, setBody] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push(`/discussion/th-1`);
    }, 800)
  };

  return (
    <div className="container py-24 max-w-3xl space-y-12">
      <Button variant="ghost" className="text-black font-black uppercase tracking-widest text-[10px] p-0 hover:bg-transparent group" asChild>
        <Link href="/discussion" className="flex items-center">
          <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
          RETURN TO DISCOURSE INDEX
        </Link>
      </Button>

      <div className="space-y-4 border-l-8 border-black pl-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Initiate <br /> Dialogue</h1>
        <p className="text-lg font-medium text-neutral-500 leading-tight">Transmit technical queries or institutional announcements to the peer network.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-4 border-black rounded-none shadow-none bg-white overflow-hidden">
          <CardHeader className="p-10 border-b-2 border-black bg-neutral-50">
            <CardTitle className="text-xs font-black uppercase tracking-[0.4em]">THREAD CONFIGURATION</CardTitle>
            <CardDescription className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2">Define technical parameters for the discourse</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-10">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest">Procedural Title</Label>
              <Input
                id="title"
                placeholder="E.G. TECHNICAL AUDIT OF REGULATION 4.2..."
                className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-neutral-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest">Thematic Taxonomy</Label>
              <Select value={category} onValueChange={(val) => setCategory(val || "general")}>
                <SelectTrigger id="category" className="border-2 border-black rounded-none h-14 px-6 font-bold uppercase tracking-widest text-xs focus:ring-0">
                  <SelectValue placeholder="SELECT CLASSIFICATION" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-2 border-black shadow-none font-bold uppercase text-xs">
                  <SelectItem value="general">GENERAL DISCOURSE</SelectItem>
                  <SelectItem value="projects">PROJECTS & WORKS</SelectItem>
                  <SelectItem value="regulation">REGULATORY AUDIT</SelectItem>
                  <SelectItem value="cpe">CPE / CPD ACCREDITATION</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="body" className="text-[10px] font-black uppercase tracking-widest">Substantive Content (MARKDOWN ENABLED)</Label>
              <Textarea
                id="body"
                placeholder="PROVIDE DETAILED CONTEXT FOR PEER REVIEW..."
                className="min-h-[300px] border-2 border-black rounded-none px-6 py-6 font-bold uppercase tracking-widest text-xs focus-visible:ring-0 placeholder:text-neutral-300 resize-none"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="bg-black text-white p-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] max-w-sm leading-relaxed opacity-60 text-center md:text-left">
              BY DISPATCHING THIS THREAD, YOU ACKNOWLEDGE THE INSTITUTIONAL CODE OF CONDUCT AND PEER DIALOGUE STANDARDS.
            </p>
            <Button
              type="submit"
              disabled={loading || !title || !body}
              className="h-16 px-12 bg-white text-black hover:bg-neutral-200 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-white transition-all group min-w-[240px]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  DISPATCH THREAD
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

