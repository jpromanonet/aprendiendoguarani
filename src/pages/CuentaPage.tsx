import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function CuentaPage() {
  const {
    configured,
    loading,
    user,
    profile,
    signInWithPassword,
    signUp,
    signOut,
    updateAvatar,
  } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [photoBusy, setPhotoBusy] = useState(false)
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  if (!configured) {
    return (
      <div className="account-page">
        <header className="resource-hero dict">
          <h1>Mi cuenta</h1>
          <p className="lede">
            Falta conectar Supabase. Creá un proyecto y cargá <code>VITE_SUPABASE_URL</code> y{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> en <code>.env.local</code>.
          </p>
        </header>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="account-page">
        <p className="lede">Cargando sesión…</p>
      </div>
    )
  }

  async function onPickPhoto(file: File | undefined) {
    if (!file) return
    setPhotoBusy(true)
    setError(null)
    setMessage(null)
    const result = await updateAvatar(file)
    setPhotoBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    setMessage('Foto de perfil actualizada.')
  }

  if (user) {
    return (
      <div className="account-page">
        <header className="resource-hero dict">
          <h1>Hola, {profile?.display_name || 'alumno/a'}</h1>
          <p className="lede">{profile?.email || user.email}</p>
        </header>

        <section className="profile-photo-card">
          <div className="profile-photo-preview">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Tu foto de perfil" />
            ) : (
              <span className="profile-photo-fallback" aria-hidden="true" />
            )}
          </div>
          <div className="profile-photo-actions">
            <p className="lede">Sacá una foto o elegí una imagen para tu perfil.</p>
            <div className="account-actions">
              <button
                type="button"
                className="primary-btn"
                disabled={photoBusy}
                onClick={() => cameraRef.current?.click()}
              >
                {photoBusy ? 'Subiendo…' : 'Tomar foto'}
              </button>
              <button
                type="button"
                className="ghost-btn"
                disabled={photoBusy}
                onClick={() => galleryRef.current?.click()}
              >
                Elegir imagen
              </button>
            </div>
            <input
              ref={cameraRef}
              className="sr-only"
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => void onPickPhoto(e.target.files?.[0])}
            />
            <input
              ref={galleryRef}
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={(e) => void onPickPhoto(e.target.files?.[0])}
            />
            {error ? <p className="quiz-error">{error}</p> : null}
            {message ? <p className="quiz-passed">{message}</p> : null}
          </div>
        </section>

        <div className="account-actions">
          <Link className="primary-btn" to="/progreso">
            Ver mi progreso
          </Link>
          <button type="button" className="ghost-btn" onClick={() => void signOut()}>
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError(null)
    setMessage(null)
    const result =
      mode === 'login'
        ? await signInWithPassword(email, password)
        : await signUp(email, password, displayName)
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (mode === 'register') {
      setMessage('Cuenta creada. Si el proyecto pide confirmar email, revisá tu correo.')
    }
  }

  return (
    <div className="account-page">
      <header className="resource-hero dict">
        <h1>{mode === 'login' ? 'Ingresar' : 'Crear cuenta'}</h1>
        <p className="lede">Alumnos del Nivel 1: progreso, autoevaluación y certificado.</p>
      </header>

      <form className="account-form" onSubmit={onSubmit}>
        {mode === 'register' ? (
          <label>
            Nombre
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
            />
          </label>
        ) : null}
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />
        </label>
        {error ? <p className="quiz-error">{error}</p> : null}
        {message ? <p className="quiz-passed">{message}</p> : null}
        <button className="primary-btn" type="submit" disabled={busy}>
          {busy ? 'Esperá…' : mode === 'login' ? 'Ingresar' : 'Registrarme'}
        </button>
      </form>

      <p className="account-switch">
        {mode === 'login' ? (
          <>
            ¿No tenés cuenta?{' '}
            <button type="button" onClick={() => setMode('register')}>
              Registrate
            </button>
          </>
        ) : (
          <>
            ¿Ya tenés cuenta?{' '}
            <button type="button" onClick={() => setMode('login')}>
              Ingresá
            </button>
          </>
        )}
      </p>
    </div>
  )
}
