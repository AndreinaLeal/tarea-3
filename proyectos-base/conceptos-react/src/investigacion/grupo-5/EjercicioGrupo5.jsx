import { useState } from 'react'
import { productos } from '../data/productos'

function EjercicioGrupo5() {
  const [carrito, setCarrito] = useState([])

  const disponibles = productos.filter(producto => producto.disponible)

  function agregar(producto) {
    const nuevo = {
      id: Date.now(),
      nombre: producto.nombre,
      precio: producto.precio,
      entregado: false,
    }
    carrito.push(nuevo)
    setCarrito(carrito)  
  }

  function quitar(id) {
    setCarrito(carrito.filter(item => item.id !== id))
  }

  function alternarEntregado(id) {
    setCarrito(
      carrito.map(item =>
        item.id === id ? { ...item, entregado: !item.entregado } : item
      )
    )
  }

  return (
    <section>
      <h2>Carrito de la cafetería</h2>

      <h3>Productos disponibles</h3>
      {disponibles.map(producto => (
        <button
          key={producto.id}
          type="button"
          onClick={() => agregar(producto)}
        >
          Agregar {producto.nombre}
        </button>
      ))}

      <h3>Carrito</h3>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map(item => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.entregado ? 'line-through' : 'none',
                }}
              >
                {item.nombre} — ₡{item.precio}
              </span>{' '}
              <button type="button" onClick={() => quitar(item.id)}>
                Quitar
              </button>{' '}
              <button type="button" onClick={() => alternarEntregado(item.id)}>
                Entregado
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default EjercicioGrupo5