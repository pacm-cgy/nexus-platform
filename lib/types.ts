export type UserRole = 'student' | 'enterprise' | 'mentor'
export type MissionStatus = 'open' | 'in_progress' | 'closed' | 'completed'
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'completed'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Profile {
  id: string
  role: UserRole
  name: string
  avatar_url?: string
  bio?: string
  school?: string
  grade?: number
  region: string
  skills: string[]
  interests: string[]
  points: number
  level: number
  created_at: string
}

export interface Assessment {
  id: string
  user_id: string
  logic_score: number
  creativity_score: number
  communication_score: number
  collaboration_score: number
  tech_score: number
  leadership_score: number
  total_score: number
  growth_rate: number
  created_at: string
}

export interface Mission {
  id: string
  enterprise_id: string
  title: string
  description: string
  category: string
  difficulty: Difficulty
  duration_weeks: number
  max_participants: number
  current_participants: number
  required_skills: string[]
  deliverables: string[]
  reward_points: number
  certificate_issuer?: string
  status: MissionStatus
  deadline?: string
  tags: string[]
  thumbnail_url?: string
  is_featured: boolean
  created_at: string
  profiles?: Profile
}

export interface MissionApplication {
  id: string
  mission_id: string
  user_id: string
  status: ApplicationStatus
  motivation?: string
  team_name?: string
  grade?: string
  feedback?: string
  certificate_url?: string
  applied_at: string
  completed_at?: string
  missions?: Mission
  profiles?: Profile
}

export interface CareerReport {
  id: string
  user_id: string
  month: string
  summary?: string
  strengths?: string[]
  improvements?: string[]
  recommended_companies?: RecommendedCompany[]
  growth_prediction?: GrowthPrediction
  missions_completed: number
  badges_earned: string[]
  pdf_url?: string
  created_at: string
}

export interface RecommendedCompany {
  name: string
  match_score: number
  required_skills: string[]
  timeline: string
}

export interface GrowthPrediction {
  months: string[]
  scores: number[]
  milestone: string
}

export interface Badge {
  id: string
  user_id: string
  badge_type: string
  badge_name: string
  description?: string
  icon?: string
  earned_at: string
}

export interface DifficultyConfig {
  label: string
  color: string
  bg: string
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  beginner: { label: '입문', color: 'text-lime', bg: 'bg-lime/10' },
  intermediate: { label: '중급', color: 'text-frost', bg: 'bg-frost/10' },
  advanced: { label: '고급', color: 'text-ember', bg: 'bg-ember/10' },
}

export const CATEGORY_LABELS: Record<string, string> = {
  tech: '개발·기술',
  marketing: '마케팅',
  design: '디자인',
  planning: '기획',
  research: '리서치',
}
