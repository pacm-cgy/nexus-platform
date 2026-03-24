'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, User, Building2, GraduationCap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Step = 'role' | 'info'
type Role = 'student' | 'enterprise' | 'mentor'

const ROLES = [
  {
    id: 'student' as Role,
    icon: GraduationCap,
    title: '청소년 / 학생',
    desc: '미션 참여, 역량 진단, 커리어 리포트',
    color: 'lime',
  },
  {
    id: 'enterprise' as Role,
    icon: Building2,
    title: '기업 파트너',
    desc: '미션 게시, 인재 발굴, CSR 실적',
    color: 'frost',
  },
  {
    id: 'mentor' as Role,
    icon: User,
    title: '멘토',
    desc: '미션 멘토링, 청소년 피드백 지원',
    color: 'ember',
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<Role>('student')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', password: '', school: '', grade: '', region: '충청남도'
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password.length < 8) {
      toast.error('비밀번호는 8자 이상이어야 합니다.')
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          role,
          school: form.school,
          grade: form.grade ? parseInt(form.grade) : null,
          region: form.region,
        },
      },
    })
    if (error) {
      toast.error('가입 실패: ' + error.message)
      setLoading(false)
      return
    }
    toast.success('가입 완료! 이메일 인증 후 로그인하세요.')
    router.push('/auth/login')
  }

  const colorMap = {
    lime: 'border-lime/50 bg-lime/10 text-lime',
    frost: 'border-frost/50 bg-frost/10 text-frost',
    ember: 'border-ember/50 bg-ember/10 text-ember',
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-grid-navy bg-grid opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                      bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white
                                   text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> 홈으로
        </Link>

        <div className="glass-lime rounded-3xl p-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xs">NX</span>
            </div>
            <span className="font-display text-2xl tracking-widest">NEXUS</span>
          </div>

          {step === 'role' ? (
            <>
              <h1 className="font-display text-4xl tracking-wide text-white mb-2">회원가입</h1>
              <p className="text-gray-500 text-sm mb-8">어떤 역할로 참여하시나요?</p>

              <div className="space-y-4 mb-8">
                {ROLES.map(r => {
                  const Icon = r.icon
                  const isSelected = role === r.id
                  return (
                    <button key={r.id} type="button" onClick={() => setRole(r.id)}
                      className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200
                                  flex items-center gap-4
                                  ${isSelected
                                    ? colorMap[r.color as keyof typeof colorMap]
                                    : 'border-white/10 bg-navy-800/50 hover:border-white/20'
                                  }`}>
                      <Icon size={24} className={isSelected ? '' : 'text-gray-500'} />
                      <div>
                        <div className={`font-bold ${isSelected ? '' : 'text-white'}`}>{r.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <button onClick={() => setStep('info')} className="btn-primary w-full justify-center py-4">
                다음 단계
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setStep('role')}
                className="inline-flex items-center gap-1 text-gray-500 hover:text-white text-sm mb-6 transition-colors">
                <ArrowLeft size={14} /> 역할 변경
              </button>
              <h1 className="font-display text-4xl tracking-wide text-white mb-2">정보 입력</h1>
              <p className="text-gray-500 text-sm mb-8">
                {ROLES.find(r => r.id === role)?.title}으로 가입합니다.
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-2 block">이름 *</label>
                  <input required placeholder="홍길동" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-2 block">이메일 *</label>
                  <input required type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-2 block">비밀번호 * (8자 이상)</label>
                  <input required type="password" placeholder="••••••••" value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="input-field" />
                </div>
                {role === 'student' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-2 block">학교</label>
                      <input placeholder="천안고등학교" value={form.school}
                        onChange={e => setForm(p => ({ ...p, school: e.target.value }))}
                        className="input-field" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs font-medium mb-2 block">학년</label>
                      <input type="number" min="1" max="6" placeholder="1" value={form.grade}
                        onChange={e => setForm(p => ({ ...p, grade: e.target.value }))}
                        className="input-field" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-2 block">지역</label>
                  <select value={form.region}
                    onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                    className="input-field">
                    {['충청남도','서울','경기','대전','세종','충청북도','기타'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full justify-center py-4 mt-2 disabled:opacity-50">
                  {loading ? '가입 중...' : '가입 완료'}
                </button>
              </form>
            </>
          )}

          <p className="text-center text-gray-500 text-sm mt-8">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-lime hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
