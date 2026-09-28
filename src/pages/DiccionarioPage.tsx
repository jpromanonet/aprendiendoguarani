import { useDeferredValue, useEffect, useMemo, useState } from 'react'

type EntryEsGn = { es: string; gn: string; dir: 'es-gn' }
type EntryGnEs = { gn: string; es: string; dir: 'gn-es' }
type DictionaryData = {
  source: string
  count_es_gn: number
  count_gn_es: number
  es_gn: EntryEsGn[]
  gn_es: EntryGnEs[]
}

type Result =
  | { kind: 'es-gn'; head: string; meaning: string }
  | { kind: 'gn-es'; head: string; meaning: string }

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function DiccionarioPage() {
  const [data, setData] = useState<DictionaryData | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState('A')
  const [mode, setMode] = useState<'es-gn' | 'gn-es' | 'both'>('both')
  const deferredQuery = useDeferredValue(query.trim())

  useEffect(() => {
    let cancelled = false
    fetch('/data/dictionary.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar el diccionario')
        return res.json()
      })
      .then((json: DictionaryData) => {
        if (!cancelled) setData(json)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const results = useMemo(() => {
    if (!data) return [] as Result[]

    const q = normalize(deferredQuery)
    const out: Result[] = []

    if (q) {
      if (mode === 'es-gn' || mode === 'both') {
        for (const entry of data.es_gn) {
          if (normalize(entry.es).includes(q) || normalize(entry.gn).includes(q)) {
            out.push({ kind: 'es-gn', head: entry.es, meaning: entry.gn })
          }
          if (out.length >= 120) break
        }
      }
      if (mode === 'gn-es' || mode === 'both') {
        for (const entry of data.gn_es) {
          if (normalize(entry.gn).includes(q) || normalize(entry.es).includes(q)) {
            out.push({ kind: 'gn-es', head: entry.gn, meaning: entry.es })
          }
          if (out.length >= 180) break
        }
      }
      return out
    }

    // Browse by letter
    if (mode === 'gn-es') {
      return data.gn_es
        .filter((entry) => normalize(entry.gn).startsWith(normalize(letter)))
        .slice(0, 80)
        .map((entry) => ({ kind: 'gn-es' as const, head: entry.gn, meaning: entry.es }))
    }

    return data.es_gn
      .filter((entry) => normalize(entry.es).startsWith(normalize(letter)))
      .slice(0, 80)
      .map((entry) => ({ kind: 'es-gn' as const, head: entry.es, meaning: entry.gn }))
  }, [data, deferredQuery, letter, mode])

  return (
    <div className="dict-app">
      <header className="dict-hero">
        <p className="eyebrow light">Buscador bilingüe</p>
        <h1>Diccionario</h1>
        <p className="lede">
          Buscá en español o en guaraní. Podés escribir una palabra o recorrer el abecedario.
        </p>
        {data ? (
          <p className="dict-stats">
            {data.count_es_gn.toLocaleString('es-AR')} entradas ES→GN ·{' '}
            {data.count_gn_es.toLocaleString('es-AR')} GN→ES
          </p>
        ) : null}
      </header>

      <div className="dict-toolbar">
        <label className="dict-search">
          <span className="sr-only">Buscar</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej: agua, jagua, gracias, aguyje…"
            autoFocus
          />
        </label>

        <div className="dict-modes" role="group" aria-label="Dirección">
          <button
            type="button"
            className={mode === 'both' ? 'active' : ''}
            onClick={() => setMode('both')}
          >
            Ambos
          </button>
          <button
            type="button"
            className={mode === 'es-gn' ? 'active' : ''}
            onClick={() => setMode('es-gn')}
          >
            ES → GN
          </button>
          <button
            type="button"
            className={mode === 'gn-es' ? 'active' : ''}
            onClick={() => setMode('gn-es')}
          >
            GN → ES
          </button>
        </div>
      </div>

      {!deferredQuery ? (
        <div className="dict-letters" role="tablist" aria-label="Letras">
          {LETTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={letter === item}
              className={letter === item ? 'active' : ''}
              onClick={() => setLetter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div className="dict-results" aria-live="polite">
        {error ? <p className="dict-empty">{error}</p> : null}
        {!data && !error ? <p className="dict-empty">Cargando diccionario…</p> : null}
        {data && results.length === 0 ? (
          <p className="dict-empty">No hay resultados para esa búsqueda.</p>
        ) : null}

        {results.map((item) => (
          <article key={`${item.kind}-${item.head}-${item.meaning}`} className="dict-entry">
            <div className="dict-entry-top">
              <strong className="guarani">{item.head}</strong>
              <span className={`dict-badge ${item.kind}`}>
                {item.kind === 'es-gn' ? 'ES → GN' : 'GN → ES'}
              </span>
            </div>
            <p>{item.meaning}</p>
          </article>
        ))}
      </div>

      {data ? <p className="dict-source">Fuente: {data.source}</p> : null}
    </div>
  )
}
