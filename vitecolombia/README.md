# Explora Colombia (React + Vite, vista única)

Tablero de una sola vista que consume [API Colombia](https://api-colombia.com/api/v1).
Permite filtrar departamentos en tiempo real.

Abre la URL que muestra Vite (normalmente http://localhost:5173).

## Decisiones técnicas

- **Vista única, sin router**: todo vive en `App.jsx`; el detalle se muestra en la misma pantalla con una Card expandible (sin navegación).
- **Estructura modular**:
  - `services/colombiaApi.js`: única capa que habla con la API; lanza error en respuestas HTTP no exitosas
  - `hooks/useDepartments.js`: carga la lista de departamentos 
  - `hooks/useDepartmentCities.js`: carga las ciudades 
  - `components/`: `SearchBar` y `DepartmentCard`, componentes pequeños y presentacionales.

## Capturas de evidencias en la carpeta captura
## Detalles especificos de cada municipio se saco de google 