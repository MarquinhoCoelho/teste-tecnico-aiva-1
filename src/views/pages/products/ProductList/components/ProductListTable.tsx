import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useProductList from '../hooks/useProductList'
import { useNavigate } from 'react-router'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { FiPackage } from 'react-icons/fi'
import { NumericFormat } from 'react-number-format'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Product } from '../types'
import type { TableQueries } from '@/@types/common'
import { useProductDelete } from '../hooks/useProductDelete'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const ProductColumn = ({ row }: { row: Product }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                shape="round"
                size={60}
                {...(row.images[0] ? { src: row.images[0] } : { icon: <FiPackage /> })}
            />
            <div>
                <div className="font-bold heading-text mb-1">{row.title}</div>
                <span>ID: {row.id}</span>
            </div>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onDelete,
}: {
    onEdit: () => void
    onDelete: () => void
}) => {
    return (
        <div className="flex items-center justify-end gap-3">
            <Tooltip title="Editar">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Excluir">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const ProductListTable = () => {
    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (product: Product) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(product.id.toString())
    }

    const handleEdit = (product: Product) => {
        navigate(`/pageView/products/product-edit/${product.id}`)
    }

    const { deleteProduct } = useProductDelete()

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(Number(toDeleteId))
            setSelectAllProduct([])
            mutate()
            setDeleteConfirmationOpen(false)
            setToDeleteId('')
        } catch (e) {
            const error = e as Error
            toast.push(
                <Notification type="danger">{error.message}</Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const {
        productList,
        productListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllProduct,
        setSelectedProduct,
        selectedProduct,
        mutate,
    } = useProductList()

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: 'Produto',
                accessorKey: 'title',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Categoria',
                accessorKey: 'category.name',
                cell: (props) => {
                    const { category } = props.row.original
                    return (
                        <span className="font-bold heading-text">
                            {category.name}
                        </span>
                    )
                },
            },
            {
                header: 'Preço',
                accessorKey: 'price',
                cell: (props) => {
                    const { price } = props.row.original
                    return (
                        <span className="font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="R$ "
                                displayType="text"
                                value={price}
                                decimalScale={2}
                                thousandSeparator="."
                                decimalSeparator=","
                            />
                        </span>
                    )
                },
            },
            {
                header: 'Descrição',
                accessorKey: 'description',
                cell: (props) => {
                    const { description } = props.row.original
                    return (
                        <Tooltip title={description}>
                            <span className="font-bold heading-text cursor-help">
                                {description.substring(0, 50)}...
                            </span>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Data de Criação',
                accessorKey: 'creationAt',
                cell: (props) => {
                    const { creationAt } = props.row.original
                    return (
                        <span className="font-bold heading-text">
                            {new Date(creationAt).toLocaleDateString('pt-BR')}
                        </span>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDelete(props.row.original)}
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedProduct.length > 0) {
            setSelectAllProduct([])
        }
    }

    const handlePaginationChange = (page: number) => {
        handleSetTableData({
            ...tableData,
            pageIndex: page - 1,
        })
    }

    const handleSelectChange = (value: number) => {
        handleSetTableData({
            ...tableData,
            pageSize: value,
            pageIndex: 0,
        })
    }

    const handleSort = (sort: OnSortParam) => {
        handleSetTableData({
            ...tableData,
            sort,
        })
    }

    const handleCheckBoxChange = (checked: boolean, row: Product) => {
        if (checked) {
            setSelectedProduct([...selectedProduct, row])
        } else {
            setSelectedProduct(selectedProduct.filter((item) => item.id !== row.id))
        }
    }

    const handleIndeterminateCheckBoxChange = (checked: boolean, rows: Row<Product>[]) => {
        if (checked) {
            setSelectAllProduct(rows.map((row) => row.original))
        } else {
            setSelectAllProduct([])
        }
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={productList}
                loading={isLoading}
                pagingData={{
                    total: productListTotal,
                    pageSize: tableData.pageSize || 10,
                    pageIndex: (tableData.pageIndex || 0) + 1,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleCheckBoxChange}
                onIndeterminateCheckBoxChange={handleIndeterminateCheckBoxChange}
                selectable
                checkboxChecked={(row) => selectedProduct.some((selected) => selected.id === row.id)}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                onClose={handleCancel}
                onConfirm={handleConfirmDelete}
                title="Excluir Produto"
            >
                <p>Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.</p>
            </ConfirmDialog>
        </>
    )
}

export default ProductListTable
