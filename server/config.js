export const db = 'mongodb://127.0.0.1:27017/meituan'

export const smtp = {
  host: 'smtp.qq.com',
  port: 25,
  user: '594502135@qq.com',
  pass: 'vodbjgadzpgabbeb'
}

export const local = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3100
}