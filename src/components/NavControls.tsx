import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { classes, levels } from '../data/classes'
import { useAuth } from '../context/AuthContext'

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

type NavPillsProps = {
  onNavigate?: () => void
  expandClases?: boolean
}

export function ClasesDropdown({ onNavigate, expandClases }: NavPillsProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const location = useLocation()
  const active = location.pathname.startsWith('/nivel-')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (expandClases) setOpen(true)
  }, [expandClases])

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
        <span className="nav-pill-label">
          <strong>Clases</strong>
          <em>Nivel 1 y más</em>
        </span>
        <Chevron />
      </button>
      <div className="nav-menu nivel-menu" id={menuId} role="menu" hidden={!open}>
        {levels.map((nivel) => (
          <section key={nivel.slug} className="nav-level-group">
            <Link
              to={`/${nivel.slug}`}
              className="nav-level-head"
              onClick={() => {
                setOpen(false)
                onNavigate?.()
              }}
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
                  onClick={() => {
                    setOpen(false)
                    onNavigate?.()
                  }}
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

export function NavPills({ onNavigate, expandClases }: NavPillsProps) {
  return (
    <>
      <ClasesDropdown onNavigate={onNavigate} expandClases={expandClases} />
      <NavLink
        to="/diccionario"
        className={({ isActive }) => `nav-pill nav-pill-dict ${isActive ? 'active' : ''}`}
        onClick={() => onNavigate?.()}
      >
        <IconSearch />
        <span className="nav-pill-label">
          <strong>Diccionario</strong>
          <em>Buscá ES ↔ GN</em>
        </span>
      </NavLink>
      <NavLink
        to="/textos"
        className={({ isActive }) => `nav-pill nav-pill-text ${isActive ? 'active' : ''}`}
        onClick={() => onNavigate?.()}
      >
        <IconScroll />
        <span className="nav-pill-label">
          <strong>Textos</strong>
          <em>PDFs y lectura</em>
        </span>
      </NavLink>
      <UserNavButton onNavigate={onNavigate} />
    </>
  )
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2.25c-3.6 0-6.75 1.8-6.75 4.05V20h13.5v-1.7c0-2.25-3.15-4.05-6.75-4.05Z"
      />
    </svg>
  )
}

function UserNavButton({ onNavigate }: { onNavigate?: () => void }) {
  const { user, profile } = useAuth()
  const label = user ? profile?.display_name || 'Mi perfil' : 'Login'
  const avatar = profile?.avatar_url

  return (
    <NavLink
      to="/cuenta"
      className={({ isActive }) =>
        `nav-pill nav-pill-account ${isActive ? 'active' : ''} ${avatar ? 'has-avatar' : ''}`
      }
      onClick={() => onNavigate?.()}
      title={label}
      aria-label={label}
    >
      {avatar ? <img className="nav-avatar" src={avatar} alt="" /> : <IconUser />}
      <span className="nav-pill-label">
        <strong>{user ? 'Perfil' : 'Login'}</strong>
        <em>{user ? 'Progreso y foto' : 'Ingresá'}</em>
      </span>
    </NavLink>
  )
}
