import { AxiosInstance, AxiosRequestConfig } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helper/util";
import defaults from "./defaults";

function createInstance(config:AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config)

    const instance = Axios.prototype.request.bind(context)

    //将Axios的实例 this指向和原型都绑定在一起
    extend(instance, context)

    return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios