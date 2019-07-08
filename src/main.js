// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router';
import Header from './components/Header/Header.vue'
import ajax from './api/ajax'
//注册store
import store from './vuex/store'
import Star from './components/Star/Star'

//全局注册
Vue.component('Header', Header)
Vue.component('Star', Star)
//放到全局，所有的组件都能调用
Vue.prototype.$axios = ajax


new Vue({
  el: '#app',
  // components: { App } , template: '<App/>'  ==== 简写 render: h => h(App)
  render: h => h(App),
  router,
  store,
})
