'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error) {
      toast.error('로그인 실패: ' + error.message)
      setLoading(false)
      return
    }
    toast.success('환영합니다!')
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6 relative">
      {/* 배경 */}
      <div className="absolute inset-0 bg-grid-navy bg-grid opacity-100 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                      bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white
                                   text-sm mb-8 transition-colors">
          <ArrowLeft size={16} /> 홈으로
        </Link>

        <div className="glass-lime rounded-3xl p-10">
          {/* 로고 */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xs">NX</span>
            </div>
            <span className="font-display text-2xl tracking-widest">NEXUS</span>
          </div>

          <h1 className="font-display text-4xl tracking-wide text-white mb-2">로그인</h1>
          <p className="text-gray-500 text-sm mb-8">NEXUS 계정으로 로그인하세요.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-gray-400 text-xs font-medium mb-2 block">이메일</label>
              <input
                type="email" required autoComplete="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="input-field"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-2 block">비밀번호</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'} required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="input-field pr-12"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center text-base py-4 disabled:opacity-50">
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            계정이 없으신가요?{' '}
            <Link href="/auth/register" className="text-lime hover:underline">
              무료 회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
