import { createClient } from '@/lib/supabase/client'
import {
    NewsPost, Event, Member, PublicMember, JobListing, GalleryAlbum,
    TrainingProgramme, RegisteredFirm, CommitteeMember, AGMRecord,
    ContactSubmission, RegistrationApplication, Broadcast,
    ForumThread, ForumReply, SitePage, JobApplication, TrainingRegistration
} from '@/types'
import { fetchMembersAction, fetchActiveMembersAction } from './actions/members'

// --- NEWS POSTS ---
export async function getPublishedNews(limit?: number): Promise<NewsPost[]> {
    const supabase = createClient()
    let query = supabase
        .from('news_posts')
        .select('*')
        .not('published_at', 'is', null)
        .order('published_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data || []
}

export async function getAllNews(page: number = 1, pageSize: number = 50): Promise<NewsPost[]> {
    const supabase = createClient()
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;
    return data || [];
}

export async function saveNews(news: Partial<NewsPost>) {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('news_posts')
        .upsert(news)
        .select()
        .single()

    if (error) throw error
    return data
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .not('published_at', 'is', null)
        .single()

    if (error) return null
    return data
}

// --- EVENTS ---
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
    const supabase = createClient()
    let query = supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .gte('start_at', new Date().toISOString())
        .order('start_at', { ascending: true })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data || []
}

export async function getAllEvents(page: number = 1, pageSize: number = 50): Promise<Event[]> {
    const supabase = createClient()
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_at', { ascending: true })
        .range(from, to);

    if (error) throw error;
    return data || [];
}

export async function getEventById(id: string): Promise<Event | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}

export async function saveEvents(events: Partial<Event> | Partial<Event>[]) {
    const supabase = createClient()
    const { error } = await supabase.from('events').upsert(events)
    if (error) throw error
}

// --- MEMBERS ---
export async function getAllMembers(): Promise<Member[]> {
    return await fetchMembersAction()
}

export async function getActiveMembers(): Promise<PublicMember[]> {
    return await fetchActiveMembersAction()
}

export async function saveMembers(members: Partial<Member> | Partial<Member>[]) {
    const supabase = createClient()
    const { error } = await supabase.from('members').upsert(members)
    if (error) throw error
}

// --- JOBS ---
export async function getActiveJobs(page: number = 1, pageSize: number = 50): Promise<JobListing[]> {
    const supabase = createClient()
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;
    return data || [];
}

export async function getAllJobs(page: number = 1, pageSize: number = 50): Promise<JobListing[]> {
    const supabase = createClient()
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) throw error;
    return data || [];
}

export async function getJobById(id: string): Promise<JobListing | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}

export async function saveJobs(jobs: Partial<JobListing> | Partial<JobListing>[]) {
    const supabase = createClient()
    const { error } = await supabase.from('job_listings').upsert(jobs)
    if (error) throw error
}

// --- GALLERY ---
export async function getAllGalleryAlbums(): Promise<GalleryAlbum[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('gallery_albums')
        .select('*, photos:gallery_photos(*)')
        .eq('is_published', true)
        .order('event_date', { ascending: false })

    if (error) throw error
    return data || []
}

export async function getAlbumById(id: string): Promise<GalleryAlbum | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('gallery_albums')
        .select('*, photos:gallery_photos(*)')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}

// --- TRAINING ---
export async function getAllTraining(): Promise<TrainingProgramme[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('training_programmes')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function getTrainingById(id: string): Promise<TrainingProgramme | null> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('training_programmes')
        .select('*')
        .eq('id', id)
        .single()

    if (error) return null
    return data
}

// --- FIRMS ---
export async function getAllFirms(): Promise<RegisteredFirm[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('registered_firms')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data || []
}

export async function getAllCommitteeMembers(): Promise<CommitteeMember[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('committee_members')
        .select('*')
        .order('is_current', { ascending: false })
        .order('name', { ascending: true })

    if (error) throw error
    return data || []
}

