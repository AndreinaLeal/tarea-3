// PaginaSeries.jsx
// La pagina "/series": pide las series y los miembros al API y reparte por props
// a la lista, los filtros y el resumen. Los filtros viven en la direccion (?estado=...&miembro=...).

import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ESTADOS } from '../data/series.js'
import { siguienteEstado } from '../utils/series.js'
import {
  obtenerSeries,
  obtenerMiembros,
  cambiarEstadoSerie,
  eliminarSerie,
} from '../api/seriesApi.js'
import Panel from '../componentes/comunes/Panel.jsx'
import ListaSeries from '../componentes/series/ListaSeries.jsx'
import Filtros from '../componentes/filtros/Filtros.jsx'
import Resumen from '../componentes/resumen/Resumen.jsx'

function PaginaSeries() {
  // -- Estado --
  const [series, setSeries] = useState([])
  const [miembros, setMiembros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // -- Filtros: salen de la direccion, no de un useState --
  const [parametros, setParametros] = useSearchParams()
  const filtroEstado = parametros.get('estado') ?? 'Todos'
  const filtroMiembro = parametros.get('miembro') ?? 'Todos'

  function cambiarFiltro(nombre, valor) {
    const nuevos = new URLSearchParams(parametros)
    if (valor === 'Todos') {
      nuevos.delete(nombre) // "Todos" es lo normal: no ensucia la direccion
    } else {
      nuevos.set(nombre, valor)
    }
    setParametros(nuevos)
  }

  // -- Al mostrarse la pagina: pedir los datos al API --
  useEffect(() => {
    async function cargar() {
      try {
        const [listaSeries, listaMiembros] = await Promise.all([
          obtenerSeries(),
          obtenerMiembros(),
        ])
        setSeries(listaSeries)
        setMiembros(listaMiembros)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])
  // [] = solo una vez, al montar

  // -- Estado derivado: se calcula cada vez que la pagina se dibuja --
  const visibles = series.filter(
    (serie) =>
      (filtroEstado === 'Todos' || serie.estado === filtroEstado) &&
      (filtroMiembro === 'Todos' || serie.miembro === filtroMiembro)
  )

  const conteos = ESTADOS.map((estado) => ({
    estado: estado,
    cantidad: series.filter((serie) => serie.estado === estado).length,
  }))

  // -- Cambios: primero el API, despues el estado --
  async function avanzar(id) {
    const actual = series.find((serie) => serie._id === id)
    try {
      const actualizada = await cambiarEstadoSerie(id, siguienteEstado(actual.estado))
      setSeries((actuales) =>
        actuales.map((serie) => (serie._id === id ? actualizada : serie))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  async function quitar(id) {
    try {
      await eliminarSerie(id)
      setSeries((actuales) => actuales.filter((serie) => serie._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando series…</p>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar"
            onClick={() => setError('')}
          ></button>
        </div>
      )}
      <div className="row g-4">
        <div className="col-lg-8">
          <Panel titulo="Filtros">
            <Filtros
              miembros={miembros}
              estado={filtroEstado}
              miembro={filtroMiembro}
              onCambiarEstado={(valor) => cambiarFiltro('estado', valor)}
              onCambiarMiembro={(valor) => cambiarFiltro('miembro', valor)}
            />
          </Panel>
          <Panel titulo={`Series del club (${visibles.length})`}>
            <ListaSeries series={visibles} onAvanzar={avanzar} onQuitar={quitar} />
          </Panel>
        </div>
        <div className="col-lg-4">
          <Panel titulo="Resumen">
            <Resumen conteos={conteos} />
          </Panel>
          <Link className="btn btn-primary w-100" to="/series/nueva">
            + Agregar una serie
          </Link>
        </div>
      </div>
    </>
  )
}

export default PaginaSeries