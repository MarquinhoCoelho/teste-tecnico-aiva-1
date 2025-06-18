import ApiService from './ApiService'
import type { TableQueries } from '@/@types/common'

export async function apiGetProductList<T>(
    params: TableQueries & {
        title?: string
        categoryId?: number
        price_min?: number
        price_max?: number
    },
) {
    const { pageSize = 1, pageIndex = 0, ...filters } = params
    return ApiService.fetchDataWithAxios<T>({
        url: '/products',
        method: 'get',
        params: {
            limit: pageSize,
            offset: pageIndex * pageSize,
            ...filters,
        },
    })
}

export async function apiGetProduct<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/products/${id}`,
        method: 'get',
        params,
    })
}
