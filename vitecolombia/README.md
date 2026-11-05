# Explora Colombia 🇨🇴 (React + Vite, vista única)

Tablero de una sola vista que consume [API Colombia](https://api-colombia.com/api/v1).
Permite filtrar departamentos en tiempo real y desplegar, dentro de una **Card expandible**,
su detalle completo (descripción, población, superficie, municipios y lista de ciudades).

## Instalación y ejecución local

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente http://localhost:5173).
Build de producción: `npm run build` y `npm run preview`.

## Decisiones técnicas

- **Vista única, sin router**: todo vive en `App.jsx`; el detalle se muestra en la misma pantalla con una Card expandible (sin navegación).
- **Estructura modular**:
  - `services/colombiaApi.js`: única capa que habla con la API; lanza error en respuestas HTTP no exitosas (`res.ok`).
  - `hooks/useDepartments.js`: carga la lista de departamentos (`useState` + `useEffect`) con estados `loading` / `error` y botón de reintento.
  - `hooks/useDepartmentCities.js`: carga las ciudades **solo cuando la card se abre** (lazy), con caché para no repetir peticiones.
  - `components/`: `SearchBar` y `DepartmentCard`, componentes pequeños y presentacionales.
- **Asincronía**: `fetch` con `async/await` / `.then/.catch`, y `AbortController` en el cleanup de `useEffect` para evitar actualizar estado de componentes desmontados o respuestas obsoletas.
- **Filtro reactivo**: el estado `query` se filtra con `useMemo` en cada pulsación, ignorando tildes y mayúsculas (“bolivar” encuentra “Bolívar”). No requiere nuevas peticiones.
- **UX de estados**: mensajes de carga, error con reintento y “sin resultados”.
- **Accesibilidad**: el encabezado de la card es un `<button>` con `aria-expanded`.

## Capturas

> Agrega aquí tus capturas (carpeta `screenshots/`):
>
> - `screenshots/lista.png` 
> - `screenshots/card-abierta.png` 
> - `screenshots/loading-error.png` 

## Endpoints usados

- `GET /api/v1/Department`
- `GET /api/v1/Department/{id}/cities`
