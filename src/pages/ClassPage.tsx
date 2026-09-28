import { Link, Navigate, useParams } from 'react-router-dom'
import { classes, getClassBySlug } from '../data/classes'
import { SectionRenderer } from '../components/SectionRenderer'

export function ClassPage() {
  const { slug } = useParams()
  const lesson = slug ? getClassBySlug(slug) : undefined

  if (!lesson) {
    return <Navigate to="/" replace />
  }

  const index = classes.findIndex((c) => c.slug === lesson.slug)
  const prev = classes[index - 1]
  const next = classes[index + 1]

  return (
    <article className="class-page">
      <header className="class-hero">
        <div className="class-hero-inner">
          <p className="eyebrow">{lesson.date}</p>
          <h1>
            <span className="class-kicker">{lesson.title}</span>
            {lesson.subtitle}
          </h1>
          <p className="lede">{lesson.summary}</p>
          <ul className="theme-row on-dark">
            {lesson.themes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </div>
      </header>

      <div className="class-body">
        {lesson.sections.map((section, i) => (
          <SectionRenderer key={`${section.type}-${i}-${'title' in section ? section.title : i}`} section={section} />
        ))}
      </div>

      <nav className="class-pager" aria-label="Navegación entre clases">
        {prev ? (
          <Link to={`/clase/${prev.slug}`} className="pager-link prev">
            <span>Anterior</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/clase/${next.slug}`} className="pager-link next">
            <span>Siguiente</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
