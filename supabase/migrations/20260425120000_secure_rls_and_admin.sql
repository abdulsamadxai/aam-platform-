-- 1. REVOKE EXCESSIVE PERMISSIONS
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;

REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- 2. DROP UNSAFE PUBLIC INSERT POLICIES
DROP POLICY IF EXISTS "Allow public to submit contact" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public to apply for membership" ON public.membership_applications;
DROP POLICY IF EXISTS "Allow public to apply for jobs" ON public.job_applications;
DROP POLICY IF EXISTS "Allow public to register for training" ON public.training_registrations;

-- Note: Form submissions will now be handled exclusively by Server Actions using the service_role key to insert data safely.

-- 3. CREATE ADMIN FULL ACCESS POLICIES FOR ALL TABLES
-- This ensures that users with the 'admin' role in app_metadata can perform any action on any table.

DO $$
DECLARE
    table_record record;
BEGIN
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('
            DROP POLICY IF EXISTS "Admin full access on %I" ON public.%I;
            CREATE POLICY "Admin full access on %I" ON public.%I
            FOR ALL
            USING (((auth.jwt() -> ''app_metadata'') ->> ''role'') = ''admin'');
        ', table_record.tablename, table_record.tablename, table_record.tablename, table_record.tablename);
    END LOOP;
END;
$$;
