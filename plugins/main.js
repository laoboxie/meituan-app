import Vue from "vue"
import http from '@/assets/api/index'
import get from "lodash/get"

Vue.prototype.$http = http
Vue.prototype.$get = get
