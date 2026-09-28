import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { classes, getClassBySlug, levels } from '../data/classes'
import { SectionRenderer } from '../components/SectionRenderer'

function sectionTitle(section: { type: string; title?: string }, index: number) {
  if ('title' in section && section.title) return section.title
  return `Sección ${index + 1}`
}

export function ClassPage() {
  const { slug } = useParams()
  const lesson = slug ? getClassBySlug(slug) : undefined
  const [activeSection, setActiveSection] = useState(0)
  const nivel = levels[0]

  const toc = useMemo(
    () =>
      lesson?.sections.map((section, index) => ({
        id: `sec-${index}`,
        title: sectionTitle(section, index),
      })) ?? [],
    [lesson],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveSection(0)
  }, [slug])

  useEffect(() => {
    if (!lesson) return
    const nodes = toc
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = toc.findIndex((item) => item.id === visible.target.id)
        if (index >= 0) setActiveSection(index)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [lesson, toc])

  if (!lesson) {
    return <Navigate to="/nivel-1" replace />
  }

  const index = classes.findIndex((c) => c.slug === lesson.slug)
  const prev = classes[index - 1]
  const next = classes[index + 1]

  return (
    <article className="class-page">
      <header className="class-hero">
        <div className="class-hero-inner">
          <nav className="breadcrumb" aria-label="Miga de pan">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/nivel-1">{nivel.title}</Link>
            <span>/</span>
            <span>{lesson.title}</span>
          </nav>

          <div className="class-progress">
            {classes.map((item) => (
              <Link
                key={item.slug}
                to={`/nivel-1/clase/${item.slug}`}
                className={`progress-dot ${item.slug === lesson.slug ? 'current' : ''} ${item.id < lesson.id ? 'done' : ''}`}
                aria-label={item.title}
              />
            ))}
          </div>
          <p className="eyebrow light">{lesson.date}</p>
          <h1>
            <span className="class-kicker">
              {nivel.title} · {lesson.title}
            </span>
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

      <div className="class-layout">
        <aside className="class-toc" aria-label="Secciones de la clase">
          <p className="toc-label">En esta clase</p>
          <ol>
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === i ? 'active' : ''}
                  onClick={() => setActiveSection(i)}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="class-body">
          {lesson.sections.map((section, i) => (
            <div key={`${section.type}-${i}`} id={`sec-${i}`} className="section-anchor">
              <SectionRenderer section={section} />
            </div>
          ))}
        </div>
      </div>

      <nav className="class-pager" aria-label="Navegación entre clases">
        {prev ? (
          <Link to={`/nivel-1/clase/${prev.slug}`} className="pager-link prev">
            <span>Anterior · {nivel.title}</span>
            <strong>{prev.title}</strong>
            <em>{prev.subtitle}</em>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/nivel-1/clase/${next.slug}`} className="pager-link next">
            <span>Siguiente · {nivel.title}</span>
            <strong>{next.title}</strong>
            <em>{next.subtitle}</em>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
