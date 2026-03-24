'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Target, BarChart3, Award, User,
  LogOut, Menu, X, Zap, ChevronRight, Bell
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { href: '/missions', icon: Target, label: '미션 탐색' },
  { href: '/assessment', icon: BarChart3, label: '역량 진단' },
  { href: '/career', icon: Award, label: '커리어 리포트' },
  { href: '/dashboard/profile', icon: User, label: '내 프로필' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('로그아웃 되었습니다.')
    router.push('/')
    router.refresh()
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside className={`${mobile
      ? 'fixed inset-y-0 left-0 z-50 w-72 bg-navy-900 border-r border-white/5 transform transition-transform duration-300'
      : 'hidden lg:flex flex-col w-64 bg-navy-950 border-r border-white/5 min-h-screen sticky top-0'
    } flex flex-col p-6`}>

      {/* 로고 */}
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center">
            <span className="text-navy-900 font-bold text-xs">NX</span>
          </div>
          <span className="font-display text-xl tracking-widest text-white">NEXUS</span>
        </Link>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* 유저 요약 */}
      <div className="glass rounded-2xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lime/20 border border-lime/30
                          flex items-center justify-center text-lime font-bold text-sm">
            조
          </div>
          <div>
            <div className="text-white text-sm font-medium">조경용님</div>
            <div className="text-lime text-xs font-mono">Lv.1 씨앗 • 0P</div>
          </div>
        </div>
        {/* 레벨 바 */}
        <div className="mt-3">
          <div className="score-bar">
            <div className="h-full bg-lime rounded-full transition-all duration-1000" style={{ width: '5%' }} />
          </div>
          <div className="text-gray-600 text-xs mt-1">다음 레벨까지 95P</div>
        </div>
      </div>

      {/* 내비게이션 */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                          transition-all duration-200 group
                          ${active
                            ? 'bg-lime/10 text-lime border border-lime/20'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                          }`}>
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* 로그아웃 */}
      <button onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                   text-gray-600 hover:text-red-400 hover:bg-red-400/10
                   transition-all duration-200 mt-4">
        <LogOut size={18} />
        로그아웃
      </button>

      {/* 버전 */}
      <div className="text-gray-700 text-xs font-mono mt-4 text-center">
        NEXUS v0.1.0 · by PACM
      </div>
    </aside>
  )

  return (
    <div className="flex min-h-screen bg-navy-900">
      {/* 데스크탑 사이드바 */}
      <Sidebar />

      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)} />
          <Sidebar mobile />
        </>
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 모바일 헤더 */}
        <header className="lg:hidden flex items-center justify-between p-4
                           border-b border-white/5 bg-navy-900/95 backdrop-blur sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-xs">NX</span>
            </div>
            <span className="font-display text-lg tracking-widest">NEXUS</span>
          </div>
          <button className="text-gray-400 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-lime rounded-full" />
          </button>
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
