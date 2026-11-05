const BASE_URL = 'https://api-colombia.com/api/v1'

async function request(path, { signal } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { signal })
  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: ${res.statusText || 'No se pudo completar la petición'}`)
  }
  return res.json()
}

export const getDepartments = (opts) => request('/Department', opts)
export const getDepartmentCities = (id, opts) => request(`/Department/${id}/cities`, opts)
