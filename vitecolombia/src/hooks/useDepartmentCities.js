import { useEffect, useState } from 'react'
import { getDepartmentCities } from '../services/colombiaApi'

const cache = new Map()
export function useDepartmentCities(departmentId, enabled) {
  const [cities, setCities] = useState(cache.get(departmentId) ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!enabled) return
    if (cache.has(departmentId)) {
      setCities(cache.get(departmentId))
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    getDepartmentCities(departmentId, { signal: controller.signal })
      .then((data) => {
        cache.set(departmentId, data)
        setCities(data)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [departmentId, enabled, attempt])

  return { cities, loading, error, retry: () => setAttempt((n) => n + 1) }
}
