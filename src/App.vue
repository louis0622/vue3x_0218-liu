<template>
  <div id="app">
    <router-view></router-view>
      <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqAddress} from './api'
export default {
  name: 'App',
  data(){
    return {
      msg:'App Component'
    }
  },
  //从App里发送请求
  mounted(){
  //分发action ,从后台获取数据到state中
    //发送Address地址信息请求，调用getAddress
    this.$store.dispatch('getAddress')
    //发送categorys食品分类列表请求，调用getCategorys
    this.$store.dispatch('getCategorys')
    //发送Shops经纬度获取商铺列表请求，调用getShops
    this.$store.dispatch('getShops')
    //分发自动登录的请求
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  
  
</style>
