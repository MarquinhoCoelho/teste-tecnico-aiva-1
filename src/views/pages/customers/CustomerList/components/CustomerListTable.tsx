import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useCustomerList from '../hooks/useCustomerList'
import { Link, useNavigate } from 'react-router'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil, TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Customer } from '../types'
import type { TableQueries } from '@/@types/common'
import Dialog from '@/components/ui/Dialog'

const roleColor: Record<string, string> = {
    customer: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    admin: 'bg-blue-200 dark:bg-blue-200 text-gray-900 dark:text-gray-900',
}

const NameColumn = ({ row }: { row: Customer }) => {
    return (
        <div className="flex items-center">
            <Avatar size={40} shape="circle" src={row.avatar} />
            <Link
                className={`hover:text-primary ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/pageView/customers/customer-details/${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const ActionColumn = ({
    onEdit,
    onViewDetail,
}: {
    onEdit: () => void
    onViewDetail: () => void
}) => {
    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="View">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onViewDetail}
                >
                    <TbEye />
                </div>
            </Tooltip>
        </div>
    )
}

const CustomerListTable = () => {
    const navigate = useNavigate()
    const [selectedCustomerDetail, setSelectedCustomerDetail] = useState<Customer | null>(null)

    const {
        customerList,
        customerListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
    } = useCustomerList()

    const handleEdit = (customer: Customer) => {
        navigate(`/pageView/customers/customer-edit/${customer.id}`)
    }

    const handleViewDetails = (customer: Customer) => {
        setSelectedCustomerDetail(customer)
    }

    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={roleColor[row.role]}>
                                <span className="capitalize">{row.role}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Created At',
                accessorKey: 'creationAt',
                cell: (props) => {
                    return new Date(props.row.original.creationAt).toLocaleDateString()
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        onEdit={() => handleEdit(props.row.original)}
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Customer) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Customer>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <>
            <DataTable
                selectable
                columns={columns}
                data={customerList}
                noData={!isLoading && customerList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: customerListTotal,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                checkboxChecked={(row) =>
                    selectedCustomer.some((selected) => selected.id === row.id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            <Dialog
                isOpen={!!selectedCustomerDetail}
                onClose={() => setSelectedCustomerDetail(null)}
                onRequestClose={() => setSelectedCustomerDetail(null)}
            >
                {selectedCustomerDetail && (
                    <div className="flex flex-col items-center gap-4 p-6 min-w-[320px]">
                        <Avatar size={80} shape="circle" src={selectedCustomerDetail.avatar} />
                        <div className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {selectedCustomerDetail.name}
                        </div>
                        <div className="w-full flex flex-col gap-2 text-gray-700 dark:text-gray-200">
                            <div className="flex justify-between border-b pb-1">
                                <span className="font-semibold">Email:</span>
                                <span>{selectedCustomerDetail.email}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                                <span className="font-semibold">Função:</span>
                                <span className="capitalize">{selectedCustomerDetail.role}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Criado em:</span>
                                <span>{new Date(selectedCustomerDetail.creationAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
}

export default CustomerListTable
