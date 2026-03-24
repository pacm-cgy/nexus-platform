'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, Clock, Users, Star, Zap, Target } from 'lucide-react'
import { SAMPLE_MISSIONS } from '@/lib/utils'
import { DIFFICULTY_CONFIG, CATEGORY_LABELS, type Mission } from '@/lib/types'


const ALL_CATEGORIES = ['전체', 'tech', 'marketing', 'design', 'planning', 'research']
const ALL_DIFFICULTIES = ['전체', 'beginner', 'intermediate', 'advanced']

export default function MissionsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')
  const [difficulty, setDifficulty] = useState('전체')
  const [sortBy, setSortBy] = useState<'latest' | 'points' | 'popular'>('latest')

  const filtered = useMemo(() => {
    return SAMPLE_MISSIONS
      .filter(m => {
        const matchSearch = !search ||
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          m.certificate_issuer?.toLowerCase().includes(search.toLowerCase()) ||
          m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
        const matchCategory = category === '전체' || m.category === category
        const matchDifficulty = difficulty === '전체' || m.difficulty === difficulty
        return matchSearch && matchCategory && matchDifficulty
      })
      .sort((a, b) => {
        if (sortBy === 'points') return b.reward_points - a.reward_points
        if (sortBy === 'popular') return b.current_participants - a.current_participants
        return 0
      })
  }, [search, category, difficulty, sortBy])

  return (
    <div className="max-w-7xl mx-auto space-y-8">

        {/* 헤더 */}
        <div>
          <div className="text-lime text-xs font-mono tracking-[0.3em] mb-2">LIVE MISSIONS</div>
          <h1 className="text-3xl font-bold text-white mb-2">미션 탐색</h1>
          <p className="text-gray-400 text-sm">실제 기업의 프로젝트에 참여하고 역량을 증명하세요.</p>
        </div>

        {/* 검색 + 필터 */}
        <div className="space-y-4">
          {/* 검색바 */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="미션 제목, 기업명, 기술 스택 검색..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-12 py-4 text-base"
            />
          </div>

          {/* 필터 행 */}
          <div className="flex flex-wrap gap-3">
            {/* 카테고리 */}
            <div className="flex gap-2 flex-wrap">
              {ALL_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${category === cat
                      ? 'bg-lime text-navy-900'
                      : 'bg-navy-800 text-gray-400 hover:text-white border border-white/10'
                    }`}>
                  {cat === '전체' ? '전체' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            {/* 구분선 */}
            <div className="w-px bg-white/10 self-stretch" />

            {/* 난이도 */}
            <div className="flex gap-2 flex-wrap">
              {ALL_DIFFICULTIES.map(diff => (
                <button key={diff} onClick={() => setDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                    ${difficulty === diff
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-navy-800 text-gray-400 hover:text-white border border-white/10'
                    }`}>
                  {diff === '전체' ? '전체 난이도' : DIFFICULTY_CONFIG[diff as keyof typeof DIFFICULTY_CONFIG]?.label}
                </button>
              ))}
            </div>

            {/* 정렬 */}
            <div className="ml-auto">
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="bg-navy-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-400
                           focus:outline-none focus:border-lime/30">
                <option value="latest">최신순</option>
                <option value="points">포인트순</option>
                <option value="popular">인기순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 결과 수 */}
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            <span className="text-white font-medium">{filtered.length}개</span>의 미션
          </p>
          <div className="flex items-center gap-2 text-lime text-xs font-mono">
            <Zap size={12} /> 실시간 업데이트 중
          </div>
        </div>

        {/* 미션 그리드 */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Target size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">검색 조건에 맞는 미션이 없습니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((mission) => (
              <MissionCard key={mission.id} mission={mission as any} />
            ))}
          </div>
        )}
      </div>
  )
}

function MissionCard({ mission }: { mission: any }) {
  const diff = DIFFICULTY_CONFIG[mission.difficulty as keyof typeof DIFFICULTY_CONFIG]
  const participantPct = Math.round((mission.current_participants / mission.max_participants) * 100)

  return (
    <Link href={`/missions/${mission.id}`}>
      <div className="card-hover h-full flex flex-col group">
        {/* 상단 배지 행 */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.color} ${diff.bg}`}>
            {diff.label}
          </span>
          {mission.is_featured && (
            <span className="text-xs bg-lime/10 text-lime px-2 py-1 rounded-full flex items-center gap-1">
              <Star size={10} className="fill-lime" /> 추천
            </span>
          )}
        </div>

        {/* 기업명 */}
        <div className="text-gray-500 text-xs font-mono mb-2">{mission.certificate_issuer}</div>

        {/* 제목 */}
        <h3 className="text-white font-bold text-base mb-3 group-hover:text-lime transition-colors line-clamp-2">
          {mission.title}
        </h3>

        {/* 설명 */}
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
          {mission.description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mission.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="badge-tag">{tag}</span>
          ))}
        </div>

        {/* 참여자 바 */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1.5">
            <span className="flex items-center gap-1">
              <Users size={10} /> {mission.current_participants}/{mission.max_participants}명 참여
            </span>
            <span>{participantPct}%</span>
          </div>
          <div className="score-bar">
            <div className="h-full bg-lime/40 rounded-full" style={{ width: `${participantPct}%` }} />
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {mission.duration_weeks}주
            </span>
            <span className="text-gray-700">|</span>
            <span>{CATEGORY_LABELS[mission.category] || mission.category}</span>
          </div>
          <div className="flex items-center gap-1 text-lime font-mono text-sm font-bold">
            <Star size={12} className="fill-lime" /> +{mission.reward_points}P
          </div>
        </div>
      </div>
    </Link>
  )
}
