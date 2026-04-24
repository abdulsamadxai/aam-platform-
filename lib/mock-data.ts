import {
    NewsPost, Event, Member, PublicMember, JobListing, GalleryAlbum,
    TrainingProgramme, RegisteredFirm, CommitteeMember, AGMRecord,
    Competition, ContactSubmission, RegistrationApplication, Broadcast,
    ForumThread, ForumReply, SitePage, JobApplication, TrainingRegistration
} from '@/types'

// --- NEWS POSTS ---
export const MOCK_NEWS_POSTS: NewsPost[] = [
    {
        id: '1',
        title: 'AAM Launches New CPD Framework for 2026',
        slug: 'aam-launches-new-cpd-framework-2026',
        excerpt: 'The secretariat has announced a comprehensive update to the Continuing Professional Development requirements for all registered architects.',
        body: 'We are pleased to announce the launch of the new Continuing Professional Development (CPD) framework for 2026. This framework is designed to ensure that all registered architects in the Maldives maintain the highest standards of professional competence. The new system includes more opportunities for online learning, international collaborations, and specialized workshops focused on sustainable island architecture.',
        category: 'Announcements',
        published_at: new Date('2026-04-21').toISOString(),
        created_at: new Date('2026-04-20').toISOString(),
        updated_at: new Date('2026-04-20').toISOString(),
    },
    {
        id: '2',
        title: 'Winners of the Male Urban Renewal Competition',
        slug: 'winners-male-urban-renewal-competition',
        excerpt: 'The jury has selected the winning designs for the 2026 Male Urban Renewal Competition, focusing on green spaces and pedestrian-friendly streets.',
        body: 'After months of deliberation, the Architects Association Maldives is proud to announce the winners of the Male Urban Renewal Competition. The winning entry, "Bageechaa Male", proposed a transformative vision for the capital, integrating vertical gardens and modular shading systems to reduce the urban heat island effect. Congratulations to the winning team and all participants for their visionary contributions.',
        category: 'Industry News',
        published_at: new Date('2026-04-15').toISOString(),
        created_at: new Date('2026-04-10').toISOString(),
        updated_at: new Date('2026-04-10').toISOString(),
    },
    {
        id: '3',
        title: 'Drafting the New National Building Code: Member Consultation',
        slug: 'national-building-code-consultation',
        excerpt: 'AAM invites all professional members to provide feedback on the latest draft of the National Building Code, specifically the structural resilience sections.',
        body: 'The Ministry of National Planning, Housing and Infrastructure has released the updated draft of the National Building Code. AAM has been requested to provide professional input on the structural resilience and fire safety sections. We encourage all members to review the documents and submit their comments through our online portal to ensure the code reflects the unique challenges of our archipelagic environment.',
        category: 'Members',
        published_at: new Date('2026-04-05').toISOString(),
        created_at: new Date('2026-04-01').toISOString(),
        updated_at: new Date('2026-04-01').toISOString(),
    },
    // Adding more mock news to reach 15+
    ...Array.from({ length: 12 }).map((_, i) => ({
        id: `news-${i + 4}`,
        title: `Architectural Update - Case Study #${i + 1}`,
        slug: `architectural-update-case-study-${i + 1}`,
        excerpt: `Exploring the implementation of ${['precast concrete', 'coral stone conservation', 'solar integration', 'water harvesting'][i % 4]} in recent projects.`,
        body: `Full details of the case study regarding ${['Malé', 'Hulhumalé', 'Villingili', 'Addu City'][i % 4]} development...`,
        cover_image_url: `https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800`,
        category: i % 2 === 0 ? 'Industry News' : 'Announcements',
        published_at: i < 10 ? new Date(Date.now() - i * 86400000 * 5).toISOString() : undefined, // Some drafts
        created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
        updated_at: new Date().toISOString(),
    }))
]

