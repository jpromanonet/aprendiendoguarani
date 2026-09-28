import { NavLink, Outlet } from 'react-router-dom'
import { courseInfo } from '../data/classes'
import { NivelDropdown } from './NivelDropdown'

export function Layout() {
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
          <NivelDropdown />
          <NavLink to="/diccionario" className="nav-link">
            Diccionario
          </NavLink>
          <NavLink to="/textos" className="nav-link">
            Textos
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <strong className="guarani">{courseInfo.name}</strong>
          <p>{courseInfo.module}</p>
          <p className="footer-note">Nivel 1 · Diccionarios · Textos culturales</p>
        </div>
      </footer>
    </div>
  )
}
