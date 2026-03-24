'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, ArrowLeft, BarChart3, Zap } from 'lucide-react'

import { toast } from 'sonner'

interface Question {
  id: number
  category: 'logic' | 'creativity' | 'communication' | 'collaboration' | 'tech' | 'leadership'
  text: string
  options: { label: string; score: number }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1, category: 'logic',
    text: '복잡한 문제에 직면했을 때 나는...',
    options: [
      { label: '즉시 해결책을 떠올리고 바로 실행한다', score: 60 },
      { label: '문제를 단계별로 나누어 체계적으로 분석한다', score: 100 },
      { label: '비슷한 경험을 참고하여 접근한다', score: 75 },
      { label: '다른 사람의 의견을 먼저 들어본다', score: 50 },
    ],
  },
  {
    id: 2, category: 'creativity',
    text: '새로운 아이디어를 떠올릴 때 나는...',
    options: [
      { label: '전혀 다른 분야에서 영감을 찾는다', score: 100 },
      { label: '기존 방법을 개선하는 방향으로 생각한다', score: 75 },
      { label: '팀원들과 브레인스토밍을 선호한다', score: 80 },
      { label: '검증된 방법을 따르는 것이 안전하다고 생각한다', score: 40 },
    ],
  },
  {
    id: 3, category: 'communication',
    text: '팀 발표를 해야 할 때 나는...',
    options: [
      { label: '자신 있게 앞에 나서서 발표한다', score: 100 },
      { label: '준비를 철저히 하면 잘 할 수 있다', score: 85 },
      { label: '발표보다 자료 준비를 선호한다', score: 55 },
      { label: '긴장되지만 최선을 다한다', score: 70 },
    ],
  },
  {
    id: 4, category: 'collaboration',
    text: '팀 프로젝트에서 의견 충돌이 생기면...',
    options: [
      { label: '모두가 만족할 합의점을 찾으려 노력한다', score: 100 },
      { label: '논리적으로 내 의견을 설득한다', score: 80 },
      { label: '팀 리더의 결정을 따른다', score: 55 },
      { label: '상황에 따라 유연하게 대처한다', score: 85 },
    ],
  },
  {
    id: 5, category: 'tech',
    text: '새로운 프로그램이나 도구를 배울 때 나는...',
    options: [
      { label: '직접 실행해보면서 익힌다', score: 90 },
      { label: '공식 문서나 튜토리얼을 차근차근 읽는다', score: 85 },
      { label: '유튜브나 강의를 찾아본다', score: 70 },
      { label: '아는 사람에게 물어본다', score: 55 },
    ],
  },
  {
    id: 6, category: 'leadership',
    text: '팀 프로젝트에서 나의 역할은 주로...',
    options: [
      { label: '전체 방향을 설정하고 팀원을 이끈다', score: 100 },
      { label: '각자 역할이 잘 돌아가도록 조율한다', score: 90 },
      { label: '맡은 역할을 충실히 수행한다', score: 70 },
      { label: '아이디어를 제공하는 역할을 선호한다', score: 75 },
    ],
  },
  {
    id: 7, category: 'logic',
    text: '데이터나 수치를 분석해야 할 때 나는...',
    options: [
      { label: '패턴과 규칙을 빠르게 파악한다', score: 100 },
      { label: '꼼꼼하게 확인하며 천천히 분석한다', score: 85 },
      { label: '시각화 도구를 활용한다', score: 80 },
      { label: '어렵게 느껴진다', score: 40 },
    ],
  },
  {
    id: 8, category: 'creativity',
    text: '내가 좋아하는 활동은?',
    options: [
      { label: '새로운 것을 만들거나 디자인하기', score: 100 },
      { label: '책이나 영상으로 다양한 지식 쌓기', score: 75 },
      { label: '문제를 풀고 분석하기', score: 80 },
      { label: '사람들과 대화하고 교류하기', score: 70 },
    ],
  },
  {
    id: 9, category: 'communication',
    text: '내 생각을 글로 표현할 때 나는...',
    options: [
      { label: '핵심을 정확하고 간결하게 전달한다', score: 100 },
      { label: '풍부한 예시로 상세하게 설명한다', score: 85 },
      { label: '상대방 입장에서 이해하기 쉽게 쓴다', score: 90 },
      { label: '글쓰기가 다소 어렵다', score: 45 },
    ],
  },
  {
    id: 10, category: 'collaboration',
    text: '내가 맡은 일이 예상보다 많아지면...',
    options: [
      { label: '팀원에게 도움을 요청한다', score: 90 },
      { label: '스스로 해결하려고 더 노력한다', score: 70 },
      { label: '우선순위를 정해 효율적으로 처리한다', score: 100 },
      { label: '담당자에게 상황을 보고한다', score: 80 },
    ],
  },
  {
    id: 11, category: 'tech',
    text: '기술적인 오류나 버그를 만나면...',
    options: [
      { label: '원인을 분석하고 직접 해결한다', score: 100 },
      { label: '검색엔진으로 해결책을 찾는다', score: 85 },
      { label: '전문가에게 도움을 구한다', score: 60 },
      { label: '당황하지만 차근차근 접근한다', score: 70 },
    ],
  },
  {
    id: 12, category: 'leadership',
    text: '프로젝트 일정이 지연될 것 같을 때 나는...',
    options: [
      { label: '즉시 팀 전체에 공유하고 대안을 논의한다', score: 100 },
      { label: '혼자 추가 시간을 투자해 만회한다', score: 65 },
      { label: '중요도가 낮은 작업을 줄여 조정한다', score: 85 },
      { label: '기한 연장을 요청한다', score: 55 },
    ],
  },
  {
    id: 13, category: 'logic',
    text: '어떤 결정을 내려야 할 때 나는 주로...',
    options: [
      { label: '장단점을 분석한 후 결정한다', score: 100 },
      { label: '직관과 경험을 믿는다', score: 70 },
      { label: '주변 사람들의 의견을 종합한다', score: 75 },
      { label: '시간을 두고 신중하게 생각한다', score: 80 },
    ],
  },
  {
    id: 14, category: 'creativity',
    text: '이전에 없던 새로운 방식을 시도하는 것이...',
    options: [
      { label: '매우 흥미롭고 도전적이다', score: 100 },
      { label: '리스크가 있지만 가치 있다', score: 80 },
      { label: '안정적인 방법이 있다면 그것을 선호한다', score: 50 },
      { label: '상황에 따라 다르다', score: 65 },
    ],
  },
  {
    id: 15, category: 'communication',
    text: '갈등 상황에서 상대방을 설득할 때 나는...',
    options: [
      { label: '데이터와 근거로 논리적으로 설득한다', score: 100 },
      { label: '상대방 감정에 공감하며 대화한다', score: 90 },
      { label: '제3자의 중재를 활용한다', score: 65 },
      { label: '시간이 지나면 해결된다고 생각한다', score: 40 },
    ],
  },
]