// --- AGM RECORDS ---
export async function getAllAGMRecords(): Promise<AGMRecord[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('agm_records')
        .select('*')
        .order('year', { ascending: false })

    if (error) throw error
    return data || []
}

export async function saveAGMRecords(records: Partial<AGMRecord> | Partial<AGMRecord>[]) {
    const supabase = createClient()
    const { error } = await supabase.from('agm_records').upsert(records)
    if (error) throw error
}

// --- FORUM ---
export async function getAllThreads(): Promise<ForumThread[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('forum_threads')
        .select('*, author:members(full_name, profile_photo_url)')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function getRepliesByThread(threadId: string): Promise<ForumReply[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('forum_replies')
        .select('*, author:members(full_name, profile_photo_url)')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
}

export async function getAllReplies(): Promise<ForumReply[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('forum_replies')
        .select('*, author:members(full_name, profile_photo_url)')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function updateForumThread(id: string, data: Partial<ForumThread>) {
    const supabase = createClient()
    const { error } = await supabase.from('forum_threads').update(data).eq('id', id)
    if (error) throw error
}

export async function deleteForumThread(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('forum_threads').delete().eq('id', id)
    if (error) throw error
}

export async function saveForumReply(reply: Partial<ForumReply>) {
    const supabase = createClient()
    const { error } = await supabase.from('forum_replies').insert([reply])
    if (error) throw error
}

// --- FORM SUBMISSIONS ---
export async function saveContactSubmission(submission: Partial<ContactSubmission>) {
    const supabase = createClient()
    const { error } = await supabase
        .from('contact_submissions')
        .insert(submission)

    if (error) throw error
}

export async function saveRegistrationApplication(app: Partial<RegistrationApplication>) {
    const supabase = createClient()
    const { error } = await supabase
        .from('membership_applications')
        .insert(app)

    if (error) throw error
}

export async function getAllApplications() {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function saveJobApplication(app: Partial<JobApplication>) {
    const supabase = createClient()
    const { error } = await supabase
        .from('job_applications')
        .insert(app)

    if (error) throw error
}

export async function getAllJobApplications(): Promise<JobApplication[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('job_applications')
        .select('*, job_listings(title, company_name)')
        .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map((app) => ({
        ...app,
        job_title: (app.job_listings as { title?: string } | null)?.title ?? 'Unknown',
        company_name: (app.job_listings as { company_name?: string } | null)?.company_name ?? 'Unknown',
        applied_at: app.created_at
    })) as JobApplication[]
}

export async function updateJobApplicationStatus(id: string, status: string) {
    const supabase = createClient()
    const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)

    if (error) throw error
}

export async function saveTrainingRegistration(reg: Partial<TrainingRegistration>) {
    const supabase = createClient()
    const { error } = await supabase
        .from('training_registrations')
        .insert(reg)

    if (error) throw error
}

export async function getAllTrainingRegistrations() {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('training_registrations')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function updateTrainingRegistrationStatus(id: string, status: string) {
    const supabase = createClient()
    const { error } = await supabase
        .from('training_registrations')
        .update({ status })
        .eq('id', id)

    if (error) throw error
}

// --- BROADCAST ---
export async function getAllBroadcasts(): Promise<Broadcast[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

export async function saveBroadcast(broadcast: Partial<Broadcast>) {
    const supabase = createClient()
    const { error } = await supabase
        .from('broadcasts')
        .insert(broadcast)

    if (error) throw error
}

// --- SITE SETTINGS & PAGES ---
export async function getSiteSettings() {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')

    if (error) throw error

    return (data || []).reduce<Record<string, unknown>>((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
}

export async function getAllPages(): Promise<SitePage[]> {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('site_pages')
        .select('*')

    if (error) throw error
    return data || []
}

export async function updateSitePage(slug: string, content: unknown) {
    const supabase = createClient()
    const { error } = await supabase
        .from('site_pages')
        .update({ content })
        .eq('slug', slug)

    if (error) throw error
}
