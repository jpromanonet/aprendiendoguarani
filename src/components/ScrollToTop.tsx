import { useEffect, useState } from 'react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      className="scroll-top-btn"
      aria-label="Volver arriba"
      title="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 14l6-6 6 6"
        />
      </svg>
    </button>
  )
}
