import { isPlainObject } from './util'

/**
 * Normalization; for example Content-Type
 * @param headers :any
 * @param normalizedName :string
 * @return {void}
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name]
            delete headers[name]
        }
    })
}

/**
 * If the caller does not configure Content-Type, we help him configure Content-Type
 * @param headers :any
 * @param data :any
 */
export function processHeaders(headers: any, data: any): any {
    normalizeHeaderName(headers, 'Content-Type')

    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers
}

/**
 * Parse the header string returned by the getAllResponseHeaders method into an object structure
 * @param headers 
 * @return {object}
 */
export function parseHeaders(headers: string): object {
    let parsed = Object.create(null)
    if (!headers) {
        return parsed
    }

    headers.split('\r\n').forEach(line => {
        let [key, val] = line.split(':')
        key = key.trim().toLowerCase()
        if (!key) {
            return
        }
        if (val) {
            val = val.trim()
        }
        parsed[key] = val
    })
    return parsed
}