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
          { id: 'a', label: 'Si la sílaba final es nasal' },
          { id: 'b', label: 'Si la sílaba final es oral (o m/mb/nd/ng/nt)' },
          { id: 'c', label: 'Siempre, sin excepción' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c4-q2',
        prompt: '¿Cuál es el plural de Tupão (iglesia)?',
        options: [
          { id: 'a', label: 'Tupãonguéra' },
          { id: 'b', label: 'Tupãokuéra' },
          { id: 'c', label: "Tupão'i" },
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
  'clase-6': {
    classSlug: 'clase-6',
    title: 'Autoevaluación — Clase 6',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c6-q1',
        prompt: '¿Qué partícula marca el futuro?',
        options: [
          { id: 'a', label: 'kuri' },
          { id: 'b', label: 'ta' },
          { id: 'c', label: 'se' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c6-q2',
        prompt: '¿Qué significa Che akaruse?',
        options: [
          { id: 'a', label: 'Yo comeré' },
          { id: 'b', label: 'Yo quiero comer' },
          { id: 'c', label: 'Yo comí' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c6-q3',
        prompt: '¿Cuál es la conjunción copulativa equivalente a “y”?',
        options: [
          { id: 'a', label: 'térã' },
          { id: 'b', label: 'ha' },
          { id: 'c', label: 'ỹrõ' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c6-q4',
        prompt: '¿Qué significa Mbaraka?',
        options: [
          { id: 'a', label: 'Cama' },
          { id: 'b', label: 'Guitarra' },
          { id: 'c', label: 'Escuela' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c6-q5',
        prompt: '¿Cuál es la fórmula del futuro?',
        options: [
          { id: 'a', label: 'prefijo + verbo + ta' },
          { id: 'b', label: "prefijo + verbo + kuri / ra'e" },
          { id: 'c', label: 'solo el verbo sin prefijo' },
        ],
        correctOptionId: 'a',
      },
    ],
  },
  'clase-7': {
    classSlug: 'clase-7',
    title: 'Autoevaluación — Clase 7',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c7-q1',
        prompt: 'En guaraní, ¿dónde va el adjetivo?',
        options: [
          { id: 'a', label: 'Siempre antes del sustantivo' },
          { id: 'b', label: 'Siempre después del sustantivo' },
          { id: 'c', label: 'Da igual el orden' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c7-q2',
        prompt: '¿Qué significa Jagua morotĩ?',
        options: [
          { id: 'a', label: 'Perro negro' },
          { id: 'b', label: 'Perro blanco' },
          { id: 'c', label: 'Gato blanco' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c7-q3',
        prompt: '¿Cuál es el opuesto de Porã (lindo/a)?',
        options: [
          { id: 'a', label: 'Vai' },
          { id: 'b', label: 'Pyahu' },
          { id: 'c', label: 'Yvate' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c7-q4',
        prompt: "¿Qué significa Óga ky'a?",
        options: [
          { id: 'a', label: 'Casa limpia' },
          { id: 'b', label: 'Casa sucia' },
          { id: 'c', label: 'Casa grande' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c7-q5',
        prompt: '¿Qué significa Mbarete?',
        options: [
          { id: 'a', label: 'Débil' },
          { id: 'b', label: 'Fuerte' },
          { id: 'c', label: 'Lento' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  'clase-8': {
    classSlug: 'clase-8',
    title: 'Autoevaluación — Clase 8',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c8-q1',
        prompt: "¿Qué significa Mba'éichapa reiko?",
        options: [
          { id: 'a', label: '¿Cómo estás?' },
          { id: 'b', label: '¿Cómo te llamas?' },
          { id: 'c', label: 'Nos vemos' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c8-q2',
        prompt: '¿Cuál es una despedida correcta?',
        options: [
          { id: 'a', label: 'Aguyje' },
          { id: 'b', label: 'Jajoecháta' },
          { id: 'c', label: 'Iporã avei' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c8-q3',
        prompt: "¿Qué pregunta Mba'éichapa nderéra?",
        options: [
          { id: 'a', label: '¿Dónde vivís?' },
          { id: 'b', label: '¿De dónde sos?' },
          { id: 'c', label: '¿Cómo te llamas?' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'c8-q4',
        prompt: "Si un hombre dice Che ra'y, ¿a quién se refiere?",
        options: [
          { id: 'a', label: 'A su hija' },
          { id: 'b', label: 'A su hijo' },
          { id: 'c', label: 'A su hermano' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c8-q5',
        prompt: '¿Cómo se dice “perro” (macho) en esta clase?',
        options: [
          { id: 'a', label: "Jagua kuimba'e" },
          { id: 'b', label: 'Jagua mácho' },
          { id: 'c', label: 'Jaguakuña' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  'clase-9': {
    classSlug: 'clase-9',
    title: 'Autoevaluación — Clase 9',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c9-q1',
        prompt: '¿Qué significa Tete rehegua?',
        options: [
          { id: 'a', label: 'Saludos del día' },
          { id: 'b', label: 'Partes del cuerpo' },
          { id: 'c', label: 'Vocabulario familiar' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c9-q2',
        prompt: '¿Cómo se dice “cabeza” en guaraní?',
        options: [
          { id: 'a', label: 'Akã' },
          { id: 'b', label: 'Tesa' },
          { id: 'c', label: 'Po' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c9-q3',
        prompt: '¿Qué significa Tesa?',
        options: [
          { id: 'a', label: 'Oreja' },
          { id: 'b', label: 'Ojo' },
          { id: 'c', label: 'Nariz' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c9-q4',
        prompt: '¿Cómo se dice “mano”?',
        options: [
          { id: 'a', label: 'Py' },
          { id: 'b', label: 'Jyva' },
          { id: 'c', label: 'Po' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'c9-q5',
        prompt: '¿Qué es Kû?',
        options: [
          { id: 'a', label: 'Lengua' },
          { id: 'b', label: 'Labio' },
          { id: 'c', label: 'Diente' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c9-q6',
        prompt: '¿Cómo se dice “dedo del pie”?',
        options: [
          { id: 'a', label: 'Kuã' },
          { id: 'b', label: 'Pysã' },
          { id: 'c', label: 'Topea' },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  'clase-10': {
    classSlug: 'clase-10',
    title: 'Autoevaluación — Clase 10',
    maxAttempts: DEFAULT_QUIZ_MAX_ATTEMPTS,
    passScore: QUIZ_PASS_SCORE,
    questions: [
      {
        id: 'c10-q1',
        prompt: '¿Cuándo va pegada una posposición?',
        options: [
          { id: 'a', label: 'Cuando tiene una sola sílaba' },
          { id: 'b', label: 'Cuando tiene dos o más sílabas' },
          { id: 'c', label: 'Siempre va separada' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c10-q2',
        prompt: '¿Cuándo se usa me y no pe?',
        options: [
          { id: 'a', label: 'Con palabras orales, como óga' },
          { id: 'b', label: 'Con palabra que termina en vocal o sílaba nasal' },
          { id: 'c', label: 'Solo para decir “desde”' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c10-q3',
        prompt: '¿Qué indica gua?',
        options: [
          { id: 'a', label: 'Origen o procedencia' },
          { id: 'b', label: 'Debajo de' },
          { id: 'c', label: 'Después de' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c10-q4',
        prompt: '¿Cuál se usa con un verbo para decir “para”?',
        options: [
          { id: 'a', label: 'Guarã' },
          { id: 'b', label: 'Haguã' },
          { id: 'c', label: 'Rupi' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'c10-q5',
        prompt: "Aguata ka'aguy rupi destaca la idea de…",
        options: [
          { id: 'a', label: 'Atravesar el monte' },
          { id: 'b', label: 'Estar debajo del monte' },
          { id: 'c', label: 'Venir desde el monte' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'c10-q6',
        prompt: 'En la lámina, ¿qué es kypa?',
        options: [
          { id: 'a', label: 'Vaso' },
          { id: 'b', label: 'Cuchillo' },
          { id: 'c', label: 'Tenedor' },
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
