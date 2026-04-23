"use server";

export async function approveApplication(applicationId: string) {
    await new Promise((r) => setTimeout(r, 500));
    return { aamId: `AAM-${Date.now()}`, error: null };
}

export async function rejectApplication(applicationId: string) {
    await new Promise((r) => setTimeout(r, 500));
    return { error: null };
}
