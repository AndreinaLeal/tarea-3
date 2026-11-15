// Filtros.jsx
// Dos listas desplegables: estado y miembro. No guarda nada: avisa al padre.

import { ESTADOS } from '../../data/series.js'

function Filtros({ miembros, estado, miembro, onCambiarEstado, onCambiarMiembro }) {
  return (
    <div className="row g-3">
      <div className="col-sm-6">
        <label className="form-label" htmlFor="filtro-estado">Estado</label>
        <select
          id="filtro-estado"
          className="form-select"
          value={estado}
          onChange={(e) => onCambiarEstado(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6">
        <label className="form-label" htmlFor="filtro-miembro">Propuesta por</label>
        <select
          id="filtro-miembro"
          className="form-select"
          value={miembro}
          onChange={(e) => onCambiarMiembro(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {miembros.map((m) => (
            <option key={m._id} value={m.nombre}>{m.nombre}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filtros
