import { useNavigate } from 'react-router'

interface CustomerPayload {
    name: string
    email: string
    password: string
    avatar: string
}

const getAuthHeaders = () => {
    const accessToken = sessionStorage.getItem('access_token')
    return {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        ...(accessToken ? { 'Authorization': accessToken } : {})
    }
}

export function useCustomerUpdate() {
  const navigate = useNavigate()

  const updateCustomer = async (id: number, payload: CustomerPayload) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erro ao atualizar usuário')
    }
    navigate('/pageView/customers/customer-list')
  }

  return { updateCustomer }
}
