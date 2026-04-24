"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainingSchema, TrainingInput as TrainingProgrammeInput } from "@/lib/validations";
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
import { PublishToggle } from "@/components/admin/PublishToggle";
import { Loader2, Save, X, GraduationCap } from "lucide-react";
import Link from "next/link";

interface TrainingFormProps {
    initialData?: TrainingProgrammeInput & { id?: string };
    onSubmit: (data: TrainingProgrammeInput) => Promise<void>;
    isLoading?: boolean;
}

export function TrainingForm({
    initialData,
    onSubmit,
    isLoading = false
}: TrainingFormProps) {
    const form = useForm<TrainingProgrammeInput>({
        resolver: zodResolver(trainingSchema),
        defaultValues: initialData ?? {
            title: "",
            description: "",
            schedule_text: "",
            registration_url: "",
            is_published: false
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
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Programme Nomenclature</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. BIM FUNDAMENTALS"
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
                            name="registration_url"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Enrollment Endpoint (URL)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://..."
                                            className="border-4 border-black rounded-none h-16 font-black uppercase text-sm focus-visible:ring-0"
                                            {...field}
                                            value={field.value || ""}
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
                            name="schedule_text"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Temporal Schedule</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. JUNE 10 - JUNE 15, 2026"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    label="PROFESSIONAL DEVELOPMENT BRIEF"
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
                        COMMIT MODULE
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="h-20 px-12 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all"
                    >
                        <Link href="/admin/content/training">
                            <X className="mr-3 h-5 w-5" />
                            ABORT
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
