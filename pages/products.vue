<template>
  <div class="products_page">
    <div class="cont">
      <product-item class="item" v-for="(item,index) in products" :key="index" :data="item"></product-item>
    </div>
  </div>
</template>

<script>
import api from '@/assets/api/apiList'
import productItem from "@/components/products/productItem"
export default {
  components: {
    productItem
  },
  data(){
    return {
      keyword: '',
      products: [],
    }
  },
  methods: {
    async getProducts(){
      let res = await this.$http(api.results, {
        city: this.city,
        keyword: this.keyword
      })
      if(res.data.code===0){
        let data = this.$get(res, 'data.data', {})
        this.products = this.$get(data, 'list', []).map(item=>{
          return {
            name: item.name,
            rate: Number(item.biz_ext.rating),
            address: item.pname + item.adname + item.business_area + ' ' + item.address,
            location: item.location,
            image: item.photos && item.photos[0].url
          }
        })
      }
    }
  },
  mounted(){
    this.keyword = this.$route.query.keyword
    if(this.keyword){
      this.getProducts()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.products_page{
  background: $bg_c;
  padding-top: 20px;
  .cont{
    @include cont_layout;
    @include section_box;
    
    .item{
      border-bottom: 1px solid $border_c;
      &:last-of-type{
        border-bottom: 0;
      }
    }
  }

}
</style>
