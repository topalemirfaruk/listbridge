import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ListChecks, Link2, LayoutGrid, Sparkles, Share2, Zap, Check, Star, MessageCircle, StickyNote, Table, Bookmark, ClipboardList, Pin, Mail, PenLine, Layers, Target, Rocket } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ListBridge — Bağlantılı, Akıllı Liste Yönetimi',
  description: 'Listelerini sadece tutma — organize et, bağla ve paylaş.',
}

const features = [
  {
    icon: Link2,
    title: 'Bridge Mantığı',
    description: 'Aynı öğeyi birden fazla listede kullan. Listeler arasında gerçek bağlantı kur.',
    gradient: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: LayoutGrid,
    title: 'Çoklu Görünüm',
    description: 'Aynı veriyi liste, tablo veya kanban görünümünde aç. Tek liste, sonsuz perspektif.',
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI Düzenleme',
    description: 'Dağınık metni yapıştır, AI otomatik liste oluştursun. Tekrar edenleri bulsun.',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Share2,
    title: 'Güzel Paylaşım',
    description: 'Listeni şık bir public sayfaya çevir. "Copy this list" ile viral büyü.',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: ListChecks,
    title: 'Akıllı Özellikler',
    description: 'Her öğeye özel alanlar ekle: tarih, puan, status, bağlantı ve daha fazlası.',
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Zap,
    title: 'Hazır Şablonlar',
    description: 'Sıfırdan başlama. Alışveriş, seyahat, içerik planı ve daha fazlası hazır.',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10',
  },
]

const plans = [
  {
    name: 'Ücretsiz',
    price: '$0',
    desc: 'Keşfetmek için yeterli',
    features: ['5 liste', '100 öğe/liste', 'Liste + Tablo görünümü', '1 public paylaşım', '10 AI kredi/ay'],
    cta: 'Ücretsiz Başla',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    desc: 'Güçlü kullanıcılar için',
    features: ['Sınırsız liste', 'Sınırsız öğe', 'Tüm görünümler', 'Sınırsız paylaşım', '200 AI kredi/ay', '30 gün geçmiş'],
    cta: '14 Gün Ücretsiz Dene',
    popular: true,
  },
  {
    name: 'Team',
    price: '$24',
    desc: 'Küçük ekipler için',
    features: ['Pro özellikleri +', '3 ekip üyesi', 'Paylaşılan workspace', 'Aktivite logu', '500 AI kredi/ay'],
    cta: 'Ekip ile Başla',
    popular: false,
  },
]

