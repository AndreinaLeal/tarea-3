// series/series.repository.js
// ÚNICO lugar que habla con MongoDB para las series. No sabe nada de HTTP.

import { ObjectId } from 'mongodb'
import { obtenerBd } from '../config/db.js'

function coleccion() {
  return obtenerBd().collection('series')
}

// Agrega el campo "miembro" con el nombre de quien propuso la serie
const unirMiembro = [
  { $lookup: { from: 'miembros', localField: 'miembroId', foreignField: '_id', as: 'datosMiembro' } },
  { $addFields: { miembro: { $arrayElemAt: ['$datosMiembro.nombre', 0] } } },
  { $project: { datosMiembro: 0 } },
]

export function listar() {
  return coleccion().aggregate([...unirMiembro, { $sort: { titulo: 1 } }]).toArray()
}

export async function buscarPorId(id) {
  const resultado = await coleccion()
    .aggregate([{ $match: { _id: new ObjectId(id) } }, ...unirMiembro])
    .toArray()
  return resultado[0] ?? null
}

export async function crear(datos) {
  const resultado = await coleccion().insertOne({
    ...datos,
    miembroId: new ObjectId(datos.miembroId),
  })
  return buscarPorId(resultado.insertedId.toString())
}

export async function cambiarEstado(id, estado) {
  const resultado = await coleccion().updateOne(
    { _id: new ObjectId(id) },
    { $set: { estado } }
  )
  return resultado.matchedCount
}

export async function eliminar(id) {
  const resultado = await coleccion().deleteOne({ _id: new ObjectId(id) })
  return resultado.deletedCount
}