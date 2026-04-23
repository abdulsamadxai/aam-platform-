import { MemberCategory } from './member'

export type BroadcastType = 'email' | 'sms'
export type BroadcastStatus = 'draft' | 'sending' | 'sent' | 'failed'

export interface Broadcast {
  id: string
  type: BroadcastType
  subject?: string
  body: string
  recipient_filter: { category?: MemberCategory; all?: boolean }
  sent_count: number
  fail_count: number
  status: BroadcastStatus
  sent_by?: string
  sent_at?: string
  created_at: string
}
