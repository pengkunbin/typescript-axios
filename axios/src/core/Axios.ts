import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorsManager from './InterceptorManager'

interface Interceptors {
    request: InterceptorsManager<AxiosRequestConfig>
    response: InterceptorsManager<AxiosResponse>
}
interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFn
}


export default class Axios {
    defaults:AxiosRequestConfig
    interceptors: Interceptors

    constructor(initConfig:AxiosRequestConfig) {
        this.defaults = initConfig
        this.interceptors = {
            request: new InterceptorsManager<AxiosRequestConfig>(),
            response: new InterceptorsManager<AxiosResponse>()
        }
    }

    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }

        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        this.interceptors.request.forEach(interceptors => {
            chain.unshift(interceptors)
        })

        this.interceptors.response.forEach(interceptors => {
            chain.push(interceptors)
        })

        let promise = Promise.resolve(config)
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved,rejected)
        }
        return promise
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('delete', url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('head', url, config)
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('options', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('put', url, data, config)
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('patch', url, data, config)
    }

    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url
            })
        )
    }

    _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url,
                data
            })
        )
    }
}