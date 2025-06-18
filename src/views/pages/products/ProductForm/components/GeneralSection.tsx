import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
import NumericInput from '@/components/shared/NumericInput'
import { Tooltip } from '@/components/ui/Tooltip'
import { HiInformationCircle } from 'react-icons/hi'
import Select from '@/components/ui/Select'
import Spinner from '@/components/ui/Spinner'
import type { Category } from '../../ProductList/hooks/useCategories'

interface CategoryOption {
    value: string
    label: string
}

interface GeneralSectionProps extends FormSectionBaseProps {
    categories: Category[]
    loading: boolean
}

const GeneralSection = ({ control, errors, categories, loading }: GeneralSectionProps) => {
    return (
        <Card className="p-6">
            <FormItem
                label={
                    <div className="flex items-center gap-2">
                        Título do Produto
                        <Tooltip title="Digite um título claro e descritivo para o seu produto">
                            <HiInformationCircle className="w-5 h-5 text-gray-400" />
                        </Tooltip>
                    </div>
                }
                invalid={Boolean(errors.title)}
                errorMessage={errors.title?.message}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="Ex: Smartphone XYZ 128GB"
                            className="w-full"
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label={
                    <div className="flex items-center gap-2">
                        Categoria
                        <Tooltip title="Selecione a categoria do produto">
                            <HiInformationCircle className="w-5 h-5 text-gray-400" />
                        </Tooltip>
                    </div>
                }
                invalid={Boolean(errors.categoryId)}
                errorMessage={errors.categoryId?.message}
            >
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        loading ? (
                            <div className="flex items-center justify-center p-4">
                                <Spinner size={24} />
                            </div>
                        ) : (
                            <Select<CategoryOption>
                                {...field}
                                value={categories.find(cat => String(cat.id) === String(field.value)) ? {
                                    value: String(field.value),
                                    label: categories.find(cat => String(cat.id) === String(field.value))?.name || ''
                                } : null}
                                options={categories.map(category => ({
                                    value: String(category.id),
                                    label: category.name
                                }))}
                                placeholder="Selecione uma categoria"
                                className="w-full"
                                onChange={option => field.onChange(option ? Number(option.value) : undefined)}
                            />
                        )
                    )}
                />
            </FormItem>
            <FormItem
                label={
                    <div className="flex items-center gap-2">
                        Preço
                        <Tooltip title="Digite o preço do produto em reais (R$)">
                            <HiInformationCircle className="w-5 h-5 text-gray-400" />
                        </Tooltip>
                    </div>
                }
                invalid={Boolean(errors.price)}
                errorMessage={errors.price?.message}
            >
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <NumericInput
                            inputPrefix="R$"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label={
                    <div className="flex items-center gap-2">
                        Descrição
                        <Tooltip title="Descreva detalhadamente as características e benefícios do seu produto">
                            <HiInformationCircle className="w-5 h-5 text-gray-400" />
                        </Tooltip>
                    </div>
                }
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor
                            content={field.value}
                            invalid={Boolean(errors.description)}
                            onChange={({ html }) => field.onChange(html)}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default GeneralSection
