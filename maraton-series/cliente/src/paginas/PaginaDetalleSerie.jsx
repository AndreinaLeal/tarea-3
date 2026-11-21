// PaginaDetalleSerie.jsx
// La pagina "/series/:id": muestra una sola serie. El id sale de la direccion.

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerSerie } from '../api/seriesApi.js'
import { claseEstado } from '../utils/series.js'
import Panel from '../componentes/comunes/Panel.jsx'

function PaginaDetalleSerie() {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null) // { mensaje, estado } o null

  // Se ejecuta al montar y cada vez que cambia el id
  useEffect(() => {
    const controlador = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        setSerie(await obtenerSerie(id, controlador.signal))
      } catch (err) {
        if (err.name === 'AbortError') return // la cancelamos nosotros: no es un error
        setError({ mensaje: err.message, estado: err.estado })
      }
      setCargando(false)
    }
    cargar()

    // Limpieza: si el id cambia o se sale de la página, se cancela la petición pendiente
    return () => controlador.abort()
  }, [id])

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando serie…</p>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <div className="alert alert-danger">
          <h1 className="h5">
            {error.estado === 404 ? 'Serie no encontrada' : 'No se pudo cargar la serie'}
          </h1>
          <p className="mb-0">{error.mensaje}</p>
        </div>
        <Link className="btn btn-outline-primary" to="/series">
          ← Volver a las series
        </Link>
      </>
    )
  }

  return (
    <>
      <Panel titulo={serie.titulo}>
        <span className={'badge mb-3 ' + claseEstado(serie.estado)}>{serie.estado}</span>
        <dl className="row mb-0">
          <dt className="col-sm-3">Género</dt>
          <dd className="col-sm-9">{serie.genero}</dd>
          <dt className="col-sm-3">Temporadas</dt>
          <dd className="col-sm-9">{serie.temporadas}</dd>
          <dt className="col-sm-3">Propuesta por</dt>
          <dd className="col-sm-9">{serie.miembro}</dd>
          <dt className="col-sm-3">Id</dt>
          <dd className="col-sm-9 text-secondary">{serie._id}</dd>
        </dl>
      </Panel>
      <Link className="btn btn-outline-primary" to="/series">
        ← Volver a las series
      </Link>
    </>
  )
}

export default PaginaDetalleSerie