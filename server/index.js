import Koa from "koa"
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import mongoose from 'mongoose'

import passport from './utils/passport'
import {db, local} from './config'
import userRouter from './interface/user'
import searchRouter from './interface/search'

const app = new Koa()

// -----中间件-----
app.keys=['keys123','keyskeys456']
app.use(session({
  key:'meituan',
  prefix:'session:',
  store:new Redis()
}))

app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())

mongoose.connect(db, {
  useNewUrlParser:true
})

app.use(passport.initialize())
app.use(passport.session())


// Import and Set Nuxt.js options
import config from '../nuxt.config.js'
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const host = local.host
  const port = local.port

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  //路由处理
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  app.use(searchRouter.routes()).use(searchRouter.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
