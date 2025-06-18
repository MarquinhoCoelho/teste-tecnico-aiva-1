import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'

const OverviewSection = ({ control, errors }: FormSectionBaseProps) => {
    return (
        <Card>
            <FormItem
                label="Nome"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input type="text" autoComplete="off" placeholder="Nome" {...field} />
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
                        <Input type="email" autoComplete="off" placeholder="Email" {...field} />
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
                        <Input type="password" autoComplete="off" placeholder="Senha" {...field} />
                    )}
                />
            </FormItem>
            <FormItem
                label="Avatar (URL da imagem)"
                invalid={Boolean(errors.img)}
                errorMessage={errors.img?.message}
            >
                <Controller
                    name="img"
                    control={control}
                    render={({ field }) => (
                        <Input type="text" autoComplete="off" placeholder="URL do Avatar" {...field} />
                    )}
                />
            </FormItem>
            <FormItem
                label="Função"
                invalid={Boolean(errors.role)}
                errorMessage={errors.role?.message}
            >
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={[
                                { value: 'customer', label: 'Cliente' },
                                { value: 'admin', label: 'Administrador' },
                            ]}
                            value={{ value: field.value, label: field.value === 'admin' ? 'Administrador' : 'Cliente' }}
                            onChange={option => field.onChange(option?.value)}
                            className="w-full"
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default OverviewSection
