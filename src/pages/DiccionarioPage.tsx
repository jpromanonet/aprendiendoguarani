import { Link } from 'react-router-dom'
import { ResourceDownloadCard } from '../components/ResourceDownloadCard'
import { dictionaries } from '../data/resources'

export function DiccionarioPage() {
  return (
    <div className="resource-page">
      <header className="resource-hero dict">
        <p className="eyebrow light">Material de consulta</p>
        <h1>Diccionario</h1>
        <p className="lede">
          Diccionarios bilingües del curso. Descargá el PDF o abrilo en otra pestaña para buscar
          mientras estudiás una clase.
        </p>
        <Link className="resource-back" to="/">
          ← Volver al inicio
        </Link>
      </header>

      <div className="resource-list-page">
        {dictionaries.map((resource) => (
          <ResourceDownloadCard key={resource.href} resource={resource} accent="dict" />
        ))}
      </div>
    </div>
  )
}
