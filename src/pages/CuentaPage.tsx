import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { classes, levels } from '../data/classes'
import { NIVEL_1_TOTAL_CLASSES, allNivel1Slugs } from '../data/nivel1'
import { fetchProgress } from '../lib/progress'
import { supabase } from '../lib/supabase'
import type { LessonProgress, SelfAssessment } from '../types/database'

export function CuentaPage() {
  const {
    configured,
    loading,
    user,
    profile,
    signInWithPassword,
    signInWithGoogle,
    signUp,
    signOut,
    updateAvatar,
    updateDisplayName,
  } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [photoBusy, setPhotoBusy] = useState(false)
  const [rows, setRows] = useState<LessonProgress[]>([])
  const [assessments, setAssessments] = useState<SelfAssessment[]>([])
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({ 'nivel-1': true })
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [nameBusy, setNameBusy] = useState(false)
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  function toggleLevel(slug: string) {
    setOpenLevels((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  function startEditName() {
    setNameDraft(profile?.display_name || '')
    setEditingName(true)
    setError(null)
    setTimeout(() => nameInputRef.current?.focus(), 0)
  }

  async function saveDisplayName() {
    setNameBusy(true)
    setError(null)
    const result = await updateDisplayName(nameDraft)
    setNameBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    setEditingName(false)
    setMessage('Nombre actualizado.')
  }

  useEffect(() => {
    if (!user || !supabase) return
    void Promise.all([
      fetchProgress(user.id),
      supabase.from('self_assessments').select('*').eq('user_id', user.id),
    ])
      .then(([progress, assess]) => {
        setRows(progress)
        setAssessments((assess.data ?? []) as SelfAssessment[])
      })
      .catch((err: Error) => setError(err.message))
  }, [user])

  const bySlug = useMemo(() => new Map(rows.map((r) => [r.class_slug, r])), [rows])
  const completedCount = allNivel1Slugs().filter((slug) => bySlug.get(slug)?.completed).length
  const inProgressCount = rows.filter((r) => !r.completed).length
  const startedCount = rows.length
  const progressPct = Math.round((completedCount / NIVEL_1_TOTAL_CLASSES) * 100)
  const quizAttempts = assessments.length
  const quizzesPassed = new Set(assessments.filter((a) => a.passed).map((a) => a.class_slug)).size
  const bestScore = assessments.length ? Math.max(...assessments.map((a) => a.score)) : null
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null
  const readyForCert = completedCount >= NIVEL_1_TOTAL_CLASSES
  const nextClass = allNivel1Slugs().find((slug) => !bySlug.get(slug)?.completed)
  const nextPublished = nextClass ? classes.find((c) => c.slug === nextClass) : undefined

  if (!configured) {
    return (
      <div className="account-shell">
        <div className="account-login-card">
          <h1>Login</h1>
          <p className="lede">
            Falta conectar Supabase. Cargá <code>VITE_SUPABASE_URL</code> y{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> en <code>.env.local</code>.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="account-shell">
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
      <div className="account-shell">
        <section className="profile-hero">
          <div className="profile-hero-glow" aria-hidden="true" />
          <div className="profile-hero-main">
            <div className="profile-identity">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Tu foto de perfil" />
                  ) : (
                    <span className="profile-photo-fallback" aria-hidden="true" />
                  )}
                </div>
                <div className="profile-avatar-actions">
                  <button
                    type="button"
                    className="profile-cam-btn"
                    disabled={photoBusy}
                    onClick={() => cameraRef.current?.click()}
                  >
                    {photoBusy ? '…' : 'Tomar foto'}
                  </button>
                  <button
                    type="button"
                    className="profile-cam-btn ghost"
                    disabled={photoBusy}
                    onClick={() => galleryRef.current?.click()}
                  >
                    Galería
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
              </div>

              <div className="profile-copy">
                <p className="profile-kicker">Nivel 1 · Avañe'ẽ</p>
                {editingName ? (
                  <form
                    className="profile-name-edit"
                    onSubmit={(e) => {
                      e.preventDefault()
                      void saveDisplayName()
                    }}
                  >
                    <input
                      ref={nameInputRef}
                      className="profile-name-input"
                      value={nameDraft}
                      maxLength={60}
                      onChange={(e) => setNameDraft(e.target.value)}
                      aria-label="Nombre de usuario"
                      disabled={nameBusy}
                    />
                    <div className="profile-name-actions">
                      <button type="submit" className="profile-cam-btn" disabled={nameBusy}>
                        {nameBusy ? '…' : 'Guardar'}
                      </button>
                      <button
                        type="button"
                        className="profile-cam-btn ghost"
                        disabled={nameBusy}
                        onClick={() => {
                          setEditingName(false)
                          setError(null)
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-name-row">
                    <h1>{profile?.display_name || 'Alumno/a'}</h1>
                    <button type="button" className="profile-edit-name" onClick={startEditName}>
                      Editar
                    </button>
                  </div>
                )}
                <p className="profile-email">{profile?.email || user.email}</p>
                {memberSince ? <p className="profile-meta">Miembro desde {memberSince}</p> : null}
                <div className="profile-badges">
                  <span className="profile-badge">Alumno</span>
                  {readyForCert ? <span className="profile-badge gold">Listo para certificado</span> : null}
                  {quizzesPassed > 0 ? (
                    <span className="profile-badge">{quizzesPassed} autoevals aprobadas</span>
                  ) : null}
                </div>
                <button type="button" className="profile-logout-btn" onClick={() => void signOut()}>
                  Cerrar sesión
                </button>
              </div>
            </div>

            <div className="profile-ring-card">
              <div
                className="profile-ring"
                style={{ '--pct': `${progressPct}` } as CSSProperties}
                aria-label={`${progressPct}% del Nivel 1`}
              >
                <strong>{progressPct}%</strong>
                <span>completado</span>
              </div>
              <p>
                {completedCount}/{NIVEL_1_TOTAL_CLASSES} clases
              </p>
              {nextPublished ? (
                <Link className="primary-btn" to={`/nivel-1/clase/${nextPublished.slug}`}>
                  Seguir con {nextPublished.title}
                </Link>
              ) : readyForCert ? (
                <p className="quiz-passed">Completaste el Nivel 1</p>
              ) : (
                <Link className="primary-btn" to="/nivel-1">
                  Ver clases
                </Link>
              )}
            </div>
          </div>
          {error ? <p className="quiz-error">{error}</p> : null}
          {message ? <p className="quiz-passed">{message}</p> : null}
        </section>

        <section className="profile-metrics" aria-label="Métricas">
          <article>
            <span>Completadas</span>
            <strong>{completedCount}</strong>
            <em>de {NIVEL_1_TOTAL_CLASSES}</em>
          </article>
          <article>
            <span>En curso</span>
            <strong>{inProgressCount}</strong>
            <em>iniciadas sin cerrar</em>
          </article>
          <article>
            <span>Autoevals</span>
            <strong>{quizzesPassed}</strong>
            <em>{quizAttempts} intentos totales</em>
          </article>
          <article>
            <span>Mejor score</span>
            <strong>{bestScore == null ? '—' : `${bestScore}%`}</strong>
            <em>en quizzes</em>
          </article>
        </section>

        <div className="profile-cut" aria-hidden="true" />

        <section className="profile-panel levels-journey" aria-label="Niveles del curso">
          <div className="profile-panel-head">
            <div>
              <p className="eyebrow">Camino completo</p>
              <h2>Niveles del curso</h2>
            </div>
          </div>

          <div className="progress-summary compact">
            <div className="progress-bar" aria-hidden="true">
              <span style={{ width: `${progressPct}%` }} />
            </div>
            <p className="lede">
              {readyForCert
                ? 'Cumpliste las 15 clases del Nivel 1. El certificado se habilita en la próxima etapa.'
                : `Nivel 1: te faltan ${NIVEL_1_TOTAL_CLASSES - completedCount} clases para el certificado.`}
            </p>
          </div>

          <div className="level-accordions">
            {levels.map((nivel) => {
              const isOpen = Boolean(openLevels[nivel.slug])
              const panelId = `level-panel-${nivel.slug}`
              const nivelClasses = nivel.available ? allNivel1Slugs() : []

              return (
                <div
                  key={nivel.slug}
                  className={`level-accordion ${nivel.available ? 'available' : 'locked'} ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="level-accordion-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleLevel(nivel.slug)}
                  >
                    <span className="level-accordion-copy">
                      <strong>{nivel.title}</strong>
                    </span>
                    <span className="level-accordion-meta">
                      {nivel.available ? (
                        <span className="level-accordion-count">
                          {completedCount}/{NIVEL_1_TOTAL_CLASSES}
                        </span>
                      ) : (
                        <span className="soon-pill">Próximamente</span>
                      )}
                      <span className="level-accordion-chevron" aria-hidden="true" />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    className="level-accordion-panel"
                    role="region"
                    hidden={!isOpen}
                  >
                    <p className="level-accordion-desc">{nivel.description}</p>

                    {nivel.available ? (
                      <>
                        <ul className="progress-list rich">
                          {nivelClasses.map((slug, index) => {
                            const id = index + 1
                            const published = classes.find((c) => c.slug === slug)
                            const row = bySlug.get(slug)
                            const classAssess = assessments.filter((a) => a.class_slug === slug)
                            const passed = classAssess.some((a) => a.passed)
                            const status = row?.completed
                              ? 'Completada'
                              : row
                                ? 'En curso'
                                : published
                                  ? 'Sin empezar'
                                  : 'Próximamente'
                            return (
                              <li key={slug} className={row?.completed ? 'done' : row ? 'active' : ''}>
                                <div className="progress-item-main">
                                  <span className="progress-num">{String(id).padStart(2, '0')}</span>
                                  <div>
                                    <strong>{published ? published.subtitle : `Clase ${id}`}</strong>
                                    <span>
                                      {status}
                                      {passed
                                        ? ' · Autoeval OK'
                                        : classAssess.length
                                          ? ` · ${classAssess.length} intento(s)`
                                          : ''}
                                    </span>
                                  </div>
                                </div>
                                {published ? (
                                  <Link to={`/${nivel.slug}/clase/${slug}`}>
                                    {row?.completed ? 'Repasar' : 'Entrar'} →
                                  </Link>
                                ) : (
                                  <span className="muted">—</span>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                        {startedCount === 0 ? (
                          <p className="profile-empty">
                            Todavía no empezaste. Entrá a la{' '}
                            <Link to={`/${nivel.slug}/clase/clase-1`}>Clase 1</Link> y tu progreso
                            aparece acá.
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p className="level-accordion-empty">
                        Las clases de este nivel se publicarán pronto.
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
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
      setMessage('Cuenta creada. Si pide confirmar email, revisá tu correo.')
    }
  }

  return (
    <div className="account-shell login-view">
      <div className="account-login-card">
        <p className="profile-kicker">Avañe'ẽ</p>
        <h1>{mode === 'login' ? 'Login' : 'Crear cuenta'}</h1>
        <p className="lede">Entrá para guardar progreso, foto de perfil y autoevaluaciones.</p>

        <button
          type="button"
          className="google-btn"
          disabled={busy}
          onClick={() => {
            setBusy(true)
            setError(null)
            void signInWithGoogle().then((result) => {
              if (result.error) {
                setError(result.error)
                setBusy(false)
              }
            })
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.4-.2-2H12z"
            />
            <path
              fill="#34A853"
              d="M6.6 14.3l-.5.4-2.4 1.9C5.4 19.1 8.5 21 12 21c2.3 0 4.3-.8 5.7-2.1l-3.1-2.4c-.8.6-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8z"
            />
            <path
              fill="#4A90E2"
              d="M3.7 7.4C3.3 8.3 3 9.4 3 10.5s.3 2.2.7 3.1C5.1 16.4 7.1 18 9.5 18c1.2 0 2.3-.3 3.1-.9l-3.1-2.4c-.9.6-2.1.5-2.9-.3-.7-.7-1.1-1.7-1.1-2.8 0-1 .4-2 1.1-2.8.8-.8 2-.9 2.9-.3l3.1-2.4C12.8 5.1 11.2 4.5 9.5 4.5 6.6 4.5 4.1 6.2 3.7 7.4z"
            />
            <path
              fill="#FBBC05"
              d="M12 4.5c1.7 0 3.3.6 4.5 1.8l2.7-2.7C17.3 1.7 14.9.5 12 .5 8.5.5 5.4 2.4 3.7 5.4l3.1 2.4C7.6 6.1 9.6 4.5 12 4.5z"
            />
          </svg>
          Continuar con Google
        </button>

        <div className="login-divider" aria-hidden="true">
          <span>o con email</span>
        </div>

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
    </div>
  )
}
