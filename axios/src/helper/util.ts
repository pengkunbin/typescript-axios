export function isDate(val: any): val is Date {
    return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object'
}

/**
 * For FormData and ArrayBuffer types,isObject is also true,but we only need normal JSON object we defined.
 * @param val :any
 * @return {Object}
 */
export function isPlainObject(val: any): val is Object {
    return Object.prototype.toString.call(val) === '[object object]'
}