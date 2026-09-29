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

/** Quizzes por clase publicada (Nivel 1). */
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
  'clase-3': {
    classSlug: 'clase-3',
    title: 'Autoevaluación — Clase 3',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c3-q1',
        prompt: '¿Qué significa Ñande?',
        options: [
          { id: 'a', label: 'Nosotros/as (excluyente)' },
          { id: 'b', label: 'Nosotros/as (incluyente)' },
          { id: 'c', label: 'Ustedes' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c3-q2',
        prompt: '¿Cómo se dice “verde” en guaraní?',
        options: [
          { id: 'a', label: 'Hovy' },
          { id: 'b', label: 'Hovyũ' },
          { id: 'c', label: 'Pytã' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c3-q3',
        prompt: '¿Qué indica el sufijo -ngy en colores?',
        options: [
          { id: 'a', label: 'Atenúa: semi / medio / algo' },
          { id: 'b', label: 'Hace el color más intenso' },
          { id: 'c', label: 'Indica plural' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c3-q4',
        prompt: "¿Qué significa Ko'ẽrõ?",
        options: [
          { id: 'a', label: 'Ayer' },
          { id: 'b', label: 'Hoy' },
          { id: 'c', label: 'Mañana (si amanece)' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'c3-q5',
        prompt: '¿Qué número es Po?',
        options: [
          { id: 'a', label: '3' },
          { id: 'b', label: '5' },
          { id: 'c', label: '10' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  'clase-4': {
    classSlug: 'clase-4',
    title: 'Autoevaluación — Clase 4',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c4-q1',
        prompt: '¿Cuándo se usa kuéra?',
        options: [
          { id: 'a', label: 'Si el sustantivo termina en vocal nasal' },
          { id: 'b', label: 'Si termina en sílaba oral (o m/mb/nd/ng/nt)' },
          { id: 'c', label: 'Siempre, sin excepción' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c4-q2',
        prompt: '¿Cuál es el plural de Kuña?',
        options: [
          { id: 'a', label: 'Kuñakuéra' },
          { id: 'b', label: 'Kuñanguéra' },
          { id: 'c', label: "Kuña'i" },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c4-q3',
        prompt: 'En “Mokõi tapiti”, ¿por qué no hace falta sufijo de plural?',
        options: [
          { id: 'a', label: 'Porque tapiti ya es plural' },
          { id: 'b', label: 'Porque el número (Mokõi) ya indica plural' },
          { id: 'c', label: 'Porque es un error' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c4-q4',
        prompt: "¿Qué significa Jagua'i?",
        options: [
          { id: 'a', label: 'Perros' },
          { id: 'b', label: 'Perrito' },
          { id: 'c', label: 'Perritos' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c4-q5',
        prompt: '¿Qué es Panambi?',
        options: [
          { id: 'a', label: 'Mariposa' },
          { id: 'b', label: 'Abeja' },
          { id: 'c', label: 'Hormiga' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  'clase-5': {
    classSlug: 'clase-5',
    title: 'Autoevaluación — Clase 5',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c5-q1',
        prompt: 'Para verbos orales, ¿qué prefijo usa Ñande?',
        options: [
          { id: 'a', label: 'ña-' },
          { id: 'b', label: 'ja-' },
          { id: 'c', label: 'ro-' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c5-q2',
        prompt: "¿Cómo se dice “yo hablo” con ñe'ẽ?",
        options: [
          { id: 'a', label: "Che añe'ẽ" },
          { id: 'b', label: "Che jañe'ẽ" },
          { id: 'c', label: "Che oñe'ẽ" },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c5-q3',
        prompt: '¿Cuándo se usa la partícula kuri?',
        options: [
          { id: 'a', label: 'Cuando el hablante fue testigo de la acción' },
          { id: 'b', label: 'Solo para futuro' },
          { id: 'c', label: 'Cuando hay sorpresa y no se fue testigo' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c5-q4',
        prompt: "¿Qué expresa ra'e?",
        options: [
          { id: 'a', label: 'Un mandato' },
          { id: 'b', label: 'Pasado sin ser testigo, o sorpresa' },
          { id: 'c', label: 'El plural de los verbos' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c5-q5',
        prompt: '¿Qué significa Purahéi?',
        options: [
          { id: 'a', label: 'Bailar' },
          { id: 'b', label: 'Cantar' },
          { id: 'c', label: 'Correr' },
        ],
        correctOptionId: 'b',
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
