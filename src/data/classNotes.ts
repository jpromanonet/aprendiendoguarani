export type NoteGroup = {
  title: string
  items: string[]
}

export type ClassNotes = {
  classSlug: string
  title: string
  intro?: string
  groups: NoteGroup[]
}

/** Apuntes de clase (sin datos personales de las profesoras). */
export const classNotes: Record<string, ClassNotes> = {
  'clase-1': {
    classSlug: 'clase-1',
    title: 'Apuntes de clase',
    intro: 'Notas de la 1.ª clase (31/08/2026): marco del curso, metodología y primeras características del guaraní.',
    groups: [
      {
        title: 'Marco del curso',
        items: [
          'La cultura es cosmovisión, historia (aunque sea dura) e idioma.',
          'Aprender el idioma también abre la propia identidad: no solo se estudia lengua, también aparecen cosas que antes no se habían pensado.',
          'Hay 4 niveles de guaraní disponibles.',
          'El espacio lo hicieron el Municipio de Tigre y Punta Querandí.',
          'La lucha de Punta Querandí en Tigre dio lugar a este curso: las comunidades pidieron al municipio ayuda para no perder sus lenguas.',
          'El objetivo es que el idioma trascienda el aula y llegue al día a día.',
          'Expectativa: no es tan sencillo como parece; es un idioma tonal.',
        ],
      },
      {
        title: 'Metodología de trabajo',
        items: [
          'Grupo de WhatsApp cerrado.',
          'El material se manda solo por el grupo, al día siguiente de la clase: links de música, abecedario, tarea, etc.',
          'Classroom replica los mismos contenidos de la clase.',
          'Cuaderno personal: no exigen carpeta completa ni fotocopias.',
          'Lo más importante es el trabajo final.',
          'Se enseña guaraní paraguayo.',
        ],
      },
      {
        title: 'Objetivos de aprendizaje',
        items: [
          'Empezar hablando jopara, no necesariamente guaraní “puro”.',
          'Importa más hacerse entender que la pronunciación perfecta.',
          'La escritura del guaraní es relativamente nueva: mucha gente lo habla perfectamente y no lo lee.',
        ],
      },
      {
        title: 'Ventajas y mitos',
        items: [
          'Ventaja: quien tiene guaraníhablantes cerca tiene con quién practicar.',
          'Mito viejo: “quien hablaba guaraní no iba a hablar bien el español”. Hoy se sabe que es falso: el poliglotismo trae beneficios.',
        ],
      },
      {
        title: 'Contenido de la clase 1',
        items: [
          "Avañe'ẽ = guaraní.",
          "Pu'ae = vocales.",
          'Objetivo del día: enfocarse en las características del guaraní.',
          'Aglutinante y polisintético: las palabras se arman con raíces y partículas. Ej.: ñanduti (tejido de araña) ← ñandú (araña) + tî (acortamiento de morotî, blanco).',
          'Hay palabras orales y nasales.',
          'Es una lengua onomatopéyica.',
          'Acento natural agudo: la mayoría lleva el acento tónico en la última vocal.',
          'Usa posposiciones en vez de preposiciones (de ahí calcos como “le dijo / le llevo / le tomo” en el español paraguayo).',
          'No hay dos consonantes seguidas.',
          'Todas las palabras terminan en vocal (el plural no lleva -s: va kuéra / nguéra).',
          'Cada letra tiene un sonido propio.',
          'No hay artículo ni género gramatical.',
          'Ejemplo de patrón: Guata (caminar) cvvcv → Aguata (camino) vcvvcv → Aguatase.',
        ],
      },
    ],
  },

  'clase-2': {
    classSlug: 'clase-2',
    title: 'Apuntes de clase',
    intro: 'Notas de la 2.ª clase (07/09/2026): letras nasales, sonidos, puso y cómo reconocer oral / nasal.',
    groups: [
      {
        title: 'Letras nasales y clasificación',
        items: [
          'Las letras en rojo del material se consideran nasales.',
          'Si una palabra tiene una de esas letras, puede ser nasal u oral según el caso.',
          "Ejemplo de análisis: Avañe'ẽ — mirar la vocal final y el conjunto de la palabra.",
          '¿Cómo sé si es oral o nasal? Miro si tiene alguna letra marcada en rojo. Ej.: Kavaju es oral (sin letras rojas); Mykurẽ es nasal (tiene letras rojas / nasalidad).',
        ],
      },
      {
        title: 'Sonidos y nombres de letras',
        items: [
          'Los rioplatenses mezclamos a menudo los sonidos de C, S y Z.',
          'En el habla rioplatense suele decirse “posho” en lugar de “pollo”.',
          'M se llama me; MB es ummbe; N es ne; ND es umde; Ñ es ñe; R es re.',
          'RR aparece sobre todo en préstamos del español: carro, carreta, ferrocarril.',
          "El puso / apóstrofo (') es una letra: produce un pequeño corte o silencio entre vocales. Pu = sonido, so = corte. Nunca va entre otras combinaciones que no sean vocales.",
          'La Y forma parte de las vocales en guaraní.',
        ],
      },
      {
        title: "Pu'ae y nasalidad",
        items: [
          "Pu'ae: pu = sonido, ae = que suenan por sí solas.",
          'Seminasales: necesitan nariz y boca; pueden nasalizar toda la palabra. Con n sola suele ser nasal; nd también entra en ese juego nasal.',
          'Letras del alfabeto latino que no forman parte del guaraní: c, b, d, f, q, w, x, z.',
          'La C sola no aparece: se reemplaza por K.',
          'La B sola no aparece: vamos a ver MB o V.',
          'La D sola no aparece: sí ND.',
          'No pueden haber dos consonantes juntas.',
        ],
      },
      {
        title: 'Plural y partículas (adelanto)',
        items: [
          'kuéra / nguéra son pluralizaciones: kuéra con orales; nguéra con nasales (según cómo termina la palabra).',
          'Me es una partícula; también aparece ligada a ména / mé (marido).',
        ],
      },
      {
        title: 'Claves de la tarea de escritura',
        items: [
          'Forma correcta: Mitã (no “Mitãs”).',
          'Forma correcta: Avati (no Abati).',
          "Forma correcta: So'o (no Zo'o).",
          'Forma correcta: Kamby (no Camby).',
        ],
      },
    ],
  },

  'clase-3': {
    classSlug: 'clase-3',
    title: 'Apuntes de clase',
    intro: 'Notas de la 3.ª clase (14/09/2026): pronombres, colores y matices.',
    groups: [
      {
        title: 'Pronombres y terarãngue',
        items: [
          'Tera es nombre; rãngue funciona como “en vez de / en lugar de” en la formación del término.',
          '¿Por qué hay dos “nosotros”? Ñande incluye a quien escucha; Ore lo excluye (como cuando se habla del plan y a vos no te invitan).',
          'Conviene prestar más atención al grupo de WhatsApp: ahí llega el material.',
        ],
      },
      {
        title: 'Colores y matices',
        items: [
          'Hũ = negro.',
          'Hũngy atenúa: semi negro → gris. La partícula -ngy atenúa la cualidad.',
          'Pytã = rojo; pytãngy = rosado / medio rojo.',
          'Vera y mimbi hablan de brillo. Los Esteros del Iberá se asocian a agua brillante.',
          'Mimbi (brillante) no es lo mismo que mimby (flauta).',
          'El mimby-heta (también mimby hetá / mimby retá) es una flauta de pan tradicional de los mbyá guaraníes de Misiones y países vecinos.',
        ],
      },
      {
        title: 'Números',
        items: [
          'Po es 5: mano completa; también se asocia a la idea de “saltar” (de una mano a la otra al contar).',
        ],
      },
    ],
  },

  'clase-4': {
    classSlug: 'clase-4',
    title: 'Apuntes de clase',
    intro: 'Notas de la 4.ª clase (21/09/2026, 1.ª presencial): plural, diminutivo e insectos.',
    groups: [
      {
        title: 'Pluralización',
        items: [
          'Si el contexto ya dice que son varios, no hace falta kuéra. Ej.: mokõi tapiti (dos conejos), no tapitikuéra.',
          'La última letra / sílaba es la que condiciona kuéra o nguéra.',
          'Tupão → Tupãokuéra: tramposa, porque la nasal no está en la sílaba final.',
          'Ovetã → Ovetãnguéra: termina en ã nasal → nguéra.',
        ],
      },
      {
        title: 'Clave de la tarea de plural',
        items: [
          'Vaka → Vakakuéra',
          "Ñati'ũ → Ñati'ũnguéra",
          'Ñahatĩ → Ñahatĩnguéra',
          "Ju'i → Ju'ikuéra",
          'Mainumby → Mainumbykuéra',
          'Óga → Ógakuéra',
          'Tupão → Tupãokuéra',
          'Ovetã → Ovetãnguéra',
          'Yvoty → Yvotykuéra',
        ],
      },
      {
        title: 'Diminutivo',
        items: [
          "¿Se usa con nombres propios? Es poco común.",
          "Kuña'i (mujercita) no es lo mismo que kuñataĩ (señorita).",
          "Kuña'i puede sonar despectivo según el contexto; cuidado con el uso coloquial.",
          'Mitãkuña = nena.',
          "Orden: primero el diminutivo 'i y después la pluralización. El 'i no cambia la regla de kuéra / nguéra.",
          "Ej.: si corresponde nasal → …'inguéra (no forzar kuéra).",
          'El diminutivo apunta sobre todo al tamaño; cariño y edad tienen otras partículas.',
          "Mymbachu'i = insecto.",
        ],
      },
    ],
  },

  'clase-5': {
    classSlug: 'clase-5',
    title: 'Apuntes de clase',
    intro: 'Notas de la 5.ª clase (28/09/2026): conjugación, sujeto tácito, kuri y ra’e.',
    groups: [
      {
        title: 'Repaso previo',
        items: [
          'Repasar bien la diferencia entre Ñande y Ore.',
          'Karu funciona como “infinitivo” de referencia, pero para ser verbo en uso tiene que estar conjugado.',
          'Karu es oral; el prefijo de che es a-.',
          "Ñe'ẽ es nasal: el prefijo de ñande cambia de ja- a ña- para evitar cacofonía.",
        ],
      },
      {
        title: 'Sujeto tácito y prefijos',
        items: [
          'En español, sujeto tácito: “como” en lugar de “yo como”.',
          'En guaraní los prefijos de conjugación ya dicen el sujeto: la base se mantiene y la persona va adelante (al revés del español, que marca más con sufijos).',
          "Ha'ekuéra es Ha'e pluralizado.",
          'Se pueden reemplazar pronombres por nombres propios, como en español.',
          'No existe “usted”: se usa nde.',
          "Okaru hikuái = comen ellos, cuando se omite Ha'ekuéra. Hikuái aclara el plural porque Ha'e y Ha'ekuéra compartirían el mismo prefijo o-.",
          'Se puede decir Hikuái okaru u Okaru hikuái.',
          'Esto es la base del presente; con partículas se cambian modo y tiempo.',
        ],
      },
      {
        title: 'Pretérito reciente: kuri y ra’e',
        items: [
          'Kuri: quien cuenta fue testigo directo; lo vio y lo recuerda. No hay duda.',
          "Ra'e: quien cuenta no lo presenció o no lo recordaba, pero sabe que ocurrió (hay indicios). También marca sorpresa: “había sido que…” / no lo vi venir.",
          "Diferencias: kuri = testigo directo y recuerdo claro; ra'e = testigo indirecto / recuerdo que aparece ahora / sorpresa.",
          "Similitud: en ambos casos no hay duda de que el hecho ocurrió.",
          'Traducir “yo había sido que comí” al pie de la letra mezcla tiempos del español; mejor fijar el sentido guaraní (sorpresa / descubrimiento) sin calcar.',
          'Consejo de la clase: tratar de no traducir palabra por palabra; anclar los sentidos en guaraní.',
        ],
      },
      {
        title: 'Classroom',
        items: [
          'Classroom del curso: código de acceso ag37buei (si pide contraseña o código).',
        ],
      },
    ],
  },

  'clase-6': {
    classSlug: 'clase-6',
    title: 'Apuntes de clase',
    intro: 'Notas de la 6.ª clase (05/10/2026): verbos, futuro, volitivo, dudas de la tarea y pasos para hablar.',
    groups: [
      {
        title: 'Correcciones y dudas',
        items: [
          'Hecha = ver (no confundir con “hecha” del español): corregir en los apuntes si quedó mal.',
          "Repaso kuri / ra'e: ej. okarúra'e — había sido que comió / resultó que comió (sin duda, con matiz de descubrimiento).",
          "Verbo 'u: no se dice che a'u; en 1.ª persona va Che ha'u.",
          'Aparecen verbos areales / aireales: prestar atención a la lista y a cómo se conjugan.',
        ],
      },
      {
        title: 'Infinitivos de la tarea (imágenes)',
        items: [
          'guata — caminar',
          'ñani — correr',
          "mba'apo — trabajar",
          'mopoti — trapear / limpiar',
          "kay'u / ka'ay'u — tomar mate",
          'páy — despertarse / estirarse al despertar (según imagen)',
          'puka — reír',
          'jeroky — bailar',
          'poñy — gatear',
          "moñe'ẽ — leer",
          'jupi — subir',
          'hetũ — oler / besar',
          'veve — volar',
        ],
      },
      {
        title: 'Claves de las oraciones traducidas',
        items: [
          'Ñande japurahéi — Nosotros/as (incl.) cantamos.',
          "Jagua'i hũ osẽkuri — El perrito negro salió (kuri).",
          "Ha'ekuéra osapukái — Ellos/ellas gritan.",
          "Mokõi ryguasume pytã okéra'e — Dos gallos rojos: resultó / había sido que dormían.",
          'Ñambopu mbaraka — Tocamos la guitarra (ña- porque el verbo es nasal).',
          "Kuehe asaje akaru ryguasurupi'a — Ayer al mediodía comí huevo de gallina (el pasado lo marca kuehe asaje).",
          "Romba'apo heta ko'árape — Trabajamos mucho hoy (ore omitido).",
          "ko'árape: ko = demostrativo; árape = en el día.",
        ],
      },
      {
        title: 'Pasos para hablar guaraní',
        items: [
          '1) Dominar los prefijos de conjugación.',
          '2) Memorizar verbos.',
          '3) Sumar tiempos: pasado, presente, futuro.',
          '4) Hablar en jopara para ir incorporando.',
        ],
      },
      {
        title: 'Futuro y volitivo',
        items: [
          '-ta marca futuro en todos los verbos; cambian los prefijos según oral/nasal/etc.',
          "Con Ñe'ẽ hay sujetos tácitos; se agrega hikuái si se omite Ha'ekuéra.",
          'Hína: partícula de acción en curso (“está …ndo”) o de énfasis/inmediatez en jopara.',
          'Las partículas de tiempo son átonas; el modo (ej. -se) es tónico: aKARUse.',
          '-se = deseo / modo volitivo.',
          'Orden: primero modo y después tiempo cuando conviven (ej. deseo + futuro).',
        ],
      },
      {
        title: 'Más aclaraciones',
        items: [
          'En guaraní se puede priorizar el orden de las personas (“yo y vos”); no rige la regla del “burro por delante”.',
          "Mbo'e = enseñar; mbo'ehao = escuela (lugar donde se enseña). Tupão también habla de un lugar (iglesia).",
          'Avati = maíz (no “choclo” como traducción primera).',
          '¿Afirmación o pregunta se escriben igual? Las partículas pa / piko van en la pregunta; a menudo se omite el signo de interrogación.',
        ],
      },
    ],
  },

  'clase-7': {
    classSlug: 'clase-7',
    title: 'Apuntes de clase',
    intro: 'Notas del repaso de la clase asincrónica 7 (adjetivos) y del dictado.',
    groups: [
      {
        title: 'Adjetivo vs adverbio',
        items: [
          'Che sy oke porã — Mi madre duerme bien (porã modifica la acción → adverbio).',
          'Che sy porã oke — Mi madre linda duerme (porã califica a la madre → adjetivo).',
        ],
      },
      {
        title: 'Ejemplos de tres adjetivos',
        items: [
          "Jaguarete mbarete, pya'e ha tuicha / Jaguarete mbarete, pya'e ha porã.",
          'Mborerotochu kyra, mbegue ha tuicha / Mborerotochu tuicha, kyra ha mbarete / Mborerotochu yvate, mbarete ha tuicha.',
          'Karumbe mbegue, tuicha, tuja ha arandu / Karumbe mbyky, mbegue ha karape.',
          "Tahýikuéra: se pueden combinar arandu, michĩ, pya'e, kyre'ỹ, piru, hũ, pytã, mbarete…",
          'Los adjetivos calificativos no se pluralizan: el plural lo marca el sustantivo (kuéra / nguéra / número / heta).',
          "Plural de Mymbachu'i → Mymbachu'ikuéra.",
        ],
      },
      {
        title: 'Dictado (actividad 2)',
        items: [
          "Jagua'ikuéra hũ ojupise tupápe oke — Los perritos negros quieren subir a la cama a dormir.",
          "Ñande jakarúta pira ha ha'e okaruséta chicharro — Nosotros comeremos pescado y él/ella querrá comer chicharrón.",
          'Préstamos / adaptaciones escuchadas: chicharrón → chicharô; limón → limõ; león → leõ.',
        ],
      },
    ],
  },

  'clase-8': {
    classSlug: 'clase-8',
    title: 'Apuntes de clase',
    intro: 'Notas de posposiciones, saludos y familia (repasadas en clase 9).',
    groups: [
      {
        title: 'Posposiciones pe / me y compañía',
        items: [
          'pe y me evitan cacofonías: pe con orales; me según cómo termina la palabra (a menudo con nasales / entorno nasal).',
          'Ógape — en/a la casa (pe).',
          'Mitãme — al niño (me).',
          'Si la posposición tiene una sola sílaba, va pegada (ej. syndi). Si tiene más de una, va separada (ej. sy ndive).',
          'ndive / ndi / ndie / ndivé significan “con”; la forma elegida depende de las sílabas y del contacto con la palabra.',
        ],
      },
      {
        title: 'gua, pe con préstamos y saludos',
        items: [
          'gua va pegado a palabras guaraníes; con palabras en español se usa guión: Buenos Aires-gua vs Ka’aguasugua.',
          'gua es átono y puede desplazar el acento de la palabra (ej. Ka’aguasugua).',
          'Tigre-pe lleva guión porque Tigre es préstamo; Tovatĩme no, porque es palabra guaraní.',
          'reiko — estar / vivir / etc.',
          "ore roĩ porã — nosotros/as estamos bien.",
          '“Ivai la porte”: expresión de jopara muy informal (“está fea la situación”); no usarla con alguien que recién conocés.',
        ],
      },
      {
        title: 'Preguntas y familia',
        items: [
          'pa y piko, para quienes enseñan el curso, se usan como equivalentes en la práctica.',
          'rembireko — esposa; rembirekorã — futura esposa / prometida; rembirekokue — exesposa.',
        ],
      },
    ],
  },

  'clase-9': {
    classSlug: 'clase-9',
    title: 'Apuntes de clase',
    intro: 'Notas de la 9.ª clase (26/10/2026): cuerpo, triformes y correcciones de la sopa.',
    groups: [
      {
        title: 'Sustantivos triformes',
        items: [
          'Tague (pelo del cuerpo “sin dueño” en la forma de cita) / rague (con dueño) / hague (3.ª persona).',
          'Es un sustantivo triforme.',
          'De la lista del cuerpo, la gran mayoría son triformes; excepciones frecuentes: las que empiezan con T como Tĩ.',
          'Tuguy es la pronunciación/forma correcta para sangre (no confundir con tuvy).',
          'También hay biformes y cuatriformes en el idioma.',
          'Po = mano, cinco y “saltar” (de una mano a la otra al contar).',
        ],
      },
      {
        title: 'Correcciones útiles',
        items: [
          'En la lámina/sopa: juru = boca (no confundir con tãi = diente).',
          'La sopa reúne 21 hallazgos contando Akã / Akãrague.',
          'Mi padre = che ru.',
          'Tekorei / rekorei / hakorei: el mismo juego de formas, aunque sea adjetivo.',
        ],
      },
      {
        title: 'Puente con la clase 8',
        items: [
          'Mañana caminaré y correré con la criatura: aparece ndive / ndi… según sílabas.',
          'kuéra / nguéra y pe / me se deciden según cómo termina la palabra.',
        ],
      },
    ],
  },

  'clase-10': {
    classSlug: 'clase-10',
    title: 'Apuntes de clase',
    intro: 'Notas de la 10.ª clase (02/11/2026): práctica oral, posposiciones nuevas y oraciones.',
    groups: [
      {
        title: 'Ronda oral',
        items: [
          'Preguntas que circulan: ¿qué hiciste hoy? (presente/pasado reciente), ¿qué hiciste ayer?, ¿qué vas a hacer?, ¿cómo te llamás?, ¿cuántos años tenés?, ¿con quién vivís?',
          "Ejemplos escuchados: Che amba'apo…; Che amba'apo mbaraka ndive ha apurahéikuri.",
          'Mbaraka (guitarra) y mbarakaja (gato) se relacionan por la idea del ruido / sonido.',
          'Che réra… — me llamo…',
        ],
      },
      {
        title: 'Posposiciones y lugares',
        items: [
          'Para la comunidad guaraní la silla es muy importante: es de lo primero que se da a los niños (apyka = silla).',
          'Repaso de gua: con español → guión (Buenos Aires-gua); con guaraní → pegado (Ka’aguasugua).',
          'Aparecen guy, ári, gotyo, guive, peve / meve, rehe / re, rupi, hagua, etc.',
          'rehe / re y rupi significan “por”, pero cambia el cómo se usa.',
          'peve / meve se distinguen con la misma lógica que kuéra / nguéra (según nasalidad / terminación).',
          'Si la posposición tiene dos sílabas suele ir separada; hay formas ya lexicalizadas juntas (ej. guype).',
        ],
      },
      {
        title: 'Oraciones para analizar',
        items: [
          "Ha'e oguapy apyka ári che kupepe — Él/ella se sienta sobre la silla detrás de mí.",
          "Oguatakuri hikuái mbo'ehao gotyo — Ellos caminaron hacia la escuela.",
          "Amba'apo ko'ẽ guive pyhare peve — Trabajo desde la mañana hasta la noche (ajustar peve/meve según la palabra).",
          'El orden de los constituyentes es flexible: primero traducir palabra por palabra y después acomodar el sentido.',
          "Amoĩma / formas de “poner” aparecen en la práctica de la clase.",
        ],
      },
      {
        title: 'Vocabulario nuevo',
        items: [
          'mesa (préstamo) / formas de la clase para muebles de casa',
          'apyka — silla',
          "ña'ẽmbe — plato (según lista de la clase)",
          'La próxima clase es asincrónica.',
        ],
      },
    ],
  },
}

export function getClassNotes(classSlug: string) {
  return classNotes[classSlug] ?? null
}
