<template>
  <div class="cart_page">
    <div class="cont">
      <el-table :data="list" style="width: 100%">
        <el-table-column label="项目" prop="name" width="500"></el-table-column>
        <el-table-column label="单价" prop="price" width="150"></el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count" :min="1" :max="10"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="总价">
          <template slot-scope="scope">
            <p>{{scope.row.count*scope.row.price}}</p>
          </template>
        </el-table-column>
      </el-table>
      <p class="total">应付金额：￥{{total}}</p>
      <p class="receive">将发送美团券密码至手机号：138****7297</p>
      <div class="postOrder">
        <el-button class="orderBtn" size="normal" type="primary">提交提单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/assets/api/apiList";
export default {
  components: {},
  data() {
    return {
      list: []
    };
  },
  computed: {
    total() {
      let total = 0;
      this.list.forEach(item => {
        return (total += item.count * item.price);
      });
      return total;
    }
  },
  methods: {},
  async asyncData(ctx){
    let { id } = ctx.query
    let res = await ctx.$axios.get(`/cart/${id}`)
    if(res.status===200 && res.data.code===0){
      let products = (res.data.data.products || []).map(item=>{
        item.count = 1
        return item
      })
      return {
        list: products
      }
    }
  },
  mounted() {}

};
</script>

<style lang="scss">
@import "@/assets/css/common.scss";
.cart_page {
  padding-top: 20px;
  .cont {
    @include cont_layout;
    .total {
      text-align: right;
      padding: 20px;
      margin-top: 50px;
      border-top: 1px solid $border_c;
      border-bottom: 1px solid $border_c;
    }
    .postOrder {
      margin-top: 40px;
      text-align: right;
    }
  }
}
</style>
