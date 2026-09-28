import { AudioBlock } from './AudioBlock'
import { Exercise } from './Exercise'
import type { Section } from '../data/classes'

export function SectionRenderer({ section }: { section: Section }) {
  switch (section.type) {
    case 'text':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          <div className="prose">
            {section.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      )

    case 'list':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          <ul className="feature-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )

    case 'alphabet':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          <div className="alphabet-grid">
            {section.letters.map((letter) => (
              <span key={letter} className="alpha-chip">
                {letter}
              </span>
            ))}
          </div>
          <p className="subheading">Pu'ae — Vocales</p>
          <div className="alphabet-grid vowels">
            {section.vowels.map((letter) => (
              <span key={letter} className="alpha-chip vowel">
                {letter}
              </span>
            ))}
          </div>
        </section>
      )

    case 'rules':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          <div className="rules-grid">
            {section.rules.map((rule) => (
              <article key={rule.title} className="rule-item">
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </article>
            ))}
          </div>
        </section>
      )

    case 'examples':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          <div className="example-stack">
            {section.items.map((item) => (
              <div key={item.guaraní} className="example-row">
                <strong className="guarani">{item.guaraní}</strong>
                <span>{item.español}</span>
                {item.detail ? <em>{item.detail}</em> : null}
              </div>
            ))}
          </div>
        </section>
      )

    case 'vocab':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          {section.audio ? <AudioBlock src={section.audio} /> : null}
          <div className="vocab-grid">
            {section.items.map((item) => (
              <article key={`${item.guaraní}-${item.español}`} className="vocab-item">
                <strong className="guarani">{item.guaraní}</strong>
                <span>{item.español}</span>
                {item.note ? <em>{item.note}</em> : null}
              </article>
            ))}
          </div>
        </section>
      )

    case 'colors':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          {section.audio ? <AudioBlock src={section.audio} /> : null}
          <div className="color-grid">
            {section.items.map((item) => (
              <article key={item.guaraní} className="color-item">
                <div
                  className="swatch"
                  style={{ background: item.hex }}
                  aria-hidden="true"
                />
                <strong className="guarani">{item.guaraní}</strong>
                <span>{item.español}</span>
              </article>
            ))}
          </div>
        </section>
      )

    case 'pronouns':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          {section.audio ? <AudioBlock src={section.audio} /> : null}
          <div className="pronoun-layout">
            <div>
              <p className="subheading">Papyteĩ — Singular</p>
              <div className="vocab-grid compact">
                {section.singular.map((item) => (
                  <article key={item.guaraní} className="vocab-item">
                    <strong className="guarani">{item.guaraní}</strong>
                    <span>{item.español}</span>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="subheading">Papyeta — Plural</p>
              <div className="vocab-grid compact">
                {section.plural.map((item) => (
                  <article key={item.guaraní} className="vocab-item">
                    <strong className="guarani">{item.guaraní}</strong>
                    <span>{item.español}</span>
                    {item.note ? <em>{item.note}</em> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )

    case 'pairs':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
            {section.subtitle ? <p className="lede">{section.subtitle}</p> : null}
          </div>
          <div className="pairs-grid">
            {section.groups.map((group) => (
              <div key={group.label} className="pair-group">
                <p className="subheading">{group.label}</p>
                <div className="vocab-grid compact">
                  {group.items.map((item) => (
                    <article key={item.guaraní} className="vocab-item highlight">
                      <strong className="guarani">{item.guaraní}</strong>
                      <span>{item.español}</span>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    case 'times':
      return (
        <section className="section-block">
          <div className="section-heading">
            <h2>{section.title}</h2>
          </div>
          {section.audio ? <AudioBlock src={section.audio} /> : null}
          <div className="times-track" role="list">
            {section.items.map((item, index) => (
              <article key={item.guaraní} className="time-node" role="listitem">
                <span className="time-index">{String(index + 1).padStart(2, '0')}</span>
                <strong className="guarani">{item.guaraní}</strong>
                <span>{item.español}</span>
              </article>
            ))}
          </div>
        </section>
      )

    case 'exercise':
      return <Exercise title={section.title} prompt={section.prompt} items={section.items} />

    default:
      return null
  }
}
