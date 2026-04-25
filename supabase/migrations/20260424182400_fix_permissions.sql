-- GRANT PERMISSIONS: principle of least privilege
-- postgres and service_role get full access (needed for triggers and admin operations)
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- authenticated users get SELECT/INSERT/UPDATE/DELETE, but NOT TRUNCATE/REFERENCES/TRIGGER
-- RLS policies restrict which rows they can actually touch
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- anon users get SELECT only (plus INSERT for public form submissions, controlled via RLS)
-- RLS policies control which rows they can read or insert into
GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
