"use server";

import { createClient } from "@/lib/supabase/server";
import { contactSchema, registrationSchema, jobApplicationSchema, trainingRegistrationSchema } from "@/lib/validations";
import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitContactForm(formData: z.infer<typeof contactSchema>) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  if (!checkRateLimit(ip)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const result = contactSchema.safeParse(formData);
  if (!result.success) {
    throw new Error("Validation failed");
  }

  const supabase = await createClient();
  // Using service role client here is necessary because we removed public insert RLS policies
  const { createAdminClient } = await import("@/lib/supabase/admin");
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("contact_submissions")
    .insert(result.data);

  if (error) {
    throw new Error("Failed to submit contact form");
  }
}

export async function submitRegistrationForm(formData: z.infer<typeof registrationSchema>) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  if (!checkRateLimit(ip)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const result = registrationSchema.safeParse(formData);
  if (!result.success) {
    throw new Error("Validation failed");
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("membership_applications")
    .insert(result.data);

  if (error) {
    throw new Error("Failed to submit registration application");
  }
}

export async function submitJobApplication(formData: z.infer<typeof jobApplicationSchema>) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  if (!checkRateLimit(ip, 10, 60000)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const result = jobApplicationSchema.safeParse(formData);
  if (!result.success) {
    throw new Error("Validation failed");
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("job_applications")
    .insert(result.data);

  if (error) {
    throw new Error("Failed to submit job application");
  }
}

export async function submitTrainingRegistration(formData: z.infer<typeof trainingRegistrationSchema>) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  if (!checkRateLimit(ip, 10, 60000)) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const result = trainingRegistrationSchema.safeParse(formData);
  if (!result.success) {
    throw new Error("Validation failed");
  }

  const { createAdminClient } = await import("@/lib/supabase/admin");
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("training_registrations")
    .insert(result.data);

  if (error) {
    throw new Error("Failed to submit training registration");
  }
}
