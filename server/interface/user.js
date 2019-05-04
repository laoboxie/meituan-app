import Router from 'koa-router'
import passport from 'koa-passport'
import User from '../dbs/models/user'

import {getRandomCode, getExpire, checkIsExpired, emailTransporter} from "../utils/index"
import {VERIFY_CODE} from "../utils/const"
import {smtp} from "../config"

let router = new Router({prefix: '/user'})
import redis from '../utils/redis'
const timeGap = 1000*60*1000



//发送邮箱验证码
router.post('/verify', async (ctx, next)=>{
  try{
    const {email} = ctx.request.body
    if(!email){
      ctx.body = {
        code: -1,
        msg: '请输入邮箱'
      }
      return false
    }else{
      //操作是否频繁
      let lastExpire = await redis.hget(`${VERIFY_CODE}:${email}`, 'expire')
      if(lastExpire && !checkIsExpired(lastExpire)){
        ctx.body = {
          code: -1,
          msg: '操作太频繁，请稍后重试'
        }
        return false
      }
      let obj = {
        email: email,
        code: getRandomCode(),
        expire: getExpire(timeGap),
      }
      let mailOpts = {
        from: `美团<${smtp.user}>`,
        to: obj.email,
        subject: "美团动态码",
        html: `<h1>您的美团动态码为：${obj.code}</h1>`
      }
      await emailTransporter.sendMail(mailOpts, (err)=>{
        if(err){
          ctx.body = {
            code: -1,
            msg: '邮件发送失败，请重试',
            err: err
          }
          return false
        }else{
          redis.hmset(`${VERIFY_CODE}:${obj.email}`, 'code', obj.code, 'expire', obj.expire)
        }
      })
      ctx.body = {
        code: 0,
        msg: '邮件发送成功，请查收'
      }
    }
  }catch(err){
    console.log(err)
  }
})

//注册
router.post('/signup', async (ctx)=>{
  // try{
    const {username, email, code, password} = ctx.request.body
    let lastCode = await redis.hget(`${VERIFY_CODE}:${email}`, 'code')
    let lastExpire = await redis.hget(`${VERIFY_CODE}:${email}`, 'expire')
    if(!username || !email || !code || !password){
      ctx.body = {
        code: -1,
        msg: '缺少必要参数'
      }
      return false      
    }
    if(!lastCode || !lastExpire){
      ctx.body = {
        code: -1,
        msg: '查询不到验证码'
      }
      return false
    }
    if(checkIsExpired(lastExpire)){
      ctx.body = {
        code: -1,
        msg: '验证码已过期'
      }
      return false
    }
    if(code!==lastCode){
      ctx.body = {
        code: -1,
        msg: '验证码错误'
      }
      return false      
    }
    let existUser = await User.findOne({'username': username})
    if(existUser){
      ctx.body = {
        code: -1,
        msg: '用户名已存在'
      }
      return false
    }
    await User.create({
      username,
      password,
      email
    }).then(res=>{
      ctx.body = {
        code: 0,
        msg: '注册成功',
      }
    }).catch(err=>{
      ctx.body = {
        code: -1,
        msg: '注册失败',
        err: err
      }
      return false
    })

  // }catch(err){
  //   console.log(err)
  // }

})

//登录
router.post('/signin', async (ctx, next)=>{
  return passport.authenticate('local', function(err, user, info, status) {
    if(err){
      ctx.body = {
        code: -1,
        msg: err
      }
      return false
    }
    if (user === false) {
      ctx.body = {
        code: -1,
        msg: info
      }
      // ctx.throw(401)
    }else{
      ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
          username: user.username,
          email: user.email,
        }
      }
      return ctx.login(user)
    }
  })(ctx, next)
})

//退出登录
router.post('/logout', async (ctx)=>{
  await ctx.logout()
  if(ctx.isUnauthenticated()){
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '退出失败，请重试'
    }
  }
})

//获取用户信息
router.get('/info', async (ctx)=>{
  if(ctx.isAuthenticated()){
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      code: 0,
      data: {
        username,
        email
      }
    }
  }else{
    ctx.body = {
      code: -1,
      msg: "获取失败"
    }
  }
})

export default router