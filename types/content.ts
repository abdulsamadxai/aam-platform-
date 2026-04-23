import { Member } from './member'

export interface NewsPost {
    id: string
    title: string
    slug: string
    excerpt: string
    body: string
    cover_image_url?: string
    author_id?: string
    author?: Member
    category: string
    published_at?: string
    created_at: string
    updated_at: string
    deleted_at?: string
}

export interface Event {
    id: string
    title: string
    description: string
    location: string
    start_at: string
    end_at?: string
    cover_image_url?: string
    is_published: boolean
    created_at: string
    updated_at: string
    deleted_at?: string
}

export interface JobListing {
    id: string
    title: string
    company_name: string
    description: string
    deadline: string
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at?: string
}

export interface GalleryAlbum {
    id: string
    title: string
    event_date: string
    cover_image_url: string
    photos: GalleryPhoto[]
    is_published: boolean
    created_at: string
}

export interface GalleryPhoto {
    id: string
    url: string
    caption?: string
}

export interface TrainingProgramme {
    id: string
    title: string
    description: string
    schedule_text: string
    registration_url?: string
    is_published: boolean
    created_at: string
}

export interface RegisteredFirm {
    id: string
    name: string
    address: string
    email: string
    registered_date: string
}

export interface CommitteeMember {
    id: string
    member_id?: string
    name: string
    role: string
    photo_url?: string
    term_start: string
    term_end?: string
    is_current: boolean
}

export interface AGMRecord {
    id: string
    year: number
    date_held: string
    resolutions: string
    minutes_file_url?: string
}

export interface Competition {
    id: string
    title: string
    slug: string
    description: string
    brief_file_url?: string
    submission_url?: string
    deadline: string
    registration_deadline: string
    prize_pool: string
    status: 'open' | 'closed'
    is_published: boolean
    created_at: string
}

export interface ContactSubmission {
    id: string
    name?: string
    email?: string
    subject: string
    message: string
    type: 'contact' | 'complaint'
    status: 'new' | 'read'
    created_at: string
}

export interface RegistrationApplication {
    id: string
    full_name: string
    email: string
    phone: string
    category_applied: string
    status: 'pending' | 'approved' | 'rejected'
    submitted_at: string
}

export interface SitePage {
    slug: string
    title: string
    content: { heading: string; body: string }[]
}
