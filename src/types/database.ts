export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          email: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          display_name?: string | null
          email?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          class_slug: string
          completed: boolean
          percent: number
          last_seen_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          class_slug: string
          completed?: boolean
          percent?: number
          last_seen_at?: string
          completed_at?: string | null
        }
        Update: {
          completed?: boolean
          percent?: number
          last_seen_at?: string
          completed_at?: string | null
        }
      }
      self_assessments: {
        Row: {
          id: string
          user_id: string
          class_slug: string
          attempt: number
          max_attempts: number
          score: number
          passed: boolean
          answers: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          class_slug: string
          attempt: number
          max_attempts?: number
          score: number
          passed?: boolean
          answers?: Json
          created_at?: string
        }
        Update: never
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          level_slug: string
          code: string
          issued_at: string
          pdf_url: string | null
        }
        Insert: {
          id?: string
          user_id: string
          level_slug?: string
          code: string
          issued_at?: string
          pdf_url?: string | null
        }
        Update: {
          pdf_url?: string | null
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type LessonProgress = Database['public']['Tables']['lesson_progress']['Row']
export type SelfAssessment = Database['public']['Tables']['self_assessments']['Row']
export type Certificate = Database['public']['Tables']['certificates']['Row']
