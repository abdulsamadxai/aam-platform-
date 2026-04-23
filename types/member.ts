export type MemberCategory = 'professional' | 'general' | 'associate'
export type MemberStatus = 'pending' | 'active' | 'suspended'

export interface Member {
  id: string
  aam_id: string
  full_name: string
  email: string          // NEVER send to public-facing components
  phone?: string
  category: MemberCategory
  status: MemberStatus
  profile_photo_url?: string
  bio?: string
  firm_name?: string
  registration_date?: string
  renewal_date?: string
  is_voting_eligible: boolean
  unsubscribed: boolean
  joined_at: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

// Safe version for public directory — no PII
export interface PublicMember {
  id: string
  aam_id: string
  full_name: string
  category: MemberCategory
  status: MemberStatus
  profile_photo_url?: string
  firm_name?: string
}
