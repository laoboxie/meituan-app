import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import {get} from "@/assets/js/lodash"

Vue.use(Vuex)

export const modules = {
  user,
}

export const state = () => {
  return {

  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    // 获取用户信息
    let user = req.user
    if (user) {
      commit('setUser', {
        username: user.username,
        email: user.email
      })
    }
    // 获取用户城市
    let res = await app.$axios.get('/geo/getLocation').catch(err=>{
      // console.log('err',err)
    })
    if(res.status===200 && res.data.code===0){
      commit('setUserValue', {
        key: 'city',
        value: get(res, 'data.data.city', '北京').replace('市', '')
      })
    }
  }
}

