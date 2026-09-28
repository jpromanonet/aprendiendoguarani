import { useState } from 'react'

type Props = {
  guaraní: string
  español: string
  note?: string
  highlight?: boolean
}

export function VocabTile({ guaraní, español, note, highlight }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={`vocab-tile ${flipped ? 'flipped' : ''} ${highlight ? 'highlight' : ''}`}
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
    >
      <span className="vocab-tile-inner">
        <span className="vocab-face front">
          <strong className="guarani">{guaraní}</strong>
          <em>tocá para traducir</em>
        </span>
        <span className="vocab-face back">
          <strong>{español}</strong>
          {note ? <em>{note}</em> : <em className="guarani">{guaraní}</em>}
        </span>
      </span>
    </button>
  )
}
