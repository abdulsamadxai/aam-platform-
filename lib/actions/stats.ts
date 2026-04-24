'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function fetchPlatformStats() {
  const authSupabase = await createClient()
  const { data: { user } } = await authSupabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return { totalMembers: 0, professionalMembers: 0 }
  }

  const supabase = createAdminClient()
  
  const [total, prof] = await Promise.all([
    supabase.from('members').select('*', { count: 'exact', head: true }),
    supabase.from('members').select('*', { count: 'exact', head: true }).eq('category', 'professional')
  ])

  return {
    totalMembers: total.count || 0,
    professionalMembers: prof.count || 0
  }
}
