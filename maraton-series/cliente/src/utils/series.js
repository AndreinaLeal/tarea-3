// utils/series.js
// Funciones pequeñas que no dependen de React.

import { ESTADOS } from '../data/series.js'

// Por ver → Viendo → Vista → Por ver
export function siguienteEstado(estado) {
  const posicion = ESTADOS.indexOf(estado)
  return ESTADOS[(posicion + 1) % ESTADOS.length]
}

// Clase de Bootstrap para la etiqueta de cada estado
export function claseEstado(estado) {
  if (estado === 'Vista') return 'text-bg-success'
  if (estado === 'Viendo') return 'text-bg-warning'
  return 'text-bg-secondary'
}
