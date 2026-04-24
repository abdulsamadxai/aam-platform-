-- STORAGE POLICIES

-- Gallery: Public Read, Admin All
create policy "Allow public to view gallery" on storage.objects for select using (bucket_id = 'gallery');
create policy "Allow admins to manage gallery" on storage.objects for all using (bucket_id = 'gallery' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- News Images: Public Read, Admin All
create policy "Allow public to view news images" on storage.objects for select using (bucket_id = 'news-images');
create policy "Allow admins to manage news images" on storage.objects for all using (bucket_id = 'news-images' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Job CVs: Admin Read, Public Insert
create policy "Allow public to upload CVs" on storage.objects for insert with check (bucket_id = 'job-cvs');
create policy "Allow admins to manage CVs" on storage.objects for all using (bucket_id = 'job-cvs' and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
