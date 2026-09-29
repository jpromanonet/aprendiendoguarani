/** Nivel 1: 15 clases para el certificado */
export const NIVEL_1_TOTAL_CLASSES = 15
export const NIVEL_1_SLUG = 'nivel-1'
export const DEFAULT_QUIZ_MAX_ATTEMPTS = 3
export const QUIZ_PASS_SCORE = 70

export function classSlug(id: number) {
  return `clase-${id}`
}

export function allNivel1Slugs() {
  return Array.from({ length: NIVEL_1_TOTAL_CLASSES }, (_, i) => classSlug(i + 1))
}