// --- EVENTS ---
export const MOCK_EVENTS: Event[] = [
    {
        id: 'e1',
        title: 'BIM Fundamentals Workshop',
        description: 'A two-day intensive workshop covering Building Information Modeling workflows focusing on Revit and Archicad integration.',
        location: "Male', Maldives",
        start_at: '2026-06-15T09:00:00Z',
        end_at: '2026-06-16T17:00:00Z',
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'e2',
        title: 'Annual Architecture Symposium',
        description: 'The premier event for architectural discourse in the Maldives, featuring international keynote speakers and local case studies.',
        location: 'Crossroads Maldives',
        start_at: '2026-09-20T10:00:00Z',
        end_at: '2026-09-22T18:00:00Z',
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    ...Array.from({ length: 6 }).map((_, i) => ({
        id: `e-${i + 3}`,
        title: `Regional Meetup - ${['Huvadhu', 'Addu', 'Thiladhunmathi'][i % 3]}`,
        description: `Networking event for architects registered in the ${['Southern', 'Central', 'Northern'][i % 3]} atolls.`,
        location: ['Gadhdhoo', 'Hithadhoo', 'Kulhudhuffushi'][i % 3],
        start_at: new Date(Date.now() + (i + 1) * 30 * 86400000).toISOString(),
        is_published: i < 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }))
]

// --- MEMBERS ---
export const MOCK_MEMBERS: Member[] = [
    {
        id: 'm1', aam_id: 'AAM-001', full_name: 'Ahmed Zahir', category: 'professional', status: 'active',
        email: 'ahmed.zahir@example.mv', is_voting_eligible: true, unsubscribed: false,
        joined_at: '2015-01-01', created_at: '2015-01-01', updated_at: '2024-01-01'
    },
    {
        id: 'm2', aam_id: 'AAM-002', full_name: 'Aminath Reeem', category: 'professional', status: 'active',
        email: 'aminath.reem@example.mv', is_voting_eligible: true, unsubscribed: false,
        joined_at: '2016-03-12', created_at: '2016-03-12', updated_at: '2024-01-01'
    },
    {
        id: 'm3', aam_id: 'AAM-003', full_name: 'Mohamed Sharih', category: 'general', status: 'active',
        email: 'mohamed.sharih@example.mv', is_voting_eligible: true, unsubscribed: false,
        joined_at: '2018-05-20', created_at: '2018-05-20', updated_at: '2024-01-01'
    },
    {
        id: 'm4', aam_id: 'AAM-004', full_name: 'Fathimath Shifa', category: 'associate', status: 'active',
        email: 'fathimath.shifa@example.mv', is_voting_eligible: false, unsubscribed: false,
        joined_at: '2020-11-05', created_at: '2020-11-05', updated_at: '2024-01-01'
    },
    {
        id: 'm5', aam_id: 'AAM-005', full_name: 'Ibrahim Naeem', category: 'professional', status: 'suspended',
        email: 'ibrahim.naeem@example.mv', is_voting_eligible: true, unsubscribed: false,
        joined_at: '2014-06-12', created_at: '2014-06-12', updated_at: '2024-01-01'
    },
    ...Array.from({ length: 25 }).map((_, i) => ({
        id: `m-${i + 6}`,
        aam_id: `AAM-${(i + 6).toString().padStart(3, '0')}`,
        full_name: `${['Abdulla', 'Ali', 'Hassan', 'Ismail', 'Moosa'][i % 5]} ${['Latheef', 'Nasir', 'Shafeeq', 'Waheed', 'Zaki'][Math.floor(i / 5)]}`,
        category: (i % 3 === 0 ? 'professional' : i % 3 === 1 ? 'general' : 'associate') as 'professional' | 'general' | 'associate',
        status: 'active' as 'active' | 'suspended',
        email: `member${i + 6}@example.mv`,
        is_voting_eligible: i % 3 !== 2,
        unsubscribed: false,
        joined_at: '2022-01-01',
        created_at: '2022-01-01',
        updated_at: '2024-01-01'
    }))
]

// --- JOBS ---
export const MOCK_JOBS: JobListing[] = [
    {
        id: 'j1',
        title: 'Senior Architect',
        company_name: 'Modern Space Architects',
        description: 'We are seeking a Senior Architect with 8+ years of experience in high-end resort design and project management.',
        deadline: '2026-05-30',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: 'j2',
        title: 'Junior Draftperson',
        company_name: 'Tropical Design Studio',
        description: 'Entry-level position for a draftperson proficient in AutoCAD and Revit. Fresh graduates are welcome to apply.',
        deadline: '2026-05-15',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    ...Array.from({ length: 8 }).map((_, i) => ({
        id: `j-${i + 3}`,
        title: ['Site Architect', 'Interior Designer', 'Urban Planner'][i % 3],
        company_name: ['Island Blueprints', 'Azure Architects', 'Coral Design'][i % 3],
        description: 'Join our growing team for exciting new projects across the Maldives.',
        deadline: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        is_active: i < 7,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }))
]

// --- GALLERY ---
export const MOCK_GALLERY_ALBUMS: GalleryAlbum[] = [
    {
        id: 'g1',
        title: 'AAM AGM 2025 Highlights',
        event_date: '2025-02-20',
        cover_image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        photos: Array.from({ length: 10 }).map((_, i) => ({
            id: `p1-${i}`,
            url: `https://images.unsplash.com/photo-${1500000000000 + i * 100}?w=800`,
            caption: `AGM Session ${i + 1}`
        })),
        created_at: new Date('2025-02-21').toISOString(),
        is_published: true,
    },
    {
        id: 'g2',
        title: 'Design Competition Winners 2024',
        event_date: '2024-11-15',
        cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        photos: Array.from({ length: 8 }).map((_, i) => ({
            id: `p2-${i}`,
            url: `https://images.unsplash.com/photo-${1510000000000 + i * 100}?w=800`,
            caption: `Winning Entry ${i + 1}`
        })),
        created_at: new Date('2024-11-16').toISOString(),
        is_published: true,
    },
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `g-${i + 3}`,
        title: `Workshop: ${['Sustainability', 'Modular Living', 'Traditional Art', 'Future Male'][i]}`,
        event_date: '2025-01-10',
        cover_image_url: `https://images.unsplash.com/photo-${1520000000000 + i * 500}?w=800`,
        photos: Array.from({ length: 8 }).map((_, j) => ({
            id: `pg-${i}-${j}`,
            url: `https://images.unsplash.com/photo-${1530000000000 + (i + j) * 100}?w=800`,
            caption: `Activity ${j + 1}`
        })),
        created_at: new Date().toISOString(),
        is_published: i < 3,
    }))
]

