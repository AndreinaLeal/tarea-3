// series/series.validacion.js
// Revisa los datos que llegan del cliente. Devuelve un mensaje por campo con problema.
// Si todo está bien, devuelve un objeto vacío: {}

export const ESTADOS = ['Por ver', 'Viendo', 'Vista']
export const GENEROS = ['Drama', 'Comedia', 'Ciencia ficción', 'Documental', 'Acción', 'Terror']

export function validarSerie(datos) {
  const d = datos ?? {}
  const errores = {}

  const titulo = typeof d.titulo === 'string' ? d.titulo.trim() : ''
  if (titulo.length < 1 || titulo.length > 100) {
    errores.titulo = 'El título es obligatorio (máximo 100 caracteres).'
  }

  if (!GENEROS.includes(d.genero)) {
    errores.genero = 'Elija un género de la lista.'
  }

  const temporadas = Number(d.temporadas)
  if (!Number.isInteger(temporadas) || temporadas < 1 || temporadas > 50) {
    errores.temporadas = 'Las temporadas deben ser un entero entre 1 y 50.'
  }

  if (d.estado !== undefined && !ESTADOS.includes(d.estado)) {
    errores.estado = 'El estado debe ser Por ver, Viendo o Vista.'
  }

  if (typeof d.miembroId !== 'string' || !/^[0-9a-fA-F]{24}$/.test(d.miembroId)) {
    errores.miembroId = 'Elija quién propone la serie.'
  }

  return errores
}

export function validarEstado(estado) {
  return ESTADOS.includes(estado)
    ? {}
    : { estado: 'El estado debe ser Por ver, Viendo o Vista.' }
}
