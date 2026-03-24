-- ============================================================
-- NEXUS Platform — Supabase Database Schema
-- Supabase Dashboard > SQL Editor 에 붙여넣고 실행하세요
-- ============================================================

-- 사용자 프로필 (Supabase auth.users와 연동)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text not null check (role in ('student','enterprise','mentor')) default 'student',
  name text not null,
  avatar_url text,
  bio text,
  school text,
  grade int,
  region text default '충청남도',
  skills text[] default '{}',
  interests text[] default '{}',
  points int default 0,
  level int default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 역량 진단 결과
create table public.assessments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  logic_score int default 0,         -- 논리력 (0-100)
  creativity_score int default 0,    -- 창의력 (0-100)
  communication_score int default 0, -- 소통 능력 (0-100)
  collaboration_score int default 0, -- 협업 능력 (0-100)
  tech_score int default 0,          -- 기술 역량 (0-100)
  leadership_score int default 0,    -- 리더십 (0-100)
  growth_rate float default 0,       -- 성장 속도
  total_score int generated always as (
    (logic_score + creativity_score + communication_score + collaboration_score + tech_score + leadership_score) / 6
  ) stored,
  answers jsonb,
  created_at timestamptz default now()
);

-- 기업/프로젝트 미션
create table public.missions (
  id uuid default gen_random_uuid() primary key,
  enterprise_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null, -- 'tech','marketing','design','planning','research'
  difficulty text not null check (difficulty in ('beginner','intermediate','advanced')),
  duration_weeks int not null default 2,
  max_participants int default 30,
  current_participants int default 0,
  required_skills text[] default '{}',
  deliverables text[] default '{}',
  reward_points int default 100,
  certificate_issuer text, -- 기업명
  status text default 'open' check (status in ('open','in_progress','closed','completed')),
  deadline timestamptz,
  tags text[] default '{}',
  thumbnail_url text,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 미션 참여 신청
create table public.mission_applications (
  id uuid default gen_random_uuid() primary key,
  mission_id uuid references public.missions(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending','accepted','rejected','completed')),
  motivation text,
  team_name text,
  grade text, -- 'S','A','B','C'
  feedback text,
  certificate_url text,
  applied_at timestamptz default now(),
  completed_at timestamptz,
  unique(mission_id, user_id)
);

-- 커리어 리포트
create table public.career_reports (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  month text not null, -- 'YYYY-MM'
  summary text,
  strengths text[],
  improvements text[],
  recommended_companies jsonb,
  growth_prediction jsonb,
  missions_completed int default 0,
  badges_earned text[] default '{}',
  pdf_url text,
  created_at timestamptz default now()
);

-- 뱃지/성취
create table public.badges (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  badge_type text not null,
  badge_name text not null,
  description text,
  icon text,
  earned_at timestamptz default now()
);

-- 공지/활동 피드
create table public.activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null, -- 'mission_complete','badge_earned','assessment','report'
  title text not null,
  description text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- ─── RLS (Row Level Security) 설정 ───

alter table public.profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.missions enable row level security;
alter table public.mission_applications enable row level security;
alter table public.career_reports enable row level security;
alter table public.badges enable row level security;
alter table public.activities enable row level security;

-- profiles: 본인만 수정, 전체 조회 가능
create policy "profiles_select" on public.profiles for select using (true);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

-- assessments: 본인만
create policy "assessments_select" on public.assessments for select using (auth.uid() = user_id);
create policy "assessments_insert" on public.assessments for insert with check (auth.uid() = user_id);

-- missions: 전체 조회, 기업만 생성
create policy "missions_select" on public.missions for select using (true);
create policy "missions_insert" on public.missions for insert with check (auth.uid() = enterprise_id);
create policy "missions_update" on public.missions for update using (auth.uid() = enterprise_id);

-- applications: 본인 + 해당 기업
create policy "applications_select" on public.mission_applications for select
  using (auth.uid() = user_id or auth.uid() in (
    select enterprise_id from public.missions where id = mission_id
  ));
create policy "applications_insert" on public.mission_applications for insert
  with check (auth.uid() = user_id);

-- career_reports: 본인만
create policy "reports_select" on public.career_reports for select using (auth.uid() = user_id);

-- badges: 본인 + 전체 조회
create policy "badges_select" on public.badges for select using (true);

-- activities: 본인만
create policy "activities_select" on public.activities for select using (auth.uid() = user_id);

-- ─── 신규 가입 시 자동 profile 생성 함수 ───
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── 샘플 미션 데이터 ───
-- (profiles에 enterprise 계정 생성 후 enterprise_id를 실제 uuid로 교체하세요)
-- insert into public.missions (enterprise_id, title, description, category, difficulty, duration_weeks, certificate_issuer, tags)
-- values ('enterprise-uuid-here', '..', '..', 'tech', 'intermediate', 3, '스마일게이트', ARRAY['게임개발','Lua']);
