import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { classes, courseInfo, levels } from '../data/classes'

const howTo = [
  {
    step: '01',
    title: 'Entrá a Nivel 1',
    body: 'Las clases del curso están dentro de Nivel 1. Empezá por la Clase 1 y seguí en orden.',
  },
  {
    step: '02',
    title: 'Leé y escuchá',
    body: 'Cada sección tiene el contenido escrito. Donde haya audio, reproducilo y repetí en voz alta.',
  },
  {
    step: '03',
    title: 'Practicá',
    body: 'Tocá las palabras para ver la traducción y usá los ejercicios para comprobarte.',
  },
  {
    step: '04',
    title: 'Diccionario y textos',
    body: 'En Diccionario podés buscar español ↔ guaraní. En Textos están las lecturas culturales en PDF.',
  },
]

export function Home() {
  const nivel = levels[0]

  return (
    <div className="home home-direct">
      <section className="home-top">
        <div className="home-top-copy">
          <p className="home-kicker">{courseInfo.module}</p>
          <h1>
            <span className="home-brand">{courseInfo.name}</span>
            <span className="home-title">{nivel.title}: tus clases están acá</span>
          </h1>
          <p className="home-lead">
            Este curso arranca por el Nivel 1. Elegí una clase, estudiá el contenido escrito y
            escuchá los audios.
          </p>
          <Link className="start-link on-dark" to="/nivel-1">
            Ir a Nivel 1 →
          </Link>
        </div>

        <aside className="how-panel" aria-labelledby="how-title">
          <p className="eyebrow" id="how-title">
            Cómo usar el sitio
          </p>
          <ol className="how-list">
            {howTo.map((item, index) => (
              <li key={item.step} style={{ '--i': index } as CSSProperties}>
                <span className="how-step">{item.step}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="home-classes" aria-labelledby="classes-title">
        <div className="home-classes-head">
          <div>
            <p className="eyebrow">{nivel.title}</p>
            <h2 id="classes-title">Clases del Nivel 1</h2>
          </div>
          <Link className="start-link" to="/nivel-1/clase/clase-1">
            Empezar Clase 1 →
          </Link>
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
