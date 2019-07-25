import { AxiosRequestConfig } from './types/index'
import xhr from './xhr';
import { buildURL } from './helper/url';
import { transformRequest } from './helper/data'
import { processHeaders } from './helper/header';

/**
 * main program
 * @param config 
 */
function axios(config: AxiosRequestConfig): void {
    processConfig(config)
    xhr(config)
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

export default axios
