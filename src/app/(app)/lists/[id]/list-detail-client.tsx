'use client'

import { useState, useRef } from 'react'
import { addItemToList, toggleItemStatus, deleteItem, setItemPriority, deleteList } from '@/lib/actions/lists'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Plus, ArrowLeft, Trash2, Circle, CheckCircle2,
  MoreHorizontal, Flag, Clock, GripVertical,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import type { List, Item, ListItem } from '@/lib/db/schema'

interface Props {
  list: List
  listItems: { listItem: ListItem; item: Item }[]
}

const priorityColors: Record<string, string> = {
  none: 'text-gray-300',
  low: 'text-blue-400',
  medium: 'text-amber-400',
  high: 'text-red-400',
}

const priorityLabels: Record<string, string> = {
  none: 'Yok',
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

export function ListDetailClient({ list, listItems }: Props) {
  const [newItemTitle, setNewItemTitle] = useState('')
  const [adding, setAdding] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!newItemTitle.trim()) return
    setAdding(true)
    try {
      const formData = new FormData()
      formData.set('title', newItemTitle)
      await addItemToList(list.id, formData)
      setNewItemTitle('')
      inputRef.current?.focus()
    } catch {
      toast.error('Öğe eklenemedi')
    } finally {
      setAdding(false)
    }
  }

  async function handleToggle(listItemId: string) {
    try {
      await toggleItemStatus(listItemId, list.id)
    } catch {
      toast.error('Durum değiştirilemedi')
    }
  }

  async function handleDelete(itemId: string) {
    try {
      await deleteItem(itemId, list.id)
      toast.success('Öğe silindi')
    } catch {
      toast.error('Silinemedi')
    }
  }

  async function handleDeleteList() {
    if (!confirm('Bu listeyi silmek istediğine emin misin?')) return
    try {
      await deleteList(list.id)
    } catch {
      toast.error('Liste silinemedi')
    }
  }

  async function cyclePriority(listItemId: string, currentPriority: string) {
    const cycle = ['none', 'low', 'medium', 'high']
    const next = cycle[(cycle.indexOf(currentPriority) + 1) % cycle.length]
    await setItemPriority(listItemId, next, list.id)
  }

  const activeItems = listItems.filter(({ listItem }) => listItem.status !== 'done')
  const doneItems = listItems.filter(({ listItem }) => listItem.status === 'done')

  return (
    <div className="p-8 max-w-3xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <Link href="/lists" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Listelere dön
      </Link>

      {/* List Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg"
            style={{ backgroundColor: list.color || '#6366f1' }}
          >
            {list.icon || list.title.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{list.title}</h1>
            {list.description && (
              <p className="text-sm text-gray-500 mt-0.5">{list.description}</p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all"
          onClick={handleDeleteList}
        >
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Sil
        </Button>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 bg-white rounded-xl border border-gray-100 px-4 py-3">
        <span className="font-medium text-gray-700">{listItems.length} öğe</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="text-emerald-600">{doneItems.length} tamamlanmış</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>{activeItems.length} aktif</span>
        {listItems.length > 0 && (
          <>
            <span className="ml-auto">
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${(doneItems.length / listItems.length) * 100}%` }}
                />
              </div>
            </span>
            <span className="font-semibold text-indigo-600">
              %{Math.round((doneItems.length / listItems.length) * 100)}
            </span>
          </>
        )}
      </div>

      {/* Add new item */}
      <form onSubmit={handleAddItem} className="flex gap-2 mb-6">
        <div className="relative flex-1 group">
          <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <Input
            ref={inputRef}
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Yeni öğe ekle..."
            className="pl-10 h-11 border-gray-200 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-400 transition-all"
          />
        </div>
        <Button
          type="submit"
          disabled={adding || !newItemTitle.trim()}
          className="h-11 px-5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/15 transition-all duration-300"
        >
          Ekle
        </Button>
      </form>

      {/* Active Items */}
      <div className="space-y-1.5">
        {activeItems.map(({ listItem, item }) => (
          <div
            key={listItem.id}
            className="group flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-indigo-100 hover:shadow-sm transition-all duration-200"
          >
            <button onClick={() => handleToggle(listItem.id)} className="flex-shrink-0 hover:scale-110 transition-transform">
              <Circle className="w-5 h-5 text-gray-300 hover:text-indigo-500 transition-colors" />
            </button>
            <span className="flex-1 text-sm text-gray-800">{item.title}</span>
            <button
              onClick={() => cyclePriority(listItem.id, listItem.priority || 'none')}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              title={`Öncelik: ${priorityLabels[listItem.priority || 'none']}`}
            >
              <Flag className={`w-3.5 h-3.5 ${priorityColors[listItem.priority || 'none']}`} />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
            >
              <Trash2 className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Done Items */}
      {doneItems.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Tamamlananlar ({doneItems.length})
          </p>
          <div className="space-y-1.5">
            {doneItems.map(({ listItem, item }) => (
              <div
                key={listItem.id}
                className="group flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-100 px-4 py-3 transition-all duration-200"
              >
                <button onClick={() => handleToggle(listItem.id)} className="flex-shrink-0 hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </button>
                <span className="flex-1 text-sm text-gray-400 line-through">{item.title}</span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {listItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center mx-auto mb-4 animate-float">
            <Plus className="w-7 h-7 text-indigo-400" />
          </div>
          <p className="text-gray-500 text-sm">Bu liste henüz boş. Yukarıdan öğe ekle!</p>
        </div>
      )}
    </div>
  )
}
