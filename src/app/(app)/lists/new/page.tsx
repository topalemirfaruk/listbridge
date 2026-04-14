'use client'

import { useState } from 'react'
import { createList } from '@/lib/actions/lists'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Loader2, Palette, Type, AlignLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const colors = [
  '#6366f1', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#f97316', '#64748b',
]

export default function NewListPage() {
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#6366f1')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    formData.set('color', selectedColor)
    try {
      await createList(formData)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Liste oluşturulamadı')
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-lg mx-auto animate-fade-in">
      <Link href="/lists" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Listelere dön
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Yeni Liste</h1>
      <p className="text-gray-500 text-sm mb-8">Listenin temel bilgilerini gir.</p>

      <form action={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-gray-700 text-sm font-medium flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-gray-400" />
            Başlık
          </Label>
          <Input
            name="title"
            placeholder="Örn: Film Listesi, Alışveriş, Hedefler..."
            className="h-11 border-gray-200 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-400"
            required
            autoFocus
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-gray-700 text-sm font-medium flex items-center gap-1.5">
            <AlignLeft className="w-3.5 h-3.5 text-gray-400" />
            Açıklama <span className="text-gray-400 font-normal">(opsiyonel)</span>
          </Label>
          <textarea
            name="description"
            placeholder="Bu liste ne içerecek?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all resize-none"
          />
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label className="text-gray-700 text-sm font-medium flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-gray-400" />
            Renk
          </Label>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                  selectedColor === c ? 'border-gray-900 scale-110 shadow-md' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <Link href="/lists" className="flex-1">
            <Button type="button" variant="outline" className="w-full h-11 border-gray-200">
              İptal
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex-1 h-11 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Oluştur
          </Button>
        </div>
      </form>
    </div>
  )
}
