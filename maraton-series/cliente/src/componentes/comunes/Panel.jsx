// Panel.jsx
// Una tarjeta con título que envuelve a otros componentes.

function Panel({ titulo, children }) {
  return (
    <section className="card mb-4">
      <div className="card-header fw-semibold">{titulo}</div>
      <div className="card-body">{children}</div>
    </section>
  )
}

export default Panel
