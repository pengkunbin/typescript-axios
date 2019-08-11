import { AxiosInstance } from "./types";
import Axios from "./core/Axios";
import { extend } from "./helper/util";

function createInstance(): AxiosInstance {
    const context = new Axios()
    console.log('context:',context)
    const instance = Axios.prototype.request.bind(context)
    console.log('instance:',instance)
    //将Axios的实例 this指向和原型都绑定在一起
    extend(instance, context)

    return instance as AxiosInstance
}

const axios = createInstance()

export default axios