import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { classes } from '../data/classes'
import { NIVEL_1_TOTAL_CLASSES, allNivel1Slugs } from '../data/nivel1'
import { fetchProgress } from '../lib/progress'
import type { LessonProgress } from '../types/database'

export function ProgresoPage() {
  const { configured, loading, user, profile } = useAuth()
  const [rows, setRows] = useState<LessonProgress[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    fetchProgress(user.id)
      .then(setRows)
      .catch((err: Error) => setError(err.message))
  }, [user])

  const bySlug = useMemo(() => new Map(rows.map((r) => [r.class_slug, r])), [rows])
  const completedCount = allNivel1Slugs().filter((slug) => bySlug.get(slug)?.completed).length
  const readyForCert = completedCount >= NIVEL_1_TOTAL_CLASSES

  if (!configured) {
    return (
      <div className="account-page">
        <header className="resource-hero dict">
          <h1>Mi progreso</h1>
          <p className="lede">Conectá Supabase para guardar el avance de las 15 clases.</p>
        </header>
      </div>
    )
  }

  if (loading) return <div className="account-page"><p className="lede">Cargando…</p></div>

  if (!user) {
    return (
      <div className="account-page">
        <header className="resource-hero dict">
          <h1>Mi progreso</h1>
          <p className="lede">Iniciá sesión para ver tu avance del Nivel 1.</p>
          <Link className="primary-btn" to="/cuenta">
            Ir a mi cuenta
          </Link>
        </header>
      </div>
    )
  }

  return (
    <div className="account-page">
      <header className="resource-hero dict">
        <h1>Mi progreso</h1>
        <p className="lede">
          {profile?.display_name || 'Alumno/a'} · Nivel 1 · {completedCount}/{NIVEL_1_TOTAL_CLASSES}{' '}
          clases completas
        </p>
      </header>

      {error ? <p className="quiz-error">{error}</p> : null}

      <div className="progress-summary">
        <div className="progress-bar" aria-hidden="true">
          <span style={{ width: `${(completedCount / NIVEL_1_TOTAL_CLASSES) * 100}%` }} />
        </div>
        {readyForCert ? (
          <p className="quiz-passed">¡Completaste las 15 clases! El certificado se habilitará en la próxima etapa.</p>
        ) : (
          <p className="lede">
            Para el certificado de Nivel 1 hay que completar las {NIVEL_1_TOTAL_CLASSES} clases.
          </p>
        )}
      </div>

      <ul className="progress-list">
        {allNivel1Slugs().map((slug, index) => {
          const id = index + 1
          const published = classes.find((c) => c.slug === slug)
          const row = bySlug.get(slug)
          return (
            <li key={slug} className={row?.completed ? 'done' : ''}>
              <div>
                <strong>
                  Clase {String(id).padStart(2, '0')}
                  {published ? ` — ${published.subtitle}` : ' — Próximamente'}
                </strong>
                <span>
                  {row?.completed
                    ? 'Completada'
                    : row
                      ? 'En curso'
                      : published
                        ? 'Sin empezar'
                        : 'Aún no publicada'}
                </span>
              </div>
              {published ? (
                <Link to={`/nivel-1/clase/${slug}`}>{row?.completed ? 'Repasar' : 'Entrar'} →</Link>
              ) : (
                <span className="muted">—</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
