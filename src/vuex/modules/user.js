import {
    RECEIVE_USERS,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,
} from '../mutation-types'
import {reqAutoLogin} from '../../api'

const state = {
    user: {}, //用户信息
    token: localStorage.getItem('token_key'),
}
const mutations = {
    [RECEIVE_USERS](state, {
        user
    }) {
        state.user = user
    },
    [RECEIVE_TOKEN](state, {
        token
    }) {
        state.token = token
    },
    [RESET_USER](state) {
        state.user = {}
    },
    [RESET_TOKEN](state) {
        state.token = ''
    },
}
const actions = {
    //数据持久化处理
    redcodeUser({commit}, user) {
        //将user的token保存到1ocalStorage中
        localStorage.setItem('token_key', user.token)
        //将token保存到state中
        commit(RECEIVE_TOKEN, {token: user.token})
        //将user保存到state中
        //delete  删除对象中指定的属性
        delete user.token
        commit(RECEIVE_USERS, {user})
    },
    //退出登录
    logout({commit}) {
        //重置state中的user
        commit(RESET_USER)
        //重置state中的token
        commit(RESET_TOKEN)
        //清除localStorage中的信息
        localStorage.removeItem('token_key')
    },
    //自动登录
    async autoLogin({commit,state}) {
        // 如果有token, 就发自动登陆的请求获取user
        const token = state.token
        if (token) {
            const result = await reqAutoLogin()
            if (result.code === 0) {
                const user = result.data
                commit(RECEIVE_USERS, {
                    user
                })
            }
        }
    },
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}