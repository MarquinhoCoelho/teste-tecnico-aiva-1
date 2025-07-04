import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    name: string
    email: string
    dialCode?: string
    phoneNumber?: string
    img: string
}

export type AddressFields = {
    country?: string
    address?: string
    postcode?: string
    city?: string
}

export type ProfileImageFields = {
    img: string
}

export type TagsFields = {
    tags?: Array<{ value: string; label: string }>
}

export type AccountField = {
    banAccount?: boolean
    accountVerified?: boolean
}

export type CustomerFormSchema = OverviewFields &
    AddressFields &
    ProfileImageFields &
    TagsFields &
    AccountField & {
        password: string
        role: 'customer' | 'admin'
    }

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
