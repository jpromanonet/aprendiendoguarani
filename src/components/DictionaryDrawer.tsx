import { useEffect, type CSSProperties } from 'react'
import { resources } from '../data/classes'

type Props = {
  open: boolean
  onClose: () => void
}

const dictionaries = resources.filter((item) => item.title.toLowerCase().includes('diccionario'))
const texts = resources.filter((item) => !item.title.toLowerCase().includes('diccionario'))

export function DictionaryDrawer({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <>
      <button
        type="button"
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        aria-label="Cerrar diccionario"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className={`dictionary-drawer ${open ? 'open' : ''}`}
        aria-hidden={!open}
        aria-label="Diccionario y recursos"
      >
        <div className="drawer-head">
          <div>
            <p className="eyebrow">Consulta rápida</p>
            <h2>Diccionario</h2>
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>

        <p className="drawer-intro">
          Diccionarios bilingües y textos del módulo para acompañar las clases.
        </p>

        <section className="drawer-section">
          <h3>Diccionarios</h3>
          <ul className="drawer-list">
            {dictionaries.map((item, index) => (
              <li key={item.file} style={{ '--i': index } as CSSProperties}>
                <article className="drawer-item dict">
                  <span className="drawer-icon" aria-hidden="true">
                    Ñ
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span className="drawer-file">{item.file}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="drawer-section">
          <h3>Textos culturales</h3>
          <ul className="drawer-list">
            {texts.map((item, index) => (
              <li key={item.file} style={{ '--i': index } as CSSProperties}>
                <article className="drawer-item text">
                  <span className="drawer-icon" aria-hidden="true">
                    ✦
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <span className="drawer-file">{item.file}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </>
  )
}
