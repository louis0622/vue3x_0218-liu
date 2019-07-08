// 一个能发送ajax请求的函数
// 1.统一处理请求异常
// 2.异步请求成功的数据不是response，而是response.data I
// 3.对post请求参数进行ulencode处理，而不使用默认的json方式（后台接）


import axios from 'axios'
import store  from '../vuex/store';
const qs = require('qs');


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
    //tokden
    //如果浏览器有tokden，就自动携带上token 
    const token=localStorage.getItem('token_key') 
    if(token){
      config.headers.Authorization='token'+ token
    }
    return config;
  }, error => {
    const status =error.response.status
    const msg=error.message
    if(status === 401){   
      //未授权
      //退出登陆
      store.dispatch('logout')
      alert(error.response.data.message)
    }else if(status ===404){
      alert('请求的资源不存在')
    }else{
      alert('请求异常：'+msg)
    }
    return new Promise(()=>{})
  });
  

//创建一个响应拦截器interceptors
axios.interceptors.response.use(function (response) {
    return response.data;
  },error => {
      console.log(error)
    return new Promise(()=>{})
})

export default axios
