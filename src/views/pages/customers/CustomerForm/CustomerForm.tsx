import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { CommonProps } from '@/@types/common'
import { useCustomerCreate } from '../CustomerList/hooks/userCustomerCreate'

const validationSchema = z.object({
    name: z.string().min(1, { message: 'Nome obrigatório' }),
    email: z.string().min(1, { message: 'Email obrigatório' }).email({ message: 'Email inválido' }),
    password: z.string().min(1, { message: 'Senha obrigatória' }),
    role: z.enum(['customer', 'admin']).default('customer'),
    img: z.string().url({ message: 'URL do avatar inválida' }),
})

type CustomerFormType = z.infer<typeof validationSchema>

type CustomerFormProps = {
    defaultValues?: Partial<CustomerFormType>
    children?: React.ReactNode
    onFormSubmit?: (values: CustomerFormType) => Promise<void>
} & CommonProps

const CustomerForm = (props: CustomerFormProps) => {
    const { defaultValues = {}, children } = props
    const { createCustomer } = useCustomerCreate()

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<CustomerFormType>({
        defaultValues,
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
    }, [JSON.stringify(defaultValues)])

    const onFormSubmit = async (values: CustomerFormType) => {
        if (props.onFormSubmit) {
            await props.onFormSubmit(values)
        } else {
            await createCustomer({
                email: values.email,
                name: values.name,
                password: values.password,
                role: values.role || 'customer',
                avatar: values.img,
            })
        }
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <OverviewSection control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default CustomerForm
