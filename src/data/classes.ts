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

export const levels = [
  {
    id: 1,
    slug: 'nivel-1',
    title: 'Nivel 1',
    subtitle: "Fundamentos del Avañe'ẽ",
    description:
      'Introducción al alfabeto, vocabulario básico, pronombres, colores, números, pluralización y diminutivos.',
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
          { guaraní: 'Aguata', español: 'camino', detail: 'vcvvca' },
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
          { prompt: 'Ryguasume', answer: 'oral' },
          { prompt: "Ka'i", answer: 'oral' },
          { prompt: 'Yvytu', answer: 'oral' },
          { prompt: 'Kururu', answer: 'oral' },
          { prompt: 'Kure', answer: 'oral' },
          { prompt: 'Mbarakaja', answer: 'oral' },
          { prompt: "Ju'i", answer: 'oral' },
          { prompt: 'Jagua', answer: 'oral' },
          { prompt: 'Mborerotochu', answer: 'oral' },
          { prompt: 'Jaguarete', answer: 'oral' },
          { prompt: 'Mbói', answer: 'oral' },
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
            body: 'Si termina en vocal nasal (ã ẽ ĩ õ ũ ỹ) o en sílaba que contiene n / ñ, se usa nguéra. Siempre va unida al sustantivo.',
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
          { prompt: 'Tupão (iglesia)', answer: 'Tupãonguéra', hint: 'tiene nasal → nguéra' },
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
]

export function getClassBySlug(slug: string) {
  return classes.find((c) => c.slug === slug)
}

export function getLevelBySlug(slug: string) {
  return levels.find((level) => level.slug === slug)
}
