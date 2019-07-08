//发送异步请求
import {reqAddress,reqCategorys,reqShops} from '../api/'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from './mutation-types'

export default{
    //获取当前地址的异步action  发送reqAddress请求
    async getAddress({commit,state}){
        //固定套路
        const {longitude,latitude} = state
        //1.发异步ajax请求
        const result = await reqAddress(longitude,latitude)
        //2.有了结果后，提交mutation
        if (result.code === 0) {
            const address = result.data
            //提交
            commit(RECEIVE_ADDRESS,address)
        }
    },
    //获取当前地址的异步action 发送reqCategorys请求
    async getCategorys({commit}){
        //固定套路
        //1.发异步ajax请求
        const result = await reqCategorys()
        //2.有了结果后，提交mutation
        if (result.code === 0) {
            const categorys = result.data
            //提交
            commit(RECEIVE_CATEGORYS,categorys)
            //在更新状态数据后执行回调函数  解决轮播图问题第二种方法
            // typeof callback==='function' && callback()
        }
    },
    //获取当前地址的异步action  发送reqAddress请求
    async getShops({commit,state}){
        //固定套路
        const {longitude,latitude} = state
        //1.发异步ajax请求
        const result = await reqShops(longitude,latitude)
        //2.有了结果后，提交mutation
        if (result.code === 0) {
            const shops = result.data
            //提交
            commit(RECEIVE_SHOPS,shops)
        }
    }
}