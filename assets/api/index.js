import AXIOS from "axios";
import qs from "qs";
import {merge} from "@/assets/js/lodash"
import {local} from '../../server/config.js'
const axios = AXIOS.create({
  baseURL: `//${local.host}:${local.port}`
});

// 请求前的拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 请求后的拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

const httpServer = (opts, data) => {
  // http默认配置
  let commonOpts = {}
  let options = merge({}, commonOpts, opts);
  if (options.method == "get") {
    options.params = data
  }else {
    if(options.headers && /application\/json/.test(options.headers["content-type"] || "")){
      options.data = data
    }else{
      options.data = qs.stringify(data)
    }
  }

  return axios(options)
};

export default httpServer;
