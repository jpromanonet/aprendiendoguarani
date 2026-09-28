import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { courseInfo } from '../data/classes'
import { ClassesDropdown } from './ClassesDropdown'
import { DictionaryDrawer } from './DictionaryDrawer'

export function Layout() {
  const [dictionaryOpen, setDictionaryOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" end>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <strong>{courseInfo.name}</strong>
            <em>{courseInfo.tagline}</em>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Principal">
          <NavLink to="/" end className="nav-link">
            Inicio
          </NavLink>
          <ClassesDropdown />
          <button
            type="button"
            className={`dict-btn ${dictionaryOpen ? 'active' : ''}`}
            onClick={() => setDictionaryOpen(true)}
          >
            <span className="dict-btn-icon" aria-hidden="true">
              Ñe
            </span>
            Diccionario
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <strong className="guarani">{courseInfo.name}</strong>
          <p>{courseInfo.module}</p>
          <p className="footer-note">Clases, audios y ejercicios en un solo lugar.</p>
        </div>
      </footer>

      <DictionaryDrawer open={dictionaryOpen} onClose={() => setDictionaryOpen(false)} />
    </div>
  )
}
