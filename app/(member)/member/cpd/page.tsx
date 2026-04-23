"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Award, Plus, Calendar, Clock, CheckCircle2 } from "lucide-react";

export default function CPDLogger() {
    const [points, setPoints] = useState(14);
    const [showForm, setShowForm] = useState(false);
    const [submissions, setSubmissions] = useState([
        { title: "BIM Fundamentals Workshop", date: "Mar 12, 2026", points: 5, status: "Approved" },
        { title: "Sustainable Urbanism Seminar", date: "Feb 05, 2026", points: 3, status: "Approved" },
        { title: "Site Supervision: Case Study", date: "Jan 20, 2026", points: 6, status: "Approved" },
    ]);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-white/10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold uppercase tracking-tight">CPD Logger</h1>
                    <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Record and track your Continuing Professional Development hours.</p>
                </div>
                <Button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {showForm ? "Close Form" : "Log Activity"}
                </Button>
            </header>

            {/* Progress Meter */}
            <div className="bg-aam-near-black p-12 border border-white/5 space-y-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-aam-grey">Accrued Points (2026 Cycle)</div>
                        <div className="text-6xl font-bold tracking-tighter flex items-center justify-center md:justify-start gap-4">
                            {points} <span className="text-aam-dark-grey text-4xl">/ 20</span>
                            <Award className="w-10 h-10 text-white opacity-20" />
                        </div>
                    </div>
                    <div className="flex-1 max-w-xl w-full">
                        <div className="h-4 w-full bg-black border border-white/10 relative overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-1000"
                                style={{ width: `${(points / 20) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-3 text-[9px] uppercase font-bold tracking-widest text-aam-dark-grey">
                            <span>0 Points</span>
                            <span>70% Target Reached</span>
                            <span>20 Points</span>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="bg-white text-black p-10 space-y-8 animate-in slide-in-from-top-4">
                    <h2 className="text-xl font-bold uppercase tracking-widest border-b border-black/10 pb-4">Log CPD Activity</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-3 lg:col-span-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest">Activity Title</Label>
                            <Input className="border-black/20 rounded-none h-12 text-sm" placeholder="e.g. Urban Planning Webinar" />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest">Category</Label>
                            <select className="w-full bg-transparent border border-black/20 rounded-none h-12 px-4 text-xs font-bold uppercase tracking-widest">
                                <option>Category A: AAM Workshops</option>
                                <option>Category B: External Courses</option>
                                <option>Category C: Self-Directed</option>
                                <option>Category D: Mentoring</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest">Date Completed</Label>
                            <Input type="date" className="border-black/20 rounded-none h-12" />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-[10px] font-bold uppercase tracking-widest">Points Claimed (Hours)</Label>
                            <Input type="number" className="border-black/20 rounded-none h-12" />
                        </div>
                        <div className="space-y-3 flex items-end">
                            <Button className="btn-primary w-full h-12">Submit for Audit</Button>
                        </div>
                    </form>
                </div>
            )}

            {/* History */}
            <section className="space-y-8">
                <h2 className="text-lg font-bold uppercase tracking-widest border-l-4 border-white pl-6">Submission History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white text-[10px] uppercase tracking-widest font-bold text-aam-grey">
                                <th className="py-6 px-4">Activity Description</th>
                                <th className="py-6 px-4">Date</th>
                                <th className="py-6 px-4">Points</th>
                                <th className="py-6 px-4 text-right">Verification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {submissions.map((sub, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="py-8 px-4 font-bold uppercase tracking-tight">{sub.title}</td>
                                    <td className="py-8 px-4 text-xs font-mono text-aam-grey">{sub.date}</td>
                                    <td className="py-8 px-4 font-bold text-lg">{sub.points}</td>
                                    <td className="py-8 px-4 text-right">
                                        <span className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            {sub.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
