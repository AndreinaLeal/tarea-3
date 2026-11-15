// miembros/miembros.service.js
// Reglas de negocio de los miembros. No sabe nada de HTTP ni de MongoDB.

import * as repositorio from './miembros.repository.js'

export function listar() {
  return repositorio.listar()
}
