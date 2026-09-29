import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-9PGNVR3ESN'

/** Envía page_view en cada cambio de ruta (SPA). */
export function Analytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}${location.hash}`,
      send_to: GA_MEASUREMENT_ID,
    })
  }, [location.pathname, location.search, location.hash])

  return null
}
