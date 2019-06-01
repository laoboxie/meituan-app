import sign from '@/assets/js/sign'
const serviceModule = {
  // user
  verify: {
    url: "/user/verify",
    method: "post"
  },
  signup: {
    url: "/user/signup",
    method: "post"
  },
  signin: {
    url: '/user/signin',
    method: 'post'
  },
  logout: {
    url: '/user/logout',
    method: 'post'
  },

  // geo
  getLocation: {
    url: `http://cp-tools.cn/geo/getPosition?sign=${sign}`,
    method: 'get',
  },

  // search
  topSearch: {
    url: `/search/top`,
    method: 'get',
  },
  results: {
    url: `/search/results`,
    method: 'get',
  },

  // cart
  addCart: {
    url: '/cart/add',
    method: 'post',
    headers: {
      "content-type": 'application/json'
    }
  },

  // order
  addOrder: {
    url: '/order/add',
    method: 'post',
    headers: {
      "content-type": 'application/json'
    }
  },

};

export default serviceModule;
