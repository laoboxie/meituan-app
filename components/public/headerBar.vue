<template>
<div class="headerBar">
  <div class="cont">
    <div class="left">
      <div class="location">
        <i class="el-icon-location"></i>
        <span>深圳</span>
        <el-button class="changBtn">切换城市</el-button>
      </div>
      <div class="user">
        <div v-if="true">
          <nuxt-link :to="{name: 'login'}">
            <el-button type="text">立即登录</el-button>
          </nuxt-link>
          <nuxt-link :to="{name: 'register'}">
            <el-button type="text">注册</el-button>
          </nuxt-link>          
        </div>
        <div v-else>
          <span>老伯，</span>
          <el-button type="text">退出</el-button>
        </div>
      </div>      
    </div>
    <div class="right">
      我的美团
    </div>
  </div>
</div>
</template>

<script>
import api from '@/assets/api/apiList'
export default {
  data(){
    return {
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
.headerBar{
  background-color: $bg_c;
  font-size: 12px;
  &>.cont{
    @include cont_layout;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .location{
        .changBtn{
          padding: 3px 7px;
          margin-left: 5px;
        }
      }
      .user{
        margin-left: 40px;
      }
    }
  }
}
</style>
