import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import ProductListActionTools from './components/ProductListActionTools'
// import ProducListTableTools from './components/ProducListTableTools'
import ProductListTable from './components/ProductListTable'
import ProductListSelected from './components/ProductListSelected'
import { useEffect } from 'react'
import { useSWRConfig } from 'swr'

const ProductList = () => {
    const { mutate } = useSWRConfig()

    useEffect(() => {
        const handleProductUpdate = () => {
            mutate()
        }

        window.addEventListener('product-updated', handleProductUpdate)
        return () => {
            window.removeEventListener('product-updated', handleProductUpdate)
        }
    }, [mutate])

    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Produtos</h3>
                            <ProductListActionTools />
                        </div>
                        {/* <ProducListTableTools /> */}
                        <ProductListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <ProductListSelected />
        </>
    )
}

export default ProductList
