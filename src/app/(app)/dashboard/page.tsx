import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { redirect } from 'next/navigation'
import { ensureWorkspace } from '@/lib/ensure-workspace'
import {
  ListChecks, Plus, Zap, Clock, ArrowRight, Link2,
  Sparkles, BarChart3, Layers, Target, TrendingUp,
  CalendarDays, Star
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard | ListBridge' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Kullanıcı'

  // Workspace yoksa otomatik oluştur
  const wId = await ensureWorkspace(user.id, user.email!, user.user_metadata?.name)
  const svc = await createServiceClient()

  // Count lists
  const { count: listCount } = await svc
    .from('lists')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', wId)
    .eq('is_archived', false)

  // Count items
  const { count: itemCount } = await svc
    .from('items')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', wId)
    .eq('is_deleted', false)

  // Recent lists
  const { data: recentLists } = await svc
    .from('lists')
    .select('id, title, color, icon, created_at')
    .eq('workspace_id', wId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
    .limit(6)

  const lc = listCount ?? 0
  const ic = itemCount ?? 0
  const recent = recentLists ?? []

  // Saat bazlı selamlama
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar'

  return (
    <div className="min-h-screen">
      {/* ─── Hero Header ─── Ana sayfadaki hero bölümü stilinde */}
      <div className="relative pt-12 pb-10 px-8 overflow-hidden">
        {/* Background — Landing page ile aynı blob stili */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-40%] left-[5%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-[-20%] right-[5%] w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Greeting — Büyük, cesur tipografi */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-3 animate-fade-in">
            {greeting},{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Çalışma alanın seni bekliyor. Listelerini organize et, bağla ve paylaş.
          </p>

          {/* Quick CTA — Landing page buton stili */}
          <div className="flex gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/lists/new">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-7 h-12 text-sm font-semibold shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Liste Oluştur
              </Button>
            </Link>
            <Link href="/lists">
              <Button size="lg" variant="outline" className="px-7 h-12 text-sm font-semibold border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300">
                <Layers className="w-4 h-4 mr-2 text-gray-400" />
                Listelerime Git
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Stats Strip ─── Temiz, minimal stat çubuğu */}
      <div className="px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 stagger-children">
            {/* Aktif Liste */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ListChecks className="w-[18px] h-[18px] text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Aktif Liste</span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{lc}</span>
            </div>

            {/* Toplam Öğe */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-[18px] h-[18px] text-violet-600" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Toplam Öğe</span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{ic}</span>
            </div>

            {/* Ara Bağlantı */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Link2 className="w-[18px] h-[18px] text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ara Bağlantı</span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">0</span>
            </div>

            {/* AI Kredisi */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-[18px] h-[18px] text-emerald-600" />
                </div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">AI Kredisi</span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Sol: Son Listeler (2/3) ── */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  Son Listeler
                </h2>
                {lc > 0 && (
                  <Link href="/lists" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors flex items-center gap-1 group">
                    Tümünü gör
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>

              {recent.length > 0 ? (
                <div className="space-y-3">
                  {recent.map((list) => (
                    <Link key={list.id} href={`/lists/${list.id}`}>
                      <div className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 cursor-pointer hover-lift">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md"
                          style={{ backgroundColor: list.color || '#6366f1' }}
                        >
                          {list.icon || list.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-base font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                            {list.title}
                          </span>
                          <span className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {new Date(list.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-indigo-50 transition-all flex-shrink-0">
                          <ArrowRight className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* ── Empty State — Landing page hero stiliyle uyumlu ── */
                <div className="relative text-center py-20 bg-white rounded-3xl border border-gray-100 overflow-hidden">
                  {/* Arka plan blob — landing page ile aynı */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-[-30%] left-[20%] w-[300px] h-[300px] bg-indigo-100/40 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-30%] right-[20%] w-[250px] h-[250px] bg-violet-100/30 rounded-full blur-3xl" />
                  </div>

                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-6 animate-float">
                    <Target className="w-9 h-9 text-indigo-500" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Başlamaya hazır mısın?</h3>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                    İlk listeni oluştur ve düşüncelerini organize etmeye başla.
                  </p>

                  <Link href="/lists/new">
                    <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300 px-8 h-12 text-sm font-semibold">
                      <Plus className="w-4 h-4 mr-2" />
                      İlk Listeni Oluştur
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <p className="mt-5 text-xs text-gray-400 flex items-center justify-center gap-2">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    30 saniyede hazır
                  </p>
                </div>
              )}
            </div>

            {/* ── Sağ: Widget'lar (1/3) ── */}
            <div className="space-y-6">
              {/* Plan Kullanımı */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="text-sm font-bold text-gray-900">Ücretsiz Plan</h3>
                  </div>
                  <Link href="/settings/billing">
                    <Button size="sm" variant="outline" className="text-xs h-7 font-semibold rounded-full px-3 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all">
                      Yükselt
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-gray-500">Listeler</span>
                      <span className="font-bold text-gray-900">{lc}<span className="text-gray-400 font-normal"> / 5</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((lc / 5) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-gray-500">AI Kredisi</span>
                      <span className="font-bold text-gray-900">10<span className="text-gray-400 font-normal"> / 10</span></span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Upgrade Card — Landing page CTA stilinde */}
              <Link href="/settings/billing">
                <div className="relative rounded-2xl p-6 overflow-hidden group cursor-pointer hover-lift">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700" />
                  {/* Dekoratif noktalar — landing page footer ile aynı */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute top-[20%] right-[5%] w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-indigo-200 fill-indigo-200" />
                      <span className="text-sm font-bold text-white tracking-tight">Pro&apos;ya Geç</span>
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-5">
                      Sınırsız liste, tüm görünümler ve AI destekli akıllı özellikler.
                    </p>
                    <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold shadow-lg text-xs h-8 px-4">
                      14 Gün Ücretsiz Dene
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Hızlı İpucu */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">İpucu</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Aynı öğeyi birden fazla listede kullanarak &quot;bridge&quot; bağlantılar oluşturabilirsin. Böylece verini tekrarlamadan organize edersin.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
