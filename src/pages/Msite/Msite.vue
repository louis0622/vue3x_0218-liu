<template>
  <div class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <!-- solt 标签体 -->
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- categorysArr 创建一个装有categorys的大数组-->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <!-- 遍历生成多个item  将数据放到categorys里-->
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(item,index2) in categorys"
              :key="index2"
            >
              <div class="food_container">
                <img :src="BaseUrl + item.image_url" />
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </div>
</template>

<script type="text/ecmascript-6">
import ShopList from "../../components/ShopList/ShopList";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

import { mapState } from "vuex";
export default {
  data() {
    return {
      BaseUrl: "https://fuss10.elemecdn.com"
    };
  },
  //计算属性
  computed: {
    //--->地址信息 和 分类列表categorys
    ...mapState(["address", "categorys"]),
    //根据一维数组生成二维数组   创建categorysArr
    categorysArr() {
      //1.取数据
      const BigArr = []; //大数据
      let SmallArr = []; //小数组
      const { categorys } = this;
      //2.计算数据的结果
      categorys.forEach(item => {
        if (SmallArr.length === 0) {
          //将小数组放到大数组
          BigArr.push(SmallArr);
        }
        //将分类对象放到小数组 (小数组长度最长为8)
        SmallArr.push(item);
        //如果满了，在创建一个空数组
        if (SmallArr.length === 8) {
          SmallArr = [];
        }
      });
      //返回结果
      return BigArr;
    }
  },
  //监视categorys
  //解决轮播图问题
  // 1.watch+$nextTick（）
  // 2.callback+$nextTick（）
  // 3.利用dispatch（）返回的promise
  watch: {
    categorys() {
      //$nextTick()  将回调延时到下一次更新时执行
      this.$nextTick(() => {
        //轮播图显示，轮播图创建太早了，需放在Mounted里面，后在监视里面
        var mySwiper = new Swiper(".swiper-container", {
          // direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    }
  },
//注册组件
  components: {
    ShopList
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
