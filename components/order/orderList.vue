<template>
  <div class="orderList">
    <div v-if="list.length==0">暂无数据</div>
    <div class="order" v-for="(order,index) in list" :key="index">
      <div class="product" v-for="(product,pIndex) in order.products" :key="pIndex">
        <img class="image" :src="product.image" alt="">
        <p class="name">{{product.name}}</p>
        <p class="count">数量：{{product.count}}</p>
      </div>
      <p class="price">总价:￥{{order.totalPrice}}</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    list: {
      type: Array,
      default(){
        return []
      }      
    }
  },
  data(){
    return {
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common.scss';
.orderList{
  .order{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid $border_c;
    padding-top: 15px;
    padding-bottom: 15px;
    &:first-of-type{
      padding-top: 0;
    }
    &:last-of-type{
      padding-bottom: 0;
      border-bottom: 0;
    }
    .product{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .image{
        width: 90px;
        height: 90px;
        border-radius: 5px;
        object-fit: cover;
      }
      .name{
        margin-left: 20px;
        width: 300px;
      }
      .count{
        margin-left: 20px;
        width: 200px;
      }      
    }
    .price{
      margin-left: 20px;
    }
  }

}
</style>
