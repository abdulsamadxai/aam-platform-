"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sitePageSchema, SitePageInput } from "@/lib/validations";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SlugInput } from "@/components/admin/SlugInput";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";

export default function NewPageCreator() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<SitePageInput>({
        resolver: zodResolver(sitePageSchema),
        defaultValues: {
            slug: "",
            title: "",
            content: "" // We'll store markdown as content for now
        }
    });

    const onSubmit = async (values: SitePageInput) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/system/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) throw new Error("TRANS_FAILURE");

            toast({ title: "NODE_DEPLOYED", description: "Archival record established." });
            router.push("/admin/pages");
        } catch (error) {
            toast({
                title: "DEPLOY_FAILED",
                description: "Protocol transmission error.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-24 py-12">
            <AdminPageHeader
                title={"Deploy\nNode"}
                subtitle="New Institutional Page Parameters"
                backHref="/admin/pages"
            />

            <div className="max-w-5xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Page Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. CONSTITUTION OF AAM"
                                                className="border-4 border-black rounded-none h-16 font-black uppercase text-sm focus-visible:ring-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <SlugInput
                                                baseValue={form.watch("title")}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RichTextEditor
                                            value={typeof field.value === 'string' ? field.value : ""}
                                            onChange={field.onChange}
                                            height={600}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-20 w-full bg-black text-white hover:bg-mono-800 rounded-none font-black uppercase tracking-[0.2em] text-xs border-2 border-black transition-all pt-1"
                        >
                            {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Save className="mr-3 h-5 w-5" />}
                            EXECUTE DEPLOYMENT
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
