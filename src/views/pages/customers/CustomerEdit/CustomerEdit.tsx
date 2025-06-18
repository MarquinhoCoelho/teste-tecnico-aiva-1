import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import CustomerForm from '../CustomerForm'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams } from 'react-router'
import useSWR from 'swr'
import type { CustomerFormSchema } from '../CustomerForm'
import { useCustomerUpdate } from '../CustomerList/hooks/useCustomerUpdate'
import { useCustomerDelete } from '../CustomerList/hooks/userCustomerDelete'

const CustomerEdit = () => {
    const { id } = useParams()
    const { updateCustomer } = useCustomerUpdate()
    const { deleteCustomer } = useCustomerDelete()

    const { data, isLoading } = useSWR(
        id ? `https://api.escuelajs.co/api/v1/users/${id}` : null,
        (url) => fetch(url).then(res => res.json()),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const handleFormSubmit = async (values: CustomerFormSchema) => {
        if (!id) return
        await updateCustomer(Number(id), {
            email: values.email,
            name: values.name,
            password: values.password,
            role: values.role,
            avatar: values.img,
        })
        toast.push(
            <Notification type="success">Cliente atualizado com sucesso!</Notification>,
            { placement: 'top-center' },
        )
    }

    const getDefaultValues = () => {
        if (data) {
            return {
                name: data.name || '',
                email: data.email || '',
                img: data.avatar || '',
                password: data.password || '',
                role: data.role === 'admin' ? 'admin' : 'customer',
                tags: [],
            }
        }
        return {
            name: '',
            email: '',
            img: '',
            password: '',
            role: 'customer',
            tags: [],
        }
    }

    const handleConfirmDelete = async () => {
        if (!id) return
        try {
            await deleteCustomer(Number(id))
            toast.push(
                <Notification type="success">Cliente excluído com sucesso!</Notification>,
                { placement: 'top-center' },
            )
        } catch (e) {
            const error = e as Error
            toast.push(
                <Notification type="danger">{error.message}</Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">Nenhum usuário encontrado!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <CustomerForm
                        defaultValues={getDefaultValues() as CustomerFormSchema}
                        onFormSubmit={handleFormSubmit}
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
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </CustomerForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remover cliente"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Tem certeza que deseja remover este cliente? Esta ação não pode ser desfeita.
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default CustomerEdit
