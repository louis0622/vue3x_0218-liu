// 一个能发送ajax请求的函数
// 1.统一处理请求异常
// 2.异步请求成功的数据不是response，而是response.data I
// 3.对post请求参数进行ulencode处理，而不使用默认的json方式（后台接）


import axios from 'axios'
const qs = require('qs');

//请求超时
axios.defaults.timeout = 20000

//创建一个请求拦截器interceptors
axios.interceptors.request.use(function (config) {
    //config里取出method请求方式，请求的数据data
    const {method,data} = config
    //如果是post请求，进行处理
    if (method.toLowerCase()==='post' && data && typeof data === 'object') {
        //将json数据变成urlencoded的字符串
        config.data = qs.stringify(data)
    }

    return config;
  }, error => {
    console.log('请求异常'+ error.message)
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
