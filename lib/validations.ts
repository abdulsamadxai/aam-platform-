import { z } from "zod";

export const newsPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    body: z.string().min(20, "Body content must be at least 20 characters long"),
    category: z.string(),
    is_published: z.boolean(),
});

export type NewsPostInput = z.infer<typeof newsPostSchema>;

export const eventSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    location: z.string().min(3, "Location is required"),
    start_at: z.string(),
    end_at: z.string().nullable().optional(),
    is_published: z.boolean(),
});

export type EventInput = z.infer<typeof eventSchema>;

export const jobSchema = z.object({
    title: z.string().min(5, "Job title must be at least 5 characters long"),
    company_name: z.string().min(2, "Company name is required"),
    description: z.string().min(20, "Job description must be at least 20 characters long"),
    deadline: z.string().optional(),
    is_active: z.boolean(),
});

export type JobInput = z.infer<typeof jobSchema>;

export const trainingSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z.string().min(20, "Syllabus description must be at least 20 characters long"),
    schedule_text: z.string().min(5, "Schedule details are required"),
    registration_url: z.string().url().optional().or(z.literal("")),
    is_published: z.boolean(),
});

export type TrainingInput = z.infer<typeof trainingSchema>;

export const competitionSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    description: z.string().min(20, "Brief description must be at least 20 characters long"),
    deadline: z.string(),
    registration_deadline: z.string(),
    prize_pool: z.string().min(1, "Prize pool information is required"),
    status: z.enum(["open", "closed"]),
    is_published: z.boolean(),
});

export type CompetitionInput = z.infer<typeof competitionSchema>;

export const sitePageSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    content: z.string().min(1, "Content is required"),
});

export type SitePageInput = z.infer<typeof sitePageSchema>;

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    status: z.string().optional().default('new')
});

export const registrationSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Valid phone number required"),
    category_applied: z.enum(["professional", "general", "associate"]),
    university: z.string().min(2, "University is required"),
    graduation_year: z.string().min(4, "Graduation year is required"),
    experience_years: z.string(),
    documents_url: z.string().url("A valid URL to your documents is required"),
});

export const jobApplicationSchema = z.object({
    job_id: z.string().uuid(),
    applicant_name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone is required"),
    resume_url: z.string().url("A valid URL to your resume is required"),
    cover_letter: z.string().optional(),
});

export const trainingRegistrationSchema = z.object({
    training_id: z.string().uuid(),
    registrant_name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone is required"),
});
