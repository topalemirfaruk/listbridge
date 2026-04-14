import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Service role supabase client — RLS'i bypass eder.
 * Sadece server-side veri operasyonlarında kullanılır.
 */
export async function createServiceClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component'larda cookie set edilemez, sorun yok
          }
        },
      },
    }
  )
}