// --- TRAINING ---
export const MOCK_TRAINING_PROGRAMMES: TrainingProgramme[] = [
    {
        id: 't1',
        title: 'Sustainable Resort Design Masterclass',
        description: 'Learn the latest techniques in sustainable resort planning, from energy efficiency to marine conservation integration.',
        schedule_text: 'Thursdays, 7 PM - 9 PM',
        registration_url: '#',
        is_published: true,
        created_at: new Date().toISOString(),
    },
    {
        id: 't2',
        title: 'Revit for Professional Practice',
        description: 'A comprehensive guide to using Revit in a collaborative professional environment.',
        schedule_text: 'Sat & Sun, 10 AM - 4 PM',
        registration_url: '#',
        is_published: true,
        created_at: new Date().toISOString(),
    },
    ...Array.from({ length: 3 }).map((_, i) => ({
        id: `t-${i + 3}`,
        title: `Professional Practice Course - Module ${i + 1}`,
        description: 'Essential knowledge for newly registered architects.',
        schedule_text: 'Monthly sessions',
        is_published: i < 2,
        created_at: new Date().toISOString(),
    }))
]

// --- FIRMS ---
export const MOCK_FIRMS: RegisteredFirm[] = [
    { id: 'f1', name: 'Azure Architects Maldives', address: 'H. Sakeena Building, Male', email: 'info@azure.mv', registered_date: '2015-06-12' },
    { id: 'f2', name: 'Coral Design Studio', address: 'M. Finifenmaage, Male', email: 'hello@coral.mv', registered_date: '2018-02-20' },
    { id: 'f3', name: 'Island Blueprints', address: 'G. Diamond House, Male', email: 'contact@islandblue.mv', registered_date: '2020-11-05' },
    ...Array.from({ length: 7 }).map((_, i) => ({
        id: `f-${i + 4}`,
        name: `${['Horizon', 'Tropical', 'Marine', 'Urban'][i % 4]} ${['Builders', 'Spaces', 'Architects', 'Studio'][i % 4]}`,
        address: 'Male, Maldives',
        email: `office@firm${i + 4}.mv`,
        registered_date: '2022-01-01',
    }))
]

// --- COMMITTEE ---
export const MOCK_COMMITTEE_MEMBERS: CommitteeMember[] = [
    { id: 'c1', name: 'Ahmed Zahir', role: 'President', is_current: true, term_start: '2024-01-01' },
    { id: 'c2', name: 'Aminath Reem', role: 'Vice President', is_current: true, term_start: '2024-01-01' },
    { id: 'c3', name: 'Mohamed Sharih', role: 'General Secretary', is_current: true, term_start: '2024-01-01' },
    { id: 'c4', name: 'Fathimath Shifa', role: 'Treasurer', is_current: true, term_start: '2024-01-01' },
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `c-${i + 5}`,
        name: `Committee Member ${i + 1}`,
        role: 'Member',
        is_current: true,
        term_start: '2024-01-01',
    }))
]

