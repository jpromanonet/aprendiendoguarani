import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { classes, levels } from '../data/classes'

export function NivelPage() {
  const nivel = levels[0]

  return (
    <div className="home home-direct">
      <section className="nivel-hero">
        <p className="eyebrow">{nivel.title}</p>
        <h1>{nivel.subtitle}</h1>
        <p className="lede">{nivel.description}</p>
        <div className="nivel-actions">
          <Link className="start-link" to="/nivel-1/clase/clase-1">
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
              to={`/nivel-1/clase/${lesson.slug}`}
              className="class-link"
              style={{ '--i': index } as CSSProperties}
            >
              <div className="class-link-top">
                <span className="class-number">0{lesson.id}</span>
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
