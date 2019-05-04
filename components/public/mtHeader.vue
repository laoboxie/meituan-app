<template>
<div class="mt_header">
  <header-bar></header-bar>
  <header-search></header-search>
</div>
</template>

<script>
import api from '@/assets/api/apiList'
import headerBar from './headerBar'
import headerSearch from './headerSearch'
export default {
  components: {
    headerBar,
    headerSearch
  },
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
.mt_header{

}
</style>
