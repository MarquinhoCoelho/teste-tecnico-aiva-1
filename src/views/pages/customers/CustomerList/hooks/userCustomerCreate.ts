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

export function useCustomerCreate() {
  const navigate = useNavigate()

  const createCustomer = async (payload: CustomerPayload) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        
        if (errorData.name === 'QueryFailedError' && errorData.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          throw new Error('Já existe um usuário com este email')
        }
        
        throw new Error(errorData.message || 'Erro ao criar usuário')
      }
      
      navigate('/pageView/customers/customer-list')
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erro ao criar usuário')
    }
  }

  const editCustomer = async (id: number, payload: CustomerPayload) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        
        if (errorData.name === 'QueryFailedError' && errorData.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          throw new Error('Já existe um usuário com este email')
        }
        
        throw new Error(errorData.message || 'Erro ao editar usuário')
      }
      
      navigate('/pageView/customers/customer-list')
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erro ao editar usuário')
    }
  }

  return { createCustomer, editCustomer }
}
