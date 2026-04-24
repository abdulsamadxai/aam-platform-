'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { Member, PublicMember } from '@/types'

import { createClient } from '@/lib/supabase/server'

export async function fetchMembersAction(): Promise<Member[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    return []
  }

  const adminSupabase = createAdminClient()
  const { data, error } = await adminSupabase
    .from('members')
    .select('*')
    .order('full_name', { ascending: true })

  if (error) {
    return []
  }

  return data || []
}

export async function fetchActiveMembersAction(): Promise<PublicMember[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('members')
    .select('id, aam_id, full_name, category, status, profile_photo_url, firm_name')
    .eq('status', 'active')

  if (error) {
    return []
  }

  return data || []
}

export async function approveApplication(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase.from('membership_applications').update({ status: 'approved' }).eq('id', id)
  if (error) throw error
}

export async function rejectApplication(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase.from('membership_applications').update({ status: 'rejected' }).eq('id', id)
  if (error) throw error
}
