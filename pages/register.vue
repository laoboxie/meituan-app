<template>
  <div class="register_page">
    <el-header class="header">
      <div class="header_cont">
        <nuxt-link :to="{name:'index'}"><div class="logo" /></nuxt-link>
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
          <el-button @click="sendCode" :disabled="btnDisable">{{btnTxt}}</el-button>
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
          <el-button type="primary" size="nomarl" @click="register">同意以下协议并注册</el-button>
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
import api from '@/assets/api/apiList'
const timeGap = 30
let timer = null
export default {
  layout: 'blank',
  data(){
    var checkCpassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        email: '',
        code: '',
        password: '',
        cpassword: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入邮箱动态码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur' }
        ],
        cpassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: checkCpassword,
            trigger: 'blur'
          }
        ],         
      },
      timeLeft: timeGap,
      btnTxt: "免费获取邮箱动态码",
      btnDisable: false,
    }
  },
  watch: {
    timeLeft: function(newVal){
      if(newVal===timeGap){
        this.btnTxt = "免费获取邮箱动态码"
        this.btnDisable = false
      }else{
        this.btnTxt = `${newVal}s后重试`
        this.btnDisable = true
      }
    }
  },
  computed: {
  },
  methods: {
    sendCode(){
      this.$refs.form.validateField('email', (valid)=>{
        if(!valid){
          this.$http(api.verify, {
            email: this.form.email
          }).then(res=>{
            let data = this.$get(res, 'data', {})
            console.log(data)
            if(data.code===0){
              this.$message.success(data.msg)
              this.timeLeft--
              clearInterval(timer)
              timer = setInterval(()=>{
                this.timeLeft--
                if(this.timeLeft<=0){
                  this.timeLeft = timeGap
                  clearInterval(timer)
                }
              }, 1000)
            }else{
              this.$message.error(data.msg)
            }
          }).catch(err=>{
            console.log('errrrrr',err)
          })
        }
      })
    },
    register(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http(api.signup, {
            username: this.form.username,
            email: this.form.email,
            code: this.form.code,
            password: this.form.password,
          }).then(res=>{
            let data = this.$get(res, 'data', {})
            if(data.code===0){
              this.$message.success(data.msg || '注册成功')
              this.$router.push({
                name: 'login'
              })
            }else{
              this.$message.error(data.msg || '注册失败')
            }
          })
        }
      });
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
    width: 100%;
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
