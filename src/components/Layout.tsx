import { useEffect, useId, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { courseInfo } from '../data/classes'
import { NavPills } from './NavControls'
import { ScrollToTop } from './ScrollToTop'

const socials = [
  {
    label: 'X',
    href: 'https://x.com/jpromanonet',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/jpromanonet',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.88a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25Z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jpromanonet',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.94 6.5A1.94 1.94 0 1 1 6.94 2.6a1.94 1.94 0 0 1 0 3.88ZM4.75 8.75h4.4V21.4h-4.4V8.75Zm7.05 0h4.22v1.73h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.3 2.94 5.3 6.76V21.4h-4.4v-5.92c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V21.4h-4.12V8.75Z"
        />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@jpromanonet',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.42 7.26c.05-.45-.13-.88-.5-1.13L1.5 4.2v-.45h6.73l5.2 11.4L17.9 3.75h6.42v.45l-2.05 1.96a.72.72 0 0 0-.27.67v10.5c.05.28.16.5.32.67l2 2.03v.45h-9.97v-.45l2.07-2.01c.2-.2.2-.26.2-.67V9.12l-5.76 14.63h-.78L4.2 9.12v9.83c-.06.46.1.93.45 1.26l2.7 3.28v.45H1.2v-.45l2.7-3.28c.34-.34.49-.82.42-1.26V7.26Z"
        />
      </svg>
    ),
  },
  {
    label: 'Sitio web',
    href: 'https://jpromano.net',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 1.5a8.5 8.5 0 0 0-8.4 7.25h3.1c.2-2.45.95-4.55 2.05-5.95A8.47 8.47 0 0 0 12 3.5Zm0 17a8.47 8.47 0 0 0 3.25-.65c-1.1-1.4-1.85-3.5-2.05-5.95h-2.4c-.2 2.45-.95 4.55-2.05 5.95A8.47 8.47 0 0 0 12 20.5Zm-3.5-8.25H4.1A8.5 8.5 0 0 0 12 20.5a8.47 8.47 0 0 0 3.25-.65c-1.2-1.55-2-3.85-2.2-6.6H8.5Zm4.55 0c.2 2.75 1 5.05 2.2 6.6A8.5 8.5 0 0 0 19.9 12.25h-6.85Zm6.85-1.5A8.5 8.5 0 0 0 12 3.5a8.47 8.47 0 0 0-3.25.65c1.2 1.55 2 3.85 2.2 6.6h6.95Z"
        />
      </svg>
    ),
  },
]

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navId = useId()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('nav-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('nav-open')
    }
  }, [menuOpen])

  return (
    <div className="app-shell">
      <header className={`site-header ${menuOpen ? 'menu-open' : ''}`}>
        <NavLink to="/" className="brand" end onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <strong>{courseInfo.name}</strong>
            <em>{courseInfo.tagline}</em>
          </span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={navId}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="menu-toggle-bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <button
          type="button"
          className="nav-backdrop"
          aria-label="Cerrar menú"
          tabIndex={menuOpen ? 0 : -1}
          hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
        />

        <nav className="site-nav" id={navId} aria-label="Principal" data-open={menuOpen || undefined}>
          <div className="mobile-nav-top">
            <p className="mobile-nav-kicker">Navegación</p>
            <strong className="mobile-nav-title">¿Qué querés hacer?</strong>
          </div>
          <div className="mobile-nav-links">
            <NavPills onNavigate={() => setMenuOpen(false)} />
          </div>
          <div className="mobile-nav-foot">
            <p>
              Hecho con amor <span aria-hidden="true">♥</span>
            </p>
            <a href="https://github.com/jpromanonet/aprendiendoguarani" target="_blank" rel="noreferrer">
              Ver el repo
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <ScrollToTop />

      <footer className="site-footer">
        <div className="footer-inner footer-row">
          <div className="footer-credits">
            <p className="footer-credits-label">Contenido pedagógico</p>
            <ul className="footer-credits-list">
              {[
                'Verónica Mabel Gómez',
                'Ercilia Noemí Ocampos',
                'Liliana Bernal',
                'Yéssica Rodríguez',
              ].map((name) => (
                <li key={name}>
                  <span className="footer-teacher-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path
                        fill="currentColor"
                        d="M12 3 2 8l10 5 8.2-4.1V15h1.8V8L12 3Zm0 8.2L5.2 8 12 4.8 18.8 8 12 11.2ZM6.5 13.4v2.7c0 1.5 2.5 2.7 5.5 2.7s5.5-1.2 5.5-2.7v-2.7l-5.5 2.75L6.5 13.4Z"
                      />
                    </svg>
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-meta">
            <p className="footer-love">
              Hecho con amor <span className="footer-heart" aria-hidden="true">♥</span>
            </p>
            <a
              className="footer-repo"
              href="https://github.com/jpromanonet/aprendiendoguarani"
              target="_blank"
              rel="noreferrer"
            >
              Ver el repo en GitHub
            </a>
            <div className="footer-icons" aria-label="Redes">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
