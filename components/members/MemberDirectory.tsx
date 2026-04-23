"use client";

import { useState } from "react";
import { 
  Search, Filter, LayoutGrid, List, 
  ChevronRight, ArrowUpRight, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

const members = [
  { id: "ARC-2024-001", name: "Ahmed Shafeeg", type: "Architect", firm: "Island Design Studio", status: "Active", city: "Malé" },
  { id: "PLN-2024-042", name: "Mariyam Zidna", type: "Town Planner", firm: "Urban Pulse Maldives", status: "Active", city: "Hulhumalé" },
  { id: "ARC-2023-118", name: "Ibrahim Naseer", type: "Architect", firm: "Naseer & Associates", status: "Inactive", city: "Malé" },
  { id: "ARC-2024-089", name: "Fathimath Rizna", type: "Architect", firm: "Coral Craft Collective", status: "Active", city: "Addu City" },
  { id: "PLN-2023-005", name: "Ali Shamoon", type: "Town Planner", firm: "Atoll Planning Group", status: "Active", city: "Malé" },
];

export function MemberDirectory() {
  const [view, setView] = useState<"table" | "grid">("table");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Architects", "Town Planners", "Firms", "Honorary"];

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <section className="sticky top-20 z-30 bg-aam-sand border-b border-aam-navy pb-8 pt-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex-1 w-full relative group">
            <label className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-aam-navy/40 block mb-2">Registry Search</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Name, Registration No., or Firm..."
                className="w-full bg-transparent border-b border-aam-navy/20 py-4 font-display text-xl placeholder:text-aam-navy/10 focus:outline-none focus:border-aam-teal transition-colors"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-aam-navy/20" />
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-6 py-2 text-[10px] font-sans font-bold uppercase tracking-widest border transition-all",
                    activeFilter === f 
                      ? "bg-aam-teal text-aam-sand border-aam-teal" 
                      : "bg-transparent text-aam-navy/40 border-aam-navy/10 hover:border-aam-navy"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            
            <div className="h-8 w-[1px] bg-aam-navy/10" />
            
            <div className="flex border border-aam-navy p-1">
              <button 
                onClick={() => setView("table")}
                className={cn("p-2 transition-colors", view === "table" ? "bg-aam-navy text-aam-sand" : "text-aam-navy/40 hover:text-aam-navy")}
              >
                <List className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setView("grid")}
                className={cn("p-2 transition-colors", view === "grid" ? "bg-aam-navy text-aam-sand" : "text-aam-navy/40 hover:text-aam-navy")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Content */}
      {view === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-aam-navy text-aam-sand">
                <th className="py-6 px-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em] border-r border-aam-sand/10">Reg. ID</th>
                <th className="py-6 px-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em] border-r border-aam-sand/10">Professional Name</th>
                <th className="py-6 px-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em] border-r border-aam-sand/10">Category</th>
                <th className="py-6 px-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em] border-r border-aam-sand/10">Location</th>
                <th className="py-6 px-6 text-[11px] font-sans font-bold uppercase tracking-[0.2em]">Status</th>
                <th className="py-6 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <tr 
                  key={member.id} 
                  className={cn(
                    "group transition-colors border-b border-aam-navy/5",
                    i % 2 === 0 ? "bg-aam-sand" : "bg-aam-sand/50",
                    "hover:bg-aam-teal/5"
                  )}
                >
                  <td className="py-8 px-6 font-mono text-sm tracking-tight text-aam-navy/60">{member.id}</td>
                  <td className="py-8 px-6 font-display font-bold text-lg text-aam-navy">{member.name}</td>
                  <td className="py-8 px-6 text-[10px] font-sans font-bold uppercase text-aam-navy/40 tracking-widest">{member.type}</td>
                  <td className="py-8 px-6 text-[10px] font-sans font-bold uppercase tracking-widest text-aam-navy/60">{member.city}</td>
                  <td className="py-8 px-6">
                    <span className={cn(
                      "inline-block px-4 py-1.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em]",
                      member.status === "Active" ? "bg-aam-teal text-aam-sand" : "bg-aam-navy/5 text-aam-navy/30"
                    )}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-8 px-6 text-right">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-aam-teal">
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, i) => (
            <div key={member.id} className="group bg-aam-sand border border-aam-navy/10 p-10 space-y-8 hover:border-aam-teal transition-all duration-700 relative overflow-hidden coral-motif">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="font-display italic text-6xl font-bold">0{i + 1}</span>
              </div>
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-aam-teal tracking-widest uppercase">{member.id}</span>
                <h3 className="text-3xl font-display font-bold leading-tight text-aam-navy group-hover:text-aam-teal transition-colors">{member.name}</h3>
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-aam-navy/40">{member.firm}</p>
              </div>
              <div className="pt-8 border-t border-aam-navy/5 flex justify-between items-center">
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-aam-navy/60">{member.city}</span>
                <button className="text-[10px] font-sans font-bold uppercase tracking-widest text-aam-teal border-b border-aam-teal pb-1">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination Placeholder */}
      <div className="pt-20 flex justify-center items-center gap-12">
        <button className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-aam-navy/20 hover:text-aam-navy transition-colors disabled:opacity-0">Prev</button>
        <div className="flex gap-4">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-aam-teal border-b-2 border-aam-teal">01</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-aam-navy/20 hover:text-aam-navy cursor-pointer">02</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-aam-navy/20 hover:text-aam-navy cursor-pointer">03</span>
        </div>
        <button className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-aam-navy/20 hover:text-aam-navy transition-colors">Next</button>
      </div>
    </div>
  );
}
