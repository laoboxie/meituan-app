<template>
  <div class="pDetail_page">
    <div class="cont">
      <detail-card class="card" :data="product"></detail-card>
      <good-list :data="list"></good-list>
    </div>
  </div>
</template>

<script>
import api from '@/assets/api/apiList'
import {mapGetters} from 'vuex'
import detailCard from "@/components/pDetail/detailCard"
import goodList from "@/components/pDetail/goodList"
import {get} from "@/assets/js/lodash"
export default {
  components: {
    detailCard,
    goodList
  },
  data(){
    return {
      product: {},
      list: [],
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  async asyncData(ctx) {
    let { name, type } = ctx.query
    let city = ctx.store.state.user.city
    let res = await ctx.$axios.get('/search/products', {
      params: {
        name: name,
        type: type,
        city: city
      }
    })
    if(res.status===200 && get(res, 'data.code')===0){
      return {
        product: get(res, 'data.data.product', {}),
        list: get(res, 'data.data.more', []).map(item=>{
          item.price = Number(item.biz_ext.cost) || Number(item.biz_ext.lowest_price) || 0
          return item
        }),
      }
    }
  },
  mounted(){
    console.log('product',this.product, this.list)
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.pDetail_page{
  background: $bg_c;
  padding-top: 20px;
  min-height: 80vh;
  padding-bottom: 100px;
  .cont{
    @include cont_layout;
    .card{
      margin-bottom: 40px;
    }
  }

}
</style>
