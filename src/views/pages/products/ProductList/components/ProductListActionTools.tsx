import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useProductList from '../hooks/useProductList'
import { CSVLink } from 'react-csv'

const ProductListActionTools = () => {
    const navigate = useNavigate()

    const { productList } = useProductList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink filename="product-list.csv" data={productList}>
                <Button icon={<TbCloudDownload className="text-xl" />}>
                    Exportar Produtos em CSV
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => navigate('/pageView/products/product-create')}
            >
                Adicionar produto
            </Button>
        </div>
    )
}

export default ProductListActionTools
