'use client'
import { useState, useRef } from 'react'
import { Award, Download, TrendingUp, Star, Target, CheckCircle, BarChart3, Calendar } from 'lucide-react'

import { toast } from 'sonner'

const SAMPLE_REPORT = {
  month: '2026년 3월',
  user: '조경용',
  school: '천안고등학교 1학년',
  totalScore: 0,
  missionsCompleted: 0,
  badgesEarned: 0,
  scores: {
    logic: 0, creativity: 0, communication: 0,
    collaboration: 0, tech: 0, leadership: 0,
  },
  strengths: ['역량 진단을 완료하면 강점이 분석됩니다.'],
  improvements: ['역량 진단을 완료하면 성장 포인트가 분석됩니다.'],
  recommendedCompanies: [
    { name: '스마일게이트', match: 0, reason: '역량 진단 완료 후 매칭됩니다.' },
    { name: '(주)오버데어코리아', match: 0, reason: '역량 진단 완료 후 매칭됩니다.' },
  ],
  nextSteps: [
    '역량 진단 테스트 완료하기',
    '관심 분야 미션 1개 신청하기',
    '첫 번째 인증서 획득하기',
  ],
}

const CAT_LABELS = ['논리력', '창의력', '소통', '협업', '기술', '리더십']

export default function CareerPage() {
  const reportRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    setDownloading(true)
    toast.info('PDF 생성 중... (미션 완료 후 정식 인증서 발급)')
    await new Promise(r => setTimeout(r, 1500))
    // 실제 구현: jsPDF + html2canvas 사용
    // const { jsPDF } = await import('jspdf')
    // const html2canvas = (await import('html2canvas')).default
    // const canvas = await html2canvas(reportRef.current!)
    // const pdf = new jsPDF(); pdf.addImage(canvas.toDataURL(), ...)
    toast.success('PDF가 준비되었습니다. (미션 참여 후 실제 발급됩니다)')
    setDownloading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

        {/* 헤더 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-lime text-xs font-mono tracking-[0.3em] mb-2">CAREER REPORT</div>
            <h1 className="text-3xl font-bold text-white">커리어 리포트</h1>
            <p className="text-gray-400 text-sm mt-1">나의 성장 기록과 역량 분석 리포트</p>
          </div>
          <button onClick={handleDownloadPDF} disabled={downloading}
            className="btn-secondary flex items-center gap-2 self-start">
            <Download size={16} />
            {downloading ? '생성 중...' : 'PDF 다운로드'}
          </button>
        </div>

        {/* 월 선택 탭 */}
        <div className="flex gap-2">
          {['2026년 3월', '2026년 2월', '2026년 1월'].map((month, i) => (
            <button key={month}
              className={`px-4 py-2 rounded-xl text-sm transition-all
                ${i === 0 ? 'bg-lime/10 text-lime border border-lime/20' : 'text-gray-500 hover:text-white'}`}>
              {month}
            </button>
          ))}
        </div>

        <div ref={reportRef} className="space-y-6">

          {/* 리포트 헤더 카드 */}
          <div className="glass-lime rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-full bg-lime/5 blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime/20 border border-lime/30
                                  flex items-center justify-center text-xl">🌱</div>
                  <div>
                    <div className="text-white font-bold text-lg">{SAMPLE_REPORT.user}</div>
                    <div className="text-gray-400 text-sm">{SAMPLE_REPORT.school}</div>
                  </div>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <Calendar size={14} /> {SAMPLE_REPORT.month} 리포트
                </div>
              </div>
              {/* 종합 점수 */}
              <div className="text-center">
                <div className="text-gray-400 text-xs mb-1">종합 역량</div>
                <div className="font-display text-6xl text-lime tracking-wide">
                  {SAMPLE_REPORT.totalScore || '—'}
                </div>
                <div className="text-gray-500 text-xs">/ 100</div>
              </div>
            </div>
          </div>

          {/* 이달의 성과 */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Target, label: '완료한 미션', value: SAMPLE_REPORT.missionsCompleted, unit: '개', color: 'lime' },
              { icon: Award, label: '획득한 인증서', value: SAMPLE_REPORT.badgesEarned, unit: '개', color: 'frost' },
              { icon: Star, label: '포인트', value: 0, unit: 'P', color: 'ember' },
            ].map(item => {
              const Icon = item.icon
              const colorMap = { lime: 'text-lime', frost: 'text-frost', ember: 'text-ember' }
              return (
                <div key={item.label} className="card text-center">
                  <Icon size={20} className={`${colorMap[item.color as keyof typeof colorMap]} mx-auto mb-2`} />
                  <div className={`font-mono font-bold text-2xl ${colorMap[item.color as keyof typeof colorMap]}`}>
                    {item.value}{item.unit}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">{item.label}</div>
                </div>
              )
            })}
          </div>

          {/* 역량 분석 */}
          <div className="card">
            <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
              <BarChart3 size={18} className="text-lime" /> 역량 분석
            </h2>
            {Object.values(SAMPLE_REPORT.scores).every(v => v === 0) ? (
              <div className="text-center py-8">
                <BarChart3 size={40} className="text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">역량 진단을 완료하면 상세 분석이 표시됩니다.</p>
                <a href="/assessment" className="btn-primary text-sm py-2 px-5 mt-4 inline-flex">
                  역량 진단 시작
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {CAT_LABELS.map((label, i) => {
                  const score = Object.values(SAMPLE_REPORT.scores)[i]
                  return (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{label}</span>
                        <span className="font-mono text-lime">{score}</span>
                      </div>
                      <div className="score-bar">
                        <div className="h-full bg-lime rounded-full" style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* 강점 & 성장 포인트 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-bold text-lime text-sm mb-4 flex items-center gap-2">
                <TrendingUp size={16} /> 강점 분석
              </h3>
              <ul className="space-y-2">
                {SAMPLE_REPORT.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle size={14} className="text-lime flex-shrink-0 mt-0.5" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="font-bold text-ember text-sm mb-4 flex items-center gap-2">
                <Target size={16} /> 성장 포인트
              </h3>
              <ul className="space-y-2">
                {SAMPLE_REPORT.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Target size={14} className="text-ember flex-shrink-0 mt-0.5" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 추천 기업 */}
          <div className="card">
            <h2 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
              <Award size={18} className="text-frost" /> 추천 기업 매칭
            </h2>
            <div className="space-y-4">
              {SAMPLE_REPORT.recommendedCompanies.map((company, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-navy-700/40 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-frost/10 border border-frost/20
                                  flex items-center justify-center text-frost font-bold text-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{company.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{company.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-frost font-mono font-bold">
                      {company.match ? `${company.match}%` : '—'}
                    </div>
                    <div className="text-gray-600 text-xs">매칭도</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 다음 단계 */}
          <div className="glass-lime rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              🎯 다음 달 추천 액션
            </h2>
            <div className="space-y-3">
              {SAMPLE_REPORT.nextSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime/20 border border-lime/30
                                  flex items-center justify-center text-lime text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-gray-300 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI 코치 멘트 */}
          <div className="card border border-lime/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                <span className="text-navy-900 text-xs font-bold">AI</span>
              </div>
              <div>
                <div className="text-lime text-xs font-mono mb-2">NEXUS AI 코치</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{SAMPLE_REPORT.user}님, NEXUS에 오신 것을 환영합니다!
                  역량 진단을 완료하고 첫 번째 미션에 참여해보세요.
                  PACM의 모든 전문가들이 여러분의 성장을 응원합니다.
                  지금 바로 역량 진단을 시작해볼까요? 🚀"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
