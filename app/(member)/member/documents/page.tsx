import { FileText, Download, Shield, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberDocuments() {
    const documents = [
        { title: "Membership Certificate 2026", type: "CERTIFICATE", date: "Jan 12, 2026" },
        { title: "AAM Constitution (Official)", type: "GOVERNANCE", date: "Rev 2023" },
        { title: "CPD Guidelines & Logging Guide", type: "GUIDELINES", date: "Apr 2026" },
    ];

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header>
                <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">Document Vault</h1>
                <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Access your institutional certificates and constitutional files.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <section className="space-y-6">
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Personal & Institutional Records</h2>
                        <div className="space-y-4">
                            {documents.map((doc, i) => (
                                <div key={i} className="bg-aam-near-black border border-white/5 p-8 flex items-center justify-between hover:border-white/20 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-black border border-white/10 flex items-center justify-center text-aam-grey">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{doc.title}</h3>
                                            <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest text-aam-dark-grey">
                                                <span>{doc.type}</span>
                                                <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                <span>Updated: {doc.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-aam-grey hover:text-white group">
                                        <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold uppercase tracking-widest border-b border-white/10 pb-4">Statutory Disclosures</h2>
                        <div className="bg-black border border-dashed border-white/10 p-10 space-y-4">
                            <p className="text-sm text-aam-grey leading-relaxed">
                                As a registered member, you have access to internal governance resolutions and financial summaries. These documents are privileged and restricted from public distribution.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Button variant="outline" className="border-white/10 text-[10px] h-10 px-6 uppercase tracking-widest hover:border-white">
                                    AGM 2025 Resolutions
                                </Button>
                                <Button variant="outline" className="border-white/10 text-[10px] h-10 px-6 uppercase tracking-widest hover:border-white">
                                    Audit Report 2024
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="bg-aam-near-black p-8 border border-white/5 space-y-8">
                        <div className="flex items-center gap-4 text-white">
                            <Shield className="w-6 h-6" />
                            <h3 className="text-xs font-bold uppercase tracking-widest">Verification Status</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] text-aam-grey uppercase tracking-widest">AAM ID</span>
                                <span className="font-mono text-sm">MBR-2024-089</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] text-aam-grey uppercase tracking-widest">Category</span>
                                <span className="text-xs uppercase font-bold">Professional</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                <span className="text-[10px] text-aam-grey uppercase tracking-widest">Verified By</span>
                                <span className="text-xs uppercase font-bold text-aam-grey">EC-AUDIT-02</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border border-white/10 space-y-6">
                        <div className="flex items-center gap-4 text-aam-grey">
                            <History className="w-5 h-5" />
                            <h3 className="text-[10px] font-bold uppercase tracking-widest">Audit History</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="text-[10px] text-aam-dark-grey leading-relaxed">
                                <div className="text-white mb-1 tracking-widest">JAN 2024</div>
                                Renewal of status successful. Certification issued.
                            </div>
                            <div className="text-[10px] text-aam-dark-grey leading-relaxed">
                                <div className="text-white mb-1 tracking-widest">DEC 2023</div>
                                CPD audit completed. Requirement met (22/20).
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
