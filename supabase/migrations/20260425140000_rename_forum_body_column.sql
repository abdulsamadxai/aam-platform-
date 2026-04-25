-- Rename 'content' to 'body' on forum tables to match the TypeScript types and all application code.
-- The TypeScript types (ForumThread, ForumReply) and all components use 'body', not 'content'.
ALTER TABLE public.forum_threads RENAME COLUMN content TO body;
ALTER TABLE public.forum_replies RENAME COLUMN content TO body;
