import type { TableQueries } from '@/@types/common'

interface Customer {
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
    creationAt: string
    updatedAt: string
}

const getAuthHeaders = () => {
    const accessToken = sessionStorage.getItem('access_token')
    return {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        ...(accessToken ? { 'Authorization': accessToken } : {})
    }
}

export const apiGetCustomersList = async (params: TableQueries) => {
    const { limit = 10 } = params
    const response = await fetch(`https://api.escuelajs.co/api/v1/users?limit=${limit}`, {
        headers: getAuthHeaders()
    })
    if (!response.ok) {
        throw new Error('Failed to fetch customers')
    }
    return response.json() as Promise<Customer[]>
} 