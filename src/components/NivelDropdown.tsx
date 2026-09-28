import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { classes, levels } from '../data/classes'

export function NivelDropdown() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const location = useLocation()
  const nivel = levels[0]
  const active = location.pathname.startsWith('/nivel-1')

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
        className="nav-trigger"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {nivel.title}
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
      </button>
      <div className="nav-menu nivel-menu" id={menuId} role="menu" hidden={!open}>
        <Link
          to={`/${nivel.slug}`}
          role="menuitem"
          className="nav-menu-item nav-menu-overview"
          style={{ '--i': 0 } as CSSProperties}
          onClick={() => setOpen(false)}
        >
          <span className="nav-menu-num">N1</span>
          <span>
            <strong>Ver Nivel 1</strong>
            <em>{nivel.subtitle}</em>
          </span>
        </Link>
        <p className="nav-menu-label">Clases</p>
        {classes.map((lesson, index) => (
          <Link
            key={lesson.slug}
            to={`/nivel-1/clase/${lesson.slug}`}
            role="menuitem"
            className="nav-menu-item"
            style={{ '--i': index + 1 } as CSSProperties}
            onClick={() => setOpen(false)}
          >
            <span className="nav-menu-num">0{lesson.id}</span>
            <span>
              <strong>{lesson.title}</strong>
              <em>{lesson.subtitle}</em>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
