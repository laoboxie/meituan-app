import Vue from "vue";
import AXIOS from "axios";
import qs from "qs";

const axios = AXIOS.create({
  baseURL: 'http://127.0.0.1'
});
const err_msg = "msg"; //这里是接口返回的数据的message

//请求时的拦截器
axios.interceptors.request.use(
  config => {
    // 发送请求之前做一些处理,loading...
    return config;
  },
  error => {
    // 当请求异常时做一些处理
    return Promise.reject(error);
  }
);

// 请求后的拦截器
axios.interceptors.response.use(
  response => {
    //响应成功后的处理
    return response;
  },
  error => {
    // 响应异常时做一些处理
    // 这里我们把错误信息扶正, 后面就不需要写 catch 了

    let failStatus = [400];
    if (failStatus.indexOf(error.response.status) < 0) {
      //这里是失败响应的提示
      console.log("网络异常，请重试！");
    } else {
      //这里是接口返回信息的提示
      console.log(error.response.data[err_msg]);
    }

    //return Promise.reject(error.response)
    console.warn(error);
    return Promise.reject(error.response);
  }
);

const httpServer = (opts, data) => {
  // 公共参数
  let Public = {};

  // http默认配置
  let httpDefaultOpts = {
    params: Object.assign(Public, data),
    // qs数据处理, 主要是配合下面headers里的Content-Type, 转成表单提交, 让后端可以直接用 $_POST 拿到数据
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.headers
  };
  httpDefaultOpts = Object.assign(httpDefaultOpts, opts);

  if (opts.method == "get") {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }

  return axios(httpDefaultOpts).catch(res => {
    console.warn(res);
  });
};

Vue.prototype.$http = httpServer;
export default httpServer
