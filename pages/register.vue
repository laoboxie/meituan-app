<template>
  <div class="register_page">
    <el-header class="header">
      <div class="header_cont">
        <div class="logo" />
        <div class="login">
          <p>已有美团账号？</p>
          <nuxt-link to="login">
            <el-button type="primary">
              登录
            </el-button>            
          </nuxt-link>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="sendCode">免费获取邮箱动态码</el-button>
        </el-form-item>
        <el-form-item label="邮箱动态码" prop="code">
          <el-input v-model="form.code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="password">
          <el-input type="password" v-model="form.password" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpassword">
          <el-input type="password" v-model="form.cpassword" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="nomarl">同意以下协议并注册</el-button>
        </el-form-item>
        <el-form-item>
          <a class="protocol" href="https://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>        
      </el-form>
    </el-main>
    <el-footer class="footer">
      <p>©meituan.com  京ICP证0707**号  京公网安备1101050**25545号</p>
    </el-footer>
  </div>
</template>

<script>
import http from '@/assets/api/index.js'
import api from '@/assets/api/apiList'
export default {
  layout: 'blank',
  data: () => {
    let validatorCpassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      form: {
        email: '',
        code: '',
        password: '',
        cpassword: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入邮箱动态码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          // {
          //   validator: validatorCpassword,
          //   trigger: 'blur'
          // }
        ],         
      },
    }
  },
  methods: {
    sendCode(){
      console.log(this.$http)
      let self = this
      this.$refs.form.validateField('email', (valid)=>{
        if(!valid){
          self.$http(api.verify, {
            email: this.form.email
          }).then(res=>{
            console.log(res,'res')
          })
        }
      })
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.register_page{
  .header{
    border-bottom: 2px solid #2bb8aa;
    .header_cont{
      @include cont_layout;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        display: inline-block;
        width: 55px;
        height: 36px;
        text-indent: -9999px;
        background-position: -669px -748px;
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
      }
      .login{
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
  .main{
    @include cont_layout;
    min-height: 80vh;
    .form{
      width: 400px;
      .protocol{
        color: $main_c;
        text-decoration: none;
        &:hover{
          text-decoration: underline;
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
