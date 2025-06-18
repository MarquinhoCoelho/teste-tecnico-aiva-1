import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import CustomerForm from '../CustomerForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { useCustomerCreate } from '../CustomerList/hooks/userCustomerCreate'
import type { CustomerFormSchema } from '../CustomerForm'

const CustomerCreate = () => {
    const navigate = useNavigate()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const { createCustomer } = useCustomerCreate()

    const handleFormSubmit = async (values: CustomerFormSchema) => {
        try {
            setIsSubmiting(true)
            await createCustomer({
                name: values.name,
                email: values.email,
                password: values.password,
                avatar: values.img || 'https://api.lorem.space/image/avatar?w=150&h=150'
            })
            toast.push(
                <Notification type="success">Cliente criado com sucesso!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            toast.push(
                <Notification type="danger">{error instanceof Error ? error.message : 'Erro ao criar cliente'}</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Criação descartada!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/pageView/customers/customer-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CustomerForm
                defaultValues={{
                    name: '',
                    email: '',
                    img: '',
                    password: '',
                    role: 'customer',
                    tags: [],
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Descartar
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Criar
                            </Button>
                        </div>
                    </div>
                </Container>
            </CustomerForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Descartar alterações"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Tem certeza que deseja descartar? Esta ação não pode ser desfeita.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CustomerCreate
