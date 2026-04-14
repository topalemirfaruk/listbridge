import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Giriş Yap',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Sol Bölüm — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 flex-col justify-between">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h7M2 8h12M2 12h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="13" cy="4" r="2" fill="white"/>
              <circle cx="10" cy="12" r="2" fill="white"/>
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">ListBridge</span>
        </Link>

        {/* Content */}
        <div className="relative z-10 animate-fade-in">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Listelerini birbirine <br />bağlamanın en akıllı yolu.
          </h2>
          <p className="text-indigo-100 text-base leading-relaxed max-w-sm">
            Dağınık notlardan, Excel tablolarından kurtul. Tüm listelerini tek bir akıllı çalışma alanında organize et.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {[
              { text: 'AI ile otomatik liste oluşturma', icon: '✦' },
              { text: 'Listeler arası bağlantı (Bridge)', icon: '◇' },
              { text: 'Tek tıkla güzel paylaşım linkleri', icon: '→' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-indigo-100">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {f.icon}
                </div>
                {f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-indigo-200 relative z-10">
          © 2026 ListBridge
        </p>
      </div>

      {/* Sağ Bölüm — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50/60 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-violet-50/40 rounded-full blur-3xl -z-10" />

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-8 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h7M2 8h12M2 12h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="13" cy="4" r="2" fill="white"/>
              <circle cx="10" cy="12" r="2" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">ListBridge</span>
        </Link>

        <div className="w-full max-w-sm animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  )
}
