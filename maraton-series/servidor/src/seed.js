// seed.js
// Carga miembros y series de ejemplo SOLO si las colecciones están vacías.
// Se ejecuta a mano: node --env-file=.env src/seed.js

import { conectar, obtenerBd } from './config/db.js'

await conectar()
const bd = obtenerBd()

if ((await bd.collection('miembros').countDocuments()) === 0) {
  await bd.collection('miembros').insertMany([
    { nombre: 'Ana',    correo: 'ana@correo.com',    generosFavoritos: ['Drama', 'Documental'], registro: new Date() },
    { nombre: 'Luis',   correo: 'luis@correo.com',   generosFavoritos: ['Comedia'], registro: new Date() },
    { nombre: 'María',  correo: 'maria@correo.com',  generosFavoritos: ['Ciencia ficción', 'Terror'], registro: new Date() },
    { nombre: 'Carlos', correo: 'carlos@correo.com', generosFavoritos: ['Acción', 'Drama'], registro: new Date() },
  ])
  console.log('Miembros insertados')
} else {
  console.log('Ya hay miembros: no se insertó nada')
}

if ((await bd.collection('series').countDocuments()) === 0) {
  const miembros = await bd.collection('miembros').find().toArray()
  const id = (nombre) => miembros.find((m) => m.nombre === nombre)._id

  await bd.collection('series').insertMany([
    { titulo: 'Breaking Bad',    genero: 'Drama',           temporadas: 5, estado: 'Vista',  miembroId: id('Ana') },
    { titulo: 'The Office',      genero: 'Comedia',         temporadas: 9, estado: 'Viendo', miembroId: id('Luis') },
    { titulo: 'Dark',            genero: 'Ciencia ficción', temporadas: 3, estado: 'Por ver', miembroId: id('María') },
    { titulo: 'Stranger Things', genero: 'Ciencia ficción', temporadas: 4, estado: 'Viendo', miembroId: id('Carlos') },
    { titulo: 'Chernobyl',       genero: 'Drama',           temporadas: 1, estado: 'Vista',  miembroId: id('Ana') },
    { titulo: 'Planeta Tierra',  genero: 'Documental',      temporadas: 2, estado: 'Por ver', miembroId: id('Luis') },
    { titulo: 'Wednesday',       genero: 'Comedia',         temporadas: 2, estado: 'Por ver', miembroId: id('María') },
    { titulo: 'The Last of Us',  genero: 'Drama',           temporadas: 2, estado: 'Viendo', miembroId: id('Carlos') },
  ])
  console.log('Series insertadas')
} else {
  console.log('Ya hay series: no se insertó nada')
}

process.exit(0)