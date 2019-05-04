<template>
<div class="headerSearch">
  <div class="cont">
    <div class="logo">
      <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
    </div>
    <div class="search">
      <el-input placeholder="搜索商家或地点" v-model="searchCont" size="normal">
        <el-button slot="append" icon="el-icon-search" class="searchBtn"></el-button>
      </el-input>
      <div class="hotSearch">4546</div>
    </div>
  </div>
</div>
</template>

<script>
import api from '@/assets/api/apiList'
export default {
  data(){
    return {
      searchCont: '',
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
.headerSearch{
  &>.cont{
    @include cont_layout;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 28px;
    .logo{
      width: 240px;
      flex-shrink: 0;
      img{
        width: 126px;
      }
    }
    .search{
      width: 422px;
      flex-shrink: 0;
      .el-input-group__append{
        background-color: $main_c;
      }
      .searchBtn{
        width: 65px;
        color: #fff;
        // font-weight: bold;
      }
    }
  }
}
</style>
