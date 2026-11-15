// Resumen.jsx
// Cuántas series hay en cada estado.

import { claseEstado } from '../../utils/series.js'

function Resumen({ conteos }) {
  return (
    <ul className="list-group list-group-flush">
      {conteos.map((c) => (
        <li key={c.estado} className="list-group-item d-flex justify-content-between align-items-center">
          {c.estado}
          <span className={'badge rounded-pill ' + claseEstado(c.estado)}>{c.cantidad}</span>
        </li>
      ))}
    </ul>
  )
}

export default Resumen
