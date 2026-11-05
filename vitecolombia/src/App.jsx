import { useMemo, useState } from 'react'
import { useDepartments } from './hooks/useDepartments'
import SearchBar from './components/SearchBar'
import DepartmentCard from './components/DepartmentCard'

const normalize = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export default function App() {
  const { departments, loading, error, retry } = useDepartments()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalize(query)
    return departments
      .filter((d) => normalize(d.name).includes(q))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }, [departments, query])

  return (
    <main className="container">
      <header>
        <h1>Explora Colombia 🇨🇴</h1>
        <p>Filtra departamentos y despliega sus ciudades y datos clave.</p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        total={departments.length}
        shown={filtered.length}
      />

      {loading && <p className="status">Cargando departamentos…</p>}
      {error && (
        <p className="status status--error">
          {error} <button onClick={retry}>Reintentar</button>
        </p>
      )}
      {!loading && !error && filtered.length === 0 && (
        <p className="status">No hay resultados para “{query}”.</p>
      )}

      <section className="grid">
        {filtered.map((d) => (
          <DepartmentCard key={d.id} department={d} />
        ))}
      </section>
    </main>
  )
}
