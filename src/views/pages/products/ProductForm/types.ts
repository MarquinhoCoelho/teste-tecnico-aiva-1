import type { Control, FieldErrors } from 'react-hook-form'

export type Product = {
    id: number
    title: string
    slug: string
    price: number
    description: string
    category: {
        id: number
        name: string
        slug: string
        image: string
        creationAt: string
        updatedAt: string
    }
    images: string[]
    creationAt: string
    updatedAt: string
}

export type GeneralFields = {
    name: string
    productCode: string
    description: string
}

export type PricingFields = {
    price: number | string
    taxRate: number | string
    costPerItem: number | string
    bulkDiscountPrice: number | string
}

export type ImageFields = {
    imgList: {
        id: string
        name: string
        img: string
    }[]
}

export type AttributeFields = {
    category: string
    tags?: { label: string; value: string }[]
    brand?: string
}

export interface ProductFormSchema {
    title: string
    price: number | string
    description: string
    categoryId: number | string
    images: string[]
}

export type FormSectionBaseProps = {
    control: Control<ProductFormSchema>
    errors: FieldErrors<ProductFormSchema>
}
