-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- MEMBERS TABLE
create table public.members (
    id uuid references auth.users on delete cascade primary key,
    aam_id text unique,
    full_name text not null,
    email text unique,
    phone text,
    category text check (category in ('professional', 'general', 'associate')),
    status text default 'pending' check (status in ('pending', 'active', 'suspended')),
    profile_photo_url text,
    bio text,
    firm_name text,
    registration_date timestamp with time zone,
    renewal_date timestamp with time zone,
    is_voting_eligible boolean default false,
    unsubscribed boolean default false,
    joined_at timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- NEWS POSTS
create table public.news_posts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    slug text unique not null,
    excerpt text,
    body text not null,
    cover_image_url text,
    author_id uuid references public.members(id),
    category text,
    published_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    deleted_at timestamp with time zone
);

-- EVENTS
create table public.events (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    location text,
    start_at timestamp with time zone not null,
    end_at timestamp with time zone,
    cover_image_url text,
    is_published boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- JOB LISTINGS
create table public.job_listings (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    company_name text not null,
    description text not null,
    deadline timestamp with time zone,
    is_active boolean default true,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    deleted_at timestamp with time zone
);

-- GALLERY
create table public.gallery_albums (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    event_date date,
    cover_image_url text,
    is_published boolean default false,
    created_at timestamp with time zone default now()
);

create table public.gallery_photos (
    id uuid default uuid_generate_v4() primary key,
    album_id uuid references public.gallery_albums(id) on delete cascade,
    url text not null,
    caption text,
    created_at timestamp with time zone default now()
);

-- TRAINING
create table public.training_programmes (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text,
    schedule_text text,
    registration_url text,
    is_published boolean default false,
    created_at timestamp with time zone default now()
);

-- FIRMS
create table public.registered_firms (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    registration_number text,
    address text,
    email text,
    principal_architect text,
    category text,
    status text default 'active',
    registered_date date default current_date
);

-- COMMITTEE
create table public.committee_members (
    id uuid default uuid_generate_v4() primary key,
    member_id uuid references public.members(id),
    name text not null,
    role text not null,
    photo_url text,
    term_start date not null,
    term_end date,
    is_current boolean default true
);

-- APPLICATIONS
create table public.membership_applications (
    id uuid default uuid_generate_v4() primary key,
    full_name text not null,
    email text not null,
    phone text not null,
    category_applied text not null,
    status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
    submitted_at timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

create table public.job_applications (
    id uuid default uuid_generate_v4() primary key,
    job_id uuid references public.job_listings(id) on delete cascade,
    full_name text not null,
    email text not null,
    phone text not null,
    nationality text,
    years_experience text,
    current_employer text,
    cover_letter text,
    portfolio_url text,
    status text default 'new' check (status in ('new', 'reviewed', 'shortlisted', 'rejected')),
    applied_at timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

create table public.training_registrations (
    id uuid default uuid_generate_v4() primary key,
    training_id uuid references public.training_programmes(id),
    full_name text not null,
    email text not null,
    phone text not null,
    company text,
    notes text,
    status text default 'new',
    applied_at timestamp with time zone default now(),
    created_at timestamp with time zone default now()
);

-- CONTACT SUBMISSIONS
create table public.contact_submissions (
    id uuid default uuid_generate_v4() primary key,
    name text,
    email text,
    subject text not null,
    message text not null,
    type text default 'contact',
    status text default 'new',
    created_at timestamp with time zone default now()
);

-- BROADCASTS
create table public.broadcasts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    message text not null,
    recipient_category text,
    sent_by uuid references public.members(id),
    created_at timestamp with time zone default now()
);

-- SITE SETTINGS
create table public.site_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamp with time zone default now()
);

-- SITE PAGES (STATIC CONTENT)
create table public.site_pages (
    slug text primary key,
    title text not null,
    content jsonb not null default '[]'::jsonb,
    updated_at timestamp with time zone default now()
);

-- FORUM
create table public.forum_threads (
    id uuid default uuid_generate_v4() primary key,
    author_id uuid references public.members(id),
    title text not null,
    category text,
    content text,
    is_pinned boolean default false,
    is_locked boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create table public.forum_replies (
    id uuid default uuid_generate_v4() primary key,
    thread_id uuid references public.forum_threads(id) on delete cascade,
    author_id uuid references public.members(id),
    content text not null,
    created_at timestamp with time zone default now()
);

-- AGM RECORDS
create table public.agm_records (
    id uuid default uuid_generate_v4() primary key,
    year integer not null,
    date_held date,
    title text not null,
    resolutions text,
    minutes_file_url text,
    created_at timestamp with time zone default now()
);

-- RLS POLICIES --

-- Enable RLS
alter table public.members enable row level security;
alter table public.news_posts enable row level security;
alter table public.events enable row level security;
alter table public.job_listings enable row level security;
alter table public.gallery_albums enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.training_programmes enable row level security;
alter table public.membership_applications enable row level security;
alter table public.job_applications enable row level security;
alter table public.site_pages enable row level security;
alter table public.forum_threads enable row level security;
alter table public.forum_replies enable row level security;
alter table public.agm_records enable row level security;

alter table public.registered_firms enable row level security;
alter table public.committee_members enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.broadcasts enable row level security;
alter table public.site_settings enable row level security;
alter table public.training_registrations enable row level security;

-- Public read access for content
create policy "Allow public read news_posts" on public.news_posts for select using (published_at is not null);
create policy "Allow public read events" on public.events for select using (is_published = true);
create policy "Allow public read job_listings" on public.job_listings for select using (is_active = true and deleted_at is null);
create policy "Allow public read gallery_albums" on public.gallery_albums for select using (is_published = true);
create policy "Allow public read gallery_photos" on public.gallery_photos for select using (true);
create policy "Allow public read training" on public.training_programmes for select using (is_published = true);
create policy "Allow public read site_pages" on public.site_pages for select using (true);
create policy "Allow public read firms" on public.registered_firms for select using (status = 'active');
create policy "Allow public read committee" on public.committee_members for select using (true);

-- Member access for forum
create policy "Allow members to read threads" on public.forum_threads for select using (auth.role() = 'authenticated');
create policy "Allow members to create threads" on public.forum_threads for insert with check (auth.role() = 'authenticated');
create policy "Allow members to read replies" on public.forum_replies for select using (auth.role() = 'authenticated');
create policy "Allow members to create replies" on public.forum_replies for insert with check (auth.role() = 'authenticated');

-- Public insert for forms
create policy "Allow public to submit contact" on public.contact_submissions for insert with check (true);
create policy "Allow public to apply for membership" on public.membership_applications for insert with check (true);
create policy "Allow public to apply for jobs" on public.job_applications for insert with check (true);
create policy "Allow public to register for training" on public.training_registrations for insert with check (true);


-- Admin full access (using service role or specific admin check)
-- For now, let's assume we check app_metadata.role via a function if needed, 
-- but service role bypasses RLS anyway.
