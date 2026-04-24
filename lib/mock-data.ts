import { createClient } from '@/lib/supabase/client'
import {
    NewsPost, Event, Member, PublicMember, JobListing, GalleryAlbum,
    TrainingProgramme, RegisteredFirm, CommitteeMember, AGMRecord,
    Competition, ContactSubmission, RegistrationApplication, Broadcast,
    ForumThread, ForumReply, SitePage, JobApplication, TrainingRegistration
} from '@/types'
import { fetchMembersAction, fetchActiveMembersAction } from './actions/members'

const supabase = createClient()

// --- NEWS POSTS ---
export async function getPublishedNews(limit?: number): Promise<NewsPost[]> {
    let query = supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query
    if (error) throw error
    return data || []
}

export async function getAllNews(): Promise<NewsPost[]> {
    const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function saveNews(news: any) {
    const { data, error } = await supabase
        .from('news_posts')
        .upsert(news)
        .select()
        .single()
    
    if (error) throw error
    return data
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
    const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .single()
    
    if (error) return null
    return data
}

// --- EVENTS ---
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
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

export async function getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_at', { ascending: true })
    
    if (error) throw error
    return data || []
}

export async function getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}

export async function saveEvents(events: any) {
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

export async function saveMembers(members: any) {
    const { error } = await supabase.from('members').upsert(members)
    if (error) throw error
}

// --- JOBS ---
export async function getActiveJobs(): Promise<JobListing[]> {
    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function getAllJobs(): Promise<JobListing[]> {
    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function getJobById(id: string): Promise<JobListing | null> {
    const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', id)
        .single()
    
    if (error) return null
    return data
}

export async function saveJobs(jobs: any) {
    const { error } = await supabase.from('job_listings').upsert(jobs)
    if (error) throw error
}

// --- GALLERY ---
export async function getAllGalleryAlbums(): Promise<GalleryAlbum[]> {
    const { data, error } = await supabase
        .from('gallery_albums')
        .select('*, photos:gallery_photos(*)')
        .eq('is_published', true)
        .order('event_date', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function getAlbumById(id: string): Promise<GalleryAlbum | null> {
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
    const { data, error } = await supabase
        .from('training_programmes')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function getTrainingById(id: string): Promise<TrainingProgramme | null> {
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
    const { data, error } = await supabase
        .from('registered_firms')
        .select('*')
        .order('name', { ascending: true })
    
    if (error) throw error
    return data || []
}

export async function getAllCommitteeMembers(): Promise<CommitteeMember[]> {
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
    const { data, error } = await supabase
        .from('agm_records')
        .select('*')
        .order('year', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function saveAGMRecords(records: any) {
    const { error } = await supabase.from('agm_records').upsert(records)
    if (error) throw error
}

// --- FORUM ---
export async function getAllThreads(): Promise<ForumThread[]> {
    const { data, error } = await supabase
        .from('forum_threads')
        .select('*, author:members(full_name, profile_photo_url)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function getRepliesByThread(threadId: string): Promise<ForumReply[]> {
    const { data, error } = await supabase
        .from('forum_replies')
        .select('*, author:members(full_name, profile_photo_url)')
        .eq('thread_id', threadId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true })
    
    if (error) throw error
    return data || []
}

export async function getAllReplies(): Promise<ForumReply[]> {
    const { data, error } = await supabase
        .from('forum_replies')
        .select('*, author:members(full_name, profile_photo_url)')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function updateForumThread(id: string, data: any) {
    const { error } = await supabase.from('forum_threads').update(data).eq('id', id)
    if (error) throw error
}

export async function deleteForumThread(id: string) {
    const { error } = await supabase.from('forum_threads').update({ deleted_at: new Date().toISOString() }).eq('id', id)
    if (error) throw error
}

export async function saveForumReply(reply: any) {
    const { error } = await supabase.from('forum_replies').insert([reply])
    if (error) throw error
}

// --- FORM SUBMISSIONS ---
export async function saveContactSubmission(submission: Partial<ContactSubmission>) {
    const { error } = await supabase
        .from('contact_submissions')
        .insert(submission)
    
    if (error) throw error
}

export async function saveRegistrationApplication(app: Partial<RegistrationApplication>) {
    const { error } = await supabase
        .from('membership_applications')
        .insert(app)
    
    if (error) throw error
}

export async function getAllApplications() {
    const { data, error } = await supabase
        .from('membership_applications')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function saveJobApplication(app: Partial<JobApplication>) {
    const { error } = await supabase
        .from('job_applications')
        .insert(app)
    
    if (error) throw error
}

export async function getAllJobApplications(): Promise<JobApplication[]> {
    const { data, error } = await supabase
        .from('job_applications')
        .select('*, job_listings(title, company_name)')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return (data || []).map((app: any) => ({
        ...app,
        job_title: app.job_listings?.title || 'Unknown',
        company_name: app.job_listings?.company_name || 'Unknown',
        applied_at: app.created_at
    }))
}

export async function updateJobApplicationStatus(id: string, status: string) {
    const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)
    
    if (error) throw error
}

export async function saveTrainingRegistration(reg: Partial<TrainingRegistration>) {
    const { error } = await supabase
        .from('training_registrations')
        .insert(reg)
    
    if (error) throw error
}

export async function getAllTrainingRegistrations() {
    const { data, error } = await supabase
        .from('training_registrations')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function updateTrainingRegistrationStatus(id: string, status: string) {
    const { error } = await supabase
        .from('training_registrations')
        .update({ status })
        .eq('id', id)
    
    if (error) throw error
}

// --- BROADCAST ---
export async function getAllBroadcasts(): Promise<Broadcast[]> {
    const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
}

export async function saveBroadcast(broadcast: Partial<Broadcast>) {
    const { error } = await supabase
        .from('broadcasts')
        .insert(broadcast)
    
    if (error) throw error
}

// --- SITE SETTINGS & PAGES ---
export async function getSiteSettings() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
    
    if (error) throw error
    
    return data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {})
}

export async function getAllPages(): Promise<SitePage[]> {
    const { data, error } = await supabase
        .from('site_pages')
        .select('*')
    
    if (error) throw error
    return data || []
}

export async function updateSitePage(slug: string, content: any) {
    const { error } = await supabase
        .from('site_pages')
        .update({ content })
        .eq('slug', slug)
    
    if (error) throw error
}
