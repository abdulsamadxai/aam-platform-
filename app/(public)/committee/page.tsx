import { PageHeader } from "@/components/PageHeader";
import { User } from "lucide-react";

export default function CommitteePage() {
    const committee = [
        { name: "Ahmed Shafeeg", role: "President", term: "2024-2026" },
        { name: "Aishath Mohamed", role: "Vice President", term: "2024-2026" },
        { name: "Moosa Rasheed", role: "Secretary", term: "2024-2026" },
        { name: "Mariyam Ali", role: "Treasurer", term: "2024-2026" },
        { name: "Ibrahim Nasif", role: "Committee Member", term: "2024-2026" },
        { name: "Fathimath Adam", role: "Committee Member", term: "2024-2026" },
        { name: "Hassan Shahid", role: "Committee Member", term: "2024-2026" },
    ];

    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                title="Executive Committee"
                subtitle="The elected representatives who govern and guide the Architects Association Maldives."
            />

            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {committee.map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-48 h-48 bg-black border border-white/5 mx-auto mb-8 flex items-center justify-center group-hover:border-white/20 transition-all">
                                    <User className="w-20 h-20 text-white/20" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">{member.name}</h3>
                                <p className="text-sm text-white font-medium uppercase tracking-[0.2em] mb-2">{member.role}</p>
                                <p className="text-xs text-aam-grey tracking-widest">{member.term}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-black border-t border-white/10">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="text-lg text-aam-grey leading-relaxed italic">
                        "The AAM Executive Committee is elected by the general membership at the Annual General Meeting. Committee members serve two-year terms and are responsible for governance, strategic direction, membership services, and the financial management of the association."
                    </p>
                </div>
            </section>
        </main>
    );
}
