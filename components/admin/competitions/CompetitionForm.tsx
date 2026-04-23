"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { competitionSchema, CompetitionInput } from "@/lib/validations";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";

interface CompetitionFormProps {
    initialData?: CompetitionInput & { id?: string };
    onSubmit: (data: CompetitionInput) => Promise<void>;
    isLoading?: boolean;
}

export function CompetitionForm({
    initialData,
    onSubmit,
    isLoading = false
}: CompetitionFormProps) {
    const form = useForm<CompetitionInput>({
        resolver: zodResolver(competitionSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            prize_pool: "",
            registration_deadline: "",
            status: "upcoming"
        } as any
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Competition Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ENTER NOMENCLATURE..."
                                            className="border-4 border-black rounded-none h-16 font-black uppercase tracking-tight text-sm focus-visible:ring-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] font-bold uppercase" />
                                </FormItem>
                            )}
                        />

                        {/* Prize Pool */}
                        <FormField
                            control={form.control}
                            name="prize_pool"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Prize Pool / Rewards</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. MVR 500,000 TOTAL"
                                            className="border-4 border-black rounded-none h-16 font-black uppercase tracking-tight text-sm focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] font-bold uppercase" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-12">
                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Protocol Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="border-4 border-black rounded-none h-16 font-black uppercase tracking-tight text-sm focus:ring-0">
                                                <SelectValue placeholder="SELECT STATUS" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="border-4 border-black rounded-none">
                                            <SelectItem value="upcoming">UPCOMING</SelectItem>
                                            <SelectItem value="open">OPEN / ACTIVE</SelectItem>
                                            <SelectItem value="judging">UNDER JUDGMENT</SelectItem>
                                            <SelectItem value="closed">TERMINATED / CLOSED</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Deadline */}
                        <FormField
                            control={form.control}
                            name="registration_deadline"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest">Registration Deadline</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            className="border-4 border-black rounded-none h-16 font-black uppercase tracking-tight text-sm focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RichTextEditor
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    label="COMPETITION PARAMETERS & BRIEF"
                                    height={500}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Actions */}
                <div className="flex gap-6 pt-12 border-t-8 border-black">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-20 flex-1 bg-black text-white hover:bg-mono-800 rounded-none font-black uppercase tracking-[0.2em] text-xs border-2 border-black transition-all"
                    >
                        {isLoading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Save className="mr-3 h-5 w-5" />}
                        COMMIT TO REGISTRY
                    </Button>
                    <Button
                        variant="outline"
                        asChild
                        className="h-20 px-12 border-4 border-black text-black hover:bg-black hover:text-white rounded-none font-black uppercase tracking-[0.2em] text-xs transition-all"
                    >
                        <Link href="/admin/content/competitions">
                            <X className="mr-3 h-5 w-5" />
                            ABORT
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
