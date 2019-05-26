import Router from 'koa-router'
import Cart from '../dbs/models/cart'

let router = new Router({prefix: '/cart'})

// 新增购物车
router.post('/add', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      let {products} = ctx.request.body
      let createTime = new Date().getTime()
      let user = ctx.session.passport.user
      let cart = new Cart({
        products,
        user,
        createTime,
      })
      let res = await cart.save()
      ctx.body = {
        code: 0,
        data: {
          cartId: cart.id
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

// 购物车查询
router.get('/:id', async (ctx, next)=>{
  try{
    if(ctx.isAuthenticated()){
      const {id} = ctx.params
      let user = ctx.session.passport.user
      let cart = await Cart.findById(id)
      if(user._id === cart.user){
        ctx.body = {
          code: 0,
          data: cart
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

export default router