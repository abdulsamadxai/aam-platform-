-- TRIGGER: on_auth_user_created
-- Automatically creates a entry in public.members when a new user is created in auth.users

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.members (id, full_name, email, status, category)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data ->> 'full_name', 'NEW_MEMBER'), 
    new.email, 
    'pending', 
    'general'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
