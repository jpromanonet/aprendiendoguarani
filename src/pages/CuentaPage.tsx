import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { classes, levels } from '../data/classes'
import { COURSE_CERTIFICATE_SLUG, slugsForLevel } from '../data/nivel1'
import { fetchProgress } from '../lib/progress'
import { learnedWordTotal } from '../lib/vocabulary'
import { supabase } from '../lib/supabase'
import type { Certificate, LessonProgress, SelfAssessment } from '../types/database'

function formatCertDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

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
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({ 'nivel-1': true })
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [nameBusy, setNameBusy] = useState(false)
  const photoRef = useRef<HTMLInputElement>(null)
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
      supabase.from('certificates').select('*').eq('user_id', user.id),
    ])
      .then(([progress, assess, certs]) => {
        setRows(progress)
        setAssessments((assess.data ?? []) as SelfAssessment[])
        setCertificates((certs.data ?? []) as Certificate[])
      })
      .catch((err: Error) => setError(err.message))
  }, [user])

  const bySlug = useMemo(() => new Map(rows.map((r) => [r.class_slug, r])), [rows])
  const levelStats = useMemo(
    () =>
      levels.map((nivel) => {
        const slugs = slugsForLevel(nivel.slug)
        const done = slugs.filter((slug) => bySlug.get(slug)?.completed).length
        const total = nivel.totalClasses
        const pct = total > 0 ? Math.round((done / total) * 100) : 0
        return { nivel, slugs, done, total, pct }
      }),
    [bySlug],
  )
  const courseTotal = levelStats.reduce((sum, level) => sum + level.total, 0)
  const completedCount = levelStats.reduce((sum, level) => sum + level.done, 0)
  const inProgressCount = rows.filter((r) => !r.completed).length
  const startedCount = rows.length
  const progressPct = courseTotal > 0 ? Math.round((completedCount / courseTotal) * 100) : 0
  const quizAttempts = assessments.length
  const quizzesPassed = new Set(assessments.filter((a) => a.passed).map((a) => a.class_slug)).size
  const { learnedWords, wordsByClass } = useMemo(() => {
    const slugs = levelStats.flatMap((level) =>
      level.slugs.filter((slug) => {
        if (bySlug.get(slug)?.completed) return true
        return assessments.some((item) => item.class_slug === slug && item.passed)
      }),
    )
    const result = learnedWordTotal(slugs)
    return { learnedWords: result.total, wordsByClass: result.bySlug }
  }, [assessments, bySlug, levelStats])
  const bestScore = assessments.length ? Math.max(...assessments.map((a) => a.score)) : null
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null
  const nivel1 = levelStats.find((level) => level.nivel.slug === 'nivel-1')
  const readyForCert = Boolean(nivel1 && nivel1.total > 0 && nivel1.done >= nivel1.total)
  const earnedLevelCerts = levelStats.filter((level) =>
    certificates.some((item) => item.level_slug === level.nivel.slug),
  ).length
  const finalCert = certificates.find((item) => item.level_slug === COURSE_CERTIFICATE_SLUG)
  const finalReady = levelStats.length > 0 && earnedLevelCerts === levelStats.length
  const nextClass = nivel1?.slugs.find((slug) => !bySlug.get(slug)?.completed)
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
                <input
                  ref={photoRef}
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  onChange={(e) => void onPickPhoto(e.target.files?.[0])}
                />
              </div>

              <div className="profile-copy">
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
                      <button type="submit" className="profile-text-action solid" disabled={nameBusy}>
                        {nameBusy ? '…' : 'Guardar'}
                      </button>
                      <button
                        type="button"
                        className="profile-text-action"
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
                  <h1>{profile?.display_name || 'Alumno/a'}</h1>
                )}
                <p className="profile-email">{profile?.email || user.email}</p>
                <p className="profile-meta">
                  {memberSince ? <>Miembro desde {memberSince}</> : null}
                  {memberSince ? ' · ' : null}
                  Alumno
                  {quizzesPassed > 0 ? <> · {quizzesPassed} autoevals</> : null}
                  {readyForCert ? <> · Listo para certificado</> : null}
                </p>

                <div className="profile-actions" aria-label="Acciones de perfil">
                  {!editingName ? (
                    <button type="button" className="profile-text-action" onClick={startEditName}>
                      Editar nombre
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="profile-text-action"
                    disabled={photoBusy}
                    onClick={() => photoRef.current?.click()}
                  >
                    {photoBusy ? 'Subiendo…' : 'Subir foto'}
                  </button>
                  <button type="button" className="profile-text-action profile-logout" onClick={() => void signOut()}>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-ring-card">
              <div
                className="profile-ring"
                style={{ '--pct': `${progressPct}` } as CSSProperties}
                aria-label={`${progressPct}% del curso`}
              >
                <strong>{progressPct}%</strong>
                <span>del curso</span>
              </div>
              <p>
                {completedCount}/{courseTotal} clases
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
          {error ? <p className="profile-flash error">{error}</p> : null}
          {message ? <p className="profile-flash ok">{message}</p> : null}
        </section>

        <section className="profile-metrics" aria-label="Métricas">
          <article>
            <span>Palabras</span>
            <strong>{learnedWords}</strong>
            <em>aprendidas</em>
          </article>
          <article>
            <span>Completadas</span>
            <strong>{completedCount}</strong>
            <em>de {courseTotal} del curso</em>
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

        <section className="profile-panel cert-panel" aria-label="Certificados">
          <div className="profile-panel-head">
            <div>
              <p className="eyebrow">Niveles y cierre del curso</p>
              <h2>Certificados</h2>
            </div>
          </div>
          <div className="cert-grid">
            {levelStats.map(({ nivel, done, total }) => {
              const issued = certificates.find((item) => item.level_slug === nivel.slug)
              const ready = total > 0 && done >= total
              return (
                <article key={nivel.slug} className={`cert-card ${issued ? 'earned' : ''}`}>
                  <span className="cert-kicker">{issued ? 'Emitido' : 'Certificado'}</span>
                  <strong>{nivel.title}</strong>
                  {issued ? (
                    <>
                      <em>{formatCertDate(issued.issued_at)}</em>
                      <span className="cert-code">{issued.code}</span>
                      {issued.pdf_url ? (
                        <a href={issued.pdf_url} target="_blank" rel="noreferrer">
                          Ver certificado
                        </a>
                      ) : null}
                    </>
                  ) : ready ? (
                    <em>Completaste este nivel. El certificado se habilita en la próxima etapa.</em>
                  ) : total > 0 ? (
                    <em>
                      {done} de {total} clases
                    </em>
                  ) : (
                    <em>Cuando se publique este nivel</em>
                  )}
                </article>
              )
            })}
            <article className={`cert-card cert-final ${finalCert || finalReady ? 'earned' : ''}`}>
              <span className="cert-kicker">{finalCert || finalReady ? 'Emitido' : 'Certificado final'}</span>
              <strong>Curso completo</strong>
              {finalCert ? (
                <>
                  <em>{formatCertDate(finalCert.issued_at)}</em>
                  <span className="cert-code">{finalCert.code}</span>
                  {finalCert.pdf_url ? (
                    <a href={finalCert.pdf_url} target="_blank" rel="noreferrer">
                      Ver certificado
                    </a>
                  ) : null}
                </>
              ) : finalReady ? (
                <em>Reuniste los certificados de todos los niveles.</em>
              ) : (
                <em>
                  Se emite al tener los certificados de todos los niveles. {earnedLevelCerts} de {levelStats.length}.
                </em>
              )}
            </article>
          </div>
        </section>

        <div className="profile-cut" aria-hidden="true" />

        <section className="profile-panel levels-journey" aria-label="Niveles del curso">
          <div className="profile-panel-head">
            <div>
              <p className="eyebrow">Camino completo</p>
              <h2>Niveles del curso</h2>
            </div>
          </div>

          <div className="level-accordions">
            {levelStats.map(({ nivel, slugs, done, total, pct }) => {
              const isOpen = Boolean(openLevels[nivel.slug])
              const panelId = `level-panel-${nivel.slug}`

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
                      {total > 0 ? (
                        <span className="level-accordion-count">
                          {done}/{total}
                        </span>
                      ) : (
                        <span className="soon-pill">Próximamente</span>
                      )}
                      <span className="level-accordion-chevron" aria-hidden="true" />
                    </span>
                    <span className="level-accordion-progress" aria-hidden="true">
                      <span style={{ width: `${pct}%` }} />
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
                          {slugs.map((slug, index) => {
                            const id = index + 1
                            const published = classes.find((c) => c.slug === slug)
                            const row = bySlug.get(slug)
                            const classAssess = assessments.filter((a) => a.class_slug === slug)
                            const passed = classAssess.some((a) => a.passed)
                            const wordCount = published ? (wordsByClass.get(slug) ?? 0) : 0
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
                                      {wordCount > 0
                                        ? ` · ${wordCount} ${wordCount === 1 ? 'palabra' : 'palabras'}`
                                        : ''}
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
