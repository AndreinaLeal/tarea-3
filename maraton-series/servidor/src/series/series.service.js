// series/series.service.js
// Reglas de negocio de las series. No sabe nada de HTTP ni de MongoDB.

import * as repositorio from './series.repository.js'
import * as miembrosRepositorio from '../miembros/miembros.repository.js'
import { validarSerie, validarEstado } from './series.validacion.js'
import { HttpError } from '../utils/HttpError.js'
import { revisarId } from '../utils/revisarId.js'

export function listar() {
  return repositorio.listar()
}

export async function obtener(id) {
  revisarId(id)
  const serie = await repositorio.buscarPorId(id)
  if (!serie) {
    throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
  }
  return serie
}

export async function crear(datos) {
  const errores = validarSerie(datos)
  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'DATOS_INVALIDOS', 'Hay datos inválidos.', errores)
  }

  const miembro = await miembrosRepositorio.buscarPorId(datos.miembroId)
  if (!miembro) {
    throw new HttpError(400, 'DATOS_INVALIDOS', 'Hay datos inválidos.', {
      miembroId: 'El miembro no existe.',
    })
  }

  return repositorio.crear({
    titulo: datos.titulo.trim(),
    genero: datos.genero,
    temporadas: Number(datos.temporadas),
    estado: datos.estado ?? 'Por ver',
    miembroId: datos.miembroId,
  })
}

export async function cambiarEstado(id, estado) {
  revisarId(id)
  const errores = validarEstado(estado)
  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'DATOS_INVALIDOS', 'Hay datos inválidos.', errores)
  }

  const encontradas = await repositorio.cambiarEstado(id, estado)
  if (encontradas === 0) {
    throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
  }
  return repositorio.buscarPorId(id)
}

export async function eliminar(id) {
  revisarId(id)
  const borradas = await repositorio.eliminar(id)
  if (borradas === 0) {
    throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
  }
}
