import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { classes, courseInfo, levels } from '../data/classes'

const howTo = [
  { step: '01', title: 'Elegí una clase', body: 'Empezá por la primera y seguí en orden.' },
  { step: '02', title: 'Leé y escuchá', body: 'Repetí en voz alta con los audios.' },
  { step: '03', title: 'Practicá', body: 'Tocá las palabras y resolvé los ejercicios.' },
  { step: '04', title: 'Consultá', body: 'Usá el diccionario y los textos cuando haga falta.' },
]

export function Home() {
  const nivel = levels[0]

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-media" aria-hidden="true">
          <img src="/images/yaguarete.svg" alt="" className="home-hero-svg" />
        </div>
        <div className="home-hero-scrim" aria-hidden="true" />
        <div className="home-hero-inner">
          <h1 className="home-hero-brand">{courseInfo.name}</h1>
          <p className="home-hero-line">
            Aprendé guaraní con clases escritas, audio y un diccionario para buscar al instante.
          </p>
          <div className="home-hero-actions">
            <a className="primary-btn" href="#clases">
              Ver clases
            </a>
          </div>
        </div>
      </section>

      <div className="home-direct">
        <section className="how-strip" aria-label="Cómo usar el sitio">
          {howTo.map((item, index) => (
            <article key={item.step} style={{ '--i': index } as CSSProperties}>
              <span>{item.step}</span>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="home-classes" id="clases" aria-labelledby="classes-title">
          <div className="home-classes-head">
            <div>
              <p className="eyebrow">Recorrido</p>
              <h2 id="classes-title">Las clases</h2>
            </div>
          </div>

          <div className="level-cut">
            <div className="level-cut-head">
              <div>
                <p className="level-cut-label">{nivel.title}</p>
                <h3>{nivel.subtitle}</h3>
              </div>
              <Link className="level-cut-link" to={`/${nivel.slug}`}>
                Ver nivel →
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
                    <span className="class-number">{String(lesson.id).padStart(2, '0')}</span>
                    <span className="class-date">{lesson.date.replace('Lunes ', '')}</span>
                  </div>
                  <h3>{lesson.subtitle}</h3>
                  <p className="class-summary">{lesson.summary}</p>
                  <ul className="theme-row">
                    {lesson.themes.map((theme) => (
                      <li key={theme}>{theme}</li>
                    ))}
                  </ul>
                  <span className="class-cta">Entrar →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
