export default {
  state(){
    return {
      username: '',
      email: '',

      city: '',
    }
  },
  getters: {
    username(state){
      return state.username
    },
    email(state){
      return state.email
    },
    city(state){
      return state.city
    },
    isLogin(state){
      return Boolean(state.username)
    }
  },
  mutations: {
    setUser(state, payload){
      state.username = payload.username || '',
      state.email = payload.email || ''
    },
    setUserValue(state, payload){
      if(state[payload.key]!==undefined){
        state[payload.key] = payload.value
      }
    }
  },
  actions: {

  }
}