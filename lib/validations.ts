import { z } from "zod";

export const newsPostSchema = z.object({
    title: z.string().min(5, "REQUIRED_LENGTH_NOT_MET"),
    slug: z.string().min(3, "INVALID_SLUG_PROTOCOL"),
    body: z.string().min(20, "BODY_REQUIREMENT_MINIMUM_NOT_MET"),
    category: z.string(),
    is_published: z.boolean(),
});

export type NewsPostInput = z.infer<typeof newsPostSchema>;

export const eventSchema = z.object({
    title: z.string().min(5, "REQUIRED_LENGTH_NOT_MET"),
    description: z.string().min(10, "DESCRIPTION_MINIMUM_NOT_MET"),
    location: z.string().min(3, "LOCATION_PROTOCOL_REQUIRED"),
    start_at: z.string(),
    end_at: z.string().nullable().optional(),
    is_published: z.boolean(),
});

export type EventInput = z.infer<typeof eventSchema>;

export const jobSchema = z.object({
    title: z.string().min(5, "TITLE_MINIMUM_NOT_MET"),
    company_name: z.string().min(2, "IDENTITY_REQUIRED"),
    description: z.string().min(20, "SPECIFICATION_MINIMUM_NOT_MET"),
    deadline: z.string().optional(),
    is_active: z.boolean(),
});

export type JobInput = z.infer<typeof jobSchema>;

export const trainingSchema = z.object({
    title: z.string().min(5, "TITLE_MINIMUM_NOT_MET"),
    description: z.string().min(20, "SYLLABUS_MINIMUM_NOT_MET"),
    schedule_text: z.string().min(5, "TEMPORAL_DATA_REQUIRED"),
    registration_url: z.string().url().optional().or(z.literal("")),
    is_published: z.boolean(),
});

export type TrainingInput = z.infer<typeof trainingSchema>;

export const competitionSchema = z.object({
    title: z.string().min(5, "TITLE_MINIMUM_NOT_MET"),
    description: z.string().min(20, "BRIEF_MINIMUM_NOT_MET"),
    deadline: z.string(),
    registration_deadline: z.string(),
    prize_pool: z.string().min(1, "FISCAL_DECLARATION_REQUIRED"),
    status: z.enum(["open", "closed"]),
    is_published: z.boolean(),
});

export type CompetitionInput = z.infer<typeof competitionSchema>;

export const sitePageSchema = z.object({
    title: z.string().min(3, "TITLE_MINIMUM_NOT_MET"),
    slug: z.string().min(3, "INVALID_SLUG_PROTOCOL"),
    content: z.string().min(1, "CONTENT_REQUIRED"),
});

export type SitePageInput = z.infer<typeof sitePageSchema>;