// --- AGM RECORDS ---
export const MOCK_AGM_RECORDS: AGMRecord[] = [
    { id: 'agm1', year: 2025, date_held: '2025-01-11', title: '31ST ANNUAL GENERAL MEETING', resolutions: '5 statutory resolutions adopted regarding professional accreditation protocols and CPD requirements for the upcoming term.', minutes_file_url: '' },
    { id: 'agm2', year: 2024, date_held: '2024-01-14', title: '30TH ANNUAL GENERAL MEETING', resolutions: '3 constitutional amendments passed regarding the election process for the external oversight board.', minutes_file_url: '' },
    { id: 'agm3', year: 2023, date_held: '2023-01-08', title: '29TH ANNUAL GENERAL MEETING', resolutions: '4 resolutions passed regarding the formal establishment of the architectural standards registry.', minutes_file_url: '' },
    { id: 'agm4', year: 2022, date_held: '2022-01-15', title: '28TH ANNUAL GENERAL MEETING', resolutions: '2 resolutions adopted on revision of membership categories and introduction of the student member tier.', minutes_file_url: '' },
    { id: 'agm5', year: 2021, date_held: '2021-01-10', title: '27TH ANNUAL GENERAL MEETING', resolutions: 'Emergency resolutions adopted in response to the COVID-19 pandemic, allowing virtual meetings and suspended CPD requirements for 2021.', minutes_file_url: '' },
    { id: 'agm6', year: 2020, date_held: '2020-01-12', title: '26TH ANNUAL GENERAL MEETING', resolutions: '5 resolutions passed including the approval of the AAM Strategic Plan 2020–2025.', minutes_file_url: '' },
]

// --- COMPETITIONS ---
export const MOCK_COMPETITIONS: Competition[] = [
    {
        id: 'comp1',
        title: 'Hulhumalé High-Rise Living 2026',
        slug: 'hulhumale-high-rise-living-2026',
        description: 'Propose innovative solutions for social housing in Hulhumalé Phase 2.',
        deadline: '2026-08-30',
        registration_deadline: '2026-07-15',
        prize_pool: 'MVR 500,000',
        status: 'open',
        is_published: true,
        created_at: new Date().toISOString(),
    },
    {
        id: 'comp2',
        title: 'Sustainable Island School Design',
        slug: 'sustainable-island-school-design',
        description: 'Designing climate-resilient schools for the outer islands.',
        deadline: '2025-12-01',
        registration_deadline: '2025-11-15',
        prize_pool: 'MVR 250,000',
        status: 'closed',
        is_published: true,
        created_at: new Date('2025-01-01').toISOString(),
    }
]

// --- CONTACT SUBMISSIONS ---
export const MOCK_CONTACT_SUBMISSIONS: ContactSubmission[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `cs-${i}`,
    name: i % 5 === 0 ? undefined : `Sender ${i}`,
    email: i % 5 === 0 ? undefined : `sender${i}@example.com`,
    subject: i % 3 === 0 ? 'Membership Inquiry' : 'Institutional Complaint',
    message: 'This is a mock message for testing the contact inbox functionality.',
    type: i % 3 === 0 ? 'contact' : 'complaint',
    status: i < 5 ? 'new' : 'read',
    created_at: new Date(Date.now() - i * 3600000).toISOString(),
}))

// --- APPLICATIONS ---
export const MOCK_APPLICATIONS: RegistrationApplication[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `app-${i}`,
    full_name: `Applicant ${i + 1}`,
    email: `applicant${i + 1}@example.com`,
    phone: '7771234',
    category_applied: i % 3 === 0 ? 'Professional' : 'General',
    status: i < 5 ? 'pending' : i < 10 ? 'approved' : 'rejected',
    submitted_at: new Date(Date.now() - i * 86400000).toISOString(),
}))

