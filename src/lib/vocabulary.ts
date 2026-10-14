import { classes, levels, type ClassLesson, type VocabItem } from '../data/classes'
import { slugsForLevel } from '../data/nivel1'

const PRONOUN_START = /^(che|nde|ha'e|ha'ekuéra|ñande|ore|peẽ)\b/i

function normalizeLemma(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}

function isInstruction(guaraní: string, español?: string) {
  return /escuch|copi[aá]/i.test(guaraní) || /copi[aá] las palabras/i.test(español ?? '')
}

/** Una ficha puede traer alternativas ("Sẽ / Sê") o una frase corta ("Ka'aru pytũ"). */
function lemmasFromLabel(label: string): string[] {
  return label
    .split(/\s*\/\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .flatMap((part) => {
      if (isInstruction(part)) return []
      if (!part.includes(' ')) return [part]
      const words = part.split(/\s+/)
      if (words.length > 3 || PRONOUN_START.test(part)) return []
      return [part]
    })
}

function addItems(set: Map<string, string>, items: VocabItem[]) {
  for (const item of items) {
    if (isInstruction(item.guaraní, item.español)) continue
    for (const lemma of lemmasFromLabel(item.guaraní)) {
      const key = normalizeLemma(lemma)
      if (!set.has(key)) set.set(key, lemma)
    }
  }
}

export function wordsInClass(lesson: ClassLesson): string[] {
  const set = new Map<string, string>()
  for (const section of lesson.sections) {
    switch (section.type) {
      case 'vocab':
      case 'colors':
      case 'times':
        addItems(set, section.items)
        break
      case 'pronouns':
        addItems(set, section.singular)
        addItems(set, section.plural)
        break
      case 'pairs':
        for (const group of section.groups) addItems(set, group.items)
        break
      default:
        break
    }
  }
  return [...set.values()]
}

export function learnedWordTotal(learnedSlugs: Iterable<string>) {
  const learned = new Set(learnedSlugs)
  const all = new Map<string, string>()
  const bySlug = new Map<string, number>()

  for (const lesson of classes) {
    const words = wordsInClass(lesson)
    bySlug.set(lesson.slug, words.length)
    if (!learned.has(lesson.slug)) continue
    for (const word of words) {
      const key = normalizeLemma(word)
      if (!all.has(key)) all.set(key, word)
    }
  }

  return { total: all.size, bySlug }
}

/** Palabras del nivel y total acumulado hasta ese nivel, sin repetir. */
export function vocabularyForLevel(levelSlug: string) {
  const index = levels.findIndex((level) => level.slug === levelSlug)
  const through = levels.slice(0, Math.max(index, 0) + 1)
  const ownSlugs = slugsForLevel(levelSlug)
  const accumulatedSlugs = through.flatMap((level) => slugsForLevel(level.slug))
  return {
    nuevas: learnedWordTotal(ownSlugs).total,
    acumuladas: learnedWordTotal(accumulatedSlugs).total,
  }
}
