import { resources } from '../data/classes'

export function Resources() {
  return (
    <div className="resources-page">
      <header className="page-header">
        <p className="eyebrow">Biblioteca del módulo</p>
        <h1>Recursos de consulta</h1>
        <p className="lede">
          Diccionarios y textos culturales del curso. Los materiales originales están en la carpeta
          de clases; acá los tenés listados para estudiar junto a las lecciones.
        </p>
      </header>

      <div className="resource-list">
        {resources.map((resource) => (
          <article key={resource.file} className="resource-item">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <p className="resource-file">{resource.file}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
