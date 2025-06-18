import { apiGetProductList } from '@/services/ProductService'
import useSWR from 'swr'
import { useProductListStore } from '../store/productListStore'

interface Product {
    id: string
    title: string
    price: number
    description: string
    category: {
        id: number
        name: string
    }
    images: string[]
    creationAt: string
}

const useProductList = () => {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedProduct,
        setSelectedProduct,
        setSelectAllProduct,
    } = useProductListStore((state) => state)

    const limit = tableData.pageSize || 10
    // const offset = (tableData.pageIndex || 0) * limit
    const offset = 0;

    const { data, error, isLoading, mutate } = useSWR<Product[]>(
        ['/products', { limit, offset }],
        ([, params]) => apiGetProductList(params),
        {
            revalidateOnFocus: false,
        },
    )

    const productList = data || []

    return {
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        productList,
        productListTotal: productList.length,
        setTableData,
        selectedProduct,
        setSelectedProduct,
        setSelectAllProduct,
        setFilterData,
    }
}

export default useProductList
