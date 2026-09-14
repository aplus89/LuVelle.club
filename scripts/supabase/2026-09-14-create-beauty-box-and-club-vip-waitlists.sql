-- Dedicated waitlist tables for LuVelle consumer experiments.
-- Run in the Supabase SQL editor before merging the frontend wiring.

create extension if not exists pgcrypto;

create table if not exists public.beauty_box_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text,
  preferred_category text not null,
  purchase_preference text,
  approximate_budget text,
  must_have text,
  source text not null default 'beauty-box-waitlist-v1',
  created_at timestamptz not null default now()
);

create index if not exists beauty_box_waitlist_created_at_idx
  on public.beauty_box_waitlist (created_at desc);

create index if not exists beauty_box_waitlist_email_idx
  on public.beauty_box_waitlist (lower(email));

alter table public.beauty_box_waitlist enable row level security;

create table if not exists public.club_vip_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  whatsapp text,
  benefits text[] not null default '{}',
  monthly_beauty_spend text not null,
  membership_intent text not null,
  open_feedback text,
  source text not null default 'club-vip-waitlist-v1',
  created_at timestamptz not null default now()
);

create index if not exists club_vip_waitlist_created_at_idx
  on public.club_vip_waitlist (created_at desc);

create index if not exists club_vip_waitlist_email_idx
  on public.club_vip_waitlist (lower(email));

alter table public.club_vip_waitlist enable row level security;

-- No anonymous insert policy is intentionally created.
-- The website writes through server actions using SUPABASE_SERVICE_ROLE_KEY.
