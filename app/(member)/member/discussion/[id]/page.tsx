import { notFound } from "next/navigation";
import { ThreadView } from "@/components/discussion/ThreadView";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllThreads } from "@/lib/mock-data";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Mock user
  const user = { id: 'mock-user-1', email: 'member@test.am', user_metadata: { full_name: 'Mock Member' } };

  const thread = getAllThreads().find(t => t.id === id);

  if (!thread) {
    notFound();
  }

  const replies: any[] = [];

  return (
    <div className="container py-12 max-w-5xl space-y-8">
      <Button variant="ghost" className="text-muted-foreground hover:text-aam-teal-600 p-0" asChild>
        <Link href="/discussion">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discussions
        </Link>
      </Button>

      <ThreadView
        initialThread={thread as any}
        initialReplies={replies}
        currentUser={user as any}
      />
    </div>
  );
}
