// config/db.js
// Abre UNA conexión a MongoDB al arrancar y la comparte con toda la aplicación.

import { MongoClient } from 'mongodb'
import { config } from './env.js'

const cliente = new MongoClient(config.mongoUri)
let bd = null

export async function conectar() {
  await cliente.connect()
  bd = cliente.db(config.nombreBd)
}

export function obtenerBd() {
  if (!bd) throw new Error('La base de datos no está conectada.')
  return bd
}// config/db.js
// Abre UNA conexión a MongoDB al arrancar y la comparte con toda la aplicación.
