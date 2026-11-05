import { useState } from 'react'
import { useDepartmentCities } from '../hooks/useDepartmentCities'

const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('es-CO') : '—')

export default function DepartmentCard({ department }) {
  const [open, setOpen] = useState(false)
  const { cities, loading, error, retry } = useDepartmentCities(department.id, open)

  return (
    <article className={`card ${open ? 'card--open' : ''}`}>
      <button
        className="card__header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div>
          <h2>{department.name}</h2>
          <p className="card__sub">
            Capital: {department.cityCapital?.name ?? '—'}
          </p>
        </div>
        <span className="card__chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="card__body">
          {department.description && <p>{department.description}</p>}

          <ul className="stats">
            <li><strong>Población:</strong> {fmt(department.population)}</li>
            <li><strong>Superficie:</strong> {fmt(department.surface)} km²</li>
            <li><strong>Municipios:</strong> {fmt(department.municipalities)}</li>
            <li><strong>Prefijo tel.:</strong> {department.phonePrefix ?? '—'}</li>
          </ul>

          <h3>Ciudades</h3>
          {loading && <p className="status">Cargando ciudades…</p>}
          {error && (
            <p className="status status--error">
              {error} <button onClick={retry}>Reintentar</button>
            </p>
          )}
          {cities && cities.length === 0 && <p className="status">Sin ciudades registradas.</p>}
          {cities && cities.length > 0 && (
            <ul className="cities">
              {cities.map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  )
}
