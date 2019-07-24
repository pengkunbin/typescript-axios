import { AxiosRequestConfig } from './types/index'
import xhr from './xhr';
import { buildURL } from './helper/url';

/**
 * main program
 * @param AxiosRequestConfig 
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

export default axios
