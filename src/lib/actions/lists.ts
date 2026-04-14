'use server'

import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ensureWorkspace } from '@/lib/ensure-workspace'

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Giriş yapmalısın')
  return user
}

// ─── Lists ────────────────────────────────────────────────────────────────────

export async function getLists() {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('is_archived', false)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getList(listId: string) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('id', listId)
    .eq('workspace_id', workspaceId)
    .single()

  if (error || !data) throw new Error('Liste bulunamadı')
  return data
}

export async function createList(formData: FormData) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const color = (formData.get('color') as string) || '#6366f1'
  const icon = formData.get('icon') as string | null

  if (!title?.trim()) throw new Error('Başlık gerekli')

  const { data, error } = await supabase
    .from('lists')
    .insert({
      workspace_id: workspaceId,
      title: title.trim(),
      description: description?.trim() || null,
      color,
      icon,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (error || !data) throw new Error('Liste oluşturulamadı: ' + error?.message)

  revalidatePath('/dashboard')
  revalidatePath('/lists')
  redirect(`/lists/${data.id}`)
}

export async function updateList(listId: string, formData: FormData) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const color = formData.get('color') as string | null

  await supabase
    .from('lists')
    .update({
      title: title?.trim(),
      description: description?.trim() || null,
      color: color || '#6366f1',
      updated_at: new Date().toISOString(),
    })
    .eq('id', listId)
    .eq('workspace_id', workspaceId)

  revalidatePath(`/lists/${listId}`)
  revalidatePath('/lists')
}

export async function deleteList(listId: string) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  await supabase
    .from('lists')
    .delete()
    .eq('id', listId)
    .eq('workspace_id', workspaceId)

  revalidatePath('/dashboard')
  revalidatePath('/lists')
  redirect('/lists')
}

export async function archiveList(listId: string) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  await supabase
    .from('lists')
    .update({ is_archived: true, updated_at: new Date().toISOString() })
    .eq('id', listId)
    .eq('workspace_id', workspaceId)

  revalidatePath('/dashboard')
  revalidatePath('/lists')
}

// ─── Items ────────────────────────────────────────────────────────────────────

export async function getListItems(listId: string) {
  await getAuthUser()
  const supabase = await createServiceClient()

  const { data, error } = await supabase
    .from('list_items')
    .select(`
      id, order_index, status, priority, due_date, custom_values, created_at, updated_at,
      items!inner(id, title, notes, is_deleted, created_at)
    `)
    .eq('list_id', listId)
    .eq('items.is_deleted', false)
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(row => ({
    listItem: {
      id: row.id,
      orderIndex: row.order_index,
      status: row.status,
      priority: row.priority,
      dueDate: row.due_date,
      customValues: row.custom_values,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    },
    item: {
      id: (row.items as any).id,
      title: (row.items as any).title,
      notes: (row.items as any).notes,
    },
  }))
}

export async function addItemToList(listId: string, formData: FormData) {
  const user = await getAuthUser()
  const workspaceId = await ensureWorkspace(user.id, user.email!)
  const supabase = await createServiceClient()

  const title = formData.get('title') as string
  if (!title?.trim()) throw new Error('Başlık gerekli')

  // Önce item oluştur
  const { data: newItem, error: itemErr } = await supabase
    .from('items')
    .insert({
      workspace_id: workspaceId,
      title: title.trim(),
      created_by: user.id,
    })
    .select('id')
    .single()

  if (itemErr || !newItem) throw new Error('Öğe oluşturulamadı')

  // Listeye bağla (bridge)
  await supabase
    .from('list_items')
    .insert({
      list_id: listId,
      item_id: newItem.id,
    })

  revalidatePath(`/lists/${listId}`)
}

export async function toggleItemStatus(listItemId: string, listId: string) {
  const supabase = await createServiceClient()

  const { data: current } = await supabase
    .from('list_items')
    .select('status')
    .eq('id', listItemId)
    .single()

  const newStatus = current?.status === 'done' ? 'active' : 'done'

  await supabase
    .from('list_items')
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', listItemId)

  revalidatePath(`/lists/${listId}`)
}

export async function deleteItem(itemId: string, listId: string) {
  const supabase = await createServiceClient()

  await supabase
    .from('items')
    .update({ is_deleted: true, updated_at: new Date().toISOString() })
    .eq('id', itemId)

  revalidatePath(`/lists/${listId}`)
  revalidatePath('/dashboard')
}

export async function setItemPriority(listItemId: string, priority: string, listId: string) {
  const supabase = await createServiceClient()

  await supabase
    .from('list_items')
    .update({ priority, updated_at: new Date().toISOString() })
    .eq('id', listItemId)

  revalidatePath(`/lists/${listId}`)
}
