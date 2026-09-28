import { Link } from 'react-router-dom'
import { ResourceDownloadCard } from '../components/ResourceDownloadCard'
import { culturalTexts } from '../data/resources'

export function TextosPage() {
  return (
    <div className="resource-page">
      <header className="resource-hero text">
        <p className="eyebrow light">Contexto cultural</p>
        <h1>Textos culturales</h1>
        <p className="lede">
          Lecturas del módulo para conocer mitos, historia y vida guaraní. Descargá los PDFs para
          leerlos offline.
        </p>
        <Link className="resource-back" to="/">
          ← Volver al inicio
        </Link>
      </header>

      <div className="resource-list-page">
        {culturalTexts.map((resource) => (
          <ResourceDownloadCard key={resource.href} resource={resource} accent="text" />
        ))}
      </div>
    </div>
  )
}
