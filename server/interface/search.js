import Router from 'koa-router'
import request from '../utils/request'
import sign from '../../assets/js/sign'
import {get} from "../../assets/js/lodash.js"

let router = new Router({prefix: '/search'})

// 搜索提示
router.get('/top', async (ctx, next)=>{
  try{
    let {city, keyword} = ctx.query
    let res = await request.get('http://cp-tools.cn/search/top', {
      params: {
        sign,
        city,
        input: keyword        
      }
    })
    if(res.status===200){
      ctx.body = {
        code: 0,
        data: {
          list: res.data.top.slice(0, 10)
        }
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '未知错误'
      }
    }
  }catch(err){
    console.log(err)
  }
})

//搜索结果
router.get('/results', async (ctx, next)=>{
  try{
    let {city, keyword} = ctx.query
    let res = await request.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        sign,
        city,
        keyword        
      }
    })
    if(res.status===200){
      ctx.body = {
        code: 0,
        data: {
          list: res.data.pois.filter(item=>{
            return get(item, 'photos[0].url', false)
          }),
          count: res.data.count
        }
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '未知错误'
      }
    }
  }catch(err){
    console.log(err)
  }
})

export default router