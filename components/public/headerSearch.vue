<template>
<div class="headerSearch">
  <div class="cont">
    <nuxt-link :to="{name:'index'}">
      <div class="logo">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
      </div>
    </nuxt-link>
    <div class="search">
      <el-input placeholder="搜索商家或地点" v-model="searchCont" size="normal" 
        @input="handleChange" @focus="handleFocus" @blur="handleBlur" @keyup.enter.native="search">
        <el-button slot="append" icon="el-icon-search" class="searchBtn" @click="search"></el-button>
      </el-input>
      <ul class="result" v-show="focus && searchResult.length">
        <li v-for="(item, index) in searchResult" :key="index" @click="goDetail(item)">{{item.name}}</li>
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
    },
    search(){
      let {href} = this.$router.resolve({
        name: 'products',
        query: {
          keyword: this.searchCont,
        }
      })
      window.location.href = href
    },
    goDetail(item){
      let {href} = this.$router.resolve({
        name: 'pDetail',
        query: {
          name: item.name,
          type: item.type,
        }
      })
      window.location.href = href
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
      position: relative;
      .el-input-group__append{
        background-color: $main_c;
      }
      .searchBtn{
        width: 65px;
        color: #fff;
        // font-weight: bold;
      }
      .result{
        position: absolute;
        padding: 0;
        margin: 0;
        list-style: none;
        width: 355px;
        box-sizing: border-box;
        border: 1px solid $border_c;
        background: #fff;
        z-index: 100;
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
