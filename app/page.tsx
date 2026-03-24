'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp, Users, Star, ChevronDown, Award, Target, BarChart3 } from 'lucide-react'

const STATS = [
  { value: '100+', label: '파트너 기업', suffix: '' },
  { value: '10', label: '만 명 목표', suffix: '만' },
  { value: '97', label: '역량 인증 정확도', suffix: '%' },
  { value: '3', label: '특허 출원', suffix: '건' },
]

const FEATURES = [
  {
    icon: Target,
    title: '기업 실전 미션',
    desc: '실제 기업의 과제를 2~4주 동안 수행합니다. 시뮬레이션이 아닌 진짜 실무 경험.',
    color: 'lime',
  },
  {
    icon: BarChart3,
    title: 'AI 역량 분석',
    desc: '논리력·창의력·협업·기술 등 6개 차원을 AI가 분석하고 성장 곡선을 예측합니다.',
    color: 'frost',
  },
  {
    icon: Shield,
    title: '공식 인증서 발급',
    desc: '참여 기업 명의의 위변조 불가 인증서. 대학 입시 포트폴리오와 취업 지원에 활용하세요.',
    color: 'ember',
  },
  {
    icon: TrendingUp,
    title: '커리어 리포트',
    desc: '매월 나만의 AI 커리어 리포트를 받아보세요. 강점·약점·추천 기업까지 한눈에.',
    color: 'lime',
  },
]

