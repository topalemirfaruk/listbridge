import { Zap, ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Plan Yükselt | ListBridge' }

export default function BillingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-6 animate-float">
        <Zap className="w-9 h-9 text-indigo-500" />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Plan Yükseltme Yakında</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
        Pro ve Team planlarıyla sınırsız özellikler çok yakında aktif olacak.
      </p>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 max-w-xs w-full text-left">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-bold text-gray-900">Pro Plan — $9/ay</span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          {['Sınırsız liste', 'Sınırsız öğe', 'Tüm görünümler', '200 AI kredi/ay'].map(f => (
            <li key={f} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/dashboard">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Dashboard&apos;a Dön
        </Button>
      </Link>
    </div>
  )
}