const CATEGORY_LABELS_KO: Record<string, string> = {
  logic: '논리력',
  creativity: '창의력',
  communication: '소통 능력',
  collaboration: '협업 능력',
  tech: '기술 역량',
  leadership: '리더십',
}

type Phase = 'intro' | 'quiz' | 'result'

export default function AssessmentPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const question = QUESTIONS[currentQ]
  const progress = Math.round(((currentQ) / QUESTIONS.length) * 100)

  const handleSelect = (score: number, idx: number) => {
    setSelected(idx)
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [question.id]: score }))
      setSelected(null)
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1)
      } else {
        setPhase('result')
      }
    }, 350)
  }

  const computeScores = () => {
    const cats = ['logic', 'creativity', 'communication', 'collaboration', 'tech', 'leadership']
    return cats.map(cat => {
      const qs = QUESTIONS.filter(q => q.category === cat)
      const total = qs.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
      return Math.round(total / qs.length)
    })
  }

  const scores = phase === 'result' ? computeScores() : []
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  // 레이더 차트 그리기
  useEffect(() => {
    if (phase !== 'result' || !canvasRef.current || !scores.length) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width, h = canvas.height
    const cx = w / 2, cy = h / 2
    const r = Math.min(w, h) * 0.38
    const n = scores.length
    ctx.clearRect(0, 0, w, h)

    // 배경 그물망
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const rr = (r * ring) / 4
        const x = cx + Math.cos(angle) * rr
        const y = cy + Math.sin(angle) * rr
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()
    }

    // 축선
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r)
      ctx.stroke()
    }

    // 데이터 영역
    ctx.beginPath()
    ctx.fillStyle = 'rgba(184,255,71,0.15)'
    ctx.strokeStyle = '#B8FF47'
    ctx.lineWidth = 2
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const rr = (r * scores[i]) / 100
      const x = cx + Math.cos(angle) * rr
      const y = cy + Math.sin(angle) * rr
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 포인트
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const rr = (r * scores[i]) / 100
      const x = cx + Math.cos(angle) * rr
      const y = cy + Math.sin(angle) * rr
      ctx.beginPath()
      ctx.fillStyle = '#B8FF47'
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
    }

    // 라벨
    const labels = Object.values(CATEGORY_LABELS_KO)
    ctx.font = '13px Noto Sans KR, sans-serif'
    ctx.fillStyle = '#CDD4E0'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const labelR = r + 30
      const x = cx + Math.cos(angle) * labelR
      const y = cy + Math.sin(angle) * labelR
      ctx.fillText(labels[i], x, y)
    }
  }, [phase, scores])

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    toast.success('역량 진단 결과가 저장되었습니다!')
    setSaving(false)
    router.push('/career')
  }

  return (
    <div className="max-w-2xl mx-auto">

        {/* ─── 인트로 ─── */}
        {phase === 'intro' && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-3xl bg-lime/10 border border-lime/20
                            flex items-center justify-center mx-auto mb-8">
              <BarChart3 size={36} className="text-lime" />
            </div>
            <h1 className="font-display text-5xl text-white tracking-wide mb-4">역량 진단</h1>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-md mx-auto">
              15개 질문으로 나의 6가지 핵심 역량을 분석합니다.<br />
              솔직하게 답변할수록 더 정확한 결과를 얻을 수 있어요.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-sm mx-auto">
              {[
                { label: '문항 수', value: '15개' },
                { label: '소요 시간', value: '약 5분' },
                { label: '분석 항목', value: '6개' },
              ].map(item => (
                <div key={item.label} className="card text-center py-4">
                  <div className="text-lime font-mono font-bold text-lg">{item.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPhase('quiz')} className="btn-primary text-base px-10 py-4">
              진단 시작하기 <ArrowRight className="inline ml-2" size={18} />
            </button>
          </div>
        )}

        {/* ─── 퀴즈 ─── */}
        {phase === 'quiz' && question && (
          <div>
            {/* 진행 바 */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="font-mono">{currentQ + 1} / {QUESTIONS.length}</span>
                <span className="text-lime font-mono">{progress}%</span>
              </div>
              <div className="score-bar h-2">
                <div className="h-full bg-gradient-to-r from-lime-dim to-lime rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }} />
              </div>
              <div className="text-gray-600 text-xs mt-1">
                {CATEGORY_LABELS_KO[question.category]} 측정 중
              </div>
            </div>

            {/* 질문 */}
            <div className="card mb-6">
              <div className="text-lime text-xs font-mono mb-3">
                Q{question.id}. {CATEGORY_LABELS_KO[question.category]}
              </div>
              <h2 className="text-xl font-bold text-white leading-relaxed">{question.text}</h2>
            </div>

            {/* 선택지 */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button key={idx} onClick={() => handleSelect(opt.score, idx)}
                  disabled={selected !== null}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200
                    font-medium text-sm
                    ${selected === idx
                      ? 'border-lime bg-lime/20 text-lime scale-[1.02]'
                      : selected !== null
                        ? 'border-white/5 bg-navy-800/30 text-gray-600 scale-[0.98]'
                        : 'border-white/10 bg-navy-800/50 text-gray-300 hover:border-lime/40 hover:bg-lime/5 hover:text-white'
                    }`}>
                  <span className="text-gray-600 font-mono text-xs mr-3">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt.label}
                  {selected === idx && <CheckCircle size={16} className="inline ml-2 text-lime" />}
                </button>
              ))}
            </div>

            {/* 이전 버튼 */}
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(q => q - 1)}
                className="btn-ghost mt-6 flex items-center gap-2">
                <ArrowLeft size={16} /> 이전 질문
              </button>
            )}
          </div>
        )}

        {/* ─── 결과 ─── */}
        {phase === 'result' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lime text-xs font-mono tracking-[0.3em] mb-3">ASSESSMENT COMPLETE</div>
              <h1 className="font-display text-5xl text-white tracking-wide mb-2">진단 완료!</h1>
              <p className="text-gray-400 text-sm">나의 역량 프로필이 생성되었습니다.</p>
            </div>

            {/* 종합 점수 */}
            <div className="card text-center py-8">
              <div className="text-gray-500 text-sm mb-2">종합 역량 점수</div>
              <div className="font-display text-7xl text-lime tracking-wide">{avgScore}</div>
              <div className="text-gray-500 text-sm mt-1">/ 100</div>
              <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-lime/10 rounded-full
                              text-lime text-xs font-medium border border-lime/20">
                <Zap size={12} />
                {avgScore >= 80 ? '매우 우수한 역량' : avgScore >= 65 ? '우수한 역량' : '성장 가능성 높음'}
              </div>
            </div>

            {/* 레이더 차트 */}
            <div className="card flex justify-center">
              <canvas ref={canvasRef} width={340} height={340} />
            </div>

            {/* 상세 점수 */}
            <div className="card">
              <h3 className="font-bold text-white mb-5">역량 상세 분석</h3>
              <div className="space-y-4">
                {Object.entries(CATEGORY_LABELS_KO).map(([key, label], i) => {
                  const score = scores[i] || 0
                  const isHigh = score >= 80
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{label}</span>
                        <span className={`font-mono font-bold ${isHigh ? 'text-lime' : 'text-gray-400'}`}>
                          {score}
                        </span>
                      </div>
                      <div className="score-bar">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isHigh ? 'bg-lime' : 'bg-frost/60'
                          }`}
                          style={{ width: `${score}%`, transitionDelay: `${i * 100}ms` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 강점·약점 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <h4 className="text-lime text-sm font-bold mb-3">💪 강점</h4>
                {scores.map((s, i) => s >= 80 ? (
                  <div key={i} className="text-gray-300 text-xs mb-1">
                    • {Object.values(CATEGORY_LABELS_KO)[i]}
                  </div>
                ) : null).filter(Boolean).length > 0
                  ? scores.map((s, i) => s >= 80 ? (
                    <div key={i} className="text-gray-300 text-xs mb-1">
                      • {Object.values(CATEGORY_LABELS_KO)[i]}
                    </div>
                  ) : null)
                  : <p className="text-gray-500 text-xs">더 많은 미션 참여 후 강점이 분석됩니다.</p>
                }
              </div>
              <div className="card">
                <h4 className="text-ember text-sm font-bold mb-3">🎯 성장 포인트</h4>
                {scores.map((s, i) => s < 65 ? (
                  <div key={i} className="text-gray-300 text-xs mb-1">
                    • {Object.values(CATEGORY_LABELS_KO)[i]}
                  </div>
                ) : null).filter(Boolean).length > 0
                  ? scores.map((s, i) => s < 65 ? (
                    <div key={i} className="text-gray-300 text-xs mb-1">
                      • {Object.values(CATEGORY_LABELS_KO)[i]}
                    </div>
                  ) : null)
                  : <p className="text-gray-500 text-xs">균형잡힌 역량을 보유하고 있습니다!</p>
                }
              </div>
            </div>

            {/* 저장 & 다음 */}
            <div className="flex gap-4">
              <button onClick={() => { setPhase('intro'); setCurrentQ(0); setAnswers({}) }}
                className="btn-secondary flex-1 justify-center">
                다시 진단
              </button>
              <button onClick={handleSave} disabled={saving}
                className="btn-primary flex-1 justify-center disabled:opacity-50">
                {saving ? '저장 중...' : '결과 저장 →'}
              </button>
            </div>
          </div>
        )}
      </div>
  )
}
