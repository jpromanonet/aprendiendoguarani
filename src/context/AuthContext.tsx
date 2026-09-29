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
  signInWithGoogle: () => Promise<{ error: string | null }>
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateAvatar: (file: File) => Promise<{ error: string | null }>
  updateDisplayName: (name: string) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  const loadProfile = useCallback(async (userId: string, user?: User | null) => {
    if (!supabase) return
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()

    // Si viene de Google y el perfil está vacío, sincronizar nombre/foto
    const meta = user?.user_metadata
    if (data && meta && (!data.display_name || !data.avatar_url)) {
      const nextName =
        data.display_name ||
        (meta.full_name as string | undefined) ||
        (meta.name as string | undefined) ||
        null
      const nextAvatar =
        data.avatar_url ||
        (meta.avatar_url as string | undefined) ||
        (meta.picture as string | undefined) ||
        null
      if (nextName !== data.display_name || nextAvatar !== data.avatar_url) {
        const { data: updated } = await supabase
          .from('profiles')
          .update({
            display_name: nextName,
            avatar_url: nextAvatar,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
          .select()
          .maybeSingle()
        setProfile(updated ?? data)
        return
      }
    }

    setProfile(data)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!session?.user) return
    await loadProfile(session.user.id, session.user)
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
      if (data.session?.user) void loadProfile(data.session.user.id, data.session.user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next?.user) void loadProfile(next.user.id, next.user)
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
      async signInWithGoogle() {
        if (!supabase) return { error: 'Supabase no está configurado.' }
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/cuenta`,
            queryParams: {
              access_type: 'offline',
              prompt: 'select_account',
            },
          },
        })
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

        await loadProfile(session.user.id, session.user)
        return { error: null }
      },
      async updateDisplayName(name: string) {
        if (!supabase || !session?.user) return { error: 'Tenés que iniciar sesión.' }
        const trimmed = name.trim()
        if (!trimmed) return { error: 'El nombre no puede estar vacío.' }
        if (trimmed.length > 60) return { error: 'Máximo 60 caracteres.' }
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ display_name: trimmed, updated_at: new Date().toISOString() })
          .eq('id', session.user.id)
        if (updateError) return { error: updateError.message }
        await loadProfile(session.user.id, session.user)
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
