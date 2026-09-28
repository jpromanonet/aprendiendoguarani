import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { classes, levels } from '../data/classes'

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6 4.5A2.5 2.5 0 0 1 8.5 2H20v16.5a.5.5 0 0 1-.5.5H8.5A2.5 2.5 0 0 0 6 21.5V4.5Zm0 15A1.5 1.5 0 0 1 7.5 18H18.5V3.5H8.5A1.5 1.5 0 0 0 7 5v14.5Z"
      />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm7.53 12.03 3.47 3.47-1.41 1.41-3.47-3.47 1.41-1.41Z"
      />
    </svg>
  )
}

function IconScroll() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 3h8a3 3 0 0 1 3 3v13.5a.5.5 0 0 1-.8.4L14 17.5l-3.2 2.4a.5.5 0 0 1-.8-.4V6a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11H4V6a3 3 0 0 1 3-3Z"
      />
    </svg>
  )
}

export function ClasesDropdown() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const location = useLocation()
  const active = location.pathname.startsWith('/nivel-')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`nav-dropdown ${open ? 'open' : ''} ${active ? 'active' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="nav-pill nav-pill-clases"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <IconBook />
        Clases
        <Chevron />
      </button>
      <div className="nav-menu nivel-menu" id={menuId} role="menu" hidden={!open}>
        {levels.map((nivel) => (
          <section key={nivel.slug} className="nav-level-group">
            <Link
              to={`/${nivel.slug}`}
              className="nav-level-head"
              onClick={() => setOpen(false)}
            >
              <span>
                <strong>{nivel.title}</strong>
                <em>{nivel.subtitle}</em>
              </span>
              <span className="nav-level-all">Ver todo</span>
            </Link>
            <div className="nav-level-classes">
              {classes.map((lesson, index) => (
                <Link
                  key={lesson.slug}
                  to={`/nivel-1/clase/${lesson.slug}`}
                  role="menuitem"
                  className="nav-class-item"
                  style={{ '--i': index } as CSSProperties}
                  onClick={() => setOpen(false)}
                >
                  <span className="nav-class-num">{String(lesson.id).padStart(2, '0')}</span>
                  <span className="nav-class-title">{lesson.subtitle}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export function NavPills() {
  return (
    <>
      <ClasesDropdown />
      <NavLink to="/diccionario" className={({ isActive }) => `nav-pill nav-pill-dict ${isActive ? 'active' : ''}`}>
        <IconSearch />
        Diccionario
      </NavLink>
      <NavLink to="/textos" className={({ isActive }) => `nav-pill nav-pill-text ${isActive ? 'active' : ''}`}>
        <IconScroll />
        Textos
      </NavLink>
    </>
  )
}