// --- BROADCASTS ---
export const MOCK_BROADCASTS: Broadcast[] = Array.from({ length: 10 }).map((_, i) => ({
    id: `bc-${i}`,
    type: i % 2 === 0 ? 'email' : 'sms',
    subject: i % 2 === 0 ? `Announcement #${i}` : undefined,
    body: 'This is a broadcast message body.',
    recipient_filter: { all: true },
    sent_count: 239,
    fail_count: 0,
    status: 'sent',
    sent_at: new Date(Date.now() - i * 86400000).toISOString(),
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
}))

// --- FORUM ---
export const MOCK_FORUM_THREADS: ForumThread[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `th-${i}`,
    title: `Discussion Topic #${i + 1}`,
    body: 'What are your thoughts on the recent changes to the building regulations regarding maximum height limits in residential blocks?',
    category: i % 2 === 0 ? 'Technical' : 'General',
    author_id: 'm1',
    is_pinned: i === 0,
    is_locked: false,
    reply_count: i * 2,
    created_at: new Date(Date.now() - i * 3600000).toISOString(),
    updated_at: new Date(Date.now() - i * 3600000).toISOString(),
}))

export const MOCK_FORUM_REPLIES: ForumReply[] = Array.from({ length: 40 }).map((_, i) => ({
    id: `rep-${i}`,
    thread_id: `th-${i % 15}`,
    body: `This is a mock reply #${i + 1} with some technical feedback on the discussion.`,
    author_id: MOCK_MEMBERS[i % MOCK_MEMBERS.length].id,
    is_flagged: i % 10 === 0,
    created_at: new Date(Date.now() - i * 1800000).toISOString(),
}))

// --- SITE SETTINGS ---
export const MOCK_SITE_SETTINGS = {
    hero_headline: 'The Voice of Architecture in the Maldives',
    hero_subheadline: 'Architects Association Maldives (AAM) is the official professional body representing architects across the Republic of Maldives.',
    hero_cta_primary_label: 'Explore Members',
    hero_cta_primary_url: '/members',
    hero_cta_secondary_label: 'Join AAM',
    hero_cta_secondary_url: '/register',
    org_name: 'Architects Association Maldives',
    contact_email: 'secretariat@aamaldives.mv',
    contact_address: 'Male, Republic of Maldives',
}

// --- SITE PAGES ---
export const MOCK_SITE_PAGES: Record<string, SitePage> = {
    about: {
        slug: 'about',
        title: 'About AAM',
        content: [
            { heading: 'Our History', body: 'Established in 2008, AAM has been at the forefront of the architectural profession in the Maldives.' },
            { heading: 'Our Vision', body: 'To elevate the standard of architecture and the built environment through professional excellence.' },
        ]
    },
    cpd: {
        slug: 'cpd',
        title: 'Continuing Professional Development',
        content: [
            { heading: 'Requirement Overview', body: 'All registered architects are required to complete a minimum number of CPD units annually.' },
        ]
    },
    accreditation: {
        slug: 'accreditation',
        title: 'Accreditation',
        content: [
            { heading: 'Educational Standards', body: 'AAM accredits architectural degree programmes in the Maldives to ensure they meet global standards.' },
        ]
    }
}

// --- HELPER FUNCTIONS ---

export function getPublishedNews(limit?: number): NewsPost[] {
    const news = getAllNews();
    return news
        .filter(p => !p.deleted_at && p.published_at && new Date(p.published_at) <= new Date())
        .sort((a, b) => new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime())
        .slice(0, limit)
}

export function getUpcomingEvents(limit?: number): Event[] {
    return MOCK_EVENTS
        .filter(e => !e.deleted_at && e.is_published && new Date(e.start_at) >= new Date())
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime())
        .slice(0, limit)
}

// Admin helpers
export const getAllNews = (): NewsPost[] => {
    if (typeof window === 'undefined') return [...MOCK_NEWS_POSTS];
    const local = localStorage.getItem('aam_news_data');
    if (local) {
        try {
            return JSON.parse(local);
        } catch (e) {
            return [...MOCK_NEWS_POSTS];
        }
    }
    // Initialize localStorage with mock data if not present
    localStorage.setItem('aam_news_data', JSON.stringify(MOCK_NEWS_POSTS));
    return [...MOCK_NEWS_POSTS];
}

export const saveNews = (news: NewsPost[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('aam_news_data', JSON.stringify(news));
    }
}

export function getNewsPostBySlug(slug: string): NewsPost | undefined {
    return getAllNews().find(p => p.slug === slug)
}

