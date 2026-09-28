import { NavLink, Outlet } from 'react-router-dom'
import { courseInfo } from '../data/classes'

export function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <strong>{courseInfo.name}</strong>
            <em>{courseInfo.tagline}</em>
          </span>
        </NavLink>
        <nav className="site-nav" aria-label="Principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/clase/clase-1">Clase 1</NavLink>
          <NavLink to="/clase/clase-2">Clase 2</NavLink>
          <NavLink to="/clase/clase-3">Clase 3</NavLink>
          <NavLink to="/clase/clase-4">Clase 4</NavLink>
          <NavLink to="/recursos">Recursos</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>
          {courseInfo.module}
        </p>
        <p className="footer-note">Contenido del curso organizado para estudio escrito y oral.</p>
      </footer>
    </div>
  )
}
