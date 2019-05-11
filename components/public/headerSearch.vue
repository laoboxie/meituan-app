<template>
<div class="headerSearch">
  <div class="cont">
    <div class="logo">
      <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
    </div>
    <div class="search">
      <el-input placeholder="搜索商家或地点" v-model="searchCont" size="normal" @input="handleChange" @focus="handleFocus" @blur="handleBlur">
        <el-button slot="append" icon="el-icon-search" class="searchBtn"></el-button>
      </el-input>
      <ul class="result" v-show="focus && searchResult.length">
        <li v-for="(item, index) in searchResult" :key="index">{{item.name}}</li>
      </ul>
      <!-- <div class="hotSearch">4546</div> -->
    </div>
  </div>
</div>
</template>

<script>
import api from '@/assets/api/apiList'
import {mapGetters} from 'vuex'
import {debounce} from '@/assets/js/lodash'
export default {
  data(){
    return {
      searchCont: '',
      searchResult: [],
      focus: false,
    }
  },
  computed: {
    ...mapGetters(['city']),
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
    },
    handleChange: debounce(async function(value){
      if(!value){
        this.searchResult = []
        return false
      }
      let res = await this.$http(api.topSearch, {
        city: this.city,
        keyword: value
      })
      if(res.data.code===0){
        let data = this.$get(res, 'data.data', {})
        this.searchResult = this.$get(data, 'list', [])
      }
    }, 500),
    handleFocus(){
      this.focus = true
    },
    handleBlur(){
      setTimeout(()=>{
        this.focus = false
      }, 200)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.headerSearch{
  border-bottom: 1px solid $border_c;
  &>.cont{
    @include cont_layout;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 0;
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
      .result{
        padding: 0;
        margin: 0;
        list-style: none;
        width: 355px;
        box-sizing: border-box;
        border: 1px solid $border_c;
        li{
          line-height: 30px;
          cursor: pointer;
          padding: 0 10px;
          background-color: #fff;
          &:hover{
            background-color: $bg_c;
            color: $main_c;
          }
        }
      }
    }
  }
}
</style>
