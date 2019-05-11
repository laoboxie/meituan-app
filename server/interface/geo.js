import Router from 'koa-router'
import request from '../utils/request'
import sign from '~/assets/js/sign'

let router = new Router({prefix: '/geo'})
import redis from '../utils/redis'

//获取位置
router.get('/getLocation', async (ctx, next)=>{
  try{
    let res = await request.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(res.status===200){
      ctx.body = {
        code: 0,
        data: {
          province: res.data.province || '',
          city: res.data.city || ''          
        }
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '无法获取到位置'
      }
    }
  }catch(err){
    console.log(err)
  }
})

export default router