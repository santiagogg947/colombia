export default function SearchBar({ value, onChange, total, shown }) {
  return (
    <div className="search">
      <input
        type="search"
        placeholder="Buscar departamento… (ej. Antioquia)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filtrar departamentos"
      />
      <span className="search__count">
        {shown} de {total}
      </span>
    </div>
  )
}
