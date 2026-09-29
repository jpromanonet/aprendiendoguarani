import { supabase } from './supabase'
import type { LessonProgress, SelfAssessment } from '../types/database'
import { DEFAULT_QUIZ_MAX_ATTEMPTS } from '../data/nivel1'

export async function fetchProgress(userId: string): Promise<LessonProgress[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)
    .order('class_slug')
  if (error) throw error
  return (data ?? []) as LessonProgress[]
}

export async function markClassSeen(userId: string, classSlug: string) {
  if (!supabase) return
  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      class_slug: classSlug,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,class_slug' },
  )
  if (error) throw error
}

export async function markClassCompleted(userId: string, classSlug: string) {
  if (!supabase) return
  const { error } = await supabase.from('lesson_progress').upsert(
    {
      user_id: userId,
      class_slug: classSlug,
      completed: true,
      percent: 100,
      last_seen_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,class_slug' },
  )
  if (error) throw error
}

export async function fetchAssessments(userId: string, classSlug: string): Promise<SelfAssessment[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('self_assessments')
    .select('*')
    .eq('user_id', userId)
    .eq('class_slug', classSlug)
    .order('attempt', { ascending: true })
  if (error) throw error
  return (data ?? []) as SelfAssessment[]
}

export async function submitAssessment(input: {
  userId: string
  classSlug: string
  attempt: number
  maxAttempts?: number
  score: number
  passed: boolean
  answers: Record<string, string>
}) {
  if (!supabase) throw new Error('Supabase no configurado')
  const { data, error } = await supabase
    .from('self_assessments')
    .insert({
      user_id: input.userId,
      class_slug: input.classSlug,
      attempt: input.attempt,
      max_attempts: input.maxAttempts ?? DEFAULT_QUIZ_MAX_ATTEMPTS,
      score: input.score,
      passed: input.passed,
      answers: input.answers,
    })
    .select()
    .single()
  if (error) throw error
  return data as SelfAssessment
}
