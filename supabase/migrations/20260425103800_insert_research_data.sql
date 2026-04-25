-- Insert data extracted from Facebook research into relevant tables

-- 1. NEWS POSTS
INSERT INTO public.news_posts (title, slug, excerpt, body, category, published_at)
VALUES (
    'Architectural Heritage Preservation Statement',
    'architectural-heritage-preservation-statement-2026',
    'AAM releases a formal statement (Noos Bayaan) regarding the preservation of "Binaavesheege Sagaafee Tharika" (Architectural Cultural Heritage) in the Maldives.',
    'The Architects Association Maldives (AAM) has released a formal statement regarding the urgent need for the preservation of "Binaavesheege Sagaafee Tharika" (Architectural Cultural Heritage) across the Maldives. The association calls upon local authorities and developers to prioritize the documentation and protection of historically significant structures that define our national identity.',
    'Announcements',
    '2026-03-10T10:00:00Z'
) ON CONFLICT (slug) DO NOTHING;

-- 2. EVENTS
INSERT INTO public.events (title, description, location, start_at, is_published)
VALUES (
    'AAM Election Assembly 2024',
    'The official general assembly and election proceedings to appoint the Executive Committee for the upcoming term.',
    'Male'', Maldives',
    '2024-05-15T14:00:00Z', -- Estimated date based on typical election cycles
    true
);

INSERT INTO public.events (title, description, location, start_at, is_published)
VALUES (
    'Sustainable Design & Heritage Workshop',
    'A professional networking and training event focusing on sustainable practices and heritage documentation for local architects.',
    'Male'', Maldives',
    '2026-02-20T09:00:00Z',
    true
);

-- 3. AGM RECORDS
INSERT INTO public.agm_records (year, date_held, title, resolutions)
VALUES (
    2024,
    '2024-05-15',
    '2024 Annual General Meeting & Election',
    'Election of the 2026-2028 Executive Committee.'
);

-- 4. GALLERY ALBUMS & PHOTOS
DO $$
DECLARE
    album1_id uuid := '11111111-1111-4111-a111-111111111111';
    album2_id uuid := '22222222-2222-4222-a222-222222222222';
    album3_id uuid := '33333333-3333-4333-a333-333333333333';
BEGIN
    INSERT INTO public.gallery_albums (id, title, event_date, cover_image_url, is_published)
    VALUES 
        (album1_id, 'ExCo 2026-2028 Portraits', '2026-04-01', 'https://images.unsplash.com/photo-1542314831-c6a4d14eff40?w=800&q=80', true),
        (album2_id, 'Heritage Sites Documentation', '2026-03-10', 'https://images.unsplash.com/photo-1590059303350-13f59e61c3db?w=800&q=80', true),
        (album3_id, 'General Assemblies & Workshops', '2026-02-20', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80', true)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.gallery_photos (album_id, url, caption)
    VALUES 
        (album1_id, 'https://images.unsplash.com/photo-1542314831-c6a4d14eff40?w=1200&q=80', 'Committee Portrait 1'),
        (album1_id, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&q=80', 'Committee Portrait 2'),
        (album2_id, 'https://images.unsplash.com/photo-1590059303350-13f59e61c3db?w=1200&q=80', 'Male Friday Mosque Documentation'),
        (album2_id, 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=1200&q=80', 'Traditional Coral Stone Architecture'),
        (album3_id, 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80', '2026 Seminar Introduction'),
        (album3_id, 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80', 'Networking Session');
END $$;
