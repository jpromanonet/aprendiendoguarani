export type VocabItem = {
  guaraní: string
  español: string
  note?: string
}

export type ColorItem = {
  guaraní: string
  español: string
  hex: string
}

export type Section =
  | { type: 'text'; title: string; body: string[] }
  | { type: 'list'; title: string; items: string[] }
  | { type: 'vocab'; title: string; items: VocabItem[]; audio?: string }
  | { type: 'colors'; title: string; items: ColorItem[]; audio?: string }
  | { type: 'alphabet'; title: string; letters: string[]; vowels: string[]; audio?: string; vowelsAudio?: string }
  | { type: 'pronouns'; title: string; singular: VocabItem[]; plural: VocabItem[]; audio?: string }
  | { type: 'pairs'; title: string; subtitle?: string; groups: { label: string; items: VocabItem[] }[] }
  | { type: 'rules'; title: string; rules: { title: string; body: string }[] }
  | { type: 'examples'; title: string; items: { guaraní: string; español: string; detail?: string }[] }
  | { type: 'exercise'; title: string; prompt: string; items: { prompt: string; answer: string; hint?: string }[] }
  | { type: 'times'; title: string; items: VocabItem[]; audio?: string }
  | {
      type: 'solved'
      title: string
      intro?: string
      groups: {
        title: string
        items: { prompt: string; answer: string; note?: string; image?: string }[]
      }[]
    }
  | {
      type: 'figure'
      title: string
      image: string
      caption?: string
      audio?: string
      body?: string[]
    }

export type ClassLesson = {
  id: number
  slug: string
  title: string
  date: string
  subtitle: string
  summary: string
  themes: string[]
  sections: Section[]
}

export const courseInfo = {
  name: "Avañe'ẽ",
  tagline: 'Aprendiendo guaraní',
  description:
    'Curso escrito y oral del idioma guaraní: alfabeto, vocabulario, pronombres, colores, números, pluralización y diminutivos.',
}

export type LevelInfo = {
  id: number
  slug: string
  title: string
  subtitle?: string
  description: string
  available: boolean
  /** Clases previstas del nivel. 0 hasta que el plan del nivel esté definido. */
  totalClasses: number
}

export const levels: LevelInfo[] = [
  {
    id: 1,
    slug: 'nivel-1',
    title: 'Nivel 1',
    description:
      'Introducción al alfabeto, vocabulario básico, pronombres, colores, números, pluralización y diminutivos.',
    available: true,
    totalClasses: 15,
  },
  {
    id: 2,
    slug: 'nivel-2',
    title: 'Nivel 2',
    description: 'Próximamente.',
    available: false,
    totalClasses: 0,
  },
  {
    id: 3,
    slug: 'nivel-3',
    title: 'Nivel 3',
    description: 'Próximamente.',
    available: false,
    totalClasses: 0,
  },
  {
    id: 4,
    slug: 'nivel-4',
    title: 'Nivel 4',
    description: 'Próximamente.',
    available: false,
    totalClasses: 0,
  },
]

