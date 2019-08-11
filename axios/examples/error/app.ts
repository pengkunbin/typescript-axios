import axios from '../../src/index'
import { AxiosError } from '../../src/helper/error';


axios({
  url: '/error/get1',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})

axios({
  url: '/error/get',
  method: 'get'
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})

setTimeout(() => {
  axios({
    url: '/error/get',
    method: 'get'
  }).then(res => {
    console.log(res)
  }).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
  })
}, 5000)


axios({
  url: '/error/timeout',
  method: 'get',
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})