import { isPlainObject } from "./util";


/**
 * convert the send string to json format
 * @param  data:any
 * @return {data:any}
 */
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}