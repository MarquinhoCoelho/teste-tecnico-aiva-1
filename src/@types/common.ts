export interface TableQueries {
    pageIndex?: number
    pageSize?: number
    sort?: {
        key: string
        order: 'asc' | 'desc'
    }
    limit?: number
    offset?: number
} 