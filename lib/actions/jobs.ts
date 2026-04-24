'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { jobSchema } from '@/lib/validations'

export async function submitJobListingAction(data: any, isAdding: boolean, id?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  // Schema validation
  if (!data || typeof data !== 'object') throw new Error('Invalid payload')
  const validatedData = jobSchema.parse(data)
  
  const adminSupabase = createAdminClient()

  if (isAdding) {
    const { error } = await adminSupabase.from('job_listings').insert([validatedData])
    if (error) throw error
  } else if (id) {
    const { error } = await adminSupabase.from('job_listings').update(validatedData).eq('id', id)
    if (error) throw error
  }
}

export async function deleteJobListingAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const adminSupabase = createAdminClient()
  const { error } = await adminSupabase.from('job_listings').update({ deleted_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
}
