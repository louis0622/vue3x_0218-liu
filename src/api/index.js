//接口请求函数
import ajax from './ajax'

//加前缀
const BASE = '/api'

//获取商铺地址信息Address(根据经纬度)
export const reqAddress = 
(longitude , latitude) => ajax.get(BASE +`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax({
    method:'GET',
    url: BASE + 'index_category'
})

//根据经纬度获取商铺列表
export const reqShops = ({latitude ,longitude}) => ajax({
    method:'GET',
    url: BASE + '/shops',
    params: { latitude , longitude }
})

//发送短信验证码请求
export const reqSendcode = (phone) => ajax({
    method:'GET',
    url: BASE + '/sendcode',
    params: {phone}
})

//用户名密码登录
export const reqLoginPwd = ({name, pwd,  captcha }) => ajax({
    method:'POST',
    url: BASE + '/login_pwd',
    data: {
        name, 
        pwd,  
        captcha
    }
})

//手机号/短信 登录
export const reqLoginPhone = ({phone,code}) => ajax({
    method:'POST',
    url: BASE + '/login_sms',
    data: {phone,code}
})




 