create table if not exists public.luvelle_ai_interest (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  whatsapp text,
  business_type text,
  biggest_pain_point text not null,
  weekly_inquiries_estimate text,
  current_followup_method text,
  would_pay_if_it_recovers_clients text,
  notes text,
  source text not null default 'luvelle-ai-beta-v1',
  created_at timestamptz not null default now()
);

create index if not exists luvelle_ai_interest_created_at_idx
  on public.luvelle_ai_interest (created_at desc);

create index if not exists luvelle_ai_interest_email_idx
  on public.luvelle_ai_interest (email);

alter table public.luvelle_ai_interest enable row level security;
