-- Add RLS policy to allow members to read their own profile
create policy "Allow members to read their own profile" 
on public.members 
for select 
using (auth.uid() = id);

-- Add RLS policy to allow members to update their own profile
create policy "Allow members to update their own profile" 
on public.members 
for update 
using (auth.uid() = id)
with check (auth.uid() = id);
