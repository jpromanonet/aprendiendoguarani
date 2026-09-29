-- Avañe'ẽ — Nivel 1 (15 clases)
-- Correr en Supabase → SQL Editor

create extension if not exists "pgcrypto";

-- Perfil del alumno
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Progreso por clase (clase-1 … clase-15)
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  class_slug text not null,
  completed boolean not null default false,
  percent int not null default 0 check (percent between 0 and 100),
  last_seen_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, class_slug)
);

-- Autoevaluaciones con reintentos absolutos
create table if not exists public.self_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  class_slug text not null,
  attempt int not null check (attempt >= 1),
  max_attempts int not null default 5 check (max_attempts >= 1),
  score int not null check (score between 0 and 100),
  passed boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, class_slug, attempt)
);

-- Certificado Nivel 1 (cuando las 15 clases estén completas)
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  level_slug text not null default 'nivel-1',
  code text not null unique,
  issued_at timestamptz not null default now(),
  pdf_url text,
  unique (user_id, level_slug)
);

create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);
create index if not exists self_assessments_user_class_idx on public.self_assessments (user_id, class_slug);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.self_assessments enable row level security;
alter table public.certificates enable row level security;

-- Policies: cada alumno solo ve / escribe lo suyo
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "progress_select_own" on public.lesson_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.lesson_progress
  for update using (auth.uid() = user_id);

create policy "assess_select_own" on public.self_assessments
  for select using (auth.uid() = user_id);
create policy "assess_insert_own" on public.self_assessments
  for insert with check (auth.uid() = user_id);

create policy "certs_select_own" on public.certificates
  for select using (auth.uid() = user_id);

-- Crear perfil al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Avatars (foto de perfil)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatars_public_read"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "avatars_insert_own"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars_update_own"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars_delete_own"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
