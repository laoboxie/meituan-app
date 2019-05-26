import Router from 'koa-router'
import Region from '../dbs/models/region'

// import provinces from '../data/provinces.json'
// import cities from '../data/cities.json'
const provinces = []
const cities = []

const Level = {
  province: 1,
  city: 2,
  area: 3,
}
Object.freeze(Level)

let router = new Router({prefix: '/region'})

// 导入数据
router.get('/import', async (ctx)=>{
  try{
    if(ctx.isAuthenticated()){
      const {username} = ctx.session.passport.user
      if(username!=='594502135'){
        ctx.body = {
          code: 403,
          msg: '您权限不足'
        }
        return false            
      }
    }else{
      ctx.body = {
        code: 401,
        msg: '您没有登录'
      }
      return false      
    }

    const {level} = ctx.query
    let list = []
    let parentCodeKey = ''
    if(level==1){
      list = provinces
      parentCodeKey = ''
    }else if(level==2){
      list = cities
      parentCodeKey = 'provinceCode'
    }else{
      ctx.body = {
        code: -1,
        msg: "参数错误"
      } 
      return false
    }

    let success = true
    list.forEach(async (item)=>{
      item.parentCode = item[parentCodeKey] || 0
      item.level = level
      await Region.create(item).catch(err=>{
        console.log('err',err)
        success = false
      })
    })
    if(success){
      ctx.body = {
        code: 0,
        msg: "导入成功"
      }        
    }else{
      ctx.body = {
        code: -1,
        msg: "导入失败",
        err: err,
      }  
    }
  }catch(err){
    console.log(err)
  }
})

// 获取某一级别的地名
router.get('/level/:level', async (ctx)=>{
  try{
    const {level} = ctx.params
    let result = await Region.find({level: level}) || []
    ctx. body = {
      code: 0,
      msg: "",
      data: result
    }    
  }catch(err){
    ctx.body = {
      code: -1,
      msg: "未知错误",
      err: err
    }
  }
})

export default router