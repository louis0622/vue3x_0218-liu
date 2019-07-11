// 一个能发送ajax请求的函数
// 1.统一处理请求异常
// 2.异步请求成功的数据不是response，而是response.data I
// 3.对post请求参数进行ulencode处理，而不使用默认的json方式（后台接）


import axios from 'axios'
import store  from '../vuex/store';
const qs = require('qs');
import router from '../router'
import {Toast} from 'mint-ui'



//请求超时
axios.defaults.timeout = 15000

//创建一个请求拦截器interceptors
axios.interceptors.request.use(function (config) {
    //config里取出method请求方式，请求的数据data
    const {method,data} = config
    //如果是post请求，进行处理
    if (method.toLowerCase()==='post' && data && typeof data === 'object') {
        //将json数据变成urlencoded的字符串
        config.data = qs.stringify(data)
      }
//token处理
  // 如果请求配置标识了需要携带token
  const { needToken } = config.headers
  if (needToken) {
    // 取出state中的token
    const token = store.state.user.token
    // 如果token有值, 添加授权的头, 值为token
    if (token) {
      config.headers.Authorization = token
    } else {
      // 抛出异常, 直接进行错误处理流程(不发请求)
      const error = new Error('没有token, 不用发请求')
      error.status = 401 // 添加一个标识
        throw error
    }
  }

    return config;
  });
  

//创建一个响应拦截器interceptors
axios.interceptors.response.use(function (response) {
    return response.data;
  },error => {
    // 发请求前的异常
  if (!error.response) {
    if (error.status===401) { // 发需要授权的请求前发现没有token(没有登陆)
      // 如果当前没在登陆界面
      if (router.currentRoute.path !== '/login') {
        router.replace('/login')
        Toast(error.message)
      } else {
        console.log('没有token, 请求前取消的请求, 已在login, 不需要跳转')
      }
    }
  // 发请求后的异常
  } else {
    const status = error.response.status
    const msg = error.message
    if (status === 401) { // 授权过期
      if (router.currentRoute.path !== '/login') {
        // 退出登陆
        store.dispatch('logout')
        router.replace('/login')
        Toast({
          message:'error.response.data.message',
          position: 'top',
        })
      } else {
        Toast('token过期的请求, 已在login')
      }
      
    } else if (status === 404) {
      Toast('请求的资源不存在')
    } else {
      Toast('请求异常: ' + msg)
    }
  }


    // alert(error)
    return new Promise(()=>{})
})

export default axios
