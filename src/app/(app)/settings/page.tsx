import { Settings, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ayarlar | ListBridge' }

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 animate-float">
        <Settings className="w-9 h-9 text-gray-500" />
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Ayarlar Yakında</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
        Hesap, bildirim ve çalışma alanı ayarlarını burada yönetebileceksin.
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
