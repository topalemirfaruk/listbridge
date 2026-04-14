'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ListChecks,
  LayoutTemplate,
  Settings,
  Trash2,
  Plus,
  ChevronRight,
  Zap,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/lists', label: 'Listelerim', icon: ListChecks },
  { href: '/templates', label: 'Şablonlar', icon: LayoutTemplate },
]

const bottomItems = [
  { href: '/settings', label: 'Ayarlar', icon: Settings },
  { href: '/trash', label: 'Çöp Kutusu', icon: Trash2 },
]

interface SidebarProps {
  workspaceName?: string
  plan?: string
  userEmail?: string
}

export function Sidebar({ workspaceName = 'Çalışma Alanım', plan = 'free', userEmail }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 h-screen fixed left-0 top-0 z-40 bg-white border-r border-gray-100">
      {/* Logo — Landing page navbar ile birebir aynı */}
      <div className="px-5 h-16 flex items-center border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h7M2 8h12M2 12h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="13" cy="4" r="2" fill="white" />
              <circle cx="10" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">ListBridge</span>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="px-4 py-3 border-b border-gray-100">
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {workspaceName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-gray-700 truncate flex-1 text-left">
            {workspaceName}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
        </button>
      </div>

      {/* Yeni Liste Butonu — Landing page CTA ile aynı gradient */}
      <div className="px-4 py-4">
        <Link href="/lists/new">
          <Button className="w-full h-10 justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 text-sm font-semibold">
            <Plus className="w-4 h-4" />
            Yeni Liste
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border border-indigo-100/60'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn(
                'w-4 h-4 flex-shrink-0 transition-colors',
                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'
              )} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Banner — Landing page pricing card mini versiyonu */}
      {plan === 'free' && (
        <div className="px-4 py-3">
          <Link href="/settings/billing">
            <div className="rounded-xl p-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/60 cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-900">Pro&apos;ya Geç</span>
              </div>
              <p className="text-xs text-indigo-600/70 leading-relaxed font-medium">
                14 gün ücretsiz dene →
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="px-4 py-3 border-t border-gray-100 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className={cn(
                'w-4 h-4 flex-shrink-0 transition-colors',
                isActive ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-600'
              )} />
              {item.label}
            </Link>
          )
        })}

        {/* User Avatar + Çıkış */}
        <div className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-xl border border-gray-100 bg-gray-50/50">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-sm">
            {userEmail?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <span className="text-sm font-medium text-gray-700 truncate flex-1">{userEmail ?? 'Kullanıcı'}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
              title="Çıkış Yap"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
