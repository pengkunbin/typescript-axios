import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import xhr from './core/xhr';
import { buildURL } from './helper/url';
import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/header';

/**
 * main program
 * @param config 
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
    processConfig(config)
    return xhr(config).then((res) => {
        return transformResponseData(res)
    })
}

/**
 * Pretreatment of axios
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

/** 
 * analysis params
 * @param config
 * @return {string} 
*/
function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url, params)
}

/**
 * if data belongs to a normal object,convert the request data to json format
 * @param config 
 */
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data)
}

/**
 * Header Normalization 
 * @param config 
 */
function transformHeaders(config: AxiosRequestConfig) {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}


/**
 * convert the response string to json format
 * @param res 
 * @return {res}
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
    res.data = transformResponse(res.data)
    return res
}
export default axios
