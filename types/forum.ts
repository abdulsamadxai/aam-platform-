import { PublicMember } from './member'

export interface ForumThread {
  id: string
  title: string
  body: string
  author_id: string
  author?: PublicMember
  category: string
  is_pinned: boolean
  is_locked: boolean
  deleted_at?: string
  reply_count?: number
  created_at: string
  updated_at: string
}

export interface ForumReply {
  id: string
  thread_id: string
  author_id: string
  author?: PublicMember
  body: string
  upvotes: number
  is_flagged: boolean
  user_has_voted?: boolean
  deleted_at?: string
  created_at: string
}
