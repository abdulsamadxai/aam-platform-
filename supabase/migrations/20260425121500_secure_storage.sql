-- Secure the 'avatars' bucket
-- Note: Assuming the bucket 'avatars' was already created elsewhere. If not, you may need to insert it:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;

-- Restrict uploads to the 'avatars' bucket to max 2MB and specific MIME types
CREATE POLICY "Avatar uploads restricted"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'avatars' AND
    (auth.uid()::text = (string_to_array(name, '-'))[1]) AND -- Ensure user is uploading to their own prefix (user.id-...)
    (LOWER(SUBSTRING(name FROM '\.([^\.]+)$')) IN ('jpg', 'jpeg', 'png', 'webp')) -- Basic extension check via SQL
);

-- Note: True MIME type and Size limit checking is best configured in the Supabase Dashboard under Storage -> Bucket settings, 
-- where you can set "Allowed MIME types" to image/jpeg, image/png, image/webp and "Maximum file size" to 2MB.
-- This SQL provides a secondary layer of prefix/extension enforcement via RLS.
