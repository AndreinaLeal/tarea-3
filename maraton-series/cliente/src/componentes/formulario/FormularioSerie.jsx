// FormularioSerie.jsx
// Formulario para proponer una serie. Si el API rechaza los datos, muestra un mensaje por campo.

import { useState } from 'react'
import { GENEROS } from '../../data/series.js'

function FormularioSerie({ miembros, onAgregar }) {
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [temporadas, setTemporadas] = useState('')
  const [miembroId, setMiembroId] = useState('')
  const [errores, setErrores] = useState({})
  const [errorGeneral, setErrorGeneral] = useState('')

  async function enviar(evento) {
    evento.preventDefault()
    setErrores({})
    setErrorGeneral('')
    try {
      await onAgregar({ titulo, genero, temporadas: Number(temporadas), miembroId })
      setTitulo('')
      setGenero('')
      setTemporadas('')
      setMiembroId('')
    } catch (err) {
      if (err.detalles) {
        setErrores(err.detalles)
      } else {
        setErrorGeneral(err.message)
      }
    }
  }

  function claseInput(campo) {
    return 'form-control' + (errores[campo] ? ' is-invalid' : '')
  }

  function claseSelect(campo) {
    return 'form-select' + (errores[campo] ? ' is-invalid' : '')
  }

  return (
    <form onSubmit={enviar} noValidate>
      {errorGeneral && <div className="alert alert-danger">{errorGeneral}</div>}

      <div className="mb-3">
        <label className="form-label" htmlFor="titulo">Título</label>
        <input
          id="titulo"
          className={claseInput('titulo')}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <div className="invalid-feedback">{errores.titulo}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="genero">Género</label>
        <select
          id="genero"
          className={claseSelect('genero')}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Elija un género</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <div className="invalid-feedback">{errores.genero}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="temporadas">Temporadas</label>
        <input
          id="temporadas"
          type="number"
          className={claseInput('temporadas')}
          value={temporadas}
          onChange={(e) => setTemporadas(e.target.value)}
        />
        <div className="invalid-feedback">{errores.temporadas}</div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="miembro">Propuesta por</label>
        <select
          id="miembro"
          className={claseSelect('miembroId')}
          value={miembroId}
          onChange={(e) => setMiembroId(e.target.value)}
        >
          <option value="">Elija un miembro</option>
          {miembros.map((m) => (
            <option key={m._id} value={m._id}>{m.nombre}</option>
          ))}
        </select>
        <div className="invalid-feedback">{errores.miembroId}</div>
      </div>

      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  )
}

export default FormularioSerie