export function getNewsPostById(id: string): NewsPost | undefined {
    return getAllNews().find(p => p.id === id)
}

export function getEventById(id: string): Event | undefined {
    return MOCK_EVENTS.find(e => e.id === id)
}

export function getJobById(id: string): JobListing | undefined {
    return MOCK_JOBS.find(j => j.id === id)
}

export function getTrainingById(id: string): TrainingProgramme | undefined {
    return MOCK_TRAINING_PROGRAMMES.find(t => t.id === id)
}

export function getCompetitionById(id: string): Competition | undefined {
    return MOCK_COMPETITIONS.find(c => c.id === id)
}

export function getAlbumById(id: string): GalleryAlbum | undefined {
    return getAllGalleryAlbums().find(g => g.id === id)
}

export function getActiveMembers(): PublicMember[] {
    return MOCK_MEMBERS.filter(m => m.status === 'active')
}

export function getActiveJobs(): JobListing[] {
    return MOCK_JOBS
        .filter(j => !j.deleted_at && j.is_active)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function getAllGalleryAlbums(): GalleryAlbum[] {
    if (typeof window === 'undefined') {
        return [...MOCK_GALLERY_ALBUMS].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    
    const local = localStorage.getItem('aam_gallery_data');
    if (local) {
        try {
            return JSON.parse(local).sort((a: GalleryAlbum, b: GalleryAlbum) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } catch (e: unknown) {
            return [...MOCK_GALLERY_ALBUMS].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
    }
    
    localStorage.setItem('aam_gallery_data', JSON.stringify(MOCK_GALLERY_ALBUMS));
    return [...MOCK_GALLERY_ALBUMS].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function saveGalleryAlbums(albums: GalleryAlbum[]) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('aam_gallery_data', JSON.stringify(albums));
    }
}

export function getMemberStats() {
    const active = MOCK_MEMBERS.filter(m => m.status === 'active')
    return {
        total: MOCK_MEMBERS.length,
        active: active.length,
        professional: active.filter(m => m.category === 'professional').length,
        general: active.filter(m => m.category === 'general').length,
        associate: active.filter(m => m.category === 'associate').length,
        voting: active.filter(m => ['professional', 'general'].includes(m.category)).length,
    }
}

export const getAllEvents = () => [...MOCK_EVENTS]
export const getAllMembers = () => [...MOCK_MEMBERS]
export const getAllJobs = () => [...MOCK_JOBS]
export const getAllAlbums = () => [...MOCK_GALLERY_ALBUMS]
export const getAllTraining = () => [...MOCK_TRAINING_PROGRAMMES]
export const getAllFirms = () => [...MOCK_FIRMS]
export const getAllCommittee = () => [...MOCK_COMMITTEE_MEMBERS]
// --- AGM RECORDS (localStorage-backed) ---
const AGM_KEY = 'aam_agm_records';

export const getAllAGMRecords = (): AGMRecord[] => {
    if (typeof window === 'undefined') return [...MOCK_AGM_RECORDS];
    const local = localStorage.getItem(AGM_KEY);
    if (local) {
        try { return JSON.parse(local); } catch { return [...MOCK_AGM_RECORDS]; }
    }
    localStorage.setItem(AGM_KEY, JSON.stringify(MOCK_AGM_RECORDS));
    return [...MOCK_AGM_RECORDS];
};

export const saveAGMRecords = (records: AGMRecord[]): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(AGM_KEY, JSON.stringify(records));
    }
};
export const getAllCompetitions = () => [...MOCK_COMPETITIONS]
export const getAllSubmissions = () => [...MOCK_CONTACT_SUBMISSIONS]
export const getAllApplications = () => [...MOCK_APPLICATIONS]
export const getAllBroadcasts = () => [...MOCK_BROADCASTS]
// --- FORUM (localStorage-backed) ---
const FORUM_THREADS_KEY = 'aam_forum_threads';
const FORUM_REPLIES_KEY = 'aam_forum_replies';

export const getAllThreads = (): ForumThread[] => {
    if (typeof window === 'undefined') return [...MOCK_FORUM_THREADS];
    const local = localStorage.getItem(FORUM_THREADS_KEY);
    if (local) {
        try { return JSON.parse(local); } catch { return [...MOCK_FORUM_THREADS]; }
    }
    localStorage.setItem(FORUM_THREADS_KEY, JSON.stringify(MOCK_FORUM_THREADS));
    return [...MOCK_FORUM_THREADS];
};

export const saveForumThread = (thread: ForumThread): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllThreads();
    const updated = [thread, ...existing];
    localStorage.setItem(FORUM_THREADS_KEY, JSON.stringify(updated));
};

