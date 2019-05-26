<template>
  <div class="detailCard">
    <div class="left">
      <div class="info">
        <h3 class="title">{{data.name}}</h3>
        <div class="subInfo">
          <div class="rate">
            <el-rate
              :value="Number($get(data, 'biz_ext.rating', 0))"
              disabled
              show-score
              score-template="{value}">
            </el-rate>
          </div>
          <div class="price">人均￥{{$get(data, 'biz_ext.lowest_price', '--')}}</div>
        </div>
      </div>
      <div class="desc">
        <p class="adress">地址：{{data.pname}}{{data.adname}} {{data.address}}</p>
        <p class="tel" v-if="data.tel">电话：{{data.tel}}</p>
        <p class="time">营业时间：周一至周日</p>
      </div>
    </div>
    <div class="right">
      <img :src="$get(data, 'photos.0.url')" class="image">
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default(){
        return {}
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
.detailCard{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid $border_c;
  background-color: #fff;
  .left{
    flex-grow: 1;
    font-size: 14px;
    color: $font_c;
    .info{
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid $border_c;
      .title{
        font-size: 26px;
        color: $font_c;
        margin-bottom: 15px;
        margin-top: 0;
        font-weight: normal;
      }
      .subInfo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .price{
          margin-left: 20px;
        }
      }
    }

    .desc{
      margin-bottom: 15px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid $border_c;
      .p{
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }
  .right{
    flex-shrink: 0;
    padding-left: 20px;    
    .image{
      width: 380px;
      height: 250px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
</style>
