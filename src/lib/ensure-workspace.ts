import { createServiceClient } from '@/lib/supabase/service'

/**
 * Kullanıcının workspace'i yoksa otomatik oluşturur.
 * Supabase service role client kullanır — RLS'i bypass eder.
 */
export async function ensureWorkspace(userId: string, email: string, name?: string | null) {
  const supabase = await createServiceClient()

  // 1. workspace_members'da kayıt var mı?
  const { data: existing } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (existing) return existing.workspace_id as string

  // 2. Users tablosuna ekle (upsert)
  await supabase
    .from('users')
    .upsert({
      id: userId,
      email,
      name: name || email.split('@')[0],
    }, { onConflict: 'id' })

  // 3. Workspace oluştur
  const slug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now()

  const { data: workspace, error: wsError } = await supabase
    .from('workspaces')
    .insert({
      owner_id: userId,
      name: 'Çalışma Alanım',
      slug,
    })
    .select('id')
    .single()

  if (wsError || !workspace) throw new Error('Workspace oluşturulamadı: ' + wsError?.message)

  // 4. Membership oluştur
  await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspace.id,
      user_id: userId,
      role: 'owner',
    })

  return workspace.id as string
}
