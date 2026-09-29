export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: QuizOption[]
  /** id de la opción correcta */
  correctOptionId: string
  explanation?: string
}

export type ClassQuiz = {
  classSlug: string
  title: string
  maxAttempts: number
  passScore: number
  questions: QuizQuestion[]
}

import { DEFAULT_QUIZ_MAX_ATTEMPTS, QUIZ_PASS_SCORE } from './nivel1'

/** Quizzes por clase. Se van sumando a medida que llegue el contenido. */
export const quizzes: Record<string, ClassQuiz> = {
  'clase-1': {
    classSlug: 'clase-1',
    title: 'Autoevaluación — Clase 1',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c1-q1',
        prompt: "¿Qué significa Avañe'ẽ?",
        options: [
          { id: 'a', label: 'Lengua del hombre / de las personas' },
          { id: 'b', label: 'Tierra roja' },
          { id: 'c', label: 'Camino del guerrero' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c1-q2',
        prompt: "¿Qué son las pu'ae?",
        options: [
          { id: 'a', label: 'Consonantes' },
          { id: 'b', label: 'Vocales' },
          { id: 'c', label: 'Números' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c1-q3',
        prompt: '¿Cómo se dice “gracias” en guaraní?',
        options: [
          { id: 'a', label: "Mba'éichapa" },
          { id: 'b', label: 'Jajoecháta' },
          { id: 'c', label: 'Aguyje' },
        ],
        correctOptionId: 'c',
      },
    ],
  },
  'clase-2': {
    classSlug: 'clase-2',
    title: 'Autoevaluación — Clase 2',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c2-q1',
        prompt: "¿Qué son las pu'ae tĩgua?",
        options: [
          { id: 'a', label: 'Vocales orales: a, e, i, o, u' },
          { id: 'b', label: 'Vocales nasales: ã, ẽ, ĩ, õ, ũ' },
          { id: 'c', label: 'Consonantes seminasales: mb, nd, ng, nt' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c2-q2',
        prompt: "¿Qué produce el ' (puso)?",
        options: [
          { id: 'a', label: 'Una nasalización de la vocal' },
          { id: 'b', label: 'Una leve pausa o corte entre vocales' },
          { id: 'c', label: 'El plural de la palabra' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c2-q3',
        prompt: '¿Cómo se escribe el sonido “ca/que/qui” en guaraní?',
        options: [
          { id: 'a', label: 'Con c o q' },
          { id: 'b', label: 'Con k (ka, ke, ki…)' },
          { id: 'c', label: 'Con g' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c2-q4',
        prompt: '¿Qué significa Jaguarete?',
        options: [
          { id: 'a', label: 'Perro' },
          { id: 'b', label: 'Gato' },
          { id: 'c', label: 'Jaguar' },
        ],
        correctOptionId: 'c',
      },
    ],
  },
}

export function getQuiz(classSlug: string) {
  return quizzes[classSlug] ?? null
}

export function scoreQuiz(
  quiz: ClassQuiz,
  answers: Record<string, string>,
): { score: number; correct: number; total: number; passed: boolean } {
  const total = quiz.questions.length
  const correct = quiz.questions.filter((q) => answers[q.id] === q.correctOptionId).length
  const score = total === 0 ? 0 : Math.round((correct / total) * 100)
  return { score, correct, total, passed: score >= quiz.passScore }
}
