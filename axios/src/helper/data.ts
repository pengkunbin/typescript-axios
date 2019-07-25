import { isPlainObject } from "./util";


/**
 * convert the send json format to string
 * @param  data:any
 * @return {data:any}
 */
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data)
    }
    return data
}

/**
 * convert the response string to json format
 * @param data
 * @return {data:any} 
 */
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (e) {
        // do nothing
      }
    }
    return data
  }