import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { classes, courseInfo } from '../data/classes'

const previewWords = [
  { g: "Mba'éichapa", e: '¿Qué tal?' },
  { g: 'Aguyje', e: 'Gracias' },
  { g: 'Peteĩ', e: 'Uno' },
  { g: 'Hovyũ', e: 'Verde' },
  { g: 'Jagua', e: 'Perro' },
  { g: "Ko'ẽ", e: 'Amanece' },
]

const highlights = [
  { label: '4 clases', detail: 'del Módulo 1' },
  { label: '7 audios', detail: 'de pronunciación' },
  { label: 'Vocabulario', detail: 'escrito + oral' },
  { label: 'Ejercicios', detail: 'con respuestas' },
]

export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        <div className="hero-content">
          <p className="hero-module">{courseInfo.module}</p>
          <h1 className="hero-brand">
            <span className="hero-brand-line">{courseInfo.name}</span>
          </h1>
          <p className="hero-line">
            Aprendé guaraní con las clases del curso: alfabeto, pronombres, colores, números,
            plural y diminutivo — todo escrito y con audio.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/clase/clase-1">
              Empezar Clase 1
            </Link>
            <a className="secondary-btn" href="#clases">
              Ver recorrido
            </a>
          </div>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...previewWords, ...previewWords].map((word, index) => (
              <span key={`${word.g}-${index}`}>
                <strong>{word.g}</strong> {word.e}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-strip">
        {highlights.map((item, index) => (
          <article key={item.label} className="strip-item" style={{ '--i': index } as CSSProperties}>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
          </article>
        ))}
      </section>

      <section className="home-preview">
        <div className="preview-copy">
          <p className="eyebrow">Antes de empezar</p>
          <h2>Saludos que vas a usar desde el día uno</h2>
        </div>
        <div className="preview-words">
          {previewWords.map((word, index) => (
            <button
              key={word.g}
              type="button"
              className="flip-word"
              style={{ '--i': index } as CSSProperties}
            >
              <span className="flip-face front guarani">{word.g}</span>
              <span className="flip-face back">{word.e}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-path" id="clases">
        <div className="path-heading">
          <p className="eyebrow">Recorrido</p>
          <h2>Las cuatro clases, en orden</h2>
          <p>Cada clase suma una capa: de la primera palabra al plural y los insectos.</p>
        </div>

        <div className="path-rail" aria-hidden="true" />

        <div className="class-index">
          {classes.map((lesson, index) => (
            <Link
              key={lesson.slug}
              to={`/clase/${lesson.slug}`}
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
              <span className="class-cta">Abrir clase →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
