'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Star, Award, CheckCircle, Target, AlertCircle } from 'lucide-react'
import { SAMPLE_MISSIONS } from '@/lib/utils'
import { DIFFICULTY_CONFIG, CATEGORY_LABELS } from '@/lib/types'
import { toast } from 'sonner'

export default function MissionDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [applying, setApplying] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [motivation, setMotivation] = useState('')

  const mission = SAMPLE_MISSIONS.find(m => m.id === id)

  if (!mission) {
    return (
      <div className="text-center py-20">
        <Target size={48} className="text-gray-700 mx-auto mb-4" />
        <p className="text-gray-400">미션을 찾을 수 없습니다.</p>
        <Link href="/missions" className="btn-secondary mt-4 inline-flex">← 목록으로</Link>
      </div>
    )
  }

  const diff = DIFFICULTY_CONFIG[mission.difficulty]
  const participantPct = Math.round((mission.current_participants / mission.max_participants) * 100)

  const handleApply = async () => {
    if (!motivation.trim()) { toast.error('지원 동기를 입력해주세요.'); return }
    setApplying(true)
    await new Promise(r => setTimeout(r, 1200))
    toast.success('미션 신청 완료! 기업 담당자가 검토 후 연락드립니다.')
    setShowModal(false); setApplying(false)
    router.push('/dashboard')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/missions" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> 미션 목록
      </Link>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-lime/10 border border-lime/20 flex items-center justify-center text-2xl flex-shrink-0">
                {mission.category === 'tech' ? '⚡' : mission.category === 'marketing' ? '📣' : mission.category === 'design' ? '🎨' : '🔬'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.color} ${diff.bg}`}>{diff.label}</span>
                  <span className="badge-tag">{CATEGORY_LABELS[mission.category]}</span>
                  {mission.is_featured && <span className="text-xs bg-lime/10 text-lime px-2 py-1 rounded-full">추천</span>}
                </div>
                <div className="text-gray-500 text-sm font-mono mb-1">{mission.certificate_issuer}</div>
                <h1 className="text-xl font-bold text-white">{mission.title}</h1>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{mission.description}</p>
          </div>
          <div className="card">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Target size={16} className="text-lime" /> 요구 기술</h2>
            <div className="flex flex-wrap gap-2">
              {mission.required_skills.map(s => <span key={s} className="px-3 py-1.5 bg-lime/10 text-lime border border-lime/20 rounded-full text-xs font-medium">{s}</span>)}
            </div>
          </div>
          <div className="card">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-frost" /> 최종 산출물</h2>
            <ul className="space-y-3">
              {mission.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-6 h-6 rounded-full bg-frost/10 border border-frost/20 flex items-center justify-center text-frost text-xs font-bold flex-shrink-0">{i + 1}</div>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-lime rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3"><Award size={20} className="text-lime" /><h2 className="font-bold text-white">수료 인증서 발급</h2></div>
            <p className="text-gray-400 text-sm">미션 완료 시 <strong className="text-lime">{mission.certificate_issuer}</strong> 명의의 공식 수료 인증서가 발급됩니다.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card sticky top-24">
            <div className="text-center p-4 bg-lime/5 rounded-xl border border-lime/20 mb-5">
              <div className="text-lime font-mono text-3xl font-bold">+{mission.reward_points}P</div>
              <div className="text-gray-500 text-xs mt-1">완료 시 획득</div>
            </div>
            <div className="space-y-3 mb-5">
              {[{icon:Clock,label:'기간',value:`${mission.duration_weeks}주`},{icon:Users,label:'참여',value:`${mission.current_participants}/${mission.max_participants}명`},{icon:Star,label:'난이도',value:diff.label},{icon:Award,label:'인증기업',value:mission.certificate_issuer||'-'}].map(item => {
                const Icon = item.icon
                return <div key={item.label} className="flex items-center justify-between"><div className="flex items-center gap-2 text-gray-500 text-sm"><Icon size={14}/> {item.label}</div><div className="text-white text-sm font-medium">{item.value}</div></div>
              })}
            </div>
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-600 mb-1.5"><span>모집</span><span>{participantPct}%</span></div>
              <div className="score-bar h-2"><div className="h-full bg-lime/50 rounded-full" style={{width:`${participantPct}%`}}/></div>
            </div>
            <button onClick={() => setShowModal(true)} className="btn-primary w-full justify-center py-4">미션 신청하기</button>
            <div className="flex items-start gap-2 mt-4 p-3 bg-navy-700/50 rounded-xl">
              <AlertCircle size={14} className="text-gray-500 flex-shrink-0 mt-0.5"/>
              <p className="text-gray-500 text-xs leading-relaxed">신청 후 기업 담당자가 검토합니다.</p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)}/>
          <div className="relative w-full max-w-md glass-lime rounded-3xl p-8">
            <h2 className="font-display text-3xl text-white tracking-wide mb-2">미션 신청</h2>
            <p className="text-gray-500 text-sm mb-6"><strong className="text-white">{mission.title}</strong>에 지원합니다.</p>
            <div className="mb-5">
              <label className="text-gray-400 text-xs font-medium mb-2 block">지원 동기 <span className="text-lime">*</span></label>
              <textarea rows={4} placeholder="이 미션에 지원하는 이유를 작성해주세요." value={motivation} onChange={e => setMotivation(e.target.value)} className="input-field resize-none"/>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="btn-ghost flex-1">취소</button>
              <button onClick={handleApply} disabled={applying} className="btn-primary flex-1 justify-center disabled:opacity-50">{applying ? '신청 중...' : '신청 완료'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
