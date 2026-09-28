export type ResourceFile = {
  title: string
  description: string
  fileName: string
  href: string
  sizeLabel: string
}

export const dictionaries: ResourceFile[] = [
  {
    title: "Diccionario Ñe'ẽryru Guaraní–Español",
    description: 'Diccionario bilingüe de referencia para consulta rápida durante las clases.',
    fileName: 'neryru-guarani-espanol.pdf',
    href: '/recursos/diccionarios/neryru-guarani-espanol.pdf',
    sizeLabel: '0,6 MB',
  },
  {
    title: "Diccionario Avañe'ẽ",
    description: 'Diccionario Guaraní–Español / Español–Guaraní para ampliar vocabulario.',
    fileName: 'avanee-guarani-espanol.pdf',
    href: '/recursos/diccionarios/avanee-guarani-espanol.pdf',
    sizeLabel: '11,2 MB',
  },
  {
    title: 'Diccionario de Celso Ávalos',
    description: 'Diccionario guaraní corregido por maurolugo, útil como material de apoyo.',
    fileName: 'celso-avalos-guarani.pdf',
    href: '/recursos/diccionarios/celso-avalos-guarani.pdf',
    sizeLabel: '4,4 MB',
  },
]

export const culturalTexts: ResourceFile[] = [
  {
    title: 'Ayvu Rapyta — León Cadogan (1959)',
    description: 'Textos míticos de los Mbyá-Guaraní del Guairá.',
    fileName: 'ayvu-rapyta-leon-cadogan-1959.pdf',
    href: '/recursos/textos/ayvu-rapyta-leon-cadogan-1959.pdf',
    sizeLabel: '52,6 MB',
  },
  {
    title: 'Guaraníes: su vida y sus mitos',
    description: 'Material cultural complementario del módulo para contextualizar la lengua.',
    fileName: 'guaranies-su-vida-y-sus-mitos.pdf',
    href: '/recursos/textos/guaranies-su-vida-y-sus-mitos.pdf',
    sizeLabel: '2 MB',
  },
]
