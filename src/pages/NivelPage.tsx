import { type CSSProperties } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { classes, getLevelBySlug, type LevelInfo } from '../data/classes'
import { vocabularyForLevel } from '../lib/vocabulary'

function countLabel(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`
}

function NivelHero({ nivel }: { nivel: LevelInfo }) {
  const words = vocabularyForLevel(nivel.slug)
  const stage = !nivel.available ? 'Próximamente' : nivel.id === 1 ? 'Etapa inicial' : "Curso Avañe'ẽ"

  return (
    <section className="nivel-hero">
      <div className="nivel-hero-inner">
        <nav className="breadcrumb" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>{nivel.title}</span>
        </nav>
        <p className="eyebrow light">{stage}</p>
        <h1>{nivel.title}</h1>
        <p className="lede">{nivel.description}</p>
        <ul className="nivel-stats">
          <li>
            {nivel.totalClasses > 0
              ? countLabel(nivel.totalClasses, 'clase', 'clases')
              : 'Próximamente'}
          </li>
          <li>{countLabel(words.nuevas, 'palabra', 'palabras')}</li>
        </ul>
      </div>
    </section>
  )
}

export function NivelPage() {
  const { pathname } = useLocation()
  const nivelSlug = pathname.replace(/^\//, '').split('/')[0] || 'nivel-1'
  const nivel = getLevelBySlug(nivelSlug)

  if (!nivel) {
    return <Navigate to="/nivel-1" replace />
  }

  return (
    <div className="nivel-page">
      <NivelHero nivel={nivel} />

      {nivel.available ? (
        <div className="home home-direct">
          <section className="home-classes" aria-label="Clases">
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
      ) : null}
    </div>
  )
}
