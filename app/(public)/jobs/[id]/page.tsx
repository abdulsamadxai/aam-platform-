import { getJobById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, FileText, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobPageProps {
    params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobPageProps) {
    const { id } = await params;
    
    const job = await getJobById(id);

    if (!job) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black pt-32">
            <div className="container mx-auto px-6 py-12">
                <Link href="/jobs" className="inline-flex items-center gap-2 text-aam-grey hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Careers
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-12">
                        <header className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest">Job Opportunity</span>
                                <span className="text-[10px] uppercase tracking-widest text-aam-grey font-medium tracking-[0.2em]">{job.type || "Full-Time"}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none">{job.title}</h1>
                            <div className="flex items-center gap-3 text-aam-grey text-lg font-medium">
                                <Building2 className="w-5 h-5" />
                                {job.company_name || job.company}
                            </div>
                        </header>

                        <div className="prose prose-invert max-w-none prose-p:text-aam-grey prose-p:leading-relaxed whitespace-pre-wrap pt-8 border-t border-white/10 mt-12">
                            {job.description}
                        </div>

                        <div className="pt-12 space-y-8">
                            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    "Professional Registration with AAM",
                                    "Minimum 3 Years Experience",
                                    "Degree in Architecture",
                                    "Portfolio of Maldivian projects",
                                    "Maldivian Nationality Preferred",
                                    "Immediate Availability"
                                ].map((req) => (
                                    <div key={req} className="flex items-center gap-4 p-4 bg-aam-near-black border border-white/5">
                                        <ChevronRight className="w-3 h-3 text-white" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-aam-grey">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-12">
                        <div className="bg-white text-black p-10 space-y-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] border-b border-black/10 pb-4">Application Details</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="text-[9px] uppercase font-bold tracking-widest opacity-40">Submission Deadline</div>
                                    <div className="text-sm font-bold uppercase tracking-tight">
                                        {job.deadline ? new Date(job.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "Open until filled"}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[9px] uppercase font-bold tracking-widest opacity-40">Reference Code</div>
                                    <div className="text-sm font-bold uppercase tracking-tight break-all">
                                        AAM-JOB-{job.id.slice(0, 8).toUpperCase()}
                                    </div>
                                </div>
                            </div>
                            <Link href={`/jobs/${job.id}/apply`} className="block">
                                <Button className="w-full bg-black text-white hover:bg-aam-near-black h-14 rounded-none text-[10px] font-bold uppercase tracking-widest">
                                    Submit Application
                                </Button>
                            </Link>
                        </div>

                        <div className="p-8 border border-white/10 space-y-6">
                            <Briefcase className="w-8 h-8 text-aam-dark-grey" />
                            <p className="text-[10px] font-medium uppercase tracking-widest leading-relaxed text-aam-grey">
                                All job postings on the AAM Career Board are reviewed for compliance with professional ethics and salary benchmarks.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
