// PaginaNuevaSerie.jsx
// La pagina "/series/nueva": pide los miembros al API, muestra el formulario
// y, si el API acepta la serie, vuelve a la lista.

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { obtenerMiembros, crearSerie } from '../api/seriesApi.js'
import Panel from '../componentes/comunes/Panel.jsx'
import FormularioSerie from '../componentes/formulario/FormularioSerie.jsx'

function PaginaNuevaSerie() {
  const navigate = useNavigate()
  const [miembros, setMiembros] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargar() {
      try {
        setMiembros(await obtenerMiembros())
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  // Si el API rechaza los datos, crearSerie lanza el error y el formulario
  // lo muestra por campo. Solo si todo sale bien se llega al navigate.
  async function agregar(datos) {
    await crearSerie(datos)
    navigate('/series')
  }

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando miembros…</p>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <div className="alert alert-danger">{error}</div>
        <Link className="btn btn-outline-primary" to="/series">
          ← Volver a las series
        </Link>
      </>
    )
  }

  return (
    <>
      <Panel titulo="Proponer una serie">
        <FormularioSerie miembros={miembros} onAgregar={agregar} />
      </Panel>
      <Link className="btn btn-outline-primary" to="/series">
        ← Volver a las series
      </Link>
    </>
  )
}

export default PaginaNuevaSerie