const logos = ['Notion', 'Todoist', 'Trello', 'Airtable']

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ─── Navbar ───────────────────────────────────────────────────── */}
      <header className="border-b border-gray-100/80 sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h7M2 8h12M2 12h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="13" cy="4" r="2" fill="white" />
                <circle cx="10" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">ListBridge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="#features" className="hover:text-gray-900 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all hover:after:w-full">Özellikler</Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 after:transition-all hover:after:w-full">Fiyatlar</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 transition-colors">Giriş Yap</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 px-6 text-center overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[-20%] left-[40%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-down inline-flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-indigo-100/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            AI destekli akıllı liste yönetimi
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Listelerini sadece tutma{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                bağla ve paylaş
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 6 Q50 0, 100 4 Q150 8, 200 2" fill="none" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Dağınık notlardan, WhatsApp mesajlarından, kağıtlardan kurtul.
            <span className="text-gray-700 font-medium"> Tüm listelerini tek akıllı çalışma alanında topla.</span>
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 h-12 text-base shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5">
                Ücretsiz Başla
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="px-8 h-12 text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Nasıl Çalışır?
              </Button>
            </Link>
          </div>

          <p className="animate-fade-in-up mt-5 text-xs text-gray-400 flex items-center justify-center gap-3" style={{ animationDelay: '0.6s' }}>
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Kredi kartı gerekmez</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> 30 saniyede başla</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Sonsuza dek ücretsiz</span>
          </p>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up mt-16 max-w-md mx-auto" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">500+</span> kullanıcı listelerini ListBridge ile yönetiyor
          </p>
        </div>
      </section>

      {/* ─── Problem ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50/0 to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide uppercase">Tanıdık mı?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Listelerini şuralarda mı tutuyorsun?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'WhatsApp', icon: MessageCircle },
              { label: 'Notlar', icon: StickyNote },
              { label: 'Excel', icon: Table },
              { label: 'Yer İmleri', icon: Bookmark },
              { label: 'Kağıt', icon: ClipboardList },
              { label: 'Yapışkan Not', icon: Pin },
              { label: 'Mesajlar', icon: Mail },
              { label: 'E-posta', icon: PenLine },
            ].map((item) => {
              const Icon = item.icon
              return (
                <span key={item.label} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-600 border border-gray-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-300 cursor-default">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              )
            })}
          </div>
          <p className="mt-6 text-gray-500 max-w-md mx-auto">
            Hepsini tek yere topla. <span className="text-indigo-600 font-semibold">ListBridge ile.</span>
          </p>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide uppercase">Özellikler</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sadece liste değil, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">bir sistem</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Diğer uygulamaların yapmadığı şeyleri ListBridge yapar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover-lift cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`w-6 h-6 bg-gradient-to-br ${feature.gradient} rounded-md flex items-center justify-center`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide uppercase">Nasıl Çalışır</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">3 adımda başla</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
            {[
              { step: '01', title: 'Oluştur', desc: 'Liste oluştur veya şablondan hızlıca başla. Özel alanlar tanımla.', icon: Layers, gradient: 'from-indigo-500 to-blue-500' },
              { step: '02', title: 'Organize Et', desc: 'Öğeleri ekle, etiketle, filtrele. Farklı görünümlerle çalış.', icon: Target, gradient: 'from-violet-500 to-purple-500' },
              { step: '03', title: 'Bağla ve Paylaş', desc: 'Listeler arası bağlantı kur. Şık bir linkle dünyayla paylaş.', icon: Rocket, gradient: 'from-emerald-500 to-teal-500' },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.step} className="relative text-center group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-indigo-400 tracking-widest">ADIM {s.step}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Pricing ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-3 tracking-wide uppercase">Fiyatlandırma</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sade ve şeffaf fiyatlar</h2>
            <p className="text-gray-500 text-lg">Ücretsiz başla, ihtiyacın olunca yükselt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 relative transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-500/30 scale-[1.02]'
                    : 'bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                      EN POPÜLER
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <p className={`text-sm font-semibold mb-1 ${plan.popular ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {plan.name}
                  </p>
                  <p className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                    <span className={`text-sm font-normal ${plan.popular ? 'text-indigo-200' : 'text-gray-500'}`}>/ay</span>
                  </p>
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-indigo-200' : 'text-gray-400'}`}>
                    {plan.desc}
                  </p>
                </div>
                <ul className={`space-y-2.5 text-sm mb-7 ${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-indigo-200' : 'text-emerald-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button
                    className={`w-full h-11 font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950" />
        {/* Decorative dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Dağınık listelerini <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">bir araya topla</span>
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            WhatsApp notlarından, Excel sayfalarından, kağıtlardan kurtulmanın zamanı geldi.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white px-10 h-12 text-base shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5">
              Şimdi Ücretsiz Başla
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <p className="mt-5 text-sm text-slate-500">
            2 dakikada hesap oluştur, hemen kullanmaya başla.
          </p>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h7M2 8h12M2 12h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="13" cy="4" r="2" fill="white" />
                <circle cx="10" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">© 2026 ListBridge. Tüm hakları saklıdır.</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-gray-600 transition-colors">Gizlilik</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">Kullanım Şartları</Link>
            <Link href="#" className="hover:text-gray-600 transition-colors">İletişim</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
