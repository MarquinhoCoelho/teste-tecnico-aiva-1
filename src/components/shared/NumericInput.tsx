import { NumericFormat, NumericFormatProps } from 'react-number-format'
import Input from '@/components/ui/Input'
import type { ReactNode, ComponentType } from 'react'
import type { InputProps } from '@/components/ui'

interface InputAffix {
    inputSuffix?: string | ReactNode
    inputPrefix?: string | ReactNode
}

interface NumberInputProps
    extends Omit<InputProps, 'prefix' | 'suffix'>,
        InputAffix {}

type NumericInputProps = NumberInputProps & Omit<NumericFormatProps, 'form'>;

const NumericInput = ({
    inputSuffix,
    inputPrefix,
    onChange,
    value,
    ...rest
}: NumericInputProps) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            value={value}
            thousandSeparator="."
            decimalSeparator=","
            prefix={inputPrefix}
            suffix={inputSuffix}
            allowNegative={false}
            onValueChange={(values) => {
                // values.value é sempre string, vazio se não digitou nada
                const cleaned = values.value.replace(/\./g, '').replace(',', '.');
                const numericValue = cleaned === '' ? null : Number(cleaned);
                if (onChange) {
                    onChange(numericValue);
                }
            }}
            {...rest}
        />
    );
};

export default NumericInput;
