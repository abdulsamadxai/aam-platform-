import { getTrainingById } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Globe, Award, CheckCircle2, Bookmark, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrainingPageProps {
    params: Promise<{ id: string }>;
}

export default async function TrainingDetailPage({ params }: TrainingPageProps) {
    const { id } = await params;
    const program = await getTrainingById(id);

    if (!program) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <Link href="/training" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Training
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <header className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest">CPE Module</span>
                                <span className="text-[10px] uppercase tracking-widest text-aam-grey font-medium tracking-[0.2em]">15 Credits</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-none">{program.title}</h1>
                        </header>

                        <div className="prose prose-invert max-w-none prose-p:text-aam-grey prose-p:leading-relaxed whitespace-pre-wrap pt-8 border-t border-white/10">
                            {program.description}
                        </div>

                        <div className="space-y-8 pt-12">
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Course Schedule</h3>
                            <div className="bg-aam-near-black p-10 border border-white/5 font-mono text-xs text-aam-grey uppercase tracking-widest leading-relaxed whitespace-pre-wrap">
                                {program.schedule_text || "Schedule to be released upon enrollment confirmation."}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-12">
                        <div className="bg-white text-black p-10 space-y-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black/10 pb-4">Logistics</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Clock className="w-4 h-4" />
                                    <div className="text-[10px] font-bold uppercase tracking-widest">4 Weeks Intensive</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe className="w-4 h-4" />
                                    <div className="text-[10px] font-bold uppercase tracking-widest">Hybrid Protocol</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Award className="w-4 h-4" />
                                    <div className="text-[10px] font-bold uppercase tracking-widest">AAM Certified</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-4 h-4" />
                                    <div className="text-[10px] font-bold uppercase tracking-widest">Starts June 2026</div>
                                </div>
                            </div>
                            <Button className="w-full bg-black text-white hover:bg-aam-near-black h-14 rounded-none text-[10px] font-bold uppercase tracking-widest">
                                Initiate Enrollment
                            </Button>
                        </div>

                        <div className="p-8 border border-white/10 space-y-6">
                            <BookOpen className="w-8 h-8 text-aam-dark-grey" />
                            <p className="text-[10px] font-medium uppercase tracking-widest leading-relaxed text-aam-grey">
                                This programme is part of the AAM Continuing Professional Education framework. Credits will be automatically logged to your member profile upon completion.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