const MISSIONS_PREVIEW = [
  { company: '스마일게이트', title: '게임 챗봇 개발', category: '개발·기술', points: 200, difficulty: '중급', color: '#B8FF47' },
  { company: '(주)오버데어코리아', title: 'SNS 마케팅 전략 기획', category: '마케팅', points: 100, difficulty: '입문', color: '#7ECFF4' },
  { company: '충남농업기술원', title: 'AI 농업 데이터 분석', category: '리서치', points: 300, difficulty: '고급', color: '#FF6B35' },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 스크롤 인뷰 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-navy-900 overflow-hidden">

      {/* ─── NAVBAR ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 60 ? 'bg-navy-900/95 backdrop-blur-xl border-b border-white/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xs font-mono">NX</span>
            </div>
            <span className="font-display text-2xl tracking-widest text-white">NEXUS</span>
            <span className="text-gray-600 text-xs font-mono ml-1">by PACM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['미션', '기능', '기업 파트너', '소개'].map(item => (
              <a key={item} href={`#${item}`}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm">로그인</Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-5">
              무료 시작
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">

        {/* 배경 그리드 */}
        <div className="absolute inset-0 bg-grid-navy bg-grid opacity-100 pointer-events-none" />

        {/* 배경 글로우 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] 
                        bg-lime/5 rounded-full blur-[120px] pointer-events-none"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px]
                        bg-frost/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">

          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          border border-lime/30 bg-lime/5 mb-8 animate-fade-up">
            <Zap size={14} className="text-lime" />
            <span className="text-lime text-xs font-mono tracking-wider">
              PACM × NEXUS PLATFORM — 2026
            </span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="font-display text-[72px] md:text-[100px] lg:text-[130px]
                         leading-[0.9] tracking-[0.02em] mb-6 animate-fade-up delay-100">
            <span className="text-white block">성적표가</span>
            <span className="text-white block">아닌</span>
            <span className="gradient-text block">실력으로</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10
                        animate-fade-up delay-200 leading-relaxed">
            기업의 실전 미션을 수행하고, AI가 분석한 역량 인증서를 받으세요.<br />
            <strong className="text-white">청소년과 기업을 잇는 대한민국 최초의 역량 인프라 플랫폼.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center
                          animate-fade-up delay-300">
            <Link href="/auth/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              지금 시작하기 <ArrowRight size={18} />
            </Link>
            <Link href="#기능" className="btn-secondary text-base px-8 py-4">
              플랫폼 살펴보기
            </Link>
          </div>

          {/* 신뢰 지표 */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 animate-fade-up delay-400">
            {['스마일게이트', '(주)오버데어코리아', '충남농업기술원', '충남교육청'].map(partner => (
              <div key={partner} className="text-gray-600 text-sm font-medium
                                            border border-white/5 rounded-full px-4 py-2 bg-navy-800/50">
                {partner}
              </div>
            ))}
            <div className="text-gray-600 text-sm font-medium border border-white/5 rounded-full px-4 py-2 bg-navy-800/50">
              +96 파트너사
            </div>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                        text-gray-600 animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`text-center animate-fade-up delay-${(i+1)*100}`}>
                <div className="font-display text-5xl md:text-6xl text-lime mb-2 tracking-wide">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="기능" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-lime text-xs font-mono tracking-[0.3em] mb-4 animate-fade-up">
              CORE FEATURES
            </div>
            <h2 className="section-title animate-fade-up delay-100">
              왜 NEXUS인가
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              const colorMap = {
                lime: 'text-lime bg-lime/10 border-lime/20',
                frost: 'text-frost bg-frost/10 border-frost/20',
                ember: 'text-ember bg-ember/10 border-ember/20',
              }
              return (
                <div key={feat.title}
                  className={`card-hover p-8 animate-fade-up delay-${(i+1)*100} group`}>
                  <div className={`inline-flex p-3 rounded-xl border mb-5 ${colorMap[feat.color as keyof typeof colorMap]}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lime transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── MISSION PREVIEW ─── */}
      <section id="미션" className="py-32 bg-navy-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end
                          justify-between gap-6 mb-16">
            <div>
              <div className="text-lime text-xs font-mono tracking-[0.3em] mb-4 animate-fade-up">
                LIVE MISSIONS
              </div>
              <h2 className="section-title animate-fade-up delay-100">
                지금 진행 중인 미션
              </h2>
            </div>
            <Link href="/auth/register"
              className="btn-secondary flex items-center gap-2 animate-fade-up delay-200">
              전체 보기 <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MISSIONS_PREVIEW.map((mission, i) => (
              <div key={mission.title}
                className={`card-hover p-6 animate-fade-up delay-${(i+1)*100} group`}>
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-gray-500">{mission.company}</span>
                  <span className="badge-tag" style={{ color: mission.color }}>
                    {mission.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-3 group-hover:text-lime transition-colors">
                  {mission.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="badge-tag">{mission.category}</span>
                  <div className="flex items-center gap-1 text-lime font-mono text-sm">
                    <Star size={12} className="fill-lime" />
                    {mission.points}P
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-lime text-xs font-mono tracking-[0.3em] mb-4">HOW IT WORKS</div>
            <h2 className="section-title">3단계로 시작하세요</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px
                            bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
            {[
              { step: '01', title: '역량 진단', desc: '15분 진단 테스트로 나의 강점을 파악합니다.', icon: '🎯' },
              { step: '02', title: '미션 수행', desc: '관심 분야와 역량에 맞는 기업 미션에 참여합니다.', icon: '⚡' },
              { step: '03', title: '인증서 획득', desc: '완료한 미션의 기업 인증서와 AI 커리어 리포트를 받습니다.', icon: '🏆' },
            ].map((item, i) => (
              <div key={item.step} className={`text-center animate-fade-up delay-${(i+1)*100}`}>
                <div className="w-24 h-24 rounded-3xl bg-navy-800 border border-lime/20
                                flex flex-col items-center justify-center mx-auto mb-6 relative">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="absolute -top-3 -right-3 w-7 h-7 bg-lime rounded-full
                                   flex items-center justify-center text-navy-900 text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-lime rounded-3xl p-16 relative overflow-hidden animate-fade-up">
            <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
            <div className="relative">
              <Award size={48} className="text-lime mx-auto mb-6" />
              <h2 className="font-display text-5xl md:text-7xl text-white mb-6 tracking-wide">
                지금 바로<br /><span className="text-lime">시작하세요</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                NEXUS는 완전 무료입니다.<br />
                기업 인증서와 AI 커리어 리포트, 지금 경험해보세요.
              </p>
              <Link href="/auth/register"
                className="btn-primary text-lg px-12 py-5 inline-flex items-center gap-3 animate-glow-pulse">
                무료로 시작하기 <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center">
                  <span className="text-navy-900 font-bold text-xs">NX</span>
                </div>
                <span className="font-display text-xl tracking-widest">NEXUS</span>
              </div>
              <p className="text-gray-600 text-xs">
                PACM(피에이씨엠) | 대표자: 조경용 | 사업자: 891-45-01385 | 충청남도 천안시
              </p>
            </div>
            <div className="flex gap-6 text-gray-600 text-sm">
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors">문의</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-700 text-xs font-mono">
            © 2026 PACM Corp. All rights reserved. | Powered by E.P.G
          </div>
        </div>
      </footer>
    </div>
  )
}