export const updateForumThread = (id: string, updates: Partial<ForumThread>): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllThreads();
    const updated = existing.map(t => t.id === id ? { ...t, ...updates } : t);
    localStorage.setItem(FORUM_THREADS_KEY, JSON.stringify(updated));
};

export const deleteForumThread = (id: string): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllThreads();
    const updated = existing.filter(t => t.id !== id);
    localStorage.setItem(FORUM_THREADS_KEY, JSON.stringify(updated));
};

export const getAllReplies = (): ForumReply[] => {
    if (typeof window === 'undefined') return [...MOCK_FORUM_REPLIES];
    const local = localStorage.getItem(FORUM_REPLIES_KEY);
    if (local) {
        try { return JSON.parse(local); } catch { return [...MOCK_FORUM_REPLIES]; }
    }
    localStorage.setItem(FORUM_REPLIES_KEY, JSON.stringify(MOCK_FORUM_REPLIES));
    return [...MOCK_FORUM_REPLIES];
};

export const saveForumReply = (reply: ForumReply): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllReplies();
    const updated = [reply, ...existing];
    localStorage.setItem(FORUM_REPLIES_KEY, JSON.stringify(updated));
    
    // Increment reply count in thread
    const threadToUpdate = getAllThreads().find(t => t.id === reply.thread_id);
    if (threadToUpdate) {
        updateForumThread(threadToUpdate.id, { reply_count: (threadToUpdate.reply_count || 0) + 1 });
    }
};

export const updateForumReply = (id: string, updates: Partial<ForumReply>): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllReplies();
    const updated = existing.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem(FORUM_REPLIES_KEY, JSON.stringify(updated));
};

export const deleteForumReply = (id: string): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllReplies();
    
    const replyToDelete = existing.find(r => r.id === id);
    if (replyToDelete) {
        // Decrement reply count in thread
        const threadToUpdate = getAllThreads().find(t => t.id === replyToDelete.thread_id);
        if (threadToUpdate && threadToUpdate.reply_count && threadToUpdate.reply_count > 0) {
            updateForumThread(threadToUpdate.id, { reply_count: threadToUpdate.reply_count - 1 });
        }
    }
    
    const updated = existing.filter(r => r.id !== id);
    localStorage.setItem(FORUM_REPLIES_KEY, JSON.stringify(updated));
};

// --- JOB APPLICATIONS (localStorage-backed) ---
const JOB_APPS_KEY = 'aam_job_applications';

export const getAllJobApplications = (): JobApplication[] => {
    if (typeof window === 'undefined') return [];
    const local = localStorage.getItem(JOB_APPS_KEY);
    if (local) {
        try { return JSON.parse(local); } catch { return []; }
    }
    return [];
};

export const saveJobApplication = (app: JobApplication): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllJobApplications();
    const updated = [app, ...existing];
    localStorage.setItem(JOB_APPS_KEY, JSON.stringify(updated));
};

export const updateJobApplicationStatus = (id: string, status: JobApplication['status']): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllJobApplications();
    const updated = existing.map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem(JOB_APPS_KEY, JSON.stringify(updated));
};

// --- TRAINING REGISTRATIONS (localStorage-backed) ---
const TRAINING_REGS_KEY = 'aam_training_registrations';

export const getAllTrainingRegistrations = (): TrainingRegistration[] => {
    if (typeof window === 'undefined') return [];
    const local = localStorage.getItem(TRAINING_REGS_KEY);
    if (local) {
        try { return JSON.parse(local); } catch { return []; }
    }
    return [];
};

export const saveTrainingRegistration = (reg: TrainingRegistration): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllTrainingRegistrations();
    const updated = [reg, ...existing];
    localStorage.setItem(TRAINING_REGS_KEY, JSON.stringify(updated));
};

export const updateTrainingRegistrationStatus = (id: string, status: TrainingRegistration['status']): void => {
    if (typeof window === 'undefined') return;
    const existing = getAllTrainingRegistrations();
    const updated = existing.map(r => r.id === id ? { ...r, status } : r);
    localStorage.setItem(TRAINING_REGS_KEY, JSON.stringify(updated));
};
