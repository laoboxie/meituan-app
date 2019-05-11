<template>
  <div class="productItem">
    <div class="left">
      <img :src="data.image" class="image">
    </div>
    <div class="right">
      <div class="title">{{data.name}}</div>
      <div class="data">
        <div class="rate">
          <el-rate
            :value="data.rate"
            disabled
            show-score
            score-template="{value}">
          </el-rate>
        </div>
        <div class="comments">609人评论</div>
      </div>
      <div class="adress">{{data.address}}</div>
      <div class="price">人均¥13</div>
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
.productItem{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 0;
  .left{
    flex-shrink: 0;
    
    .image{
      width: 220px;
      height: 125px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
  .right{
    flex-grow: 1;
    padding-left: 20px;
    font-size: 12px;
    color: $font_c_l;    
    .title{
      font-size: 16px;
      color: $font_c;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .data{
      margin-bottom: 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .comments{
        margin-left: 40px;
        color: orange;
      }
    }
    .adress{
      margin-bottom: 15px;
    }
    .price{}
  }

}
</style>
