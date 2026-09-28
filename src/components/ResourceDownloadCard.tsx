import type { ResourceFile } from '../data/resources'

type Props = {
  resource: ResourceFile
  accent?: 'dict' | 'text'
}

export function ResourceDownloadCard({ resource, accent = 'dict' }: Props) {
  return (
    <article className={`download-card ${accent}`}>
      <div className="download-card-body">
        <span className="download-icon" aria-hidden="true">
          {accent === 'dict' ? 'Ñ' : '✦'}
        </span>
        <div>
          <h2>{resource.title}</h2>
          <p>{resource.description}</p>
          <p className="download-meta">
            PDF · {resource.sizeLabel} · {resource.fileName}
          </p>
        </div>
      </div>
      <div className="download-actions">
        <a className="download-btn primary" href={resource.href} download={resource.fileName}>
          Descargar PDF
        </a>
        <a className="download-btn ghost" href={resource.href} target="_blank" rel="noreferrer">
          Abrir
        </a>
      </div>
    </article>
  )
}
