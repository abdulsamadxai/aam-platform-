"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsPostSchema, NewsPostInput } from "@/lib/validations";
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
import { PublishToggle } from "@/components/admin/PublishToggle";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

interface NewsFormProps {
    initialData?: NewsPostInput & { id?: string };
    onSubmit: (data: NewsPostInput) => Promise<void>;
    isLoading?: boolean;
}

export function NewsForm({
    initialData,
    onSubmit,
    isLoading = false
}: NewsFormProps) {
    const form = useForm<NewsPostInput>({
        resolver: zodResolver(newsPostSchema),
        defaultValues: initialData ?? {
            title: "",
            slug: "",
            body: "",
            category: "INSTITUTIONAL",
            is_published: false
        }
    });

    const title = useWatch({ control: form.control, name: "title" });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Publication Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ENTER HEADLINE..."
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
                                            baseValue={title}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-12">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Editorial Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-4 border-black rounded-none h-16 font-black uppercase text-sm focus:ring-0">
                                                <SelectValue placeholder="SELECT CATEGORY" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="border-4 border-black rounded-none font-bold">
                                            <SelectItem value="INSTITUTIONAL">INSTITUTIONAL</SelectItem>
                                            <SelectItem value="ADVOCACY">ADVOCACY</SelectItem>
                                            <SelectItem value="TECHNICAL">TECHNICAL</SelectItem>
                                            <SelectItem value="COMMUNITY">COMMUNITY</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_published"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <PublishToggle
                                            isPublished={field.value}
                                            onToggle={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    label="EDITORIAL BODY"
                                    height={600}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-6 pt-12 border-t-8 border-black">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-20 flex-1 bg-black text-white hover:bg-neutral-800 rounded-none font-black uppercase tracking-[0.2em] text-xs border-2 border-black transition-all"
                    >
                        {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Save className="mr-3 h-5 w-5" />}
                        COMMIT TO NEWSFEED
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="h-20 px-12 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all"
                    >
                        <Link href="/admin/content/news">
                            <X className="mr-3 h-5 w-5" />
                            ABORT
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
