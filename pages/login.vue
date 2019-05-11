<template>
  <div class="login_page">
    <el-header class="header">
      <nuxt-link :to="{name:'index'}"><div class="logo"></div></nuxt-link>
    </el-header>
    <el-main class="main">
      <el-row>
        <el-col :span="12">
          <img src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <div class="mainCont">
            <h4>帐号登录</h4>
            <el-input class="input" size="normal" v-model="username" placeholder="邮箱"></el-input>
            <el-input class="input" size="normal" type="password" v-model="password" placeholder="密码" @keyup.enter.native="login"></el-input>
            <el-button class="btn" size="normal" type="primary" @click="login">登 录</el-button>
            <p class="register">
              还没有帐号？
              <nuxt-link class="link" :to="{name: 'register'}">免费注册</nuxt-link>
            </p>
          </div>
        </el-col>
      </el-row>      
    </el-main>
    <el-footer class="footer">
      <p>©meituan.com  京ICP证0707**号  京公网安备1101050**25545号</p>
    </el-footer>    
  </div>
</template>

<script>
import api from '@/assets/api/apiList'
export default {
  layout: 'blank',
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login(){
      this.$http(api.signin, {
        username: this.username,
        password: this.password
      }).then(res=>{
        let data = this.$get(res, 'data', {})
        if(data.code===0){
          this.$store.commit('setUser', {
            username: data.data.username,
            email: data.data.email
          })
          this.$router.push({
            name: 'index'
          })
        }else{
          this.$message.error(data.msg || '帐号/密码错误')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.login_page{
  @include cont_layout;
  .header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .logo {
      display: inline-block;
      width: 55px;
      height: 36px;
      text-indent: -9999px;
      background-position: -669px -748px;
      background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
    }    
  }
  .main{
    min-height: 80vh;
    .mainCont{
      width: 300px;
      margin: 50px auto 0;
      .input{
        margin-bottom: 20px;
      }
      .btn{
        width: 100%;
      }
      .register{
        .link{
          color: $main_c;
        }
      }
    }
  }
  .footer{
    border-top: 1px solid $border_c;
    padding-top: 20px;
    p{
      @include cont_layout;
      color: $font_c_l;
      text-align: center;
    }
  }
}
</style>
