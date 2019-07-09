<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginShow}" @click="Showlogin(true)">短信登录</a>
          <a href="javascript:;" :class="{on: !loginShow}" @click="Showlogin(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginShow}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                :disabled="!Isphone || CountdownTime>0"
                class="get_verification"
                :class="{right_phone : Isphone}"
                @click.prevent="SendCode"
              >{{CountdownTime>0? `已发送验证码(${CountdownTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code"/>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginShow}">
            <section>
              <section class="login_message">
                <input type="text" placeholder="用户名" v-model="name"/>
              </section>
              <section class="login_verification">
                <input :type="showPwd ? 'text' : 'password'" maxlength="8" placeholder="密码"  v-model="pwd"/>
                <div class="switch_button" :class="showPwd ? 'on':'off'" @click="showPwd = !showPwd">
                  <div class="switch_circle" :class="{right : showPwd}"></div>
                  <span class="switch_text">{{showPwd ? '显示' : '隐藏'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img class="get_verification" src="http://localhost:5000/captcha" 
                alt="captcha" @click="ChangeCaptcha" ref="captcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="LoginUsers">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {reqSendcode,reqLoginPwd,reqLoginPhone} from '../../api'
import {RECEIVE_USERS} from '../../vuex/mutation-types'
export default {
  data() {
    return {
      name:'',      //用户名
      code:'',      //短信验证码
      pwd:'',       //密码
      captcha:'',  //图形验证码
      phone: '',       //手机号
      loginShow: true,  //true为短信登录，false为密码登录
      CountdownTime: 0 ,     //验证码倒计时时间
      showPwd:false,         //是否显示密码
    };
  },
  computed: {
    //校验手机号
    Isphone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    //短信与密码切换
    Showlogin(loginShow) {
      this.loginShow = loginShow;
    },
    //发送验证码
    async SendCode() {
      //设置最大时间
      this.CountdownTime=10
      const timeId = setInterval(()=>{
        this.CountdownTime--
        //对CountdownTime做限制
        if (this.CountdownTime === 0) {
          clearInterval(timeId)
        }
      },1000)
      //发送获取验证码请求
      const result = await reqSendcode(this.phone)
      if ( result.code === 0) {
        confirm('短信以发送成功')  
      }else{
        confirm(result.msg)
      }
    },
    //更新图形验证码
    ChangeCaptcha(){
      this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now() 

    },
    //发送两种登录方式请求
    async LoginUsers(){
      let result = null
      //先取出数据
      const {loginShow,name,code,phone,captcha} = this
        //1.发送用户名/密码登录请求
      if(!loginShow){
       result = await reqLoginPwd({name,pwd,captcha})
      }else(
        //2.发送手机/短信验证码登录请求
       result = await reqLoginPhone({phone,code})
      )
      //3.根据结果进行处理
      if (result.code === 0) {
        //将user信息保存到state中
        const user = result.data
        this.$store.dispatch('receive_users',user)
        //跳转个人中心profile
        this.$router.repalce('/profile')

      }else{
        confirm(result.msg)
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color 0.3s, border-color 0.3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                   transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
