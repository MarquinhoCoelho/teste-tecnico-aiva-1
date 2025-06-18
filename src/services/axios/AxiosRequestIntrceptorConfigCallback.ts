import {
    REQUEST_HEADER_AUTH_KEY,
} from '@/constants/api.constant'
import type { InternalAxiosRequestConfig } from 'axios'

const publicEndpoints = [
    '/auth/login',
    '/sign-up',
    '/forgot-password',
    '/reset-password'
]

const AxiosRequestIntrceptorConfigCallback = (
    config: InternalAxiosRequestConfig,
) => {
    config.headers = config.headers || {}

    const isPublicEndpoint = publicEndpoints.some(endpoint => 
        config.url?.includes(endpoint)
    )

    if (!isPublicEndpoint) {
        const accessToken = sessionStorage.getItem('access_token')
        
        if (accessToken) {
            config.headers[REQUEST_HEADER_AUTH_KEY] = accessToken
            console.log('Adding token to request:', {
                url: config.url,
                headers: config.headers
            })
        } else {
            console.warn('No access token found for protected endpoint:', config.url)
        }
    }

    return config
}

export default AxiosRequestIntrceptorConfigCallback
