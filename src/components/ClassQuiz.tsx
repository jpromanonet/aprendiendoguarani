import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getQuiz, scoreQuiz } from '../data/quizzes'
import { DEFAULT_QUIZ_MAX_ATTEMPTS } from '../data/nivel1'
import { fetchAssessments, submitAssessment } from '../lib/progress'
import type { SelfAssessment } from '../types/database'

type Props = {
  classSlug: string
}

export function ClassQuiz({ classSlug }: Props) {
  const { user, configured } = useAuth()
  const quiz = getQuiz(classSlug)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [attempts, setAttempts] = useState<SelfAssessment[]>([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof scoreQuiz> | null>(null)
  const [taking, setTaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (!user || !quiz) return
    setLoading(true)
    setHydrated(false)
    setResult(null)
    setAnswers({})
    fetchAssessments(user.id, classSlug)
      .then((rows) => {
        setAttempts(rows)
        const passed = rows.some((a) => a.passed)
        const remaining = Math.max(0, (quiz.maxAttempts ?? DEFAULT_QUIZ_MAX_ATTEMPTS) - rows.length)
        setTaking(!passed && remaining > 0)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => {
        setLoading(false)
        setHydrated(true)
      })
  }, [user, classSlug, quiz])

  const usedAttempts = attempts.length
  const maxAttempts = quiz?.maxAttempts ?? DEFAULT_QUIZ_MAX_ATTEMPTS
  const remaining = Math.max(0, maxAttempts - usedAttempts)
  const best = useMemo(
    () => (attempts.length ? Math.max(...attempts.map((a) => a.score)) : null),
    [attempts],
  )
  const passedAny = attempts.some((a) => a.passed)
  const exhausted = remaining === 0
  const canRetake = remaining > 0

  function startRetake() {
    setAnswers({})
    setResult(null)
    setError(null)
    setTaking(true)
  }

  if (!quiz) return null

  if (!configured) {
    return (
      <section className="section-block quiz-block">
        <div className="section-heading">
          <h2>{quiz.title}</h2>
        </div>
        <p className="lede">La autoevaluación se activa cuando Supabase esté conectado.</p>
      </section>
    )
  }

  if (!user) {
    return (
      <section className="section-block quiz-block">
        <div className="section-heading">
          <h2>{quiz.title}</h2>
        </div>
        <p className="lede">Iniciá sesión para hacer la autoevaluación (máx. {maxAttempts} intentos).</p>
        <Link className="primary-btn" to="/cuenta">
          Ir a login
        </Link>
      </section>
    )
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!user || !quiz || exhausted) return
    if (quiz.questions.some((q) => !answers[q.id])) {
      setError('Respondé todas las preguntas antes de enviar.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const scored = scoreQuiz(quiz, answers)
      const attemptNumber = usedAttempts + 1
      const saved = await submitAssessment({
        userId: user.id,
        classSlug,
        attempt: attemptNumber,
        maxAttempts: quiz.maxAttempts,
        score: scored.score,
        passed: scored.passed,
        answers,
      })
      setAttempts((prev) => [...prev, saved])
      setResult(scored)
      setTaking(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el intento.')
    } finally {
      setSubmitting(false)
    }
  }

  const showForm = hydrated && taking && !exhausted

  return (
    <section className="section-block quiz-block">
      <div className="section-heading">
        <h2>{quiz.title}</h2>
      </div>
      <p className="quiz-meta">
        Intentos: <strong>{usedAttempts}</strong> / {maxAttempts}
        {best != null ? (
          <>
            {' '}
            · Mejor puntaje: <strong>{best}%</strong>
          </>
        ) : null}
        {passedAny ? (
          <>
            {' '}
            · <span className="quiz-passed">Aprobada</span>
          </>
        ) : null}
      </p>

      {loading ? <p>Cargando intentos…</p> : null}
      {error ? <p className="quiz-error">{error}</p> : null}

      {showForm ? (
        <form className="quiz-form" onSubmit={onSubmit}>
          {quiz.questions.map((question, index) => (
            <fieldset key={question.id} className="quiz-question">
              <legend>
                {index + 1}. {question.prompt}
              </legend>
              <div className="quiz-options">
                {question.options.map((option) => (
                  <label key={option.id} className="quiz-option">
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button className="primary-btn" type="submit" disabled={submitting}>
            {submitting ? 'Enviando…' : `Enviar intento (${remaining} restantes)`}
          </button>
        </form>
      ) : hydrated && !loading ? (
        <div className="quiz-locked">
          {result ? (
            <p>
              Último envío: {result.correct}/{result.total} ({result.score}%)
              {result.passed ? ' · Aprobado' : ' · No alcanzado'}
            </p>
          ) : passedAny ? (
            <p>¡Listo! Ya aprobaste esta autoevaluación.</p>
          ) : exhausted ? (
            <p>Agotaste los {maxAttempts} intentos absolutos de esta autoevaluación.</p>
          ) : (
            <p>Podés empezar cuando quieras.</p>
          )}

          {canRetake ? (
            <button type="button" className="primary-btn" onClick={startRetake}>
              {passedAny || result ? 'Retomar quiz' : 'Empezar'}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
