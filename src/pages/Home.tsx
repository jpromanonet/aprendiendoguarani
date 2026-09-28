import { Link } from 'react-router-dom'
import { classes, courseInfo } from '../data/classes'

export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-atmosphere" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-module">{courseInfo.module}</p>
          <h1 className="hero-brand">{courseInfo.name}</h1>
          <p className="hero-line">
            Todo el contenido de las clases, por escrito y con audio, para aprender guaraní a tu ritmo.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/clase/clase-1">
              Empezar por la Clase 1
            </Link>
            <Link className="secondary-btn" to="/recursos">
              Ver recursos
            </Link>
          </div>
        </div>
      </section>

      <section className="home-intro">
        <div className="intro-copy">
          <p className="eyebrow">El curso</p>
          <h2>Cuatro clases del Módulo 1, ordenadas y listas para estudiar</h2>
          <p>
            Reunimos los apuntes en PDF y las grabaciones orales de la clase en un solo lugar:
            vocabulario, reglas, ejercicios y pronunciación.
          </p>
        </div>
      </section>

      <section className="class-index">
        {classes.map((lesson, index) => (
          <Link
            key={lesson.slug}
            to={`/clase/${lesson.slug}`}
            className="class-link"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="class-number">0{lesson.id}</span>
            <div>
              <h3>{lesson.title}</h3>
              <p className="class-subtitle">{lesson.subtitle}</p>
              <p className="class-summary">{lesson.summary}</p>
              <ul className="theme-row">
                {lesson.themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
