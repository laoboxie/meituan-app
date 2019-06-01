import Router from 'koa-router'
import Order from '../dbs/models/order'

let router = new Router({prefix: '/order'})

// 创建订单
router.post('/add', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      let {products, cartId} = ctx.request.body
      let createTime = new Date().getTime()
      let user = ctx.session.passport.user
      let totalPrice = 0
      products.map((item)=>{
        totalPrice += item.price*item.count
      })
      let order = new Order({
        products,
        user,
        cart: cartId,
        createTime,
        totalPrice: Number(totalPrice.toFixed(2)),
        status: 1,
      })
      let res = await order.save()
      ctx.body = {
        code: 0,
        data: {
          id: order.id
        }
      }
    }else{
      ctx.body = {
        code: 401,
        msg: '请先登录'
      }
    }
  }catch(err){
    ctx.body = {
      code: -1,
      msg: "未知错误",
      err: err,
    }
    console.log(err)
  }
})

// 查询订单列表
router.get('/list', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      const {status} = ctx.query
      let user = ctx.session.passport.user
      let query = {
        user: user._id,
      }
      status ? query.status=status : ''
      let orderList = await Order.find(query).sort({createTime: -1})
      ctx.body = {
        code: 0,
        data: orderList
      }
    }else{
      ctx.body = {
        code: 401,
        msg: '请先登录'
      }
    }
  }catch(err){
    ctx.body = {
      code: -1,
      msg: "未知错误",
      err: err,
    }
    console.log(err)
  }
})

// 查询订单
router.get('/:id', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      const {id} = ctx.params
      let user = ctx.session.passport.user
      let order = await Order.findById(id)
      if(user._id === order.user){
        ctx.body = {
          code: 0,
          data: order
        }        
      }else{
        ctx.body = {
          code: 403,
          msg: '您无权限查询此记录'
        }       
      }
    }else{
      ctx.body = {
        code: 401,
        msg: '请先登录'
      }
    }
  }catch(err){
    ctx.body = {
      code: -1,
      msg: "未知错误",
      err: err,
    }
    console.log(err)
  }
})

// 改变订单状态
router.get('/update/:id', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      const {id} = ctx.params
      const {status} = ctx.query
      let user = ctx.session.passport.user
      let order = await Order.findOne({
        _id: id,
        user: user._id
      })
      if(!order){
        ctx.body = {
          code: 404,
          msg: "找不到该订单",
        }        
      }else{
        order.status = status
        await order.save()
        ctx.body = {
          code: 0,
          msg: "修改成功",
          data: order
        }        
      }

    }else{
      ctx.body = {
        code: 401,
        msg: '请先登录'
      }
    }
  }catch(err){
    ctx.body = {
      code: -1,
      msg: "未知错误",
      err: err,
    }
    console.log(err)
  }
})

export default router