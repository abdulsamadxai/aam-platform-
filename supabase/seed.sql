-- SEED SITE PAGES
insert into public.site_pages (slug, title, content) values
('about', 'About AAM', '[{"heading": "Our History", "body": "The Architects Association Maldives (AAM) was founded to establish and uphold professional standards..."}, {"heading": "Mission", "body": "To advance the professional practice of architecture in the Maldives..."}, {"heading": "Vision", "body": "A Maldives where architecture is practiced at the highest international standards..."}]'),
('constitution', 'Constitution', '[{"heading": "Article 1", "body": "The name of the association shall be Architects Association Maldives..."}, {"heading": "Article 2", "body": "The objectives of the association are to promote the advancement of architecture..."}]');

-- SEED NEWS POSTS (EXAMPLE)
-- Note: author_id needs to be a real user ID, so we leave it null for now or use a placeholder if we had one.
insert into public.news_posts (title, slug, excerpt, body, category, published_at) values
('AAM Annual General Meeting 2026', 'aam-agm-2026', 'The annual gathering of all registered architects to discuss the future of the profession.', 'The 2026 AGM will be held at the National Art Gallery on June 15th...', 'Announcements', now()),
('New Regulatory Framework for Sustainable Design', 'sustainable-design-framework', 'AAM releases new guidelines for coastal architecture and sustainable construction.', 'In collaboration with the Ministry, AAM has developed a comprehensive framework...', 'Regulations', now());

-- SEED JOB LISTINGS
insert into public.job_listings (title, company_name, description, deadline, is_active) values
('Senior Architect', 'ArcStudio Maldives', 'We are looking for a senior architect with 10+ years experience in luxury resort design.', '2026-12-31', true),
('Junior Draftsperson', 'BluePrint Maldives', 'Entry level position for recent graduates proficient in Revit and AutoCAD.', '2026-11-30', true);

-- SEED TRAINING PROGRAMMES
insert into public.training_programmes (title, description, schedule_text, is_published) values
('Sustainable Coastal Architecture', 'A 4-week intensive module on designing for the Maldivian environment.', 'Starts June 1st, Mondays and Wednesdays 4pm-6pm.', true),
('Professional Practice & Ethics', 'Mandatory CPE module for all general members seeking professional status.', 'Self-paced online module.', true);
