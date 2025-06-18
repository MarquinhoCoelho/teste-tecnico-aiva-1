export type Category = {
    id: number
    name: string
    slug: string
    image: string
    creationAt: string
    updatedAt: string
}

export type Product = {
    id: number
    title: string
    slug: string
    price: number
    description: string
    category: Category
    images: string[]
    creationAt: string
    updatedAt: string
}

export type Filter = {
    minAmount: number | string
    maxAmount: number | string
    productStatus: string
    productType: string[]
}

export type GetProductListResponse = Product[]
