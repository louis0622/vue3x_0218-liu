import Vue from 'vue'
import Vuex from 'vuex'

//引入
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//声明使用
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})