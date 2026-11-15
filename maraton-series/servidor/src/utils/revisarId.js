// utils/revisarId.js
// Comprueba que un texto tenga el formato de un ObjectId antes de usarlo.

import { HttpError } from './HttpError.js'

export function revisarId(id) {
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    throw new HttpError(400, 'ID_INVALIDO', 'El identificador no es válido.')
  }
}
