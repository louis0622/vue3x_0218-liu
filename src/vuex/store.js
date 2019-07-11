import Vue from 'vue'
import Vuex from 'vuex'

//引入
import msite from '../vuex/modules/msite'
import shop from '../vuex/modules/shop'
import user from '../vuex/modules/user'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//声明使用
Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
   // 配置应用中所有的功能配置
    modules:{
        msite : msite,
        shop : shop,
        user : user
    }
})