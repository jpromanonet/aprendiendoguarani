import { useMemo, useState } from 'react'

type Item = {
  prompt: string
  answer: string
  hint?: string
}

type Props = {
  title: string
  prompt: string
  items: Item[]
}

export function Exercise({ title, prompt, items }: Props) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [showAll, setShowAll] = useState(false)

  const done = useMemo(
    () => showAll || Object.values(revealed).filter(Boolean).length,
    [revealed, showAll],
  )

  return (
    <section className="section-block exercise-block">
      <div className="section-heading">
        <p className="eyebrow">Práctica</p>
        <h2>{title}</h2>
        <p className="lede">{prompt}</p>
      </div>
      <div className="exercise-toolbar">
        <button type="button" className="ghost-btn" onClick={() => setShowAll((v) => !v)}>
          {showAll ? 'Ocultar respuestas' : 'Ver todas las respuestas'}
        </button>
        <span className="exercise-progress">
          {done}/{items.length} vistas
        </span>
      </div>
      <ul className="exercise-list">
        {items.map((item, index) => {
          const open = showAll || revealed[index]
          return (
            <li key={item.prompt}>
              <div className="exercise-prompt">
                <span className="exercise-num">{index + 1}</span>
                <span>{item.prompt}</span>
              </div>
              <button
                type="button"
                className={`answer-btn ${open ? 'open' : ''}`}
                onClick={() => setRevealed((prev) => ({ ...prev, [index]: !prev[index] }))}
              >
                {open ? (
                  <span>
                    <strong>{item.answer}</strong>
                    {item.hint ? <em> · {item.hint}</em> : null}
                  </span>
                ) : (
                  'Mostrar respuesta'
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
