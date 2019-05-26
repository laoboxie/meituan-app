<template>
<div class="headerBar">
  <div class="cont">
    <div class="left">
      <div class="location">
        <i class="el-icon-location"></i>
        <span>{{city || '--'}}</span>
        <el-button class="changBtn">切换城市</el-button>
      </div>
      <div class="user">
        <div v-if="!username">
          <nuxt-link :to="{name: 'login'}">
            <el-button type="text">立即登录</el-button>
          </nuxt-link>
          <nuxt-link :to="{name: 'register'}">
            <el-button type="text">注册</el-button>
          </nuxt-link>          
        </div>
        <div v-else>
          <span>{{username}}，</span>
          <el-button type="text" @click="longout">退出</el-button>
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
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
    }
  },
  computed: {
    ...mapGetters(['username', 'city']),
  },
  methods: {
    longout(){
      this.$http(api.logout).then(res=>{
        let data = this.$get(res, 'data', {})
        if(data.code===0){
          this.$router.replace({
            name: 'index'
          })
          window.location.reload()
        }else{
          this.$message.error(data.msg || '退出失败')
        }
      })      
    },
    getLocation(){
      this.$http(api.getLocation).then(res=>{
        if(res.status===200 && res.data.city){
          this.city = res.data.city.replace('市', '')
          this.$store.commit('setUserValue', {
            key: 'city',
            value: this.city
          })
        }
      })
    }
  },
  mounted(){
    // this.getLocation()
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
