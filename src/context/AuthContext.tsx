import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Profile } from '../types/database'

type AuthContextValue = {
  configured: boolean
  loading: boolean
  session: Session | null
  user: User | null
  profile: Profile | null
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateAvatar: (file: File) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const loadProfile = useCallback(async (userId: string) => {
    if (!supabase) return
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
    setProfile(data)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return
    await loadProfile(session.user.id)
  }, [loadProfile, session?.user])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      if (data.session?.user) void loadProfile(data.session.user.id)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next?.user) void loadProfile(next.user.id)
      else setProfile(null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      session,
      user: session?.user ?? null,
      profile,
      async signInWithPassword(email, password) {
        if (!supabase) return { error: 'Supabase no está configurado.' }
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error?.message ?? null }
      },
      async signUp(email, password, displayName) {
        if (!supabase) return { error: 'Supabase no está configurado.' }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName ?? '' } },
        })
        return { error: error?.message ?? null }
      },
      async signOut() {
        if (!supabase) return
        await supabase.auth.signOut()
        setProfile(null)
      },
      refreshProfile,
      async updateAvatar(file: File) {
        if (!supabase || !session?.user) return { error: 'Tenés que iniciar sesión.' }
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const path = `${session.user.id}/avatar.${ext}`
        const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, {
          upsert: true,
          contentType: file.type || 'image/jpeg',
        })
        if (uploadError) return { error: uploadError.message }

        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        const avatarUrl = `${data.publicUrl}?t=${Date.now()}`
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
          .eq('id', session.user.id)
        if (updateError) return { error: updateError.message }

        await loadProfile(session.user.id)
        return { error: null }
      },
    }),
    [loading, session, profile, refreshProfile, loadProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
