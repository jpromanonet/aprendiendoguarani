import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { levels } from '../data/classes'
import { COURSE_CERTIFICATE_SLUG, slugsForLevel } from '../data/nivel1'
import { fetchProgress } from '../lib/progress'
import { supabase } from '../lib/supabase'
import type { Certificate, LessonProgress } from '../types/database'

function formatCertDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function CertificadosPage() {
  const { configured, loading, user } = useAuth()
  const [rows, setRows] = useState<LessonProgress[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !supabase) return
    void Promise.all([
      fetchProgress(user.id),
      supabase.from('certificates').select('*').eq('user_id', user.id),
    ])
      .then(([progress, certs]) => {
        setRows(progress)
        setCertificates((certs.data ?? []) as Certificate[])
      })
      .catch((err: Error) => setError(err.message))
  }, [user])

  const bySlug = useMemo(() => new Map(rows.map((row) => [row.class_slug, row])), [rows])
  const levelStats = useMemo(
    () =>
      levels.map((nivel) => {
        const slugs = slugsForLevel(nivel.slug)
        const done = slugs.filter((slug) => bySlug.get(slug)?.completed).length
        return { nivel, done, total: nivel.totalClasses }
      }),
    [bySlug],
  )
  const earnedLevelCerts = levelStats.filter((level) =>
    certificates.some((item) => item.level_slug === level.nivel.slug),
  ).length
  const finalCert = certificates.find((item) => item.level_slug === COURSE_CERTIFICATE_SLUG)
  const finalReady = levelStats.length > 0 && earnedLevelCerts === levelStats.length

  return (
    <div className="cert-page">
      <header className="resource-hero dict">
        <p className="eyebrow light">Niveles y cierre del curso</p>
        <h1>Certificados</h1>
        <p className="lede">
          Cada nivel tiene el suyo. El del curso completo se emite cuando están todos.
        </p>
        <Link className="resource-back" to="/cuenta">
          ← Volver al perfil
        </Link>
      </header>

      {!configured || loading ? (
        <p className="lede">Cargando…</p>
      ) : !user ? (
        <section className="profile-panel cert-panel">
          <p className="lede">
            <Link to="/cuenta">Ingresá</Link> para ver tus certificados.
          </p>
        </section>
      ) : (
        <section className="profile-panel cert-panel" aria-label="Certificados">
          {error ? <p className="profile-flash error">{error}</p> : null}
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
                  Se emite al tener los certificados de todos los niveles. {earnedLevelCerts} de{' '}
                  {levelStats.length}.
                </em>
              )}
            </article>
          </div>
        </section>
      )}
    </div>
  )
}
