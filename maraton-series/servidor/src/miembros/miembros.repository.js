// miembros/miembros.repository.js
// ÚNICO lugar que habla con MongoDB para los miembros. No sabe nada de HTTP.

import { ObjectId } from 'mongodb'
import { obtenerBd } from '../config/db.js'

function coleccion() {
  return obtenerBd().collection('miembros')
}

export function listar() {
  return coleccion().find().sort({ nombre: 1 }).toArray()
}

export function buscarPorId(id) {
  return coleccion().findOne({ _id: new ObjectId(id) })
}