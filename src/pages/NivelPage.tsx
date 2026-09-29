import { type CSSProperties } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { classes, getLevelBySlug } from '../data/classes'

export function NivelPage() {
  const { pathname } = useLocation()
  const nivelSlug = pathname.replace(/^\//, '').split('/')[0] || 'nivel-1'
  const nivel = getLevelBySlug(nivelSlug)

  if (!nivel) {
    return <Navigate to="/nivel-1" replace />
  }

  if (!nivel.available) {
    return (
      <div className="home home-direct">
        <section className="nivel-hero">
          <p className="eyebrow">{nivel.title}</p>
          <h1>{nivel.subtitle}</h1>
          <p className="lede">{nivel.description}</p>
          <div className="nivel-actions">
            <span className="soon-pill">Próximamente</span>
            <Link className="text-link" to="/nivel-1">
              ← Volver al Nivel 1
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="home home-direct">
      <section className="nivel-hero">
        <p className="eyebrow">{nivel.title}</p>
        <h1>{nivel.subtitle}</h1>
        <p className="lede">{nivel.description}</p>
        <div className="nivel-actions">
          <Link className="start-link" to={`/${nivel.slug}/clase/clase-1`}>
            Empezar Clase 1 →
          </Link>
          <Link className="text-link" to="/">
            ← Inicio
          </Link>
        </div>
      </section>

      <section className="home-classes" aria-labelledby="nivel-classes-title">
        <div className="home-classes-head">
          <div>
            <p className="eyebrow">Contenido</p>
            <h2 id="nivel-classes-title">Clases de {nivel.title}</h2>
          </div>
        </div>

        <div className="class-index immediate">
          {classes.map((lesson, index) => (
            <Link
              key={lesson.slug}
              to={`/${nivel.slug}/clase/${lesson.slug}`}
              className="class-link"
              style={{ '--i': index } as CSSProperties}
            >
              <div className="class-link-top">
                <span className="class-number">{String(lesson.id).padStart(2, '0')}</span>
                <span className="class-date">{lesson.date.replace('Lunes ', '')}</span>
              </div>
              <h3>{lesson.title}</h3>
              <p className="class-subtitle">{lesson.subtitle}</p>
              <p className="class-summary">{lesson.summary}</p>
              <ul className="theme-row">
                {lesson.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
              <span className="class-cta">Entrar a la clase →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
