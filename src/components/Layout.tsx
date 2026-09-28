import { NavLink, Outlet } from 'react-router-dom'
import { courseInfo } from '../data/classes'
import { NavPills } from './NavControls'

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
          <NavPills />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <strong className="guarani">{courseInfo.name}</strong>
          <p>{courseInfo.module}</p>
          <p className="footer-note">Clases · Diccionario interactivo · Textos culturales</p>
        </div>
      </footer>
    </div>
  )
}
