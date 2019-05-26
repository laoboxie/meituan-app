import mongoose from "mongoose"

const CartSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  user: {
    type: String,
    required: true
  },
  createTime: {
    type: Number,
    required: true
  },
})

const Cart = mongoose.model('Cart', CartSchema)

export default Cart