import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export const modules = {
  user,
}

export const state = () => {
  return {

  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = req.user
    if (user) {
      commit('setUser', {
        username: user.username,
        email: user.email
      })
    }
  }
}

