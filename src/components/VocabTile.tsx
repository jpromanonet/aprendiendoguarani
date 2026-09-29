import { useState } from 'react'

type Props = {
  guaraní: string
  español: string
  note?: string
  highlight?: boolean
}

export function VocabTile({ guaraní, español, note, highlight }: Props) {
  const [showTranslation, setShowTranslation] = useState(false)

  return (
    <button
      type="button"
      className={`vocab-tile ${showTranslation ? 'revealed' : ''} ${highlight ? 'highlight' : ''}`}
      onClick={() => setShowTranslation((value) => !value)}
      aria-pressed={showTranslation}
    >
      {showTranslation ? (
        <>
          <strong>{español}</strong>
          <em className="guarani">{note ?? guaraní}</em>
        </>
      ) : (
        <>
          <strong className="guarani">{guaraní}</strong>
          <em>tocá para traducir</em>
        </>
      )}
    </button>
  )
}
