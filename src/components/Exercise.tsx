type Item = {
  prompt: string
  answer: string
  hint?: string
}

type Props = {
  title: string
  prompt: string
  items: Item[]
}

function answerBullets(answer: string) {
  const parts = answer
    .split(/\s+\|\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
  return parts.length > 1 ? parts : [answer]
}

export function Exercise({ title, prompt, items }: Props) {
  return (
    <section className="section-block exercise-block">
      <div className="section-heading">
        <p className="eyebrow">Tarea resuelta</p>
        <h2>{title}</h2>
        <p className="lede">{prompt}</p>
      </div>
      <div className="solved-stack">
        {items.map((item, index) => {
          const n = index + 1
          const answers = answerBullets(item.answer)
          return (
            <article key={`${n}-${item.prompt}`} className="solved-item">
              <p className="solved-cut">
                <span>Pregunta {n}</span>
                <span className="solved-cut-arrow" aria-hidden="true">
                  →
                </span>
                <span>Respuesta {n}</span>
              </p>
              <p className="solved-prompt">{item.prompt}</p>
              <div className="solved-answers">
                <ul>
                  {answers.map((answer) => (
                    <li key={answer}>{answer}</li>
                  ))}
                </ul>
              </div>
              {item.hint ? <p className="solved-note">{item.hint}</p> : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
