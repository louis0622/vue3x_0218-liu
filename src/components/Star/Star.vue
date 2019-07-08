<template>
  <div class="star" :class="`star-${size}`">  
    <!-- size 最小为24 -->
    <span class="star-item " v-for="(item, index) in StarClass" :key="index" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    score:Number,   //评分
    size:Number     //尺寸
  },
  //计算属性
  computed:{
    //星星类名的数组
    StarClass(){
      const {score} = this
      const scoreIn = Math.floor(score)
      const arr = []
      //添加整星on
      for (let i = 0; i < scoreIn; i++) {
        arr.push('on')
      }
      //2.添加半星half
      if (score*10 - scoreIn*10 >= 5) {
        arr.push('half')      
      }
      //3.添加空星off
      // for (let arr = 0; arr < 5; arr++) {
      //   arr.push('off')
      // }
      while (arr.length < 5) {
        arr.push('off')
      }
      return arr
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
