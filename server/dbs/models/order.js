import mongoose from "mongoose"

const status = {
  1: "待支付",
  2: "待消费",
  3: "待评价",
  4: "售后",
}

const OrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true
  },
  cart: {
    type: String,
    required: true,
  },
  createTime: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true,
  }
})

const Order = mongoose.model('Order', OrderSchema)

export default Order