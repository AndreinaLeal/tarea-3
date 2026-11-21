// series/series.controller.js
// Traduce HTTP a llamadas al servicio. Express 5 envía los errores async al manejador.

import * as servicio from './series.service.js'

export async function listar(req, res) {
  res.json(await servicio.listar())
}

export async function obtener(req, res) {
  const serie = await servicio.obtener(req.params.id)
  res.json(serie)
}

export async function crear(req, res) {
  const serie = await servicio.crear(req.body)
  res.status(201).json(serie)
}

export async function cambiarEstado(req, res) {
  const serie = await servicio.cambiarEstado(req.params.id, req.body?.estado)
  res.json(serie)
}

export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id)
  res.status(204).end()
}
