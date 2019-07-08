<template>
  <section class="search">
    <Header title="搜索">
    </Header>
    <form class="search_form" action="#">
      <input type="search" name="search" placeholder="请输入美食的名称哦！！！" 
      onfocus="this.placeholder=' '" onblur="this.placeholder='请输入美食的名称哦！！！'" class="search_input">
      <input type="submit" class="search_submit">
    </form>
  </section>

</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import "../../common/stylus/mixins.styl"
  .search  //搜索
    width 100%
    height 100%
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #278BF4
          font-size 16px
          color #fff
          background-color #278BF4
</style>
