// miembros/miembros.controller.js
// Traduce HTTP a llamadas al servicio. Express 5 envía los errores async al manejador.

import * as servicio from './miembros.service.js'

export async function listar(req, res) {
  res.json(await servicio.listar())
}
