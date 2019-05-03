import nodemailer from 'nodemailer'
import {smtp} from "../config"

export function getRandomCode(count=4){
  return Math.random().toString().slice(2,2+count)
}

export function getExpire(ms=0, start){
  start = start ? start : new Date().getTime()
  return start + ms
}

export function checkIsExpired(expire){
  let now = new Date().getTime()
  if(now>expire){
    return true
  }else{
    return false
  }
}

export let emailTransporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtp.user, // generated ethereal user
    pass: smtp.pass // generated ethereal password
  }
});