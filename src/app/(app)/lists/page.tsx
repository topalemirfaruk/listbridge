import { getLists } from '@/lib/actions/lists'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, ListChecks, MoreHorizontal } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Listelerim' }

export default async function ListsPage() {
  const allLists = await getLists()

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Listelerim</h1>
          <p className="text-gray-500 text-sm mt-1">{allLists.length} liste</p>
        </div>
        <Link href="/lists/new">
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300">
            <Plus className="w-4 h-4 mr-1.5" />
            Yeni Liste
          </Button>
        </Link>
      </div>

      {allLists.length === 0 ? (
        /* Empty state */
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 hover:border-indigo-200 transition-colors duration-300">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center mx-auto mb-5 animate-float">
            <ListChecks className="w-9 h-9 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Henüz liste yok</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            İlk listeni oluştur ve organize etmeye başla.
          </p>
          <Link href="/lists/new">
            <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/20">
              <Plus className="w-4 h-4 mr-1.5" />
              İlk Listeni Oluştur
            </Button>
          </Link>
        </div>
      ) : (
        /* List grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
          {allLists.map((list) => (
            <Link key={list.id} href={`/lists/${list.id}`}>
              <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover-lift cursor-pointer transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm"
                    style={{ backgroundColor: list.color || '#6366f1' }}
                  >
                    {list.icon || list.title.charAt(0).toUpperCase()}
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{list.title}</h3>
                {list.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{list.description}</p>
                )}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50">
                    {list.defaultView === 'list' ? 'Liste' : list.defaultView === 'table' ? 'Tablo' : 'Board'}
                  </span>
                  <span>{list.visibility === 'public' ? 'Herkese Açık' : 'Gizli'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
