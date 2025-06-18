import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'

import type { NavigationTree } from '@/@types/navigation'
import { pageView_PREFIX_PATH } from '@/constants/route.constant'
 
const pageViewNavigationConfig: NavigationTree[] = [
    {
        key: 'pageView',
        path: '',
        title: 'Páginas',
        translateKey: 'nav.pageView',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'pageView.customers',
                path: '',
                title: 'Usuários',
                translateKey: 'nav.pageViewCustomers.customers',
                icon: 'singleMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.pageViewCustomers.customersDesc',
                        label: 'Customer management',
                    },
                },
                subMenu: [
                    {
                        key: 'pageView.customers.customerList',
                        path: `${pageView_PREFIX_PATH}/customers/customer-list`,
                        title: 'Lista de usuários',
                        translateKey: 'nav.pageViewCustomers.customerList',
                        icon: 'customerList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.pageViewCustomers.customerListDesc',
                                label: 'List of all customers',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'pageView.customers.customerCreate',
                        path: `${pageView_PREFIX_PATH}/customers/customer-create`,
                        title: 'Criar usuário',
                        translateKey: 'nav.pageViewCustomers.customerCreate',
                        icon: 'customerCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.pageViewCustomers.customerCreateDesc',
                                label: 'Add a new customer',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'pageView.products',
                path: '',
                title: 'Produtos',
                translateKey: 'nav.pageViewProducts.products',
                icon: 'singleMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.pageViewProducts.productsDesc',
                        label: 'Product inventory management',
                    },
                },
                subMenu: [
                    {
                        key: 'pageView.products.productList',
                        path: `${pageView_PREFIX_PATH}/products/product-list`,
                        title: 'Lista de produtos',
                        translateKey: 'nav.pageViewProducts.productList',
                        icon: 'productList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.pageViewProducts.productListDesc',
                                label: 'All products listed',
                            },
                        },
                        subMenu: [],
                    },
                    // {
                    //     key: 'pageView.products.productEdit',
                    //     path: `${PAGE_VIEW_PREFIX_PATH}/products/product-edit/12`,
                    //     title: 'Product Edit',
                    //     translateKey: 'nav.pageViewProducts.productEdit',
                    //     icon: 'productEdit',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.pageViewProducts.productEditDesc',
                    //             label: 'Edit product details',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    {
                        key: 'pageView.products.productCreate',
                        path: `${pageView_PREFIX_PATH}/products/product-create`,
                        title: 'Criar produto',
                        translateKey: 'nav.pageViewProducts.productCreate',
                        icon: 'productCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.pageViewProducts.productCreateDesc',
                                label: 'Add new product',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default pageViewNavigationConfig
