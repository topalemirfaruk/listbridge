import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        userEmail={user.email}
        workspaceName="Çalışma Alanım"
        plan="free"
      />
      {/* Main content — bg-white landing page ile aynı zemin */}
      <main className="flex-1 ml-64 overflow-y-auto bg-gray-50/30">
        {children}
      </main>
    </div>
  )
}
