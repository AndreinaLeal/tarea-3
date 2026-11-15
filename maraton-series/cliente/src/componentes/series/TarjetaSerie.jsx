// TarjetaSerie.jsx
// Una tarjeta por serie: muestra sus datos y los botones para avanzar el estado o quitarla.
// No sabe nada del API: avisa hacia arriba con onAvanzar y onQuitar.

import { claseEstado, siguienteEstado } from '../../utils/series.js'

function TarjetaSerie({ serie, onAvanzar, onQuitar }) {
  return (
    <div className="col-md-6">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h3 className="h5 card-title mb-0">{serie.titulo}</h3>
            <span className={'badge ' + claseEstado(serie.estado)}>{serie.estado}</span>
          </div>
          <p className="card-text text-secondary mb-3">Miembro: {serie.miembro}</p>
          <div className="mt-auto d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => onAvanzar(serie._id)}
            >
              Pasar a {siguienteEstado(serie.estado)}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onQuitar(serie._id)}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarjetaSerie