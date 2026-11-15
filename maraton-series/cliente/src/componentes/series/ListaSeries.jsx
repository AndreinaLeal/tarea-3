// ListaSeries.jsx
// Dibuja una TarjetaSerie por cada serie recibida.

import TarjetaSerie from './TarjetaSerie.jsx'

function ListaSeries({ series, onAvanzar, onQuitar }) {
  if (series.length === 0) {
    return <p className="text-secondary mb-0">No hay series con esos filtros.</p>
  }

  return (
    <div className="row g-3">
      {series.map((serie) => (
        <TarjetaSerie key={serie._id} serie={serie} onAvanzar={onAvanzar} onQuitar={onQuitar} />
      ))}
    </div>
  )
}

export default ListaSeries
