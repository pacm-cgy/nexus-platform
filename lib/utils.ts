import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(date))
}

export function formatRelative(date: string | Date) {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return '오늘'
  if (days === 1) return '어제'
  if (days < 7) return `${days}일 전`
  if (days < 30) return `${Math.floor(days / 7)}주 전`
  return formatDate(date)
}

export function getLevelInfo(points: number) {
  const levels = [
    { level: 1, name: '씨앗', min: 0, max: 100, color: '#8892A4' },
    { level: 2, name: '새싹', min: 100, max: 300, color: '#7ECFF4' },
    { level: 3, name: '성장', min: 300, max: 700, color: '#B8FF47' },
    { level: 4, name: '개화', min: 700, max: 1500, color: '#FF6B35' },
    { level: 5, name: '열매', min: 1500, max: 3000, color: '#FFD700' },
    { level: 6, name: '거목', min: 3000, max: Infinity, color: '#B8FF47' },
  ]
  const current = levels.find(l => points >= l.min && points < l.max) || levels[0]
  const progress = current.max === Infinity ? 100 :
    Math.round(((points - current.min) / (current.max - current.min)) * 100)
  return { ...current, progress }
}

export function getScoreLabel(score: number) {
  if (score >= 90) return { label: '최상위', color: 'text-lime' }
  if (score >= 75) return { label: '상위', color: 'text-frost' }
  if (score >= 60) return { label: '평균 이상', color: 'text-white' }
  if (score >= 40) return { label: '평균', color: 'text-gray-400' }
  return { label: '성장 중', color: 'text-ember' }
}

export function generateCertificateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = 'NX-'
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export const SAMPLE_MISSIONS = [
  {
    id: '1',
    title: '게임 클라이언트 챗봇 개발 프로젝트',
    category: 'tech',
    difficulty: 'intermediate' as const,
    duration_weeks: 3,
    certificate_issuer: '스마일게이트',
    tags: ['게임개발', 'Lua', 'AI'],
    current_participants: 15,
    max_participants: 30,
    reward_points: 200,
    is_featured: true,
    status: 'open' as const,
    description: '스마일게이트 메가포트의 실제 게임 환경에서 작동하는 고객 상담 챗봇을 개발합니다.',
    required_skills: ['Lua', '자연어 처리 기초', '게임 기획'],
    deliverables: ['챗봇 소스코드', '기술 문서', '시연 영상'],
    enterprise_id: 'sample',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: '충남 지역 기업 웹사이트 리뉴얼',
    category: 'design',
    difficulty: 'beginner' as const,
    duration_weeks: 2,
    certificate_issuer: '(주)천안테크',
    tags: ['UI/UX', 'HTML/CSS', 'Figma'],
    current_participants: 8,
    max_participants: 20,
    reward_points: 120,
    is_featured: false,
    status: 'open' as const,
    description: '충남 소재 제조업체 홈페이지의 UI/UX를 현대적으로 개선하고 사용자 경험을 향상시킵니다.',
    required_skills: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    deliverables: ['Figma 프로토타입', '구현된 웹사이트', '디자인 가이드'],
    enterprise_id: 'sample',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'SNS 마케팅 전략 기획 챌린지',
    category: 'marketing',
    difficulty: 'beginner' as const,
    duration_weeks: 2,
    certificate_issuer: '(주)오버데어코리아',
    tags: ['마케팅', 'SNS', '콘텐츠기획'],
    current_participants: 22,
    max_participants: 40,
    reward_points: 100,
    is_featured: true,
    status: 'open' as const,
    description: '실제 게임사의 신규 타이틀 출시를 위한 SNS 마케팅 전략을 수립하고 콘텐츠 캘린더를 제작합니다.',
    required_skills: ['마케팅 기초', '콘텐츠 기획', '데이터 분석'],
    deliverables: ['마케팅 전략서', '콘텐츠 캘린더', '예상 KPI 보고서'],
    enterprise_id: 'sample',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'AI 기반 농업 데이터 분석',
    category: 'research',
    difficulty: 'advanced' as const,
    duration_weeks: 4,
    certificate_issuer: '충남농업기술원',
    tags: ['데이터분석', 'Python', 'AI'],
    current_participants: 5,
    max_participants: 15,
    reward_points: 300,
    is_featured: false,
    status: 'open' as const,
    description: '충남 지역 스마트팜 센서 데이터를 분석하여 작물 생산성 향상 인사이트를 도출합니다.',
    required_skills: ['Python', '데이터 분석', '머신러닝 기초'],
    deliverables: ['분석 리포트', 'Jupyter 노트북', '시각화 대시보드'],
    enterprise_id: 'sample',
    created_at: new Date().toISOString(),
  },
]
