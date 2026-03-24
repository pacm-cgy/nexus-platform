'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Target, Award, TrendingUp, ArrowRight, Star, Clock, CheckCircle, Zap, BarChart3 } from 'lucide-react'
import { SAMPLE_MISSIONS, getLevelInfo } from '@/lib/utils'
import { DIFFICULTY_CONFIG, CATEGORY_LABELS } from '@/lib/types'

const QUICK_STATS = [
  { label: '참여 미션', value: '0', icon: Target, color: 'lime', change: '' },
  { label: '획득 포인트', value: '0P', icon: Star, color: 'frost', change: '' },
  { label: '인증서', value: '0', icon: Award, color: 'ember', change: '' },
  { label: '역량 점수', value: '-', icon: BarChart3, color: 'lime', change: '' },
]

const RADAR_LABELS = ['논리력', '창의력', '소통', '협업', '기술', '리더십']

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const level = getLevelInfo(0)

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ─── 상단 인사 헤더 ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm font-mono mb-1">2026년 3월 24일 · 화요일</p>
          <h1 className="text-3xl font-bold text-white">
            안녕하세요, <span className="text-lime">조경용</span>님 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">오늘도 한 걸음씩 성장해보세요.</p>
        </div>
        <Link href="/assessment"
          className="btn-primary flex items-center gap-2 self-start md:self-auto">
          <Zap size={16} /> 역량 진단 시작
        </Link>
      </div>

      {/* ─── 레벨 & 포인트 배너 ─── */}
      <div className="glass-lime rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-lime/5 blur-2xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          {/* 레벨 배지 */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lime/20 border-2 border-lime/40
                            flex flex-col items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <div className="text-lime text-xs font-mono tracking-wider mb-1">
                LV.{level.level} — {level.name}
              </div>
              <div className="text-white font-bold text-xl">0 포인트</div>
              <div className="text-gray-500 text-xs">다음 레벨: {level.max}P</div>
            </div>
          </div>
          {/* 프로그레스 바 */}
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>레벨 진행도</span>
              <span>{level.progress}%</span>
            </div>
            <div className="score-bar h-3">
              <div
                className="h-full bg-gradient-to-r from-lime-dim to-lime rounded-full transition-all duration-1000"
                style={{ width: `${level.progress}%` }}
              />
            </div>
            <div className="text-gray-600 text-xs mt-2 font-mono">
              첫 번째 미션에 참여하면 포인트를 획득합니다!
            </div>
          </div>
        </div>
      </div>

      {/* ─── 빠른 통계 ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map((stat) => {
          const Icon = stat.icon
          const colorMap = {
            lime: 'text-lime bg-lime/10',
            frost: 'text-frost bg-frost/10',
            ember: 'text-ember bg-ember/10',
          }
          return (
            <div key={stat.label} className="card group hover:border-white/10 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-xl ${colorMap[stat.color as keyof typeof colorMap]}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white font-mono mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ─── 추천 미션 ─── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white text-lg">추천 미션</h2>
            <Link href="/missions" className="text-lime text-sm flex items-center gap-1 hover:underline">
              전체 보기 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {SAMPLE_MISSIONS.slice(0, 3).map((mission) => {
              const diff = DIFFICULTY_CONFIG[mission.difficulty]
              return (
                <Link key={mission.id} href={`/missions/${mission.id}`}>
                  <div className="card-hover p-5 group">
                    <div className="flex items-start gap-4">
                      {/* 카테고리 아이콘 */}
                      <div className="w-10 h-10 rounded-xl bg-navy-700 flex items-center justify-center
                                      text-lg flex-shrink-0 group-hover:bg-lime/10 transition-colors">
                        {mission.category === 'tech' ? '⚡' :
                         mission.category === 'marketing' ? '📣' :
                         mission.category === 'design' ? '🎨' : '🔬'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-500 text-xs font-mono truncate">
                            {mission.certificate_issuer}
                          </span>
                          {mission.is_featured && (
                            <span className="text-xs bg-lime/10 text-lime px-2 py-0.5 rounded-full">추천</span>
                          )}
                        </div>
                        <h3 className="text-white font-medium text-sm group-hover:text-lime transition-colors truncate">
                          {mission.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`text-xs font-medium ${diff.color}`}>
                            {diff.label}
                          </span>
                          <span className="text-gray-600 text-xs flex items-center gap-1">
                            <Clock size={10} /> {mission.duration_weeks}주
                          </span>
                          <span className="text-gray-600 text-xs">
                            {mission.current_participants}/{mission.max_participants}명
                          </span>
                        </div>
                      </div>
                      <div className="text-lime font-mono text-sm font-bold flex-shrink-0">
                        +{mission.reward_points}P
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ─── 우측 패널 ─── */}
        <div className="space-y-4">

          {/* 역량 레이더 미리보기 */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-sm">역량 현황</h3>
              <Link href="/assessment" className="text-lime text-xs hover:underline">진단하기</Link>
            </div>
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10
                              flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={28} className="text-gray-600" />
              </div>
              <p className="text-gray-500 text-xs">역량 진단을 완료하면<br />레이더 차트가 표시됩니다.</p>
              <Link href="/assessment" className="btn-primary text-xs py-2 px-4 mt-4 inline-flex">
                지금 진단하기
              </Link>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="card">
            <h3 className="font-bold text-white text-sm mb-4">최근 활동</h3>
            <div className="text-center py-6">
              <CheckCircle size={28} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-xs">아직 활동 기록이 없습니다.<br />첫 미션에 참여해보세요!</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div className="card">
            <h3 className="font-bold text-white text-sm mb-4">빠른 시작</h3>
            <div className="space-y-2">
              {[
                { href: '/assessment', label: '역량 진단 받기', icon: '🎯' },
                { href: '/missions', label: '미션 탐색하기', icon: '⚡' },
                { href: '/career', label: '커리어 리포트', icon: '📊' },
              ].map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5
                             text-gray-400 hover:text-white transition-all duration-200 text-sm">
                  <span>{item.icon}</span>
                  {item.label}
                  <ArrowRight size={14} className="ml-auto" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
