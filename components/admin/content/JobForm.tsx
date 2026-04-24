"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, JobInput as JobListingInput } from "@/lib/validations";
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
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, X, Briefcase } from "lucide-react";
import Link from "next/link";

interface JobFormProps {
    initialData?: JobListingInput & { id?: string };
    onSubmit: (data: JobListingInput) => Promise<void>;
    isLoading?: boolean;
}

export function JobForm({
    initialData,
    onSubmit,
    isLoading = false
}: JobFormProps) {
    const form = useForm<JobListingInput>({
        resolver: zodResolver(jobSchema),
        defaultValues: initialData ?? {
            title: "",
            company_name: "",
            description: "",
            deadline: "",
            is_active: true
        }
    });

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
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Position Nomenclature</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. SENIOR ARCHITECT"
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
                            name="company_name"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Employing Entity</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. ATOLL DESIGN GROUP"
                                            className="border-4 border-black rounded-none h-16 font-black uppercase text-sm focus-visible:ring-0"
                                            {...field}
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
                            name="deadline"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Application Deadline</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="border-4 border-black rounded-none h-16 font-black uppercase text-sm focus-visible:ring-0"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="p-8 border-4 border-black bg-white flex items-center justify-between">
                                    <div className="space-y-1">
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Vacancy Status</FormLabel>
                                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Toggle visibility on the board.</p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="scale-125 data-[state=checked]:bg-black"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    label="JOB SPECIFICATIONS & REQUIREMENTS"
                                    height={500}
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
                        COMMIT VACANCY
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="h-20 px-12 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all"
                    >
                        <Link href="/admin/content/jobs">
                            <X className="mr-3 h-5 w-5" />
                            ABORT
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
