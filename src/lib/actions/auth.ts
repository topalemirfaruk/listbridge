'use server'

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { workspaces, workspaceMembers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function requireUser() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

export async function getUserWorkspace(userId: string) {
  const member = await db.query.workspaceMembers.findFirst({
    where: eq(workspaceMembers.userId, userId),
    with: { workspace: true },
  })
  return member?.workspace ?? null
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
