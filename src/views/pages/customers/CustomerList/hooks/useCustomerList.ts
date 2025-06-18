import { apiGetCustomersList } from '@/services/CustomersService'
import useSWR from 'swr'
import { useCustomerListStore } from '../store/customerListStore'

interface Customer {
    id: number
    email: string
    password: string
    name: string
    role: string
    avatar: string
    creationAt: string
    updatedAt: string
}

export default function useCustomerList() {
    const {
        tableData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
        filterData,
    } = useCustomerListStore((state) => state)

    const limit = tableData.pageSize || 10

    const { data, error, isLoading, mutate } = useSWR<Customer[]>(
        ['/users', { limit }],
        ([, params]) => apiGetCustomersList(params),
        {
            revalidateOnFocus: false,
        },
    )

    const customerList = data || []
    const customerListTotal = customerList.length

    return {
        customerList,
        customerListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
    }
}
