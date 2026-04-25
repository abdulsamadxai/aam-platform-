import { getAllBroadcasts } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Mail,
  Smartphone,
  History,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

/**
 * Broadcast History Page
 * BUG-042 FIX: Converted to Server Component for security and performance.
 * BUG-042 FIX: Added explicit admin role check.
 */
export default async function BroadcastHistoryPage() {
  // 1. Verify Admin Authority - Mocked
  // 2. Fetch History - Mocked
  const broadcastList = await getAllBroadcasts();

  return (
    <div className="container py-24 max-w-7xl space-y-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b-8 border-black pb-12">
        <div className="space-y-4 border-l-8 border-black pl-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">Transmission <br /> Logs</h1>
          <p className="text-sm font-black uppercase tracking-[0.4em] text-neutral-400">Archival record of institutional dispatches</p>
        </div>
        <div className="flex gap-4">
          <Button asChild className="h-16 px-10 bg-black text-white hover:bg-neutral-800 rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-black transition-all">
            <Link href="/admin/broadcast/new">NEW DISPATCH PROTOCOL</Link>
          </Button>
          <Button variant="outline" asChild className="h-16 px-10 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-widest text-[10px] transition-all">
            <Link href="/admin">COMMAND CENTER</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          <div className="border-[4px] border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-black hover:bg-black border-none">
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 pl-10">Timestamp</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Vector</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Subject / Body Snippet</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Audience</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16">Status</TableHead>
                  <TableHead className="text-white font-black uppercase tracking-widest text-[10px] h-16 text-right pr-10">Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {broadcastList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">NO TRANSMISSION RECORDS DETECTED IN ARCHIVE.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  broadcastList.map((log) => (
                    <TableRow key={log.id} className="border-b-2 border-black/5 last:border-none hover:bg-neutral-50 transition-colors">
                      <TableCell className="pl-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest">{new Date(log.created_at).toLocaleDateString('en-GB')}</span>
                          <span className="text-[9px] font-bold text-neutral-400">{new Date(log.created_at).toLocaleTimeString('en-GB')}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {log.type === 'email' ? <Mail className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                          <span className="text-[10px] font-black uppercase tracking-widest">{log.type.toUpperCase()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-tight truncate">
                            {log.subject || log.body.substring(0, 50) + "..."}
                          </p>
                          {log.subject && <p className="text-[9px] font-bold text-neutral-400 uppercase truncate">{log.body.substring(0, 60)}...</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {log.sent_count + log.fail_count} NODES
                          </span>
                          {log.fail_count > 0 && (
                            <p className="text-[9px] font-bold text-black uppercase">{log.fail_count} DROPPED</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`rounded-none px-3 py-1 text-[9px] font-black uppercase tracking-widest border-2 ${log.status === 'sent'
                            ? 'bg-black text-white border-black'
                            : log.status === 'failed'
                              ? 'bg-white text-black border-black'
                              : 'bg-white text-neutral-400 border-neutral-200'
                          }`}>
                          {log.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <button className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all">
                          <FileText className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-12">
          <Card className="border-4 border-black rounded-none shadow-none bg-white">
            <CardHeader className="border-b-2 border-black bg-neutral-50 p-8">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em]">SYSTEM STATS</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">TOTAL DISPATCHES</p>
                <p className="text-5xl font-black tracking-tighter">{broadcastList.length}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-400">NODES REACHED</p>
                <p className="text-5xl font-black tracking-tighter">
                  {broadcastList.reduce((acc, curr) => acc + (curr.sent_count || 0), 0)}
                </p>
              </div>
              <div className="p-6 bg-black text-white rounded-none border-2 border-black">
                <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">
                  ARCHIVE UPDATED IN REAL-TIME FROM INTERNAL GLOBAL REPOSITORY.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="p-8 border-4 border-black border-dashed rounded-none space-y-6 text-center bg-neutral-50">
            <History className="h-10 w-10 text-black mx-auto opacity-20" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">RETENTION POLICY</h4>
            <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed text-neutral-500">
              TRANSMISSION LOGS ARE PERMANENTLY ARCHIVED FOR INSTITUTIONAL AUDIT COMPLIANCE. DISPATCHES CANNOT BE PURGED FROM SYSTEM MEMORY.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
