import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './components/GeneralSection'
// import ImageSection from './components/ImageSection'
import AttributeSection from './components/AttributeSection'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmpty from 'lodash/isEmpty'
import type { ProductFormSchema } from './types'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { useNavigate } from 'react-router-dom'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useCategories } from '../ProductList/hooks/useCategories'

type ProductFormProps = {
    defaultValues?: Partial<ProductFormSchema> & { id?: number }
    newProduct?: boolean
    onSubmit: (data: ProductFormData) => void
} & CommonProps

const validationSchema = z.object({
    title: z.string().min(1, { message: 'Título do produto obrigatório!' }),
    price: z.number({ invalid_type_error: 'Preço obrigatório!' }),
    description: z.string().min(1, { message: 'Descrição do produto obrigatória!' }),
    categoryId: z.number({ invalid_type_error: 'Categoria obrigatória!' }),
    images: z.array(z.string()).min(1, { message: 'Pelo menos 1 imagem é obrigatória!' }),
})

type ProductFormData = z.infer<typeof validationSchema>

function generateSlug(title: string, unique: boolean = false) {
    let slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[^a-z0-9]+/g, '-') // troca não alfanuméricos por hífen
        .replace(/(^-|-$)+/g, ''); // remove hífens do início/fim
    if (unique) {
        slug += '-' + Math.random().toString(36).substring(2, 7);
    }
    return slug;
}

const ProductForm = (props: ProductFormProps) => {
    const navigate = useNavigate()
    const { categories, loading } = useCategories()
    const {
        defaultValues = {
            images: [],
            price: undefined,
        },
        children,
        onSubmit,
        newProduct,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
        watch,
    } = useForm<ProductFormData>({
        defaultValues: {
            ...defaultValues,
            price: Number(defaultValues.price) || 0,
            categoryId: Number(defaultValues.categoryId) || 1,
            images: defaultValues.images || [],
        },
        resolver: zodResolver(validationSchema),
    })

    const images = watch('images') || []

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset({
                ...defaultValues,
                price: Number(defaultValues.price) || 0,
                categoryId: Number(defaultValues.categoryId) || 1,
                images: defaultValues.images || [],
            })
        }
    }, [defaultValues, reset])

    const handleAddImageLink = (link: string) => {
        if (link) {
            setValue('images', [...images, link])
        } else {
            setValue('images', [])
        }
    }

    const onSubmitForm = async (data: ProductFormData) => {
        const payload = {
            title: data.title,
            price: Number(data.price),
            description: data.description,
            categoryId: Number(data.categoryId),
            images: data.images,
            slug: newProduct
                ? generateSlug(data.title, true)
                : (defaultValues?.slug || generateSlug(data.title))
        }

        try {
            let response;
            if (newProduct) {
                response = await fetch('https://api.escuelajs.co/api/v1/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
            } else {
                response = await fetch(`https://api.escuelajs.co/api/v1/products/${defaultValues.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })
            }

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Erro ao salvar produto')
            }

            await response.json()
            
            // Emitir um evento personalizado para notificar sobre a atualização
            window.dispatchEvent(new CustomEvent('product-updated'))
            
            toast.push(
                <Notification title="Success" type="success">
                    {newProduct ? 'Produto criado com sucesso!' : 'Produto atualizado com sucesso!'}
                </Notification>,
                { placement: 'top-center' }
            )
            navigate('/pageView/products/product-list')
        } catch (error) {
            console.error('Erro:', error)
            alert('Erro ao salvar produto. Tente novamente.')
        }
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            <Container>
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <GeneralSection 
                            control={control} 
                            errors={errors} 
                            categories={categories}
                            loading={loading}
                        />
                    </div>
                    <div className="lg:min-w-[440px] 2xl:w-[500px] gap-4 flex flex-col">
                    {/* <ImageSection control={control} errors={errors} /> */}
                        <AttributeSection
                            onAddImageLink={(images) => {
                                setValue('images', images)
                            }}
                            defaultImages={defaultValues?.images || []}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ProductForm
