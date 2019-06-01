<template>
  <div class="goodList">
    <h3 class="title">商家团购及优惠</h3>
    <div class="cont">
      <div class="need_login" v-if="false">
        <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
        <p>请登录后查看详细团购优惠</p>
        <nuxt-link :to="{name:'login'}">
          <el-button round type="primary" size="small">立即登录</el-button>
        </nuxt-link>
      </div>
      <div class="list" v-else >
        <div class="item" v-for="(item,index) in data" :key="index">
          <div class="left">
            <img :src="$get(item, 'photos[0].url')" :alt="$get(item, 'photos[0].title', '')">
          </div>
          <div class="middle">
            <p class="title">{{item.name}}</p>
            <p class="soldNum">已售{{$get(item, 'biz_ext.ticket_ordering', 0)}}</p>
            <div class="price">
              <p class="cprice">优惠价￥{{item.price}}</p>
              <p class="oprice">门店价￥{{Math.ceil(item.price*1.2)}}</p>
            </div>
          </div>
          <div class="right">
            <el-button round type="primary" size="normal" @click="addCart(item)">立即抢购</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../assets/api/apiList"
import {mapGetters} from 'vuex'
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  methods: {
    addCart(product){
      if(this.isLogin){
        this.$http(api.addCart, {
          products: [{
            name: product.name,
            price: product.price,
            image: this.$get(product, 'photos[0].url', "")
          }]
        }).then(res=>{
          let data = this.$get(res, 'data', {})
          if(data.code===0){
            this.$router.push({
              name: "cart",
              query: {
                id: data.data.cartId
              }
            })
          }else{
            this.$message.error(data.msg || "预定出错")
          }
        })
      }else{
        this.$router.push({
          name: 'login'
        })
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
.goodList {
  
  .title {
    font-size: 20px;
  }
  .cont {
    @include section_box;
    .need_login{
      text-align: center;
      img{
        margin: 0 auto;
        display: block;
        width: 160px;
      }
    }
    .list{
      
      .item{
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
        &:last-of-type{
          margin-bottom: 0;
        }
        .left{
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .middle{
          flex-grow: 1;
          padding-left: 20px;
          p{
            margin: 0;
          }
          .title{
            margin-bottom: 5px
          }
          .soldNum{
            margin-bottom: 30px;
          }
          .price{
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            p:nth-of-type(2n+1){
              margin-right: 20px;
            }
            .oprice{
              text-decoration: line-through;
            }
          }
        }
        .right{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
