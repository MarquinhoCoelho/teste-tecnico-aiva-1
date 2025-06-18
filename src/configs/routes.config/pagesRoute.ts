import { lazy } from 'react'
import { pageView_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const pageViewRoute: Routes = [
    {
        key: 'pageView.customers.customerList',
        path: `${pageView_PREFIX_PATH}/customers/customer-list`,
        component: lazy(
            () => import('@/views/pages/customers/CustomerList/CustomerList'),
        ),
        authority: [ADMIN, USER],
    },
    {
        key: 'pageView.customers.customerEdit',
        path: `${pageView_PREFIX_PATH}/customers/customer-edit/:id`,
        component: lazy(
            () => import('@/views/pages/customers/CustomerEdit/CustomerEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Editar cliente',
                description:
                    'Gerencie os detalhes do cliente, histórico de compras e preferências.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'pageView.customers.customerCreate',
        path: `${pageView_PREFIX_PATH}/customers/customer-create`,
        component: lazy(
            () => import('@/views/pages/customers/CustomerCreate/CustomerCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Criar usuário',
                description:
                    'Gerencie os detalhes do cliente, rastreie as compras e atualize as preferências facilmente.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'pageView.products.productList',
        path: `${pageView_PREFIX_PATH}/products/product-list`,
        component: lazy(() => import('@/views/pages/products/ProductList/ProductList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'pageView.products.productEdit',
        path: `${pageView_PREFIX_PATH}/products/product-edit/:id`,
        component: lazy(() => import('@/views/pages/products/ProductEdit/index')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Editar produto',
                description:
                    'Quickly manage product details, stock, and availability.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'pageView.products.productCreate',
        path: `${pageView_PREFIX_PATH}/products/product-create`,
        component: lazy(
            () => import('@/views/pages/products/ProductCreate/ProductCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create product',
                description:
                    'Quickly add products to your inventory. Enter key details, manage stock, and set availability.',
                contained: true,
            },
            footer: false,
        },
    },
]

export default pageViewRoute
