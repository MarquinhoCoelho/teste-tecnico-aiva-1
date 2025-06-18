import { useNavigate } from 'react-router'

export function useCustomerDelete() {
  const navigate = useNavigate()

  const deleteCustomer = async (id: number) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erro ao deletar usuário')
    }
    navigate('/pageView/customers/customer-list')
  }

  return { deleteCustomer }
}
