import { useState, useEffect } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import ProductForm from '../ProductForm'
import NoProductFound from '@/assets/svg/NoProductFound'
import { apiGetProduct } from '@/services/ProductService'
import sleep from '@/utils/sleep'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'
import type { Product, ProductFormSchema } from '../ProductForm/types'
import { useProductDelete } from '../ProductList/hooks/useProductDelete'

const ProducEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { deleteProduct } = useProductDelete()

    const { data, isLoading, mutate } = useSWR(
        [`/api/product/${id}`, { id: id as string }],
        ([_, params]) => apiGetProduct<Product, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    useEffect(() => {
        const handleProductUpdate = () => {
            mutate()
        }

        window.addEventListener('product-updated', handleProductUpdate)
        return () => {
            window.removeEventListener('product-updated', handleProductUpdate)
        }
    }, [mutate])

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const getDefaultValues = () => {
        if (data) {
            return {
                id: data.id,
                title: data.title || '',
                description: data.description || '',
                price: Number(data.price) || 0,
                images: data.images || [],
                categoryId: Number(data.category.id) || 1,
            }
        }
        return {
            title: '',
            description: '',
            price: 0,
            images: [],
            categoryId: 1,
        }
    }

    const handleFormSubmit = async (values: ProductFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        await sleep(800)
        setIsSubmiting(false)
        toast.push(<Notification type="success">Changes Saved!</Notification>, {
            placement: 'top-center',
        })
        navigate('/pageView/products/product-list')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        navigate('/pageView/products/product-list')
    }

    const handleConfirmDelete = async () => {
        if (!id) return
        try {
            await deleteProduct(Number(id))
            toast.push(
                <Notification type="success">Produto excluído com sucesso!</Notification>,
                { placement: 'top-center' },
            )
            navigate('/pageView/products/product-list')
        } catch (e) {
            const error = e as Error
            toast.push(
                <Notification type="danger">{error.message}</Notification>,
                { placement: 'top-center' },
            )
        }
        setDeleteConfirmationOpen(false)
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoProductFound height={280} width={280} />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <ProductForm
                        defaultValues={getDefaultValues()}
                        newProduct={!data}
                        onSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Voltar
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Excluir
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </ProductForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove product"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this product? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default ProducEdit