export const classes: ClassLesson[] = [
  {
    id: 1,
    slug: 'clase-1',
    title: 'Clase 1',
    date: 'Lunes 31 de agosto de 2026',
    subtitle: "Avañe'ẽ — la lengua del hombre",
    summary:
      'Introducción al guaraní: significado del nombre, alfabeto, vocales y las características esenciales del idioma. Saludos y agradecimiento. Incluye audios del abecedario y de las vocales.',
    themes: ['Introducción', 'Alfabeto', 'Características', 'Saludos'],
    sections: [
      {
        type: 'text',
        title: "¿Qué es Avañe'ẽ?",
        body: [
          "Avañe'ẽ significa lengua del hombre / de las personas.",
          'Ava: hombre / personas.',
          "Ñe'ẽ: palabra, hablar, idioma; lo que se emite oralmente y que, para los guaraníes, es el reflejo del alma.",
          'Guaraní deriva de guarini, que significa guerrero.',
        ],
      },
      {
        type: 'alphabet',
        title: "Avañe'ẽ achegety — Alfabeto guaraní",
        audio: '/audio/abecedario.m4a',
        vowelsAudio: '/audio/vocales.m4a',
        letters: [
          'A', 'Ã', 'CH', 'E', 'Ẽ', 'G', 'G̃', 'H', 'I', 'Ĩ', 'J', 'K', 'L', 'M', 'MB',
          'N', 'ND', 'NG', 'NT', 'Ñ', 'O', 'Õ', 'P', 'R', 'RR', 'S', 'T', 'U', 'Ũ', 'V', 'Y', 'Ỹ', "'",
        ],
        vowels: ['A', 'Ã', 'E', 'Ẽ', 'I', 'Ĩ', 'O', 'Õ', 'U', 'Ũ', 'Y', 'Ỹ'],
      },
      {
        type: 'list',
        title: 'Características del idioma',
        items: [
          'Aglutinante y polisintético: las palabras se forman a partir de raíces y partículas.',
          'Contiene palabras orales y nasales.',
          'Es una lengua onomatopéyica.',
          'Su acento natural es el agudo: la mayoría de las palabras llevan el acento tónico en la última vocal.',
          'Posee acento escrito, prosódico y nasal (virgulilla).',
          'Usa posposiciones en vez de preposiciones.',
          'En las palabras no hay dos consonantes seguidas.',
          'Todas las palabras terminan en vocal.',
          'Todas las letras tienen un sonido propio.',
          'No posee artículo.',
          'No posee género gramatical.',
        ],
      },
      {
        type: 'examples',
        title: 'Ejemplos de aglutinación',
        items: [
          { guaraní: 'Guata', español: 'caminar', detail: 'cvvcv' },
          { guaraní: 'Aguata', español: 'camino', detail: 'vcvvcv' },
          { guaraní: 'Aguatase', español: 'quiero caminar', detail: 'vcvvcvcv' },
          { guaraní: 'Mitã okaru', español: 'El niño come / La niña come', detail: 'Sin género gramatical' },
        ],
      },
      {
        type: 'vocab',
        title: 'Saludo, despedida y agradecimiento',
        items: [
          { guaraní: "Mba'éichapa", español: '¿Qué tal?' },
          { guaraní: 'Jajoecháta', español: 'Nos vemos' },
          { guaraní: 'Aguyje', español: 'Gracias' },
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'clase-2',
    title: 'Clase 2',
    date: 'Lunes 7 de septiembre de 2026',
    subtitle: 'Vocales, consonantes y sustantivos',
    summary:
      'Clasificación de vocales y consonantes (orales, nasales, seminasales). Correspondencias con el castellano. Importancia de la virgulilla y el puso. Vocabulario de animales y naturaleza, con audio de sustantivos.',
    themes: ['Fonética', 'Ortografía', 'Sustantivos', 'Virgulilla'],
    sections: [
      {
        type: 'rules',
        title: "Pu'ae — Clasificación de vocales",
        rules: [
          { title: "Pu'ae jurugua · Vocales orales", body: 'a, e, i, o, u' },
          { title: "Pu'ae tĩgua · Vocales nasales", body: 'ã, ẽ, ĩ, õ, ũ' },
          { title: "Pu'ae ahy'ogua · Vocal gutural", body: 'y' },
          { title: "Pu'ae ahy'otĩgua · Vocal gutural nasal", body: 'ỹ' },
        ],
      },
      {
        type: 'rules',
        title: 'Pundie — Clasificación de consonantes',
        rules: [
          {
            title: 'Pundie jurugua · Consonantes orales',
            body: "ch, g, h, j, k, l, p, r, rr, s, t, v, '",
          },
          { title: 'Pundie tĩgua · Consonantes nasales', body: 'g̃, m, n, ñ' },
          {
            title: 'Pundie tĩjurugua · Consonantes seminasales',
            body: 'mb, nd, ng, nt',
          },
          {
            title: "Consonante glotal · ' (puso)",
            body: 'Produce una leve pausa o corte entre vocales. Pu = sonido, so = corte / interrupción.',
          },
        ],
      },
      {
        type: 'text',
        title: 'Importante',
        body: [
          'Las letras del alfabeto latino que no forman parte del vocabulario guaraní son: c, b, d, f, q, w, x, z.',
          'La combinación rr no aparece en palabras propias del guaraní, sino en préstamos del español (karro, karreta).',
        ],
      },
      {
        type: 'examples',
        title: 'Correspondencias con el castellano',
        items: [
          { guaraní: 'ka, ke, ki, ko, ku, ky', español: 'sonidos ca/que/qui/co/cu → se escriben con k' },
          { guaraní: 'va, ve, vi, vo, vu, vy', español: 'sonidos ba/be/bi/bo/bu → se escriben con v' },
          { guaraní: 'sa, se, si, so, su, sy', español: 'sonidos za/ce/ci/zo/zu → se escriben con s' },
          { guaraní: 'ha, he, hi, ho, hu, hy', español: 'sonidos ja/je/ji/jo/ju → se escriben con h' },
          { guaraní: 'ja, je, ji, jo, ju, jy', español: 'sonidos ya/ye/yi/yo/yu → se escriben con j' },
        ],
      },
      {
        type: 'pairs',
        title: "Importancia de la virgulilla y el ' (puso)",
        subtitle: 'Un acento o un puso cambia por completo el significado.',
        groups: [
          {
            label: 'Kua',
            items: [
              { guaraní: 'Kua', español: 'agujero / hoyo' },
              { guaraní: 'Kuã', español: 'dedo de la mano' },
              { guaraní: "Ku'a", español: 'cintura' },
            ],
          },
          {
            label: 'Mboi',
            items: [
              { guaraní: 'Mboí', español: 'desnudar / desvestir' },
              { guaraní: 'Mbói', español: 'víbora' },
              { guaraní: "Mbo'i", español: 'cortar' },
            ],
          },
          {
            label: 'Pyta',
            items: [
              { guaraní: 'Pyta', español: 'talón' },
              { guaraní: 'Pytã', español: 'rojo' },
            ],
          },
          {
            label: 'Oke',
            items: [
              { guaraní: 'Okẽ', español: 'puerta' },
              { guaraní: 'Oke', español: 'duerme' },
            ],
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Tero / Terokuéra — Sustantivos',
        audio: '/audio/sustantivos.m4a',
        items: [
          { guaraní: 'Kavaju', español: 'caballo' },
          { guaraní: 'Kavara', español: 'cabra' },
          { guaraní: 'Karumbe', español: 'tortuga' },
          { guaraní: "Ka'i", español: 'mono' },
          { guaraní: 'Kure', español: 'cerdo / chancho' },
          { guaraní: 'Jagua', español: 'perro' },
          { guaraní: 'Jaguarete', español: 'jaguar' },
          { guaraní: 'Jakare', español: 'yacaré / cocodrilo' },
          { guaraní: 'Y', español: 'agua' },
          { guaraní: 'Yvy', español: 'tierra' },
          { guaraní: 'Yvyra', español: 'árbol' },
          { guaraní: 'Yvytu', español: 'viento' },
          { guaraní: 'Mbarakaja', español: 'gato' },
          { guaraní: 'Mborerotochu', español: 'elefante' },
          { guaraní: 'Mbói', español: 'víbora / serpiente' },
          { guaraní: 'Mykurẽ', español: 'comadreja / zarigüeya' },
          { guaraní: 'Tapiti', español: 'conejo' },
          { guaraní: 'Ryguasu', español: 'gallina' },
          { guaraní: 'Ryguasume', español: 'gallo' },
          { guaraní: 'Kururu', español: 'sapo' },
          { guaraní: "Ju'i", español: 'rana' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Tarea 1',
        prompt: 'Clasificá los sustantivos en oral y nasal.',
        items: [
          { prompt: 'Kavaju', answer: 'oral', hint: 'termina en u oral' },
          { prompt: 'Y', answer: 'oral', hint: 'vocal gutural oral' },
          { prompt: 'Tapiti', answer: 'oral' },
          { prompt: 'Kavara', answer: 'oral' },
          { prompt: 'Yvy', answer: 'oral' },
          { prompt: 'Ryguasu', answer: 'oral' },
          { prompt: 'Karumbe', answer: 'oral' },
          { prompt: 'Yvyra', answer: 'oral' },
          { prompt: 'Ryguasume', answer: 'nasal', hint: 'tiene m → nasal' },
          { prompt: "Ka'i", answer: 'oral' },
          { prompt: 'Yvytu', answer: 'oral' },
          { prompt: 'Kururu', answer: 'oral' },
          { prompt: 'Kure', answer: 'oral' },
          { prompt: 'Mbarakaja', answer: 'nasal', hint: 'empieza con mb → nasal' },
          { prompt: "Ju'i", answer: 'oral' },
          { prompt: 'Jagua', answer: 'oral' },
          { prompt: 'Mborerotochu', answer: 'nasal', hint: 'empieza con mb → nasal' },
          { prompt: 'Jaguarete', answer: 'oral' },
          { prompt: 'Mbói', answer: 'nasal', hint: 'empieza con mb → nasal' },
          { prompt: 'Jakare', answer: 'oral' },
          { prompt: 'Mykurẽ', answer: 'nasal', hint: 'termina en ẽ nasal' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Tarea 2',
        prompt: 'Señalá la forma escrita correcta según el alfabeto guaraní.',
        items: [
          { prompt: 'Yvu / Ybu', answer: 'Yvu', hint: 'no existe b en guaraní' },
          { prompt: "Mitã / Mitãs", answer: 'Mitã', hint: 'las palabras terminan en vocal' },
          { prompt: 'Abati / Avati', answer: 'Avati', hint: 'b → v' },
          { prompt: "Zo'o / So'o", answer: "So'o", hint: 'z → s' },
          { prompt: 'Kamby / Camby', answer: 'Kamby', hint: 'c → k' },
          { prompt: "Ka'a / Ka'á", answer: "Ka'a", hint: 'acento natural agudo, no hace falta tilde escrita extra' },
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'clase-3',
    title: 'Clase 3',
    date: 'Lunes 14 de septiembre de 2026',
    subtitle: 'Pronombres, colores, tiempo y números',
    summary:
      'Terarãngue (pronombres), sa\'ykuéra (colores), momentos del día, vocabulario del tiempo y papapy (números). Incluye audios de pronunciación de la clase.',
    themes: ['Pronombres', 'Colores', 'Tiempo', 'Números'],
    sections: [
      {
        type: 'pronouns',
        title: "Terarãngue — Pronombres",
        audio: '/audio/pronombres.mp4',
        singular: [
          { guaraní: 'Che', español: 'Yo' },
          { guaraní: 'Nde', español: 'Tú / Vos' },
          { guaraní: "Ha'e", español: 'Él / Ella' },
        ],
        plural: [
          { guaraní: 'Ñande', español: 'Nosotros/as (incluyente)', note: 'Incluye a la persona con quien se habla' },
          { guaraní: 'Ore', español: 'Nosotros/as (excluyente)', note: 'Excluye a la persona con quien se habla' },
          { guaraní: 'Peẽ', español: 'Ustedes' },
          { guaraní: "Ha'ekuéra", español: 'Ellos / Ellas' },
        ],
      },
      {
        type: 'colors',
        title: "Sa'ykuéra — Los colores",
        audio: '/audio/colores.mp4',
        items: [
          { guaraní: 'Hũ', español: 'negro', hex: '#1a1a1a' },
          { guaraní: 'Hũngy', español: 'gris / semi negro', hex: '#7a7a7a' },
          { guaraní: 'Pytã', español: 'rojo', hex: '#c62828' },
          { guaraní: 'Hovy', español: 'azul', hex: '#1565c0' },
          { guaraní: 'Hovyũ', español: 'verde', hex: '#2e7d32' },
          { guaraní: 'Morotĩ', español: 'blanco', hex: '#f5f5f5' },
          { guaraní: "Sa'yju", español: 'amarillo', hex: '#f9a825' },
          { guaraní: 'Marrõ', español: 'marrón', hex: '#6d4c41' },
        ],
      },
      {
        type: 'text',
        title: 'Matices de color',
        body: [
          'Para: se refiere a algo estampado, que no posee un color liso. Ej.: Sái para (vestido estampado).',
          'Mimbi: brillante / reluciente / radiante. Ej.: Kuarahy mimbi (sol brillante).',
          'Ngy: atenúa una cualidad — semi / medio / algo. Hũngy (semi negro → gris), Pytãngy (medio rojo → rosado), Hovyngy (medio azul → celeste).',
        ],
      },
      {
        type: 'times',
        title: 'Los momentos del día',
        audio: '/audio/tiempo.mp4',
        items: [
          { guaraní: "Ko'ẽ", español: 'Amanece' },
          { guaraní: 'Pyhareve', español: 'Mañana' },
          { guaraní: 'Asaje', español: 'Mediodía' },
          { guaraní: "Ka'aru", español: 'Tarde' },
          { guaraní: "Ka'aru pytũ", español: 'Atardecer / tarde noche' },
          { guaraní: 'Pyhare', español: 'Noche' },
        ],
      },
      {
        type: 'vocab',
        title: 'Vocabulario de la naturaleza',
        items: [
          { guaraní: 'Kuarahy', español: 'sol' },
          { guaraní: 'Yvyra', español: 'árbol' },
          { guaraní: 'Arai', español: 'nube' },
          { guaraní: 'Jasy', español: 'luna' },
          { guaraní: 'Mbyja', español: 'estrella' },
        ],
      },
      {
        type: 'vocab',
        title: 'Vocabulario relacionado con el tiempo',
        items: [
          { guaraní: "Ko árape / Ko'árape", español: 'Hoy / En este día' },
          { guaraní: 'Kuehe', español: 'Ayer' },
          { guaraní: "Ko'ẽrõ", español: 'Mañana (si amanece)' },
        ],
      },
      {
        type: 'rules',
        title: 'Análisis',
        rules: [
          {
            title: 'Ko árape',
            body: 'Ko = este/esta (demostrativo). Ára = día, tiempo y espacio. Pe = en/a/al (posposición para palabras orales). Ej.: Ógape (en casa), ko jagua (este perro).',
          },
          {
            title: "Ko'ẽrõ",
            body: "Ko'ẽ = amanece. Rõ = si / cuando (indica condición). Literalmente: si amanece.",
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Papapy — Números',
        audio: '/audio/numeros.mp4',
        items: [
          { guaraní: 'Peteĩ', español: '1' },
          { guaraní: 'Mokõi', español: '2' },
          { guaraní: 'Mbohapy', español: '3' },
          { guaraní: 'Irundy', español: '4' },
          { guaraní: 'Po', español: '5' },
          { guaraní: 'Poteĩ', español: '6' },
          { guaraní: 'Pokõi', español: '7' },
          { guaraní: 'Poapy', español: '8' },
          { guaraní: 'Porundy', español: '9' },
          { guaraní: 'Pa', español: '10' },
          { guaraní: "Mba'eve", español: 'nada' },
          { guaraní: 'Heta', español: 'mucho' },
          { guaraní: 'Mbovy', español: 'poco' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Traducir al español',
        prompt: 'Traducí estas frases al español.',
        items: [
          { prompt: 'Peteĩ kure pytãngy', answer: 'Un cerdo rosado / Un chancho medio rojo' },
          { prompt: 'Ko kururu hovyũ', answer: 'Este sapo (es) verde' },
          { prompt: 'Po mborerotochu hũngy', answer: 'Cinco elefantes grises' },
          { prompt: "Irundy mbarakaja sa'yju", answer: 'Cuatro gatos amarillos' },
          { prompt: 'Poteĩ arai morotĩ', answer: 'Seis nubes blancas' },
          { prompt: 'Pa jagua hũ', answer: 'Diez perros negros' },
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'clase-4',
    title: 'Clase 4',
    date: 'Lunes 21 de septiembre de 2026',
    subtitle: 'Pluralización, diminutivo e insectos',
    summary:
      'Partículas kuéra / nguéra para pluralizar, diminutivo con \'i, combinación de ambos, y vocabulario de mymbachu\'i (insectos). Incluye audios de la clase presencial.',
    themes: ['Plural', 'Diminutivo', 'Insectos'],
    sections: [
      {
        type: 'rules',
        title: 'Pluralización en guaraní',
        rules: [
          {
            title: 'kuéra',
            body: 'Si el sustantivo termina en sílaba oral, o si la sílaba final está compuesta por m / mb / nd / ng / nt, se usa kuéra.',
          },
          {
            title: 'nguéra',
            body: 'Si la sílaba final tiene vocal nasal (ã ẽ ĩ õ ũ ỹ) o contiene n / ñ, se usa nguéra. Si la nasal está en una sílaba anterior y la última es oral, va kuéra. Ej.: Tupão → Tupãokuéra. Siempre va unida al sustantivo.',
          },
          {
            title: 'Sin sufijo',
            body: 'No se usa si el contexto ya indica claramente el plural (por ejemplo, con un número o con heta).',
          },
        ],
      },
      {
        type: 'examples',
        title: 'Ejemplos de plural',
        items: [
          { guaraní: 'Jagua → Jaguakuéra', español: 'perro → perros' },
          { guaraní: 'Kũ → Kũnguéra', español: 'lengua → lenguas' },
          { guaraní: 'Kuña → Kuñanguéra', español: 'mujer → mujeres' },
          { guaraní: "Kuimba'e → Kuimba'ekuéra", español: 'hombre → hombres / varones' },
        ],
      },
      {
        type: 'examples',
        title: 'Plural por contexto (sin sufijo)',
        items: [
          { guaraní: 'Mokõi tapiti', español: 'Dos conejos' },
          { guaraní: 'Mbohapy jagua', español: 'Tres perros' },
          { guaraní: 'Heta ryguasu', español: 'Muchas gallinas' },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Ejemplos de pluralización',
        audio: '/audio/pluralizacion.mp4',
        items: [
          { guaraní: 'Jaguakuéra', español: 'perros' },
          { guaraní: 'Kũnguéra', español: 'lenguas' },
          { guaraní: 'Kuñanguéra', español: 'mujeres' },
          { guaraní: "Kuimba'ekuéra", español: 'hombres' },
        ],
      },
      {
        type: 'exercise',
        title: 'Práctica — Pluralizá',
        prompt: 'Escribí el plural de cada sustantivo.',
        items: [
          { prompt: 'Vaka (vaca)', answer: 'Vakakuéra', hint: 'termina en sílaba oral → kuéra' },
          { prompt: "Ñati'ũ (mosquito)", answer: "Ñati'ũnguéra", hint: 'termina en ũ nasal → nguéra' },
          { prompt: 'Ñahatĩ (libélula)', answer: 'Ñahatĩnguéra', hint: 'termina en ĩ nasal → nguéra' },
          { prompt: "Ju'i (rana)", answer: "Ju'ikuéra", hint: 'termina en i oral → kuéra' },
          { prompt: 'Mainumby (colibrí)', answer: 'Mainumbykuéra', hint: 'termina en y oral → kuéra' },
          { prompt: 'Óga (casa)', answer: 'Ógakuéra', hint: 'termina en a oral → kuéra' },
          { prompt: 'Tupão (iglesia)', answer: 'Tupãokuéra', hint: 'la nasal no está en la sílaba final → kuéra' },
          { prompt: 'Ovetã (ventana)', answer: 'Ovetãnguéra', hint: 'termina en ã nasal → nguéra' },
          { prompt: 'Yvoty (flor)', answer: 'Yvotykuéra', hint: 'termina en y oral → kuéra' },
        ],
      },
      {
        type: 'rules',
        title: 'El diminutivo',
        rules: [
          {
            title: "'i",
            body: "En guaraní el diminutivo usa la partícula sufija 'i, equivalente a -ito/-ita o -cito/-cita en español.",
          },
          {
            title: 'Orden con plural',
            body: "Primero va el diminutivo y después la pluralización: Jagua'ikuéra (perritos).",
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Techapyrã — Diminutivo',
        audio: '/audio/diminutivo.mp4',
        items: [
          { guaraní: "Jagua'i", español: 'perrito' },
          { guaraní: "Tapiti'i", español: 'conejito' },
          { guaraní: "Ryguasu'i", español: 'gallinita' },
          { guaraní: "Kuña'i", español: 'mujercita' },
          { guaraní: "Kuimba'e'i", español: 'hombrecito / varoncito' },
          { guaraní: "Kure'i", español: 'cerdito / chanchito' },
        ],
      },
      {
        type: 'examples',
        title: 'Diminutivo + pluralización',
        items: [
          { guaraní: "Jagua'ikuéra", español: 'perritos' },
          { guaraní: "Tapiti'ikuéra", español: 'conejitos' },
          { guaraní: "Ryguasu'ikuéra", español: 'gallinitas' },
          { guaraní: "Kuña'inguéra", español: 'mujercitas' },
          { guaraní: "Kuimba'e'ikuéra", español: 'hombrecitos / varoncitos' },
          { guaraní: "Kure'ikuéra", español: 'cerditos / chanchitos' },
        ],
      },
      {
        type: 'vocab',
        title: "Mymbachu'i — Insectos",
        audio: '/audio/insectos.mp4',
        items: [
          { guaraní: 'Lembu', español: 'escarabajo' },
          { guaraní: 'Marandova', español: 'oruga' },
          { guaraní: 'Ky', español: 'piojo' },
          { guaraní: 'Ñakyrã', español: 'cigarra' },
          { guaraní: "Kupi'i", español: 'termita' },
          { guaraní: 'Mberu', español: 'mosca' },
          { guaraní: "Ñati'ũ", español: 'mosquito' },
          { guaraní: 'Tarave', español: 'cucaracha' },
          { guaraní: 'Ñahatĩ', español: 'libélula' },
          { guaraní: 'Tuku', español: 'langosta' },
          { guaraní: 'Tahýi', español: 'hormiga' },
          { guaraní: 'Mboisy', español: 'mantis religiosa' },
          { guaraní: 'Tungusu', español: 'pulga' },
          { guaraní: 'Panambi', español: 'mariposa' },
          { guaraní: 'Eiru', español: 'abeja' },
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'clase-5',
    title: 'Clase 5',
    date: 'Lunes 28 de septiembre de 2026',
    subtitle: 'Pronombres y conjugación de verbos areales',
    summary:
      'Repaso de terarãngue, prefijos de persona para verbos orales y nasales, presente y pretérito reciente con kuri / ra’e, y lista de verbos areales con audio.',
    themes: ['Pronombres', 'Conjugación', 'Presente', 'Pretérito', 'Verbos'],
    sections: [
      {
        type: 'pronouns',
        title: "Terarãngue — Pronombres",
        audio: '/audio/pronombres.mp4',
        singular: [
          { guaraní: 'Che', español: 'Yo' },
          { guaraní: 'Nde', español: 'Tú / Vos' },
          { guaraní: "Ha'e", español: 'Él / Ella' },
        ],
        plural: [
          { guaraní: 'Ñande', español: 'Nosotros/as (incluyente)', note: 'Incluye a quien escucha' },
          { guaraní: 'Ore', español: 'Nosotros/as (excluyente)', note: 'Excluye a quien escucha' },
          { guaraní: 'Peẽ', español: 'Ustedes' },
          { guaraní: "Ha'ekuéra", español: 'Ellos / Ellas' },
        ],
      },
      {
        type: 'rules',
        title: 'Prefijos de número y persona',
        rules: [
          {
            title: 'Verbos areales',
            body: 'Para conjugar verbos areales usamos partículas prefijas de número y persona: a · re · o · ja/ña · ro · pe · o.',
          },
          {
            title: "Ñe'ẽtéva jurugua · Verbos orales",
            body: 'Prefijos: a · re · o · ja · ro · pe · o. Ejemplo: karu → akaru, rekaru, okaru, jakaru…',
          },
          {
            title: "Ñe'ẽtéva tĩgua · Verbos nasales",
            body: "Prefijos: a · re · o · ña · ro · pe · o. Ejemplo: ñe'ẽ → añe'ẽ, reñe'ẽ, oñe'ẽ, ñañe'ẽ…",
          },
        ],
      },
      {
        type: 'text',
        title: 'Tiempo presente',
        body: [
          'En presente se conjuga el verbo directamente con los pronombres personales y las partículas de número y persona.',
        ],
      },
      {
        type: 'examples',
        title: 'Presente — Karu (comer) · oral',
        items: [
          { guaraní: 'Che akaru', español: 'Yo como' },
          { guaraní: 'Nde rekaru', español: 'Tú / vos comes' },
          { guaraní: "Ha'e okaru", español: 'Él / ella come' },
          { guaraní: 'Ñande jakaru', español: 'Nosotros/as comemos (incluyente)' },
          { guaraní: 'Ore rokaru', español: 'Nosotros/as comemos (excluyente)' },
          { guaraní: 'Peẽ pekaru', español: 'Ustedes comen' },
          { guaraní: "Ha'ekuéra okaru", español: 'Ellos / ellas comen' },
        ],
      },
      {
        type: 'examples',
        title: "Presente — Ñe'ẽ (hablar) · nasal",
        items: [
          { guaraní: "Che añe'ẽ", español: 'Yo hablo' },
          { guaraní: "Nde reñe'ẽ", español: 'Tú / vos hablas' },
          { guaraní: "Ha'e oñe'ẽ", español: 'Él / ella habla' },
          { guaraní: "Ñande ñañe'ẽ", español: 'Nosotros/as hablamos (incluyente)' },
          { guaraní: "Ore roñe'ẽ", español: 'Nosotros/as hablamos (excluyente)' },
          { guaraní: "Peẽ peñe'ẽ", español: 'Ustedes hablan' },
          { guaraní: "Ha'ekuéra oñe'ẽ", español: 'Ellos / ellas hablan' },
        ],
      },
      {
        type: 'examples',
        title: 'Sin pronombre a la vista',
        items: [
          { guaraní: 'Okaru', español: 'Come' },
          { guaraní: 'Okaru hikuái', español: 'Comen ellos' },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Conjugaciones',
        audio: '/audio/conjugaciones.mp4',
        items: [
          { guaraní: 'Che akaru', español: 'Yo como', note: 'presente · oral' },
          { guaraní: 'Nde rekaru', español: 'Tú / vos comes', note: 'presente · oral' },
          { guaraní: "Ha'e okaru", español: 'Él / ella come', note: 'presente · oral' },
          { guaraní: 'Ñande jakaru', español: 'Nosotros/as comemos', note: 'presente · oral' },
          { guaraní: 'Ore rokaru', español: 'Nosotros/as comemos', note: 'presente · oral' },
          { guaraní: 'Peẽ pekaru', español: 'Ustedes comen', note: 'presente · oral' },
          { guaraní: "Ha'ekuéra okaru", español: 'Ellos / ellas comen', note: 'presente · oral' },
          { guaraní: "Che añe'ẽ", español: 'Yo hablo', note: 'presente · nasal' },
          { guaraní: "Nde reñe'ẽ", español: 'Tú / vos hablas', note: 'presente · nasal' },
          { guaraní: "Ha'e oñe'ẽ", español: 'Él / ella habla', note: 'presente · nasal' },
          { guaraní: "Ñande ñañe'ẽ", español: 'Nosotros/as hablamos', note: 'presente · nasal' },
          { guaraní: "Ore roñe'ẽ", español: 'Nosotros/as hablamos', note: 'presente · nasal' },
          { guaraní: "Peẽ peñe'ẽ", español: 'Ustedes hablan', note: 'presente · nasal' },
          { guaraní: "Ha'ekuéra oñe'ẽ", español: 'Ellos / ellas hablan', note: 'presente · nasal' },
          { guaraní: 'Che akarúkuri', español: 'Yo comí', note: 'pretérito · kuri' },
          { guaraní: 'Nde rekarúkuri', español: 'Tú comiste', note: 'pretérito · kuri' },
          { guaraní: "Ha'e okarúkuri", español: 'Él / ella comió', note: 'pretérito · kuri' },
          { guaraní: 'Ñande jakarúkuri', español: 'Nosotros/as comimos', note: 'pretérito · kuri' },
          { guaraní: 'Ore rokarúkuri', español: 'Nosotros/as comimos', note: 'pretérito · kuri' },
          { guaraní: 'Peẽ pekarúkuri', español: 'Ustedes comieron', note: 'pretérito · kuri' },
          { guaraní: "Ha'ekuéra okarúkuri", español: 'Ellos / ellas comieron', note: 'pretérito · kuri' },
          { guaraní: "Che akarúra'e", español: "Yo comí / resultó que comí", note: "pretérito · ra'e" },
          { guaraní: "Nde rekarúra'e", español: "Tú comiste / resultó que comiste", note: "pretérito · ra'e" },
          { guaraní: "Ha'e okarúra'e", español: "Él / ella comió / resultó que comió", note: "pretérito · ra'e" },
          { guaraní: "Ñande jakarúra'e", español: "Nosotros/as comimos / resultó que comimos", note: "pretérito · ra'e" },
          { guaraní: "Ore rokarúra'e", español: "Nosotros/as comimos / resultó que comimos", note: "pretérito · ra'e" },
          { guaraní: "Peẽ pekarúra'e", español: "Ustedes comieron / resultó que comieron", note: "pretérito · ra'e" },
          { guaraní: "Ha'ekuéra okarúra'e", español: "Ellos / ellas comieron / resultó que comieron", note: "pretérito · ra'e" },
        ],
      },
      {
        type: 'rules',
        title: 'Pretérito reciente',
        rules: [
          {
            title: 'kuri',
            body: 'Señala pasado reciente cuando quien habla fue testigo de la acción.',
          },
          {
            title: "ra'e",
            body: "Se usa cuando el emisor no fue testigo, no recuerda, o expresa sorpresa. Ej.: Okýra'e (había sido que llovió). ¡Rejúra'e! (¡había sido que viniste!).",
          },
        ],
      },
      {
        type: 'examples',
        title: 'Pretérito — Karu + kuri',
        items: [
          { guaraní: 'Che akarúkuri', español: 'Yo comí' },
          { guaraní: 'Nde rekarúkuri', español: 'Tú comiste' },
          { guaraní: "Ha'e okarúkuri", español: 'Él / ella comió' },
          { guaraní: 'Ñande jakarúkuri', español: 'Nosotros/as comimos (incl.)' },
          { guaraní: 'Ore rokarúkuri', español: 'Nosotros/as comimos (excl.)' },
          { guaraní: 'Peẽ pekarúkuri', español: 'Ustedes comieron' },
          { guaraní: "Ha'ekuéra okarúkuri", español: 'Ellos / ellas comieron' },
        ],
      },
      {
        type: 'examples',
        title: "Pretérito — Karu + ra'e",
        items: [
          { guaraní: "Che akarúra'e", español: 'Yo había sido / resultó que comí' },
          { guaraní: "Nde rekarúra'e", español: 'Tú había sido / resultó que comiste' },
          { guaraní: "Ha'e okarúra'e", español: 'Él / ella había sido / resultó que comió' },
          { guaraní: "Ñande jakarúra'e", español: 'Nosotros/as había sido / resultó que comimos' },
          { guaraní: "Ore rokarúra'e", español: 'Nosotros/as había sido / resultó que comimos' },
          { guaraní: "Peẽ pekarúra'e", español: 'Ustedes había sido / resultó que comieron' },
          { guaraní: "Ha'ekuéra okarúra'e", español: 'Ellos / ellas había sido / resultó que comieron' },
        ],
      },
      {
        type: 'text',
        title: "Ñe'ẽtéva — El verbo",
        body: [
          'Es la palabra que expresa acción, estado, proceso, etc. Abajo: lista de verbos areales para practicar.',
        ],
      },
      {
        type: 'vocab',
        title: 'Lista de verbos areales',
        audio: '/audio/verbos-areales.mp4',
        items: [
          { guaraní: "Ñe'ẽ", español: 'hablar' },
          { guaraní: 'Guata', español: 'caminar' },
          { guaraní: 'Ñemongeta / Ñomongeta', español: 'conversar' },
          { guaraní: 'Mboty', español: 'cerrar' },
          { guaraní: 'Karu', español: 'comer' },
          { guaraní: 'Ñani', español: 'correr' },
          { guaraní: 'Sẽ / Sê', español: 'salir' },
          { guaraní: "Mba'apo", español: 'trabajar' },
          { guaraní: 'Mopotĩ', español: 'limpiar' },
          { guaraní: 'Purahéi', español: 'cantar' },
          { guaraní: 'Henói', español: 'llamar' },
          { guaraní: "Ka'ay'u / Kay'u", español: 'tomar mate' },
          { guaraní: 'Po', español: 'saltar' },
          { guaraní: 'Hetũ', español: 'besar / oler' },
          { guaraní: 'Guereko / Reko', español: 'tener' },
          { guaraní: 'Guejy', español: 'bajar' },
          { guaraní: 'Moĩ', español: 'poner' },
          { guaraní: "Pu'ã", español: 'levantarse' },
          { guaraní: "Ñembo'y", español: 'pararse' },
          { guaraní: 'Ñeno', español: 'acostarse' },
          { guaraní: "Vy'a", español: 'alegrarse / divertirse' },
          { guaraní: 'Sapukái', español: 'gritar' },
          { guaraní: 'Japo', español: 'hacer' },
          { guaraní: 'Hecha', español: 'encontrar / hallar' },
          { guaraní: 'Jeroky', español: 'bailar' },
          { guaraní: 'Veve', español: 'volar' },
          { guaraní: 'Guapy', español: 'sentarse' },
          { guaraní: 'Pukavy', español: 'sonreír' },
          { guaraní: 'Puka', español: 'reír' },
          { guaraní: 'Jupi', español: 'subir' },
          { guaraní: 'Hayhu', español: 'amar / querer' },
          { guaraní: 'Ke', español: 'dormir' },
          { guaraní: 'Mbojy', español: 'cocinar' },
          { guaraní: "Ha'ã", español: 'jugar / practicar' },
          { guaraní: "Moñe'ẽ", español: 'leer' },
          { guaraní: 'Mbopu', español: 'hacer sonar' },
          { guaraní: 'Hai', español: 'escribir' },
          { guaraní: 'Rambosa', español: 'desayunar' },
          { guaraní: 'Páy', español: 'despertarse' },
          { guaraní: 'Poñy', español: 'gatear' },
          { guaraní: "Pytu'u", español: 'descansar' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Conjugá',
        prompt: 'Conjugá el verbo po en presente y ñani en pasado con kuri y ra’e.',
        items: [
          { prompt: 'po · che (presente)', answer: 'Che apo', hint: 'verbo oral' },
          { prompt: 'po · ñande (presente)', answer: 'Ñande japo', hint: 'oral → ja-' },
          { prompt: 'ñani · che + kuri', answer: 'Che añanikuri', hint: 'pasado reciente con testigo' },
          { prompt: "ñani · ha'e + ra'e", answer: "Ha'e oñanira'e", hint: 'sin ser testigo / sorpresa' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Traducí al español',
        prompt: 'Analizá y traducí estas oraciones.',
        items: [
          { prompt: 'Ñande japurahéi.', answer: 'Nosotros/as (incl.) cantamos.' },
          { prompt: "Jagua'i hũ osẽkuri.", answer: 'El perrito negro salió (recién / con testigo).' },
          { prompt: "Ha'ekuéra osapukái.", answer: 'Ellos / ellas gritan.' },
          {
            prompt: "Mokõi ryguasume pytã okéra'e.",
            answer: 'Dos gallinas rojas habían estado dormidas / resultó que dormían.',
          },
          { prompt: 'Ñambopu mbaraka.', answer: 'Tocamos (hacemos sonar) la guitarra.' },
          {
            prompt: "Kuehe asaje akaru ryguasurupi'a.",
            answer: 'Ayer al mediodía comí huevo de gallina.',
          },
          { prompt: "Romba'apo heta ko'árape.", answer: 'Trabajamos mucho hoy (nosotros excluyente).' },
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'clase-6',
    title: 'Clase 6',
    date: 'Lunes 05 de octubre de 2026',
    subtitle: 'Futuro, volitivo, conjunciones y terokuéra',
    summary:
      'Tiempo futuro con -ta, modo volitivo con -se, conjunciones (ha, térã, ỹrõ), resumen de tiempos verbales y vocabulario de sustantivos (terokuéra) con audio.',
    themes: ['Futuro', 'Volitivo', 'Conjunciones', 'Sustantivos'],
    sections: [
      {
        type: 'rules',
        title: 'Tiempo futuro',
        rules: [
          {
            title: 'Partícula -ta',
            body: 'Para el futuro se agrega la partícula sufija átona -ta al verbo conjugado. Fórmula: prefijo + verbo + ta.',
          },
        ],
      },
      {
        type: 'examples',
        title: 'Futuro — Karu (comer) · oral',
        items: [
          { guaraní: 'Che akarúta', español: 'Yo comeré' },
          { guaraní: 'Nde rekarúta', español: 'Tú / vos comerás' },
          { guaraní: "Ha'e okarúta", español: 'Él / ella comerá' },
          { guaraní: 'Ñande jakarúta', español: 'Nosotros/as comeremos (incluyente)' },
          { guaraní: 'Ore rokarúta', español: 'Nosotros/as comeremos (excluyente)' },
          { guaraní: 'Peẽ pekarúta', español: 'Ustedes comerán' },
          { guaraní: "Ha'ekuéra okarúta", español: 'Ellos / ellas comerán' },
        ],
      },
      {
        type: 'examples',
        title: "Futuro — Ñe'ẽ (hablar) · nasal",
        items: [
          { guaraní: "Añe'ẽta", español: 'Hablaré' },
          { guaraní: "Reñe'ẽta", español: 'Hablarás' },
          { guaraní: "Oñe'ẽta", español: 'Hablará' },
          { guaraní: "Ñañe'ẽta", español: 'Hablaremos (incluyente)' },
          { guaraní: "Roñe'ẽta", español: 'Hablaremos (excluyente)' },
          { guaraní: "Peñe'ẽta", español: 'Hablarán ustedes' },
          { guaraní: "Oñe'ẽta hikuái", español: 'Hablarán ellos' },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Tiempo futuro',
        audio: '/audio/tiempo-futuro.ogg',
        items: [
          { guaraní: 'Che akarúta', español: 'Yo comeré' },
          { guaraní: "Añe'ẽta", español: 'Hablaré' },
          { guaraní: 'Ñande jakarúta', español: 'Comeremos (incl.)' },
          { guaraní: "Ñañe'ẽta", español: 'Hablaremos (incl.)' },
        ],
      },
      {
        type: 'rules',
        title: 'Modo volitivo',
        rules: [
          {
            title: 'Partícula -se',
            body: 'Expresa el deseo de que se realice la acción. Lleva la partícula sufija tónica -se. Fórmula: prefijo + verbo + se.',
          },
          {
            title: 'Combinaciones',
            body: "Puede combinarse con tiempos: akaruse (quiero comer), akarusékuri / akaruséra'e (quise / había querido comer), akaruséta (querré comer).",
          },
        ],
      },
      {
        type: 'examples',
        title: 'Volitivo — Karu + se',
        items: [
          { guaraní: 'Che akaruse', español: 'Yo quiero comer' },
          { guaraní: 'Nde rekaruse', español: 'Tú quieres comer' },
          { guaraní: "Ha'e okaruse", español: 'Él / ella quiere comer' },
          { guaraní: 'Ñande jakaruse', español: 'Nosotros/as queremos comer (incl.)' },
          { guaraní: 'Ore rokaruse', español: 'Nosotros/as queremos comer (excl.)' },
          { guaraní: 'Peẽ pekaruse', español: 'Ustedes quieren comer' },
          { guaraní: "Ha'ekuéra okaruse", español: 'Ellos / ellas quieren comer' },
        ],
      },
      {
        type: 'rules',
        title: "Conjunción — Ñe'ẽjoajuha",
        rules: [
          {
            title: "Copulativa · ñe'ẽjoajuhaite · ha",
            body: 'Une palabras u oraciones. Equivale a “y” / “e” en castellano. Ej.: María ha che (María y yo). Che aguata ha añe\'ẽ (Yo camino y hablo).',
          },
          {
            title: 'Disyuntiva · oiporavóva · térã / ỹrõ / ỹramo',
            body: 'Expresan alternativas. Ej.: María térã che (María o yo).',
          },
        ],
      },
      {
        type: 'examples',
        title: 'Ejemplos de conjunciones',
        items: [
          { guaraní: 'María ha che', español: 'María y yo' },
          { guaraní: "Che aguata ha añe'ẽ", español: 'Yo camino y hablo' },
          { guaraní: "Ha'e ha Isabel", español: 'Él / ella e Isabel' },
          { guaraní: 'María térã che', español: 'María o yo' },
        ],
      },
      {
        type: 'rules',
        title: 'Resumen de tiempo verbal',
        rules: [
          {
            title: 'Prefijos',
            body: 'a · re · o · ja/ña · ro · pe · o',
          },
          {
            title: 'Presente',
            body: 'Prefijo + verbo. Ej.: akaru',
          },
          {
            title: 'Pretérito',
            body: "Prefijo + verbo + kuri / ra'e. Ej.: akarúkuri, akarúra'e",
          },
          {
            title: 'Futuro',
            body: 'Prefijo + verbo + ta. Ej.: akarúta',
          },
          {
            title: 'Volitivo',
            body: "Prefijo + verbo + se (+ kuri / ra'e / ta). Ej.: akaruse, akaruséta",
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Terokuéra — Sustantivos',
        audio: '/audio/tero-cuera-sustantivos.ogg',
        items: [
          { guaraní: 'Mbaraka', español: 'guitarra' },
          { guaraní: 'Tupa', español: 'cama' },
          { guaraní: 'Tata', español: 'fuego' },
          { guaraní: 'Tatakua', español: 'horno de barro / fogón' },
          { guaraní: 'Óga', español: 'casa' },
          { guaraní: "Mbo'ehao", español: 'escuela' },
          { guaraní: 'Tupão', español: 'iglesia' },
          { guaraní: 'Avati', español: 'maíz' },
          { guaraní: 'Ao', español: 'ropa' },
          { guaraní: 'Okẽ', español: 'puerta' },
          { guaraní: 'Typycha', español: 'escoba' },
          { guaraní: 'Avakachi', español: 'ananá / piña' },
          { guaraní: 'Pakova', español: 'banana' },
          { guaraní: 'Mbujape', español: 'pan' },
          { guaraní: "So'o", español: 'carne' },
          { guaraní: 'Kamby', español: 'leche' },
          { guaraní: "Ryguasurupi'a", español: 'huevo de gallina' },
          { guaraní: 'Kumanda', español: 'poroto / frijol' },
          { guaraní: 'Yva', español: 'fruta' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Analizá y traducí',
        prompt: 'Indicá el tiempo/modo cuando puedas y traducí al español.',
        items: [
          {
            prompt: "Ha'e ha che ropurahéi.",
            answer: 'Él/ella y yo cantamos. (presente, ore)',
          },
          {
            prompt: "Kururu hovyũ okaruse mymbachu'i.",
            answer: 'El sapo verde quiere comer insectos. (volitivo)',
          },
          {
            prompt: "Ha'ekuéra ojupíta ỹrõ oguejýta.",
            answer: 'Ellos subirán o bajarán. (futuro + disyuntiva)',
          },
          {
            prompt: "Jaguarete'ikuéra okarúkuri so'o.",
            answer: 'Los jaguaritos comieron carne. (pretérito kuri)',
          },
          {
            prompt: 'Kuehe ombopu hikuái mbaraka ha ajeroky heta.',
            answer: 'Ayer ellos tocaron la guitarra y yo bailé mucho.',
          },
          {
            prompt: "Jaguarete ha mborerotochu oñaniséra'e.",
            answer: 'El jaguar y el elefante habían querido correr / resultó que querían correr.',
          },
          {
            prompt: 'Juan, María ha che rovy\'a.',
            answer: 'Juan, María y yo nos alegramos. (ore)',
          },
          {
            prompt: "Liz, che ha nde ñamoñe'ẽ.",
            answer: 'Liz, yo y vos leemos. (ñande)',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    slug: 'clase-7',
    title: 'Clase 7',
    date: 'Lunes 12 de octubre de 2026',
    subtitle: "Teroja ohekome'ẽva — adjetivos calificativos",
    summary:
      'Adjetivos que describen al sustantivo. En guaraní el adjetivo va siempre después del nombre. Incluye pares de opuestos, ejemplos y audios de la clase asincrónica.',
    themes: ['Adjetivos', 'Cualidades', 'Orden'],
    sections: [
      {
        type: 'rules',
        title: "Teroja ohekome'ẽva — Adjetivos calificativos",
        rules: [
          {
            title: 'Qué son',
            body: 'Acompañan al sustantivo y dicen cómo es: una cualidad, una característica o un juicio de valor.',
          },
          {
            title: 'Orden en guaraní',
            body: 'El adjetivo va siempre después del sustantivo que califica. Ej.: jagua morotĩ (perro blanco), no “morotĩ jagua”.',
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Algunos adjetivos calificativos',
        audio: '/audio/adjetivos.mp4',
        items: [
          { guaraní: 'Porã', español: 'lindo/a' },
          { guaraní: 'Vai', español: 'feo/a' },
          { guaraní: 'Yvate', español: 'alto/a' },
          { guaraní: 'Karape', español: 'bajo/a' },
          { guaraní: 'Kyra', español: 'gordo/a' },
          { guaraní: 'Piru', español: 'flaco/a' },
          { guaraní: 'Arandu', español: 'sabio/a' },
          { guaraní: 'Tavy', español: 'tonto/a' },
          { guaraní: "Ate'ỹ", español: 'haragán / haragana' },
          { guaraní: "Kyre'ỹ", español: 'activo/a · animado/a' },
          { guaraní: 'Tuja', español: 'viejo/a' },
          { guaraní: 'Pyahu', español: 'joven / nuevo/a' },
          { guaraní: "Ky'a", español: 'sucio/a' },
          { guaraní: 'Potĩ', español: 'limpio/a' },
          { guaraní: 'Mbarete', español: 'fuerte' },
          { guaraní: 'Kangy', español: 'débil' },
          { guaraní: 'Tuicha', español: 'grande' },
          { guaraní: 'Michĩ', español: 'chico/a' },
          { guaraní: 'Mbegue', español: 'lento/a' },
          { guaraní: "Pya'e", español: 'rápido/a' },
          { guaraní: 'Puku', español: 'largo/a' },
          { guaraní: 'Mbyky', español: 'corto/a' },
        ],
      },
      {
        type: 'examples',
        title: 'Ejemplos',
        items: [
          { guaraní: 'Jagua morotĩ', español: 'Perro blanco' },
          { guaraní: 'Mbarakaja michĩ', español: 'Gato pequeño' },
          { guaraní: 'Kuña karape', español: 'Mujer petisa / baja' },
          { guaraní: 'Kure kyra', español: 'Cerdo gordo' },
          { guaraní: "Óga ky'a", español: 'Casa sucia' },
          { guaraní: 'Sapatu potĩ', español: 'Zapato limpio' },
          { guaraní: 'Jatyta mbegue', español: 'Caracol lento' },
          { guaraní: "Kuimba'e mbarete", español: 'Hombre fuerte' },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Ejemplos',
        audio: '/audio/adjetivos-ejemplos.mp4',
        items: [
          { guaraní: 'Jagua morotĩ', español: 'Perro blanco' },
          { guaraní: 'Mbarakaja michĩ', español: 'Gato pequeño' },
          { guaraní: 'Kuña karape', español: 'Mujer baja' },
          { guaraní: 'Kure kyra', español: 'Cerdo gordo' },
          { guaraní: "Óga ky'a", español: 'Casa sucia' },
          { guaraní: 'Sapatu potĩ', español: 'Zapato limpio' },
          { guaraní: 'Jatyta mbegue', español: 'Caracol lento' },
          { guaraní: "Kuimba'e mbarete", español: 'Hombre fuerte' },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Tres adjetivos por imagen',
        prompt:
          "Escribí tres adjetivos calificativos para cada sustantivo, unidos con ha. El adjetivo va después del nombre.",
        items: [
          {
            prompt: 'Jaguarete ____ , ____ ha ____',
            answer: 'Ej.: Jaguarete mbarete, porã ha pya\'e',
            hint: 'fuerte, lindo, rápido…',
          },
          {
            prompt: 'Mborerotochu ____ , ____ ha ____',
            answer: 'Ej.: Mborerotochu tuicha, kyra ha mbegue',
            hint: 'grande, gordo, lento…',
          },
          {
            prompt: 'Karumbe ____ , ____ ha ____',
            answer: 'Ej.: Karumbe mbegue, tuja ha michĩ',
            hint: 'lento, viejo, chico…',
          },
          {
            prompt: 'Tahýikuéra ____ , ____ ha ____',
            answer: "Ej.: Tahýikuéra michĩ, kyre'ỹ ha pya'e",
            hint: 'chicas, activas, rápidas…',
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Tarea — Dictado',
        audio: '/audio/adjetivos-tarea.mp4',
        items: [
          { guaraní: 'Escuchá el audio', español: 'Copiá las palabras y traducilas al español' },
        ],
      },
      {
        type: 'solved',
        title: 'Ejemplo resuelto — Trabajo de repaso',
        intro:
          'Así se resuelve el trabajo de repaso del curso. Cada ítem muestra la respuesta correcta.',
        groups: [
          {
            title: 'Características del guaraní',
            items: [
              {
                prompt: 'Marcá las respuestas correctas.',
                answer:
                  'Aglutinante y polisintético. Contiene palabras orales y nasales. Su acento natural es el agudo.',
                note: '“Su acento natural es grave” no corresponde: el acento natural es agudo.',
              },
            ],
          },
          {
            title: 'Sustantivos',
            items: [
              {
                prompt: 'Marcá el sustantivo de la imagen.',
                image: '/repaso/01-jagua.jpg',
                answer: 'Jagua',
                note: 'Perro. Tapiti es conejo y kure es cerdo.',
              },
              {
                prompt: 'Marcá el sustantivo de la imagen.',
                image: '/repaso/02-mbarakaja.jpg',
                answer: 'Mbarakaja',
                note: 'Gato. Mbói es víbora y mberu es mosca.',
              },
              {
                prompt: 'Marcá el sustantivo de la imagen.',
                image: '/repaso/03-karumbe.jpg',
                answer: 'Karumbe',
                note: 'Tortuga. Jatyta es caracol y kavara es cabra.',
              },
              {
                prompt: 'Marcá el sustantivo de la imagen.',
                image: '/repaso/04-yvyra.jpg',
                answer: 'Yvyra',
                note: 'Árbol. Yvytu es viento y yvy es tierra.',
              },
              {
                prompt: 'Marcá el sustantivo de la imagen.',
                image: '/repaso/05-kua.jpg',
                answer: 'Kuã',
                note: "Dedo. Kua es agujero y ku'a es cintura.",
              },
            ],
          },
          {
            title: 'Clasificación de palabras',
            items: [
              {
                prompt: 'Marcá los sustantivos nasales.',
                answer: "Mberu y Ñati'ũ",
                note: "Kure y kavaju son orales. Mberu es nasal por la m, y Ñati'ũ por la ũ.",
              },
              {
                prompt: 'Marcá los sustantivos orales.',
                answer: 'Óga',
                note: 'Panambi y ñakyrã son nasales. Lembu no es respuesta en esta consigna: la oral correcta es Óga.',
              },
            ],
          },
          {
            title: 'Pluralización',
            items: [
              {
                prompt: 'Marcá los que están pluralizados correctamente.',
                answer: 'Mainumbykuéra, Ñahatĩnguéra y Tupãokuéra',
                note: 'Vakanguéra no corresponde (vaka lleva kuéra: Vakakuéra). Tupão lleva kuéra porque la nasal no está en la sílaba final: Tupãokuéra.',
              },
            ],
          },
          {
            title: 'Colores',
            items: [
              {
                prompt: 'Marcá el color de la imagen.',
                image: '/repaso/06-hovy.jpg',
                answer: 'Hovy',
                note: 'Azul. Hũ es negro y hovyũ es verde.',
              },
              {
                prompt: 'Marcá el color de la imagen.',
                image: '/repaso/07-pyta.jpg',
                answer: 'Pytã',
                note: 'Rojo. Morotĩ es blanco y pytãngy es rosado.',
              },
              {
                prompt: 'Marcá el color de la imagen.',
                image: '/repaso/08-hu.jpg',
                answer: 'Hũ',
                note: "Negro. Sa'yju es amarillo y hũngy es gris.",
              },
            ],
          },
          {
            title: 'Verbos',
            items: [
              {
                prompt: 'Marcá el verbo de la imagen.',
                image: '/repaso/09-karu.jpg',
                answer: 'Karu',
                note: 'Comer. Ke es dormir y guata es caminar.',
              },
              {
                prompt: 'Marcá el verbo de la imagen.',
                image: '/repaso/10-purahei.jpg',
                answer: 'Purahéi',
                note: 'Cantar. Mbojy es cocinar y ñani es correr.',
              },
              {
                prompt: 'Marcá el verbo de la imagen.',
                image: '/repaso/11-mopoti.jpg',
                answer: 'Mopotĩ',
                note: 'Limpiar. Mbopu es hacer sonar y ñani es correr.',
              },
              {
                prompt: 'Marcá el verbo de la imagen.',
                image: '/repaso/12-jupi.jpg',
                answer: 'Jupi',
                note: "Subir. Ñe'ẽ es hablar y guejy es bajar.",
              },
              {
                prompt: 'Marcá el verbo de la imagen.',
                image: '/repaso/13-po.jpg',
                answer: 'Po',
                note: 'Saltar. Guapy es sentarse y poñy es gatear.',
              },
            ],
          },
          {
            title: 'Tiempos verbales',
            items: [
              {
                prompt: 'Marcá las oraciones que están en presente.',
                answer: "Juan okaru so'o. Juan okaruse so'o.",
                note: 'Okarúkuri es pasado con testigo, no presente. En este examen se marcan okaru y okaruse.',
              },
              {
                prompt: 'Marcá las oraciones que están en pasado.',
                answer: "Roberto oguatára'e. Kuehe Roberto oguata.",
                note: 'Oguatáta es futuro, no pasado.',
              },
              {
                prompt: '¿En qué oración el emisor fue testigo?',
                answer: "Ha'e ojupíkuri yvyráre.",
                note: "Kuri marca que quien habla lo vio. Ra'e es pasado sin haber sido testigo.",
              },
              {
                prompt: '¿Qué oración indica un deseo?',
                answer: "Che amba'aposéta ko'ẽrõ.",
                note: "-se marca el deseo y -ta el futuro. Amba'apóta es solo futuro: voy a trabajar.",
              },
              {
                prompt: '¿Cuál está escrita correctamente?',
                answer: "Ñande ñamoñe'ẽ.",
                note: "Moñe'ẽ es nasal, así que con ñande el prefijo es ña-, no ja-.",
              },
              {
                prompt: '¿En cuál el receptor no está incluido?',
                answer: 'Ore rojeroky pyhare.',
                note: 'Ore excluye a quien escucha. Ñande jajeroky lo incluye.',
              },
            ],
          },
          {
            title: 'Traducción',
            items: [
              {
                prompt: 'Dos perros comerán carne.',
                answer: "Mokõi jagua okarúta so'o.",
                note: 'Mokõi es dos y -ta es futuro. Mbohapy es tres y kuri es pasado.',
              },
              {
                prompt: 'Ellos toman mate a la mañana.',
                answer: "Ha'ekuéra oka'ay'u pyharevépe.",
                note: "Ha'ekuéra es ellos. Pyharevépe es a la mañana; asajépe es a la siesta.",
              },
              {
                prompt: 'El perrito flaco, amarillo y sucio duerme.',
                answer: "Jagua'i piru, sa'yju, ha ky'a oke.",
                note: "Perrito es jagua'i, con el diminutivo 'i. Piru es flaco, sa'yju es amarillo, ky'a es sucio y oke es duerme.",
              },
              {
                prompt: 'Marcá lo que se escucha en el audio.',
                answer: "Che ha nde ñamba'apóta heta ha upéi japytu'úta.",
                note: "Futuro con -ta. Mba'apo es nasal, así que che ha nde usa ña-. Descansar es pytu'u, con y.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    slug: 'clase-8',
    title: 'Clase 8',
    date: 'Lunes 19 de octubre de 2026',
    subtitle: 'Saludos, preguntas personales y familia',
    summary:
      "Saludos cortos y largos, despedidas, saludos según el momento del día, preguntas personales, adverbios de pregunta, posposiciones y vocabulario familiar (ñe'ẽndy ogaygua). Incluye las láminas y los audios de la clase presencial.",
    themes: ['Saludos', 'Preguntas', 'Posposiciones', 'Familia'],
    sections: [
      {
        type: 'figure',
        title: '¿Cómo saludamos?',
        image: '/clase8/como-saludamos.jpg',
        caption: 'Saludo corto y saludo un poco más largo. Reiko es para vos; peiko es para ustedes.',
        audio: '/audio/saludo-corto.mp4',
        body: [
          "Saludo corto: Mba'éichapa. — Iporã, ¿ha nde? — Iporã avei.",
          "Saludo un poco más largo: Mba'éichapa reiko. — Aiko porã, ¿ha nde? — Aiko porã avei.",
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Saludo un poco más largo',
        audio: '/audio/saludo-largo.mp4',
        items: [
          { guaraní: "Mba'éichapa reiko", español: '¿Cómo estás?' },
          { guaraní: 'Aiko porã', español: 'Estoy bien' },
          { guaraní: 'Iporã avei', español: 'Bien también' },
          { guaraní: 'Reiko', español: 'estás (vos)', note: 'singular' },
          { guaraní: 'Peiko', español: 'están (ustedes)', note: 'plural' },
        ],
      },
      {
        type: 'figure',
        title: '¿Cómo nos despedimos?',
        image: '/clase8/como-nos-despedimos.jpg',
        caption: 'Dos formas habituales de despedirse.',
        body: [
          'Jajoecháta: nos vemos.',
          'Jajohecha peve: hasta la próxima.',
        ],
      },
      {
        type: 'examples',
        title: 'Saludo con momentos del día',
        items: [
          {
            guaraní: "Mba'éichapa neko'ẽ. — Cheko'ẽ porã / vai.",
            español: '¿Cómo amaneciste? — Amanecí bien / mal.',
          },
          {
            guaraní: "Mba'éichapa ndepyhareve. — Chepyhare porã.",
            español: '¿Cómo está tu mañana? — Mi mañana está bien.',
          },
          {
            guaraní: "Mba'éichapa ndeasaje. — Cheasaje porã.",
            español: '¿Cómo está tu mediodía / siesta? — Mi siesta está bien.',
          },
          {
            guaraní: "Mba'éichapa ndeka'aru. — Cheka'aru vai.",
            español: '¿Cómo está tu tarde? — Mi tarde está mal.',
          },
          {
            guaraní: "Mba'éichapa ndepyhare. — Chepyhare porã.",
            español: '¿Cómo está tu noche? — Mi noche está bien.',
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Saludos según los momentos del día',
        audio: '/audio/saludos-momentos.mp4',
        items: [
          { guaraní: "Ko'ẽ", español: 'amanecer / madrugada' },
          { guaraní: 'Pyhareve', español: 'mañana' },
          { guaraní: 'Asaje', español: 'mediodía / siesta' },
          { guaraní: "Ka'aru", español: 'tarde' },
          { guaraní: 'Pyhare', español: 'noche' },
        ],
      },
      {
        type: 'examples',
        title: 'Preguntas personales',
        items: [
          {
            guaraní: "Mba'éichapa nderéra. — Cheréra Juan. / Che cheréra Juan.",
            español: '¿Cómo te llamas? — Me llamo Juan. / Yo me llamo Juan.',
          },
          {
            guaraní: "Mba'éichapa nde rerajoapy. — Che rerajoapy Giménez.",
            español: '¿Cómo es tu apellido? — Mi apellido es Giménez.',
          },
          {
            guaraní: "Moõguápiko nde. — Che Buenos Aires-gua. / Che ka'agusugua.",
            español: "¿De dónde sos? — Soy de Buenos Aires. / Soy de Ka'aguasu.",
          },
          {
            guaraní: 'Moõpa reiko. — Che aiko Tigre-pe. / Che aiko Tovatĩme.',
            español: '¿Dónde vivís? — Yo vivo en Tigre. / Yo vivo en Tovatĩ.',
          },
          {
            guaraní: 'Mboy arýpa rereko / reguereko. — Che areko 30 ary. / Che aguereko 30 ary.',
            español: '¿Cuántos años tienes? — Yo tengo 30 años. / Tengo 30 años.',
          },
          {
            guaraní: 'Mávandipa reiko. — Che aiko che sy ndive. / Che aiko che sýndi.',
            español: '¿Con quién vivís? — Yo vivo con mi madre.',
          },
        ],
      },
      {
        type: 'vocab',
        title: 'Audio — Preguntas y respuestas personales',
        audio: '/audio/preguntas-personales.mp4',
        items: [
          { guaraní: 'Téra', español: 'nombre' },
          { guaraní: 'Rerajoapy', español: 'apellido' },
          { guaraní: 'Moõgua', español: 'de dónde (origen)' },
          { guaraní: 'Aiko', español: 'vivo / estoy' },
          { guaraní: 'Ary', español: 'año' },
        ],
      },
      {
        type: 'rules',
        title: 'Adverbios de preguntas',
        rules: [
          { title: "Mba'e", body: 'Qué' },
          { title: "Mba'éicha", body: 'Cómo' },
          { title: 'Moõ', body: 'Dónde' },
          { title: 'Moõgui', body: 'De dónde (circunstancia)' },
          { title: 'Moõgua', body: 'De dónde (origen / pertenencia)' },
          { title: 'Mboy', body: 'Cuánto' },
          { title: 'Máva', body: 'Quién' },
        ],
      },
      {
        type: 'examples',
        title: "Ñe'ẽteja oporandúva — Con partículas sufijas",
        items: [
          { guaraní: "Mba'épa / mba'épiko", español: '¿Qué?' },
          { guaraní: "Mba'éichapa / mba'éichapiko", español: '¿Cómo?' },
          { guaraní: 'Moõpa / Moõpiko', español: '¿Dónde?' },
          { guaraní: 'Moõguipa / moõguipiko', español: '¿De dónde?' },
          { guaraní: 'Moõguápa / Moõguápiko', español: '¿De dónde? (origen)' },
          { guaraní: 'Mboýpa / mboýpiko', español: '¿Cuánto?' },
          { guaraní: 'Mávapa / Mávapiko', español: '¿Quién?' },
        ],
      },
      {
        type: 'text',
        title: 'Partículas de pregunta',
        body: [
          'Las partículas usadas para formular preguntas en guaraní son pa y piko (y los derivados de piko: pio, iko, tiko).',
          'Todas van unidas al vocablo y son átonas. Al usar estas partículas que indican pregunta, no usamos signo de interrogación.',
        ],
      },
      {
        type: 'rules',
        title: "Ñe'ẽriregua — Posposiciones",
        rules: [
          {
            title: 'Qué son',
            body: 'Son equivalentes a las preposiciones del español. Se llaman posposiciones porque van al final del término o frase que modifican.',
          },
          { title: 'Pe / me', body: 'En, a, al. Es átona. Ej.: Tigre-pe (en Tigre).' },
          {
            title: 'Ndive / ndivé / ndi / ndie',
            body: 'Con, en compañía de. Ej.: che sy ndive / che sýndi (con mi madre).',
          },
          { title: 'gui', body: 'De (de dónde, circunstancial). Es átona.' },
          { title: 'gua', body: 'De (origen o pertenencia). Es tónica. Ej.: Buenos Aires-gua.' },
          {
            title: 'icha',
            body: 'Comparación “como”. Es átona. Ej.: Chéicha oke. (Como yo duerme).',
          },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Datos personales',
        prompt: 'Contestá las preguntas con tus datos personales.',
        items: [
          {
            prompt: "Mba'éichapa nderéra.",
            answer: 'Ej.: Cheréra Ana. / Che cheréra Ana.',
            hint: 'nombre',
          },
          {
            prompt: "Mba'éichapa nde rerajoapy.",
            answer: 'Ej.: Che rerajoapy López.',
            hint: 'apellido',
          },
          {
            prompt: 'Moõguápiko nde.',
            answer: 'Ej.: Che Tigre-gua.',
            hint: 'origen con -gua',
          },
          {
            prompt: 'Moõpa reiko.',
            answer: 'Ej.: Che aiko Tigre-pe.',
            hint: 'lugar con -pe / -me',
          },
          {
            prompt: 'Mboy arýpa rereko / reguereko.',
            answer: 'Ej.: Che areko 25 ary.',
            hint: 'número + ary',
          },
          {
            prompt: 'Mávandipa reiko.',
            answer: 'Ej.: Che aiko che sy ndive.',
            hint: 'ndive / ndi',
          },
        ],
      },
      {
        type: 'figure',
        title: "Ñe'ẽndy ogaygua — Vocabulario familiar",
        image: '/clase8/neendy-ogaygua.jpg',
        caption:
          'Algunas palabras cambian según quien habla: el hombre, la mujer, o ambos.',
        audio: '/audio/vocabulario-familiar.mp4',
      },
      {
        type: 'pairs',
        title: 'Familia según quien habla',
        subtitle: "Kuimba'e he'i, kuña he'i, y lo que dicen ambos.",
        groups: [
          {
            label: "Kuimba'e he'i — El hombre dice",
            items: [
              { guaraní: 'Che rembireko', español: 'mi esposa' },
              { guaraní: 'Che rajy', español: 'mi hija' },
              { guaraní: "Che ra'y", español: 'mi hijo' },
              { guaraní: "Che ryke'y", español: 'mi hermano mayor' },
              { guaraní: 'Che ryvy', español: 'mi hermano menor' },
              { guaraní: 'Che reindy', español: 'mi hermana' },
              { guaraní: 'Che rembirekorã', español: 'mi novia' },
              { guaraní: 'Che rovaja', español: 'cuñado / cuñada' },
            ],
          },
          {
            label: "Kuña he'i — La mujer dice",
            items: [
              { guaraní: 'Che ména', español: 'mi esposo' },
              { guaraní: 'Che memby', español: 'mi hijo / hija' },
              { guaraní: 'Che membykuña', español: 'mi hija' },
              { guaraní: "Che membykuimba'e", español: 'mi hijo' },
              { guaraní: 'Che ryke', español: 'mi hermana mayor' },
              { guaraní: "Che kypy'y", español: 'mi hermana menor' },
              { guaraní: 'Che kyvy', español: 'mi hermano' },
              { guaraní: 'Che menarã', español: 'mi novio' },
              { guaraní: "Che uke'i", español: 'mi cuñada' },
              { guaraní: 'Che rovaja', español: 'cuñado' },
            ],
          },
          {
            label: "Kuña ha kuimba'e he'i — Ambos dicen",
            items: [
              { guaraní: 'Che ru', español: 'mi padre' },
              { guaraní: 'Che sy', español: 'mi madre' },
              { guaraní: 'Che ramói / che taita', español: 'mi abuelo' },
              { guaraní: 'Che jarýi', español: 'mi abuela' },
              { guaraní: 'Che remiarirõ', español: 'mi nieto / nieta' },
              { guaraní: 'Che kichiha', español: 'novio / novia' },
            ],
          },
        ],
      },
      {
        type: 'rules',
        title: "Kuña y kuimba'e con animales",
        rules: [
          {
            title: 'Kuña',
            body: 'Designa el sexo de personas (mujeres) y también el de muchos animales: kurekuña (chancha), jaguakuña (perra).',
          },
          {
            title: "Kuimba'e",
            body: "Solo se usa con personas varones. Para animales machos se usa el préstamo mácho: kure mácho (cerdo), jagua mácho (perro).",
          },
        ],
      },
      {
        type: 'exercise',
        title: 'Tembiaporã — Tarea',
        prompt: 'Traducí las oraciones al español.',
        items: [
          {
            prompt: 'Asajépe che ru ha che sy okarúta.',
            answer: 'Al mediodía / a la siesta mi padre y mi madre comerán.',
          },
          {
            prompt: 'Che membykuña okese chendive.',
            answer: 'Mi hija quiere dormir conmigo.',
          },
          {
            prompt: "Che ra'y ha che rajy ompotĩkuri óga.",
            answer: 'Mi hijo y mi hija limpiaron la casa.',
          },
          {
            prompt: 'Che, che memby ha che ména roguereko peteĩ jagua mácho.',
            answer: 'Yo, mi hijo/a y mi esposo tenemos un perro (macho).',
          },
          {
            prompt: 'Che rembirekorã ojogua sái hovy.',
            answer: 'Mi novia compra una pollera azul.',
          },
        ],
      },
    ],
  },
]

export function getClassBySlug(slug: string) {
  return classes.find((c) => c.slug === slug)
}

export function getLevelBySlug(slug: string) {
  return levels.find((level) => level.slug === slug)
}
