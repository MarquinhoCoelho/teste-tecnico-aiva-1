import { useEffect, useState } from 'react'

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  creationAt: string
  updatedAt: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.escuelajs.co/api/v1/categories?limit=10')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, error }
}