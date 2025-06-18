import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
// import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

interface SignUpFormProps {
    disableSubmit?: boolean
    setMessage?: (message: string) => void
    className?: string
}

type SignUpFormSchema = {
    userName: string
    password: string
    email: string
    confirmPassword: string
    avatar: string
}

const validationSchema = z
    .object({
        email: z.string({ required_error: 'Please enter your email' }),
        userName: z.string({ required_error: 'Please enter your name' }),
        password: z.string({ required_error: 'Password Required' }),
        confirmPassword: z.string({
            required_error: 'Confirm Password Required',
        }),
        avatar: z.string({ required_error: 'Please enter avatar URL' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password not match',
        path: ['confirmPassword'],
    })

const SignUpForm = (props: SignUpFormProps) => {
    const navigate = useNavigate()
    const { disableSubmit = false, className, setMessage } = props

    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    // const { signUp } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const onSignUp = async (values: SignUpFormSchema) => {
        const { userName, password, email, avatar } = values

        if (!disableSubmit) {
            setSubmitting(true)
            
            try {
                const payload = {
                    email,
                    name: userName,
                    password,
                    role: "admin",
                    avatar
                }

                const response = await fetch('https://api.escuelajs.co/api/v1/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    setMessage?.(errorData.message || 'Erro ao criar conta')
                } else {
                    navigate('/sign-in')
                }
            } catch {
                setMessage?.('Erro ao conectar com o servidor')
            }

            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignUp)}>
                <FormItem
                    label="Nome"
                    invalid={Boolean(errors.userName)}
                    errorMessage={errors.userName?.message}
                >
                    <Controller
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder="Nome"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Avatar URL"
                    invalid={Boolean(errors.avatar)}
                    errorMessage={errors.avatar?.message}
                >
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="url"
                                placeholder="URL da imagem do avatar"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Senha"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Senha"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Confirmar Senha"
                    invalid={Boolean(errors.confirmPassword)}
                    errorMessage={errors.confirmPassword?.message}
                >
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="password"
                                autoComplete="off"
                                placeholder="Confirmar Senha"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Criando Conta...' : 'Cadastrar'}
                </Button>
            </Form>
        </div>
    )
}

export default SignUpForm
