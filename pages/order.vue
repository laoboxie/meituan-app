<template>
  <div class="order_page">
    <div class="cont">
      <el-tabs v-model="status">
        <el-tab-pane label="全部订单" name="0">
          <order-list :list="curList"></order-list>
        </el-tab-pane>
        <el-tab-pane label="待支付" name="1">
          <order-list :list="curList"></order-list>
        </el-tab-pane>
        <el-tab-pane label="待消费" name="2">
          <order-list :list="curList"></order-list>
        </el-tab-pane>
        <el-tab-pane label="待评价" name="3">
          <order-list :list="curList"></order-list>
        </el-tab-pane>
        <el-tab-pane label="售后" name="4">
          <order-list :list="curList"></order-list>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
import api from "@/assets/api/apiList";
import orderList from "@/components/order/orderList"
const status = {
  1: "待支付",
  2: "待消费",
  3: "待评价",
  4: "售后",
}
export default {
  components: {
    orderList
  },
  data() {
    return {
      status: 0,
      allList: [],
    };
  },
  computed: {
    curList(){
      let status = Number(this.status) || 0
      let allList = this.allList || []
      if(status===0){
        return allList
      }else{
        return allList.filter(item=>{
          return item.status === status
        })
      }
    }
  },
  methods: {
  },
  async asyncData(ctx){
    let {status} = ctx.query
    let res = await ctx.$axios.get(`/order/list`)
    if(res.status===200 && res.data.code===0){
      let list = res.data.data || []
      return {
        status: status || 0,
        allList: list,
      }
    }
  },
  mounted() {
    console.log(this.allList)
  }

};
</script>

<style lang="scss" scoped>
@import "@/assets/css/common.scss";
.order_page {
  padding-top: 20px;
  .cont {
    @include cont_layout;
    @include section_box;
  }
}
</style>
