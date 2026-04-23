import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllNews } from "@/lib/mock-data";

export default async function AdminNews() {
    const news = getAllNews();

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-white/10">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold uppercase tracking-tight">News Management</h1>
                    <p className="text-aam-grey uppercase tracking-widest text-xs font-medium">Create and manage public announcements and bulletins.</p>
                </div>
                <Button className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Article
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {news?.map((article) => (
                    <div key={article.id} className="bg-aam-near-black border border-white/5 p-8 flex flex-col md:flex-row gap-8 hover:border-white/20 transition-all">
                        <div className="w-full md:w-48 h-32 bg-black border border-white/10 shrink-0">
                            {article.cover_image_url && <img src={article.cover_image_url} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 transition-opacity" alt="" />}
                        </div>
                        <div className="flex-grow space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-[9px] font-bold uppercase tracking-widest border border-white/20 px-2 py-0.5 text-aam-grey">{article.category}</span>
                                <span className="text-[9px] uppercase tracking-widest text-aam-dark-grey">{new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                            <h2 className="text-xl font-bold uppercase tracking-tight">{article.title}</h2>
                            <div className="flex gap-6">
                                <Button variant="ghost" className="h-8 px-0 text-aam-grey hover:text-white text-[10px] font-bold uppercase tracking-widest">
                                    <Edit className="mr-2 w-3.5 h-3.5" />
                                    Edit
                                </Button>
                                <Button variant="ghost" className="h-8 px-0 text-aam-error hover:bg-aam-error/10 text-[10px] font-bold uppercase tracking-widest">
                                    <Trash2 className="mr-2 w-3.5 h-3.5" />
                                    Delete
                                </Button>
                                <Button variant="ghost" className="h-8 px-0 text-aam-grey hover:text-white text-[10px] font-bold uppercase tracking-widest" asChild>
                                    <Link href={`/news/${article.slug}`}>
                                        <ExternalLink className="mr-2 w-3.5 h-3.5" />
                                        View Public
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {(!news || news.length === 0) && (
                    <div className="py-20 text-center border border-dashed border-white/10">
                        <p className="text-aam-grey uppercase tracking-widest text-xs">No articles published yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
