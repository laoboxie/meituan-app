import axios from 'axios'
import {local} from '../config'

const instance = axios.create({
  baseURL: `http://${local.host}:${local.port}`,
  timeout: 2000,
})

export default instance