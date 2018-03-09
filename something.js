//对axios增加拦截器，统一处理异常，设置通用属性等
import axios from 'axios'
// 按需引入
import { Message } from 'element-ui'
let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截器即异常处理 统一处理错误
axios.interceptors.response.use(res => {
  //对响应数据做些事
  if (res.status === 200 && res.data.status === 1) {
    return res
  } else {
    let message = "系统错误";
    if (res.data.errMsgs && res.data.errMsgs.length > 0) {
      message = res.data.errMsgs[0];
    }
    Message.error(message)
    // console.error(res.data)
    return Promise.resolve(res)
  }
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = "连接到服务器失败"
  }
  Message.error(error.message)
  return Promise.resolve(error.response)
})

axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.timeout = 10000

//设置默认请求头
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// }

export default axios
