import { useState } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import useProductList from '../hooks/useProductList'
import { TbFilter, TbMinus } from 'react-icons/tb'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormSchema = {
    minAmount: number | string
    maxAmount: number | string
}

const validationSchema = z.object({
    minAmount: z.union([z.string(), z.number()]),
    maxAmount: z.union([z.string(), z.number()]),
})

const ProductTableFilter = () => {
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const { setFilterData } = useProductList()

    const { handleSubmit, control, getValues } = useForm<FormSchema>({
        defaultValues: {
            minAmount: '',
            maxAmount: '',
        },
        resolver: zodResolver(validationSchema),
    })

    const onSubmit = (values: FormSchema) => {
        // Apenas armazena os valores localmente, sem enviar no payload
        setFilterData({
            price_min: values.minAmount,
            price_max: values.maxAmount,
        })
        setFilterIsOpen(false)
    }

    return (
        <>
            <Button icon={<TbFilter />} onClick={() => setFilterIsOpen(true)}>
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={filterIsOpen}
                onClose={() => setFilterIsOpen(false)}
                onRequestClose={() => setFilterIsOpen(false)}
            >
                <Form
                    className="h-full"
                    containerClassName="flex flex-col justify-between h-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <FormItem label="Product price">
                            <div className="flex items-center gap-2">
                                <Controller
                                    name="minAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericInput
                                            thousandSeparator
                                            type="text"
                                            inputPrefix="$"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            max={getValues('maxAmount')}
                                            isAllowed={(values) => {
                                                const { floatValue } = values
                                                return (
                                                    (floatValue || 0) <=
                                                    (getValues('maxAmount') as number)
                                                )
                                            }}
                                            onChange={(e) =>
                                                field.onChange(e.target.value)
                                            }
                                        />
                                    )}
                                />
                                <span>
                                    <TbMinus />
                                </span>
                                <Controller
                                    name="maxAmount"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericInput
                                            thousandSeparator
                                            type="text"
                                            inputPrefix="$"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormItem>
                    </div>
                    <Button variant="solid" type="submit">
                        Query
                    </Button>
                </Form>
            </Drawer>
        </>
    )
}

export default ProductTableFilter
