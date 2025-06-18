import { useNavigate } from 'react-router'

export function useProductDelete() {
  const navigate = useNavigate()

  const deleteProduct = async (id: number) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erro ao deletar produto')
    }
    navigate('/pageView/products/product-list')
  }

  return { deleteProduct }
}
