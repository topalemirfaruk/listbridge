import { LayoutTemplate, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Şablonlar | ListBridge' }

export default function TemplatesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center mx-auto mb-6 animate-float">
        <LayoutTemplate className="w-9 h-9 text-indigo-500" />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Şablonlar Yakında</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
        Hazır şablonlarla hızlıca liste oluşturma özelliği çok yakında geliyor.
      </p>
      <Link href="/dashboard">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Dashboard&apos;a Dön
        </Button>
      </Link>
    </div>
  )
}
